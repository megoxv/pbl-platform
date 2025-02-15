"use client";

import { useEffect, useState } from "react";
import { BookOpen, Code2, Users } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

interface Language {
    name: string;
    icon: string;
    count: number;
}

export default function Home() {
    const [languages, setLanguages] = useState<Language[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLanguages = async () => {
            try {
                const response = await fetch("/api/languages");
                const data = await response.json();
                setLanguages(data);
            } finally {
                setLoading(false);
            }
        };
        fetchLanguages();
    }, []);

    const features = [
        {
            icon: <Code2 className="h-12 w-12 text-primary" />,
            title: "Learn by Building",
            description: "Get hands-on experience by building real-world projects from scratch",
        },
        {
            icon: <BookOpen className="h-12 w-12 text-primary" />,
            title: "Curated Tutorials",
            description: "High-quality tutorials from experienced developers across multiple languages",
        },
        {
            icon: <Users className="h-12 w-12 text-primary" />,
            title: "Community Driven",
            description: "Open source platform with contributions from the developer community",
        },
    ];

    return (
        <main className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="py-20 px-4">
                <div className="container mx-auto text-center">
                    <h1 className="text-5xl font-bold tracking-tight mb-6">
                        Learn Programming by Building
                        <span className="text-primary"> Real Projects</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                        Discover curated tutorials that teach you how to build real-world applications
                        from scratch. Learn by doing, not just reading.
                    </p>
                    <Button asChild size="lg" className="mr-4">
                        <Link href="#languages">Browse Tutorials</Link>
                    </Button>
                    <Button asChild size="lg" variant="outline">
                        <Link href="/contribute">Contribute</Link>
                    </Button>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-muted/50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <Card key={index} className="p-6 text-center">
                                <div className="flex justify-center mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-muted-foreground">{feature.description}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Languages Section */}
            <section id="languages" className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Available Languages</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {loading ? (
                            // Loading skeletons
                            [...Array(6)].map((_, i) => (
                                <Card key={i} className="p-6">
                                    <div className="flex items-center space-x-4">
                                        <Skeleton className="h-12 w-12 rounded-lg" />
                                        <div>
                                            <Skeleton className="h-6 w-32 mb-2" />
                                            <Skeleton className="h-4 w-20" />
                                        </div>
                                    </div>
                                </Card>
                            ))
                        ) : (
                            // Actual language cards
                            languages.map((language) => (
                                <Link
                                    key={language.name}
                                    href={`/tutorials/${language.name.toLowerCase()}`}
                                >
                                    <Card className="p-6 hover:shadow-lg transition-shadow">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary/10">
                                                <Image
                                                    width={32}
                                                    height={32}
                                                    src={language.icon}
                                                    alt={language.name}
                                                    className="w-8 h-8"
                                                    loading="lazy"
                                                />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-semibold">
                                                    {language.name.charAt(0).toUpperCase() + language.name.slice(1).replace(/-/g, ' ')}
                                                </h3>
                                                <p className="text-sm text-muted-foreground">
                                                    {language.count} {language.count === 1 ? "Project" : "Projects"}
                                                </p>
                                            </div>
                                        </div>
                                    </Card>
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}