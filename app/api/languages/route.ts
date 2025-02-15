import { readdirSync } from "fs";
import { join } from "path";
import { NextResponse } from "next/server";

const CONTENT_DIR = join(process.cwd(), "content");

export async function GET() {
    try {
        const directories = readdirSync(CONTENT_DIR, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => ({
                name: dirent.name,
                icon: `/icons/${dirent.name.toLowerCase()}.svg`,
                count: readdirSync(join(CONTENT_DIR, dirent.name))
                    .filter(file => file.endsWith(".md"))
                    .length
            }));

        return NextResponse.json(directories);
    } catch {
        return NextResponse.json({ error: "Failed to fetch languages" }, { status: 500 });
    }
}