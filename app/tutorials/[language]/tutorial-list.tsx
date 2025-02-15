"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

interface Tutorial {
    slug: string;
    frontmatter: {
        title: string;
        description: string;
        technologies: string;
        difficulty: "beginner" | "intermediate" | "advanced";
        url: string;
        image: string;
    };
}

export default function TutorialList({ language }: { language: string }) {
    const [tutorials, setTutorials] = useState<Tutorial[]>([]);
    const [filteredTutorials, setFilteredTutorials] = useState<Tutorial[]>([]);
    const [search, setSearch] = useState("");
    const [difficultyFilter, setDifficultyFilter] = useState("all");
    const [techFilter, setTechFilter] = useState("all");
    const [technologies, setTechnologies] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTutorials = async () => {
            try {
                const response = await fetch(`/api/tutorials/${language}`);
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || 'Failed to fetch tutorials');
                }

                // Extract unique technologies
                const allTechs = new Set<string>();
                data.forEach((tutorial: Tutorial) => {
                    const techs = tutorial.frontmatter.technologies.split(',').map((t: string) => t.trim());
                    techs.forEach((tech: string) => allTechs.add(tech));
                });

                setTechnologies(Array.from(allTechs));
                setTutorials(data);
                setFilteredTutorials(data);
            } catch (error) {
                console.error('Error fetching tutorials:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTutorials();
    }, [language]);

    useEffect(() => {
        let filtered = tutorials;

        // Apply search filter
        if (search) {
            filtered = filtered.filter(tutorial =>
                tutorial.frontmatter.title.toLowerCase().includes(search.toLowerCase()) ||
                tutorial.frontmatter.description.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Apply difficulty filter
        if (difficultyFilter !== "all") {
            filtered = filtered.filter(tutorial =>
                tutorial.frontmatter.difficulty === difficultyFilter
            );
        }

        // Apply technology filter
        if (techFilter !== "all") {
            filtered = filtered.filter(tutorial =>
                tutorial.frontmatter.technologies.toLowerCase().includes(techFilter.toLowerCase())
            );
        }

        setFilteredTutorials(filtered);
    }, [search, difficultyFilter, techFilter, tutorials]);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-8 capitalize">{language} Tutorials</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <Skeleton className="h-10" />
                    <Skeleton className="h-10" />
                    <Skeleton className="h-10" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <Card key={i} className="overflow-hidden">
                            <Skeleton className="aspect-video" />
                            <div className="p-6">
                                <Skeleton className="h-6 w-2/3 mb-2" />
                                <Skeleton className="h-4 w-full mb-4" />
                                <div className="flex gap-2">
                                    <Skeleton className="h-5 w-16" />
                                    <Skeleton className="h-5 w-16" />
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8 capitalize">{language} Tutorials</h1>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <Input
                    placeholder="Search tutorials..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full"
                />
                <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                    <SelectTrigger>
                        <SelectValue placeholder="Filter by difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Difficulties</SelectItem>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                </Select>
                <Select value={techFilter} onValueChange={setTechFilter}>
                    <SelectTrigger>
                        <SelectValue placeholder="Filter by technology" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Technologies</SelectItem>
                        {technologies.map((tech) => (
                            <SelectItem key={tech} value={tech}>
                                {tech}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTutorials.map((tutorial) => (
                    <Link
                        key={tutorial.slug}
                        href={`/tutorials/${language}/${tutorial.slug}`}
                    >
                        <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="aspect-video relative">
                                <img
                                    src={tutorial.frontmatter.image}
                                    alt={tutorial.frontmatter.title}
                                    className="object-cover w-full h-full"
                                    loading="lazy"
                                />
                                <Badge
                                    className="absolute top-2 right-2"
                                    variant={
                                        tutorial.frontmatter.difficulty === "beginner"
                                            ? "default"
                                            : tutorial.frontmatter.difficulty === "intermediate"
                                                ? "secondary"
                                                : "destructive"
                                    }
                                >
                                    {tutorial.frontmatter.difficulty}
                                </Badge>
                            </div>
                            <div className="p-6">
                                <h2 className="text-xl font-semibold mb-2">{tutorial.frontmatter.title}</h2>
                                <p className="text-muted-foreground mb-4">{tutorial.frontmatter.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {tutorial.frontmatter.technologies.split(',').map((tech) => (
                                        <Badge key={tech.trim()} variant="secondary">
                                            {tech.trim()}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}