export default function ContributePage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8">How to Contribute</h1>

            <div className="prose dark:prose-invert max-w-none">
                <h2>Adding New Tutorials</h2>
                <p>
                    We welcome contributions from the community! Here&apos;s how you can add new tutorials:
                </p>

                <h3>1. Create a Markdown File</h3>
                <p>
                    Create a new markdown file in the appropriate language directory under <code>content/</code>.
                    For example: <code>content/javascript/my-tutorial.md</code>
                </p>

                <div className="bg-muted p-4 rounded-lg my-4">
                    <pre className="text-sm">
                        {`---
title: "Tutorial Title"
description: "A brief description of the tutorial"
technologies: Tech1, Tech2
difficulty: "beginner"
url: "https://youtube.com/..."
image: "https://example.com/preview.jpg"
---
                        
## Tutorial Content
                        
Your tutorial content here...`}
                    </pre>
                </div>

                <h3>2. Required Fields</h3>
                <ul>
                    <li><code>title</code>: The name of your tutorial</li>
                    <li><code>description</code>: A brief description (150-200 characters)</li>
                    <li><code>technologies</code>: Comma-separated list of technologies used</li>
                    <li><code>difficulty</code>: One of: beginner, intermediate, advanced</li>
                    <li><code>url</code>: YouTube video or article URL</li>
                    <li><code>image</code>: Preview image URL (16:9 ratio recommended)</li>
                </ul>

                <h3>3. Content Guidelines</h3>
                <ul>
                    <li>Use clear, concise language</li>
                    <li>Include code examples where relevant</li>
                    <li>Break down complex concepts</li>
                    <li>Add screenshots or diagrams when helpful</li>
                    <li>Link to additional resources</li>
                </ul>

                <h3>4. Submit Your Contribution</h3>
                <p>
                    1. Fork the repository<br />
                    2. Create a new branch<br />
                    3. Add your tutorial<br />
                    4. Submit a pull request
                </p>

                <div className="bg-muted p-4 rounded-lg my-4">
                    <h4 className="text-sm font-semibold mb-2">Need Help?</h4>
                    <p className="text-sm">
                        If you need assistance or have questions, feel free to:
                    </p>
                    <ul className="text-sm mt-2">
                        <li>Open an issue on GitHub</li>
                        <li>Join our Discord community</li>
                        <li>Check our detailed contribution guide</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}