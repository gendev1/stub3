import { Button } from '@/components/ui/button';
import { MapPin, Calendar, Ticket } from 'lucide-react';

export default function TicketListingPage() {
    const bandName = 'The Cosmic Dreamers';
    const setList = ['Stardust Overture', 'Celestial Groove', 'Cosmic Lullaby', 'Interstellar Anthem', 'Nebula Rhapsody', 'Supernova Finale'];
    return (
        <div className="max-w-4xl mx-auto p-6 sm:p-8 md:p-10">
            <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/2 lg:w-2/3">
                    <img src="/placeholder.svg" width={800} height={600} alt="Event Image" className="w-full rounded-lg" style={{ aspectRatio: '800/600', objectFit: 'cover' }} />
                </div>
                <div className="w-full md:w-1/2 lg:w-1/3 flex flex-col justify-center">
                    <div className="space-y-4">
                        <h1 className="text-3xl font-bold tracking-tight">Coachella Music Festival</h1>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            <span>Indio, California</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>April 14-16, 2024</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Ticket className="w-4 h-4" />
                            <span>Seat 12A, Row 8</span>
                        </div>
                        <div className="text-3xl font-bold">$499</div>
                        <Button size="lg" className="w-full">
                            Purchase NFT Ticket
                        </Button>
                    </div>
                </div>
            </div>
            <div className="mt-8 space-y-4">
                <h2 className="text-2xl font-bold">Event Details</h2>
                <p>
                    Experience the ultimate music festival at Coachella 2024! This iconic event brings together the biggest names in music, art, and culture for an unforgettable
                    weekend in the desert.
                </p>
                <p>
                    Your NFT ticket grants you access to all three days of the festival, featuring performances from top artists across multiple stages. Immerse yourself in the
                    vibrant atmosphere, enjoy delicious food and drinks, and explore the interactive art installations throughout the grounds.
                </p>
                <p>
                    Don't miss out on this incredible opportunity to be a part of the Coachella experience. Secure your NFT ticket now and join thousands of music lovers for an
                    event like no other!
                </p>
                <div className="space-y-2">
                    <h3 className="text-xl font-bold">Headliner: {bandName}</h3>
                    <p>Set List:</p>
                    <ul className="list-disc list-inside">
                        {setList.map((song, index) => (
                            <li key={index}>{song}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
