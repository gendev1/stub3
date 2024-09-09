import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

export default function RoyaltyRegistration() {
    const [formData, setFormData] = useState({
        name: '',
        walletAddress: '',
        role: '',
        setlistId: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleRoleChange = (value: string) => {
        setFormData({
            ...formData,
            role: value,
            setlistId: value === 'songwriter' ? formData.setlistId : '', // Clear setlistId if not songwriter
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send this data to your Solana program
        console.log('Submitting royalty registration:', formData);
        // Reset form after submission
        setFormData({ name: '', walletAddress: '', role: '', setlistId: '' });
    };

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Royalty Registration</CardTitle>
                <CardDescription>Register to receive royalties from secondary ticket sales</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="walletAddress">Solana Wallet Address</Label>
                        <Input id="walletAddress" name="walletAddress" value={formData.walletAddress} onChange={handleInputChange} required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Select onValueChange={handleRoleChange} value={formData.role}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select your role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="band">Band</SelectItem>
                                <SelectItem value="songwriter">Songwriter</SelectItem>
                                <SelectItem value="promoter">Promoter</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    {formData.role !== 'promoter' && (
                        <div className="space-y-2">
                            <Label htmlFor="setlistId">Setlist ID</Label>
                            <Input id="setlistId" name="setlistId" value={formData.setlistId} onChange={handleInputChange} required />
                        </div>
                    )}
                </form>
            </CardContent>
            <CardFooter>
                <Button type="submit" className="w-full" onClick={handleSubmit}>
                    Register for Royalties
                </Button>
            </CardFooter>
        </Card>
    );
}
