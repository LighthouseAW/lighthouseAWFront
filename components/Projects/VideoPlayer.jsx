import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player/lazy";

export default function VideoPlayer({ link }) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!link) {
        return null;
    }

    if (!isMounted) {
        return (
            <div
                className="w-full max-w-2xl aspect-video bg-slate-200"
                aria-label="Loading video"
            />
        );
    }

    return (
        <div className="w-full max-w-2xl aspect-video overflow-hidden rounded-lg">
            <ReactPlayer
                url={link}
                controls
                width="100%"
                height="100%"
                className="bg-black"
            />
        </div>
    );
}