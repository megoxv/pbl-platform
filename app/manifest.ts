import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'PBL Platform',
        short_name: 'PBL Platform',
        description: 'Master coding through real-world projects with community-curated tutorials. Learn JavaScript, Python, React & more with hands-on guides. Start building portfolio projects today!',
        start_url: '/',
        display: 'standalone',
        background_color: '#000',
        theme_color: '#000',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
        ],
    }
}