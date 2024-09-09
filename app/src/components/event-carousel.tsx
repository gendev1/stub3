import { Eclipse } from 'lucide-react';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import MusicFestival from '@/app/assets/images/music-festival.jpg';
import MusicFestival1 from '@/app/assets/images/music-festival-1.jpg';
import MusicFestival2 from '@/app/assets/images/music-festival-2.jpg';

export default function EventCarousel() {
    const data = [
        { imageUrl: MusicFestival, name: 'Techno Night', type: 'Music Festival', price: '1 SOL' },
        { imageUrl: MusicFestival1, name: 'Modern Art Showcase', type: 'Gallery Opening', price: '0.5 SOL' },
        { imageUrl: MusicFestival2, name: 'Laugh Factory', type: 'Stand-up Show', price: '0.3 SOL' },
    ];
    return (
        <header className="py-6">
            <Carousel className="w-full max-w-5xl mx-auto">
                <CarouselContent>
                    {data.map((eventDetails, index) => (
                        <CarouselItem key={index}>
                            <div className="relative">
                                <Image
                                    src={eventDetails.imageUrl}
                                    width={1200}
                                    height={600}
                                    alt="Event Image"
                                    className="w-full h-[500px] object-cover rounded"
                                    style={{ aspectRatio: '1200/600', objectFit: 'cover' }}
                                />
                                <div className="absolute bottom-0 right-0 p-4 bg-background/80 rounded-tl-lg">
                                    <div className="flex flex-col items-end">
                                        <h3 className="text-2xl font-semibold">{eventDetails.name}</h3>
                                        <p className="text-muted-foreground">{eventDetails.type} | June 15, 2024</p>
                                    </div>
                                </div>
                                <div className="absolute bottom-0 left-0 p-4 bg-background/80 rounded-tr-lg">
                                    <div className="font-semibold">
                                        <Eclipse className="mr-2 inline h-6 w-6" />
                                        {eventDetails.price}
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </header>
    );
}
