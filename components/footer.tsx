import { Github } from "lucide-react";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="border-t">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Project Based Learning</h3>
                        <p className="text-muted-foreground">
                            Learn programming by building real-world projects
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-muted-foreground hover:text-foreground">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/contribute" className="text-muted-foreground hover:text-foreground">
                                    Contribute
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Resources</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/tutorials/javascript" className="text-muted-foreground hover:text-foreground">
                                    JavaScript
                                </Link>
                            </li>
                            <li>
                                <Link href="/tutorials/python" className="text-muted-foreground hover:text-foreground">
                                    Python
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Community</h4>
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                        >
                            <Github className="h-5 w-5" />
                            GitHub
                        </a>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t text-center text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} Project Based Learning. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}