import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import LoaderButton from './LoaderButton';

export default function Loader() {
    const pathRef = useRef<SVGPathElement>(null);
    const [isHidden, setIsHidden] = useState(false);

    const handleClick = () => {
        if (!pathRef.current) return;

        // Initial state is full coverage: "M 0 0 L 100 0 L 100 100 L 0 100 Z"
        // We want the top edge to move down.
        // The path should look like a curtain falling down?
        // "Path descends to reveal main page" -> Reveals from TOP.
        // So Top Edge moves 0 -> 100.

        // Timeline
        const tl = gsap.timeline({
            onComplete: () => setIsHidden(true),
        });

        // Animate to a curved state (top edge moves down and curves)
        // We use a quadratic bezier for the top edge: M 0 Y Q 50 Y+C 100 Y
        // Start: M 0 0 Q 50 0 100 0 L 100 100 L 0 100 Z

        // Start: M 0 0 Q 50 0 100 0 L 100 100 L 0 100 Z
        // Mid: Top edge at 50%, curve dips to 60 or 70%? OR curve lags up?
        // If it falls, maybe it drips? Let's make it "heavy". 
        // Top corners at 0, center at 0 -> Top corners at 100, center at 100.
        // Let's create a "U" shape fall. Corners lead, or Center leads?
        // Let's try Center Leads (Drip).
        // M 0 0 Q 50 50 100 0 ... 
        // But we want to REVEAL. So the shape must go AWAY.

        // Let's try:
        // 1. Flat top.
        // 2. Animate to: M 0 100 Q 50 100 100 100 ... (All flat at bottom)
        // Intermediary: M 0 50 Q 50 120 100 50 ... (Deep curve down)

        tl.to(pathRef.current, {
            attr: { d: "M 0 0 Q 50 150 100 0 L 100 100 L 0 100 Z" }, // Exaggerated drip
            duration: 0.8,
            ease: "power2.in",
        })
            .to(pathRef.current, {
                attr: { d: "M 0 100 Q 50 100 100 100 L 100 100 L 0 100 Z" }, // Flatten at bottom
                duration: 0.4,
                ease: "power2.out",
            }, "-=0.2");
    };

    if (isHidden) return null;

    return (
        <div
            className="fixed inset-0 z-50 cursor-pointer"
            onClick={handleClick}
            aria-label="Click to enter"
        >
            <svg
                className="w-full h-full block"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
            >
                <path
                    ref={pathRef}
                    d="M 0 0 Q 50 0 100 0 L 100 100 L 0 100 Z"
                    fill="#000" // Black loader
                    vectorEffect="non-scaling-stroke"
                />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <LoaderButton onClick={handleClick} />
            </div>
        </div>
    );
}
