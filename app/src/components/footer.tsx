import Link from 'next/link';
import { Ticket } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="mt-auto border-t bg-background py-6 px-4 md:px-6">
            <div className="container mx-auto max-w-7xl">
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <div className="flex items-center gap-2">
                        <Ticket className="h-6 w-6" />
                        <span className="font-semibold">Stub3</span>
                    </div>
                    <nav className="flex gap-4">
                        <Link href="#" className="text-sm font-medium hover:underline" prefetch={false}>
                            Terms of Service
                        </Link>
                        <Link href="#" className="text-sm font-medium hover:underline" prefetch={false}>
                            Privacy Policy
                        </Link>
                        <Link href="#" className="text-sm font-medium hover:underline" prefetch={false}>
                            Contact
                        </Link>
                    </nav>
                </div>
            </div>
        </footer>
    );
}
