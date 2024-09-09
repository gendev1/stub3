'use client';

import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { mplCandyMachine } from '@metaplex-foundation/mpl-candy-machine';
import { some, generateSigner, Umi, transactionBuilder } from '@metaplex-foundation/umi';
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters';
import { createCandyMachineV2 } from '@metaplex-foundation/mpl-candy-machine';
import { TokenStandard } from '@metaplex-foundation/mpl-token-metadata';
import { createNft } from '@metaplex-foundation/mpl-token-metadata';
import { QRCodeSVG } from 'qrcode.react';
import axios from 'axios';
import { percentAmount } from '@metaplex-foundation/umi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Upload } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function POAPCreation() {
    const wallet = useWallet();
    const umi = createUmi('https://api.devnet.solana.com').use(mplCandyMachine()).use(walletAdapterIdentity(wallet));

    const [formData, setFormData] = useState({
        name: '',
        symbol: '',
        bandName: '',
        setlistId: '',
        maxSupply: 0,
        image: null as File | null,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [candyMachineAddress, setCandyMachineAddress] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.name === 'maxSupply' ? parseInt(e.target.value) : e.target.value;
        // TODO: Fetch songs from setlist
        setFormData({
            ...formData,
            [e.target.name]: value,
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData({
                ...formData,
                image: e.target.files[0],
            });
        }
    };

    const uploadToPinata = async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);

        const pinataApiKey = process.env.NEXT_PUBLIC_PINATA_API_KEY;
        const pinataSecretApiKey = process.env.NEXT_PUBLIC_PINATA_API_SECRET;

        try {
            const res = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
                headers: {
                    'Content-Type': `multipart/form-data`,
                    pinata_api_key: pinataApiKey,
                    pinata_secret_api_key: pinataSecretApiKey,
                },
            });
            return `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
        } catch (error) {
            console.error('Error uploading to Pinata:', error);
            throw error;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setCandyMachineAddress(null);

        try {
            if (!wallet.connected || !wallet.publicKey) {
                throw new Error('Wallet not connected');
            }

            await umi.rpc.getLatestBlockhash();

            // Upload image to Pinata
            const imageUri = await uploadToPinata(formData.image!);

            // Create metadata JSON
            const metadata = {
                name: formData.name,
                symbol: formData.symbol,
                bandName: formData.bandName,
                setlistId: formData.setlistId,
                image: imageUri,
            };

            // Upload metadata to Pinata
            const metadataBlob = new Blob([JSON.stringify(metadata)], { type: 'application/json' });
            const metadataFile = new File([metadataBlob], 'metadata.json', { type: 'application/json' });
            const metadataUri = await uploadToPinata(metadataFile);

            // Create the Collection NFT
            const collectionMint = generateSigner(umi);
            createNft(umi, {
                mint: collectionMint,
                authority: umi.identity,
                name: `${formData.name} Collection`,
                uri: metadataUri,
                sellerFeeBasisPoints: percentAmount(0),
                isCollection: true,
            }).sendAndConfirm(umi);

            // // Create Candy Machine
            // const candyMachine = generateSigner(umi);
            // await createCandyMachineV2(umi, {
            //     candyMachine,
            //     collectionMint: collectionMint.publicKey,
            //     collectionUpdateAuthority: umi.identity,
            //     tokenStandard: TokenStandard.NonFungible,
            //     sellerFeeBasisPoints: percentAmount(0),
            //     itemsAvailable: formData.maxSupply,
            //     creators: [
            //         {
            //             address: umi.identity.publicKey,
            //             verified: true,
            //             percentageShare: 100,
            //         },
            //     ],
            //     configLineSettings: some({
            //         prefixName: '',
            //         nameLength: 32,
            //         prefixUri: '',
            //         uriLength: 200,
            //         isSequential: false,
            //     }),
            // }).sendAndConfirm(umi);

            // Combine builders and add retry logic
            // const builder = transactionBuilder().add(createNftBuilder).add(createCandyMachineBuilder);

            // const result = await builder.sendAndConfirm(umi);
            // console.log(result);
            console.log('Candy Machine created:', collectionMint.publicKey.toString());
            setCandyMachineAddress(collectionMint.publicKey.toString());
        } catch (error) {
            setError('Error creating Candy Machine. Please try again.');
            console.error('Error creating Candy Machine:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Create POAP Collection</h1>

            <div className="grid md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>POAP Collection Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Collection Name</Label>
                                <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="symbol">Symbol</Label>
                                <Input id="symbol" name="symbol" value={formData.symbol} onChange={handleInputChange} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="bandName">Band Name</Label>
                                <Input id="bandName" name="bandName" value={formData.bandName} onChange={handleInputChange} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="setlistId">Setlist ID</Label>
                                <Input id="setlistId" name="setlistId" value={formData.setlistId} onChange={handleInputChange} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="maxSupply">Max Supply</Label>
                                <Input id="maxSupply" name="maxSupply" type="number" value={formData.maxSupply} onChange={handleInputChange} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="image">Upload Image</Label>
                                <Input id="image" name="image" type="file" accept="image/*" onChange={handleImageChange} required />
                            </div>
                            <Button type="submit" disabled={isLoading || !wallet.connected} className="w-full">
                                {isLoading ? 'Creating...' : 'Create POAP Collection'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Collection Preview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {formData.image ? (
                                <img src={URL.createObjectURL(formData.image)} alt="POAP Collection" className="w-full h-64 object-cover rounded-lg" />
                            ) : (
                                <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg">
                                    <Upload className="h-12 w-12 text-gray-400" />
                                </div>
                            )}
                            <div>
                                <h3 className="font-bold">{formData.name || 'Collection Name'}</h3>
                                <p>Symbol: {formData.symbol || 'Symbol'}</p>
                                <p>Band: {formData.bandName || 'Band Name'}</p>
                                <p>Setlist ID: {formData.setlistId || 'Setlist ID'}</p>
                                <p>Max Supply: {formData.maxSupply || 0}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {error && (
                <Alert variant="destructive" className="mt-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {candyMachineAddress && (
                <Card className="mt-8">
                    <CardHeader>
                        <CardTitle>POAP Collection Created Successfully</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center space-y-4">
                        <p>Your POAP Collection Candy Machine has been created with address: {candyMachineAddress}</p>
                        <p>Scan this QR code to mint POAPs from this collection:</p>
                        <QRCodeSVG value={`${typeof window !== 'undefined' ? window.location.origin : ''}/mint-poap/${candyMachineAddress}`} size={200} />
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
