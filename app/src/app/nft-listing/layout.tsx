import Image from 'next/image';
import MusicFestival from '@/app/assets/images/music-festival.jpg';
export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col lg:flex-row ">
            <div className="lg:w-3/4 p-6 sm:p-8 md:p-10">
                <div className="max-w-2xl mx-auto">{children}</div>
            </div>
            <div className="lg:w-1/4 bg-gray-100 dark:bg-gray-800 relative">
                <div className="sticky top-0 h-screen flex flex-col">
                    <div className="relative flex-grow">
                        <Image src={MusicFestival} alt="Royalty Registration" layout="fill" objectFit="cover" />
                    </div>
                    <div className="p-6 bg-white dark:bg-gray-900 bg-opacity-80 dark:bg-opacity-80 backdrop-blur-sm">
                        <blockquote className="text-sm italic">"Fair compensation for creators is the cornerstone of a thriving artistic ecosystem."</blockquote>
                        <p className="text-right text-xs mt-2">- Stub3 Team</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
