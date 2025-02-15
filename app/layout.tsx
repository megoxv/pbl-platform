import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Footer } from '@/components/footer';
import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'PBL Platform - Learn Programming by Building Real Projects',
    description: 'Master coding through real-world projects with community-curated tutorials. Learn JavaScript, Python, React & more with hands-on guides. Start building portfolio projects today!',
    verification: {
        google: process.env.NEXT_PUBLIC_VERIFICATION_GOOGLE
    }
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className} suppressHydrationWarning>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    <div className="min-h-screen bg-background flex flex-col">
                        <Header />
                        <main className="flex-1">
                            {children}
                        </main>
                        <Footer />
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}