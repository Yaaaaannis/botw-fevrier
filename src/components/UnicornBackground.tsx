import type { FC } from 'react';
import UnicornScene from "unicornstudio-react";

interface UnicornBackgroundProps {
    scale?: number;
    zoom?: number;
}

export const UnicornBackground: FC<UnicornBackgroundProps> = ({ zoom = 1 }) => {
    return (
        <div
            className="absolute top-1/2 left-1/2 z-0 pointer-events-none w-full h-full"
            style={{ transform: `translate(-60%, -50%) scale(${zoom})` }}
        >
            <UnicornScene
                projectId="U2v0AXIPENr89Kua3DGc"
                sdkUrl="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.5/dist/unicornStudio.umd.js"
                width="100%"
                height="100%"

            />
        </div>
    );
};
