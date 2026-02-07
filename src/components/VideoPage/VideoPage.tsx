import { useRef, useContext, useMemo, useLayoutEffect, forwardRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Image, ScrollControls, useScroll, Environment } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ThemeContext } from '../../context/ThemeContext';
import { inscriptionTheme } from '../../data/inscriptionTheme';
import { NavigationOverlay } from '../Shared/NavigationOverlay';
import { PageHeader } from '../Shared/PageHeader';

import { UnicornBackground } from '../UnicornBackground';

const CarouselItem = forwardRef<THREE.Group, { image: string, angle: number, radius: number, width: number }>(({ image, angle, radius, width }, ref) => {
    // Cartesian coordinates for the position on the circle
    // We position them based on the angle
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;

    return (
        <group ref={ref} position={[x, 0, z]} rotation={[0, angle, 0]}>
            <Image
                url={image}
                transparent
                side={THREE.DoubleSide}
                scale={[width, 6]} // Width = 1.5, Height = 2.5
            />
        </group>
    );
});

function Carousel({ images }: { images: any[] }) {
    const groupRef = useRef<THREE.Group>(null);
    const itemsRef = useRef<(THREE.Group | null)[]>([]);
    const scroll = useScroll();

    // Geometry settings
    const IMAGE_WIDTH = 4;
    const count = images.length;
    // Use tan to ensure images touch at the edges (circumscribed polygon)
    const radius = IMAGE_WIDTH / (2 * Math.tan(Math.PI / count));

    useLayoutEffect(() => {
        if (itemsRef.current.length === 0) return;

        // Reset refs array to match current images length to avoid stale refs if images change
        itemsRef.current = itemsRef.current.slice(0, images.length);

        const ctx = gsap.context(() => {
            itemsRef.current.forEach((item, i) => {
                if (!item) return;

                // Animate from Left
                // We perform a "from" animation. 
                // The elements are already at their final computed position (by React props).
                // We tell GSAP to start them at x: -50 (way off to the left) and animate to natural state.

                gsap.from(item.position, {
                    x: 60 + i * 5, // Start from far right, staggered in space
                    duration: 2.0, // Increased duration for the longer travel
                    ease: "power3.out",
                    delay: i * 0.05, // Slightly reduced stagger time since spatial stagger handles separation
                });

                // Also scale them up from 0 for a cleaner entrance
                gsap.from(item.scale, {
                    x: 0,
                    y: 0,
                    z: 0,
                    duration: 1.5,
                    ease: "back.out(1.7)",
                    delay: i * 0.1,
                });

                // Add a little rotation spin
                gsap.from(item.rotation, {
                    y: item.rotation.y + Math.PI, // Spin 180 deg
                    duration: 1.5,
                    ease: "power3.out",
                    delay: i * 0.1,
                });
            });
        });

        return () => ctx.revert();
    }, [images, count]);

    useFrame(() => {
        if (!groupRef.current) return;

        // Rotate the group based on scroll offset
        // One full scroll = one full rotation (or more)
        const totalRotation = Math.PI * 2;
        const currentRotation = scroll.offset * totalRotation;

        groupRef.current.rotation.y = currentRotation;
    });

    return (
        <group ref={groupRef}>
            {images.map((item, i) => {
                const angle = (i / count) * Math.PI * 2;
                return (
                    <CarouselItem
                        key={`${item.id}-${i}`}
                        ref={(el) => { itemsRef.current[i] = el; }}
                        image={item.image}
                        angle={angle}
                        radius={radius}
                        width={IMAGE_WIDTH * 1} // Slight overlap to prevent gaps
                    />
                );
            })}
        </group>
    );
}

export default function VideoPage() {
    const { theme } = useContext(ThemeContext);
    const activeTheme = inscriptionTheme[theme];

    // Repeat images to create a larger cylinder
    const originalImages = activeTheme.gridItems || [];
    // Ensure we have enough items for a nice cinematic circle (e.g. at least 12-14 for tight curve)
    const images = useMemo(() => {
        let list = [...originalImages];
        // Reduced count for tighter curvature (smaller radius)
        while (list.length < 14) {
            list = [...list, ...originalImages];
        }
        return list;
    }, [originalImages]);

    return (
        <div className={`w-full h-screen overflow-hidden ${activeTheme.backgroundClass} relative`}>
            <UnicornBackground
                scale={activeTheme.backgroundScale}
                zoom={activeTheme.backgroundZoom}
                projectId={activeTheme.projectId}
            />
            {/* UI Overlay */}
            <NavigationOverlay />
            <PageHeader />

            {/* R3F Canvas */}
            <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 28], fov: 50 }} className="w-full h-full">
                <fog attach="fog" args={[theme === 'modern' ? '#FFF5EE' : '#1F2021', 5, 20]} />
                <ambientLight intensity={1} />
                <Environment preset="city" />

                <ScrollControls pages={4} damping={0.2} infinite={false}>
                    <Carousel images={images} />
                </ScrollControls>
            </Canvas>
        </div>
    );
}
