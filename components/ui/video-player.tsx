"use client";

import React from "react";
import YouTube from "react-youtube";

interface VideoPlayerProps {
    url: string;
}

export function VideoPlayer({ url }: VideoPlayerProps) {
    const getVideoId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return match && match[2].length === 11 ? match[2] : null;
    };

    const videoId = getVideoId(url);

    if (!videoId) {
        return null;
    }

    return (
        <div className="aspect-video">
            <YouTube
                videoId={videoId}
                className="w-full h-full"
                opts={{
                    width: "100%",
                    height: "100%",
                    playerVars: {
                        autoplay: 0,
                    },
                }}
            />
        </div>
    );
}