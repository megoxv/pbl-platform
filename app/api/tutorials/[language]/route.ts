import { readdirSync, readFileSync } from "fs";
import { join } from "path";
import matter from "gray-matter";
import { NextResponse } from "next/server";

const CONTENT_DIR = join(process.cwd(), "content");

export async function generateStaticParams() {
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

type Params = Promise<{ language: string }>

export async function GET(
    request: Request,
    props: { params: Params }
) {
    try {
        const params = props.params;

        const languageDir = join(CONTENT_DIR, (await params).language);
        const files = readdirSync(languageDir).filter(file => file.endsWith(".md"));

        const tutorials = files.map(filename => {
            const fileContent = readFileSync(join(languageDir, filename), "utf-8");
            const { data } = matter(fileContent);
            return {
                slug: filename.replace(".md", ""),
                frontmatter: data,
            };
        });

        return NextResponse.json(tutorials);
    } catch {
        return NextResponse.json(
            { error: "Failed to fetch tutorials" },
            { status: 500 }
        );
    }
}