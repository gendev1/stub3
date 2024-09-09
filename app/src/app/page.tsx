import TrendingEvents from '@/components/trending-events';
import EventCarousel from '@/components/event-carousel';
import UpcomingEvents from '@/components/upcoming-events';

export default function Home() {
    return (
        <>
            <EventCarousel />
            <main className="container grid gap-10 py-10 md:py-20 lg:grid-cols-[1fr_350px] xl:max-w-7xl px-8 w-full mx-auto">
                <div className="grid gap-6">
                    <UpcomingEvents />
                </div>
                <TrendingEvents />
            </main>
        </>
    );
}
