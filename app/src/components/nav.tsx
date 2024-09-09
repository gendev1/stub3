'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Ticket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ModeToggle } from './mode-toggle';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { useState, useEffect } from 'react';

export default function Navbar() {
    const [isClient, setIsClient] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setIsClient(true);
    }, []);

    const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
        const isActive = pathname === href;
        return (
            <Link
                href={href}
                className={`rounded-md px-3 py-1 text-sm transition-all duration-200 ease-in-out
                    ${isActive ? 'underline underline-offset-4' : 'hover:underline hover:underline-offset-4'}`}
                prefetch={false}
            >
                {children}
            </Link>
        );
    };

    return (
        <div className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b bg-background px-4 md:px-6">
            <Link href="/" className="flex items-center gap-2" prefetch={false}>
                <Ticket className="h-6 w-6" />
                <span className="font-semibold">Stub3</span>
            </Link>
            <nav className="flex items-center gap-4">
                <NavLink href="/create-poap">Create POAP</NavLink>
                <NavLink href="/royalty-registration">Register</NavLink>
                <NavLink href="/nft-listing">Create Listing</NavLink>
                {isClient ? <WalletMultiButton /> : <Button>Connect Wallet</Button>}
                <ModeToggle />
            </nav>
        </div>
    );
}
