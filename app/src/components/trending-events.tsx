import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Eclipse } from 'lucide-react';
import Image from 'next/image';

import MusicFestival from '@/app/assets/images/music-festival.jpg';
import MusicFestival1 from '@/app/assets/images/music-festival-1.jpg';
import MusicFestival2 from '@/app/assets/images/music-festival-2.jpg';

export default function TrendingEvents() {
    const data = [
        { imageUrl: MusicFestival, name: 'Techno Night', type: 'Music Festival', price: '1 SOL' },
        { imageUrl: MusicFestival1, name: 'Modern Art Showcase', type: 'Gallery Opening', price: '0.5 SOL' },
        { imageUrl: MusicFestival2, name: 'Laugh Factory', type: 'Stand-up Show', price: '0.3 SOL' },
        { imageUrl: MusicFestival2, name: 'Taste of Solana', type: 'Food Festival', price: '0.7 SOL' },
        { imageUrl: MusicFestival1, name: 'DeFi Summit', type: 'Tech Conference', price: '2 SOL' },
        { imageUrl: MusicFestival, name: 'Pixel Collectibles', type: 'NFT Auction', price: '0.8 SOL' },
    ];

    return (
        <aside className="mx-auto max-w-md">
            <Card>
                <CardHeader>
                    <CardTitle>Trending Events</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {data.map((eventDetails, index) => (
                        <div className="flex items-center justify-between" key={index}>
                            <div className="flex items-center gap-2">
                                <Image
                                    src={eventDetails.imageUrl}
                                    width={48}
                                    height={48}
                                    alt="Event Image"
                                    className="h-12 w-12 rounded-md"
                                    style={{ aspectRatio: '48/48', objectFit: 'cover' }}
                                />
                                <div>
                                    <h4 className="font-semibold">{eventDetails.name}</h4>
                                    <p className="text-sm text-muted-foreground">{eventDetails.type}</p>
                                </div>
                            </div>
                            <div className="font-semibold">
                                <Eclipse className="mr-2 inline h-4 w-4" />
                                {eventDetails.price}
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </aside>
    );
}
