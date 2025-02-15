import { readdirSync, statSync } from "fs";
import { join } from "path";
import { MetadataRoute } from "next";

const CONTENT_DIR = join(process.cwd(), "content");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    // Static routes
    const staticRoutes = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "daily" as const,
            priority: 1,
        },
        {
            url: `${baseUrl}/contribute`,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: 0.8,
        },
    ];

    // Dynamic tutorial routes
    const dynamicRoutes = readdirSync(CONTENT_DIR, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .flatMap((languageDir) => {
            const language = languageDir.name;
            const languagePath = join(CONTENT_DIR, language);

            const tutorials = readdirSync(languagePath)
                .filter((file) => file.endsWith(".md"))
                .map((file) => {
                    const slug = file.replace(/\.md$/, "");
                    const filePath = join(languagePath, file);
                    const stats = statSync(filePath);

                    return {
                        url: `${baseUrl}/tutorials/${language}/${slug}`,
                        lastModified: stats.mtime,
                        changeFrequency: "weekly" as const,
                        priority: 0.7,
                    };
                });

            return [
                {
                    url: `${baseUrl}/tutorials/${language}`,
                    lastModified: new Date(),
                    changeFrequency: "weekly" as const,
                    priority: 0.9,
                },
                ...tutorials,
            ];
        });

    return [...staticRoutes, ...dynamicRoutes];
}