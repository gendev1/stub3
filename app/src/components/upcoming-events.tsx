import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eclipse } from 'lucide-react';
import Image from 'next/image';

import MusicFestival from '@/app/assets/images/music-festival.jpg';
import MusicFestival1 from '@/app/assets/images/music-festival-1.jpg';
import MusicFestival2 from '@/app/assets/images/music-festival-2.jpg';

const events = [
    {
        title: 'Techno Night',
        type: 'Music Festival',
        date: 'June 15, 2024',
        price: '0.5 ETH',
        image: MusicFestival,
    },
    {
        title: 'Art Exhibition',
        type: 'Gallery Opening',
        date: 'July 1, 2024',
        price: '0.2 ETH',
        image: MusicFestival1,
    },
    {
        title: 'Comedy Night',
        type: 'Stand-up Show',
        date: 'August 10, 2024',
        price: '0.3 ETH',
        image: MusicFestival2,
    },
];

export default function UpcomingEvents() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {events.map((event, index) => (
                        <div key={index} className="group relative overflow-hidden rounded-lg border border-muted/50 p-4 transition-all hover:bg-muted/20">
                            <div className="aspect-square overflow-hidden rounded-lg">
                                <Image
                                    src={event.image}
                                    width={600}
                                    height={600}
                                    alt={`${event.title} Image`}
                                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                                    style={{ aspectRatio: '600/600', objectFit: 'cover' }}
                                />
                            </div>
                            <div className="mt-4 space-y-2">
                                <h3 className="text-lg font-semibold">{event.title}</h3>
                                <p className="text-muted-foreground">
                                    {event.type} | {event.date}
                                </p>
                                <div className="flex items-center justify-between">
                                    <div className="font-semibold">
                                        <Eclipse className="mr-2 inline h-4 w-4" />
                                        {event.price}
                                    </div>
                                    <Button variant="outline" size="sm">
                                        Buy Ticket
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
