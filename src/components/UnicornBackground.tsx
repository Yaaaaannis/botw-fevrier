import type { FC } from 'react';
import UnicornScene from "unicornstudio-react";

interface UnicornBackgroundProps {
    scale?: number;
    zoom?: number;
    projectId?: string;
}

export const UnicornBackground: FC<UnicornBackgroundProps> = ({ scale = 1, zoom = 1, projectId = "U2v0AXIPENr89Kua3DGc" }) => {
    return (
        <div
            className="absolute top-1/2 left-1/2 z-0 pointer-events-none w-full h-full"
            style={{ transform: `translate(-60%, -50%) scale(${zoom})` }}
        >
            <UnicornScene
                projectId={projectId}
                sdkUrl="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.5/dist/unicornStudio.umd.js"
                width="100%"
                height="100%"
                scale={scale}
                dpi={1.5}
                production={true}
            />
        </div>
    );
};
