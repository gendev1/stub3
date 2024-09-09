'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// This is a mock function to simulate fetching NFT data from Solana
const fetchNFTData = async (nftAddress: string) => {
    // Simulating API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock data
    return {
        name: 'Concert POAP',
        bandName: 'The Solana Sounders',
        venue: 'Blockchain Arena',
        eventTime: '2023-07-15T20:00:00',
        imageUrl: '/placeholder.svg?height=400&width=400',
        setlist: ['Distributed Ledger Love', 'Smart Contract Serenade', 'Proof of Stake Ballad', 'Encore: Consensus Algorithm'],
    };
};

export default function MintPOAP() {
    const params = useParams();
    const nftAddress = params.nftAddress as string;

    const [nftData, setNftData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isMinting, setIsMinting] = useState(false);

    useEffect(() => {
        const loadNFTData = async () => {
            try {
                const data = await fetchNFTData(nftAddress);
                setNftData(data);
            } catch (err) {
                setError('Failed to fetch NFT data. Please try again.');
                console.error('Error fetching NFT data:', err);
            } finally {
                setIsLoading(false);
            }
        };

        loadNFTData();
    }, [nftAddress]);

    const handleMint = async () => {
        setIsMinting(true);
        setError(null);

        try {
            // Simulating minting process
            await new Promise((resolve) => setTimeout(resolve, 2000));
            console.log('Minting POAP NFT:', nftData);
            // Here you would typically interact with Solana to mint the NFT
        } catch (err) {
            setError('Failed to mint NFT. Please try again.');
            console.error('Error minting NFT:', err);
        } finally {
            setIsMinting(false);
        }
    };

    if (isLoading) {
        return <div className="text-center py-10">Loading NFT data...</div>;
    }

    if (error) {
        return (
            <Alert variant="destructive" className="max-w-md mx-auto mt-10">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Mint POAP NFT</h1>
            <div className="max-w-md mx-auto space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>{nftData.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <img src={nftData.imageUrl} alt={nftData.name} className="w-full h-64 object-cover rounded-lg" />
                        <div>
                            <h3 className="font-bold">{nftData.bandName}</h3>
                            <p>{nftData.venue}</p>
                            <p>{new Date(nftData.eventTime).toLocaleString()}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold">Setlist:</h4>
                            <ul className="list-disc list-inside">
                                {nftData.setlist.map((song: string, index: number) => (
                                    <li key={index}>{song}</li>
                                ))}
                            </ul>
                        </div>
                    </CardContent>
                </Card>
                <Button onClick={handleMint} disabled={isMinting} className="w-full">
                    {isMinting ? 'Minting...' : 'Mint POAP NFT'}
                </Button>
            </div>
        </div>
    );
}
