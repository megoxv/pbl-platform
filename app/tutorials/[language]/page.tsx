import { readdirSync } from "fs";
import { join } from "path";
import { Metadata } from "next";
import TutorialList from "./tutorial-list";

const CONTENT_DIR = join(process.cwd(), "content");

export function generateStaticParams() {
    try {
        return readdirSync(CONTENT_DIR, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => ({
                language: dirent.name.toLowerCase(),
            }));
    } catch (error) {
        console.error("Error generating static params:", error);
        return [];
    }
}

export async function generateMetadata({ params }: { params: Promise<{ language: string }> }): Promise<Metadata> {
    const language = (await params).language;

    return {
        title: `${language.charAt(0).toUpperCase() + language.slice(1)} Tutorials | Project Based Learning`,
        description: `Learn ${language} programming through hands-on project tutorials`,
    };
}

export default async function LanguagePage({ params }: { params: Promise<{ language: string }> }) {
    const language = (await params).language;

    return <TutorialList language={language} />;
}