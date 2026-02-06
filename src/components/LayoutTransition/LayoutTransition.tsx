import { useState, useRef, useEffect, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { type LayoutType, ThemeContext } from '../../context/ThemeContext';

interface LayoutTransitionProps {
    currentLayout: LayoutType;
    onSwitch: () => void;
    children: ReactNode;
}

export default function LayoutTransition({ currentLayout, onSwitch, children }: LayoutTransitionProps) {
    // activeLayout is the one we are transitioning TO (or currently showing).
    // previousLayout is the one we are transitioning FROM.
    const [activeLayout, setActiveLayout] = useState<LayoutType>(currentLayout);
    const [previousLayout, setPreviousLayout] = useState<LayoutType | null>(null);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [lineAngle, setLineAngle] = useState(-45);

    const nextLayoutRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    // Sync prop changes to internal transition state
    useEffect(() => {
        if (currentLayout !== activeLayout) {
            setPreviousLayout(activeLayout);
            setActiveLayout(currentLayout);
            setIsTransitioning(true);
        }
    }, [currentLayout, activeLayout]);

    // Dynamic Angle Calculation
    useEffect(() => {
        const calculateAngle = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            const angleRad = Math.atan(height / width);
            const angleDeg = angleRad * (180 / Math.PI);
            setLineAngle(-angleDeg);
        };

        calculateAngle();
        window.addEventListener('resize', calculateAngle);
        return () => window.removeEventListener('resize', calculateAngle);
    }, []);

    // Animation Effect
    useEffect(() => {
        if (!isTransitioning || !nextLayoutRef.current || !lineRef.current) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    setIsTransitioning(false);
                    setPreviousLayout(null);
                }
            });

            // Initial State
            tl.set(nextLayoutRef.current, {
                clipPath: 'polygon(0 0, 0 0, 0 0)'
            })
                .set(lineRef.current, {
                    opacity: 1
                });

            const obj = { p: 0 };

            tl.to(obj, {
                p: 250,
                duration: 1.5,
                ease: "power2.inOut",
                onUpdate: () => {
                    const val = obj.p;
                    if (nextLayoutRef.current) {
                        nextLayoutRef.current.style.clipPath = `polygon(0 0, ${val}% 0, 0 ${val}%)`;
                    }
                    if (lineRef.current) {
                        lineRef.current.style.left = `${val / 2}%`;
                        lineRef.current.style.top = `${val / 2}%`;
                    }
                }
            });
        });

        return () => ctx.revert();
    }, [isTransitioning]);

    return (
        <div className="relative w-full h-screen overflow-hidden bg-black">

            {/* Bottom Layer */}
            <div className="absolute inset-0 z-0">
                <ThemeContext.Provider value={{ theme: isTransitioning && previousLayout ? previousLayout : activeLayout, switchTheme: onSwitch }}>
                    {children}
                </ThemeContext.Provider>
            </div>

            {/* Top Layer (Active Layout - Masked) */}
            {isTransitioning && (
                <div
                    ref={nextLayoutRef}
                    className="absolute inset-0 z-10 will-change-[clip-path]"
                    style={{ clipPath: 'polygon(0 0, 0 0, 0 0)' }}
                >
                    <ThemeContext.Provider value={{ theme: activeLayout, switchTheme: onSwitch }}>
                        {children}
                    </ThemeContext.Provider>
                </div>
            )}

            {/* Diagonal White Line */}
            {isTransitioning && (
                <div
                    ref={lineRef}
                    className="absolute z-20 w-[300%] h-[20px] bg-white pointer-events-none"
                    style={{
                        transform: `translate(-50%, -50%) rotate(${lineAngle}deg)`,
                        boxShadow: '0 0 15px rgba(255,255,255,0.3)'
                    }}
                />
            )}

        </div>
    );
}
