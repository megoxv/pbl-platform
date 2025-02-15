import Link from "next/link";
import { ModeToggle } from "./mode-toggle";

export function Header() {
    return (
        <nav className="border-b">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="text-xl font-bold">
                    PBL Platform
                </Link>
                <div className="flex items-center gap-4">
                    <a
                        href="/contribute"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        Contribute
                    </a>
                    <ModeToggle />
                </div>
            </div>
        </nav>
    );
}