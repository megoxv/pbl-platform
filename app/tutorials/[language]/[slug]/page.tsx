import { readdirSync, readFileSync } from "fs";
import { join } from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import { VideoPlayer } from "@/components/ui/video-player";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { Metadata } from "next";

const components = {
    VideoPlayer,
};

const CONTENT_DIR = join(process.cwd(), "content");

export async function generateStaticParams() {
    try {
        const languages = readdirSync(CONTENT_DIR, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory());

        const paths = [];

        for (const language of languages) {
            const languageDir = join(CONTENT_DIR, language.name);
            const tutorials = readdirSync(languageDir)
                .filter(file => file.endsWith(".md"))
                .map(file => ({
                    language: language.name.toLowerCase(),
                    slug: file.replace(".md", ""),
                }));

            paths.push(...tutorials);
        }

        return paths;
    } catch (error) {
        console.error("Error generating static params:", error);
        return [];
    }
}


export async function generateMetadata({ params }: { params: Promise<{ language: string, slug: string }> }): Promise<Metadata> {
    const language = (await params).language;
    const slug = (await params).slug;

    const filePath = join(CONTENT_DIR, language, `${slug}.md`);
    const fileContent = readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);

    return {
        title: `${data.title} | Project Based Learning`,
        description: data.description,
    };
}

export default async function TutorialPage({ params }: { params: Promise<{ language: string, slug: string }> }) {
    const language = (await params).language;
    const slug = (await params).slug;

    const filePath = join(CONTENT_DIR, language, `${slug}.md`);
    const fileContent = readFileSync(filePath, "utf-8");
    const { content, data } = matter(fileContent);

    // Convert comma-separated string to array if necessary
    const technologies = Array.isArray(data.technologies)
        ? data.technologies
        : data.technologies.split(',').map((tech: string) => tech.trim());

    const isYouTubeUrl = data.url.includes('youtube.com') || data.url.includes('youtu.be');

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
                <p className="text-lg text-muted-foreground mb-4">{data.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {technologies.map((tech: string) => (
                        <Badge key={tech} variant="secondary">
                            {tech}
                        </Badge>
                    ))}
                </div>
                <Badge
                    className="mb-4"
                    variant={
                        data.difficulty === "beginner"
                            ? "default"
                            : data.difficulty === "intermediate"
                                ? "secondary"
                                : "destructive"
                    }
                >
                    {data.difficulty}
                </Badge>
                <Button asChild variant="outline" className="ml-2">
                    <a href={data.url} target="_blank" rel="noopener noreferrer">
                        View Original <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                </Button>
            </div>
            {isYouTubeUrl ? (
                <div className="mb-8">
                    <VideoPlayer url={data.url} />
                </div>
            ) : (
                <img
                    src={data.image}
                    alt={data.title}
                    className="w-full rounded-lg mb-8 aspect-video object-cover"
                />
            )}
            <div className="prose dark:prose-invert max-w-none">
                <MDXRemote source={content} components={components} />
            </div>
        </div>
    );
}