import { useState, useCallback, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Loader from './components/Loader/Loader';
import HipHopLayout from './layouts/HipHopLayout';
import ModernLayout from './layouts/ModernLayout';
import './App.css';

type LayoutType = 'hiphop' | 'modern';

function App() {
  const [activeLayout, setActiveLayout] = useState<LayoutType>('modern');
  const [previousLayout, setPreviousLayout] = useState<LayoutType | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Refs for animation
  const nextLayoutRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  // Calculate dynamic angle for the line
  const [lineAngle, setLineAngle] = useState(-45);

  useEffect(() => {
    const calculateAngle = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      // Calculate angle of the diagonal
      // The edge connects (100%x, 0y) and (0x, 100%y).
      // Slope vector is (-width, height).
      // Angle = atan2(height, -width)? No.
      // We want the rotation of the line element.
      // If line is horizontal (0 deg), we adhere to the edge.
      // Edge angle relative to X-axis: atan(height/width).
      // Since the coordinate system is Y-down, and the line goes "Down and Left" visually...
      // Actually, let's just use atan(height/width) and negate it?
      // If Square: atan(1) = 45deg. We used -45deg.
      // If W=200, H=100. atan(0.5) = 26deg. We expect shallower. 
      // So -26deg is correct.
      const angleRad = Math.atan(height / width);
      const angleDeg = angleRad * (180 / Math.PI);
      setLineAngle(-angleDeg);
    };

    calculateAngle();
    window.addEventListener('resize', calculateAngle);
    return () => window.removeEventListener('resize', calculateAngle);
  }, []);

  const switchLayout = useCallback(() => {
    if (isTransitioning) return;

    const next = activeLayout === 'hiphop' ? 'modern' : 'hiphop';
    setPreviousLayout(activeLayout);
    setActiveLayout(next);
    setIsTransitioning(true);
  }, [activeLayout, isTransitioning]);

  // Animation Effect
  useEffect(() => {
    if (!isTransitioning || !nextLayoutRef.current || !lineRef.current) return;

    // Wipe Logic
    // We reveal the New Layout (active) ON TOP of the Old Layout (previous).
    // The "Clip Path" reveals from Top-Left to Bottom-Right.
    // Clip Path Polygon: 
    // Start (Hidden): polygon(0 0, 0 0, 0 0) - Top Left point.
    // End (Full): polygon(0 0, 100% 0, 100% 100%, 0 100%) - Full Rect.

    // Diagonal Reveal:
    // We need a slanted edge.
    // Let's us a huge polygon that slides.
    // Actually, simple translation of a container with overflow hidden + skewed inner? 
    // Or just animate the clip-path points.

    // Let's use `clip-path` with percentages.
    // Start: polygon(0 0, 0 0, 0 100%) -- Left Strip? No.
    // We want a diagonal.
    // Start: polygon(0 0, 0 0, -100% 100%, -100% 0) ?

    // Easier: Animate a "Mask" div?
    // Let's stick to `clip-path`.
    // Start: polygon(0 0, 0 0, 0 100%) -> Triangle at left edge?

    // Let's try simulating the "Line" movement.
    // The Line moves from TL to BR.
    // The mask follows it.

    // Let's use a large rectangle for clip-path that moves.
    // Or just simplified: 
    // Start: polygon(-200% 0, -100% 0, -50% 100%, -150% 100%) (Off screen left)
    // End: polygon(0 0, 100% 0, 150% 100%, 50% 100%) (Covering screen)

    // Let's try:
    // Start: polygon(0 -100%, 100% -100%, 100% -100%, 0 -100%) (Top)

    // Let's do the "Bottom-Left to Top-Right" sweep visually but inverted coords.
    // Actually simpler:
    // Layout 2 is ON TOP.
    // Initially `clip-path: polygon(0 0, 200% 0, 0 0)` -> Top Edge?

    // Let's use a standard diagonal wipe:
    // Start: polygon(0 0, 0 0, 0 0)
    // End: polygon(0 0, 200% 0, 0 200%)

    // Wait, `lineRef` needs to follow this edge.
    // The edge is defined by the line between (200%, 0) and (0, 200%) as it moves? 
    // Calculating the line pos for clip-path is hard.

    // ALTERNATIVE:
    // Translate a "Mask Container" with `overflow: hidden` and skew?
    // Let's try just the clip-path.
    // We will animate a variable `val` from 0 to 200.
    // `polygon(0 0, ${val}% 0, 0 ${val}%)`
    // This creates a triangle expanding from Top-Left.
    // To cover the full screen (100x100), we need the hypotenuse to clear (100,100).
    // If val=200, points are (200,0) and (0,200). Line eq: y = -x + 200.
    // At x=100, y=100. P(100,100) is ON the line. So 200% is enough to JUST cover.

    // The White Line:
    // Needs to sit exactly on the edge.
    // The edge connects (val, 0) and (0, val).
    // Midpoint: (val/2, val/2).
    // Angle: -45 degrees.
    // Width: sqrt(2 * val^2) = val * 1.414.

    // So we can position the line using GSAP too!

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsTransitioning(false);
          setPreviousLayout(null); // Cleanup bottom layer
        }
      });

      // Initial State
      // Top Layout (Active) is hidden.
      tl.set(nextLayoutRef.current, {
        clipPath: 'polygon(0 0, 0 0, 0 0)'
      })
        .set(lineRef.current, {
          opacity: 1
        });

      // Animate `p` from 0 to 250 (extra to be safe).
      const obj = { p: 0 };

      tl.to(obj, {
        p: 250,
        duration: 1.5,
        ease: "power2.inOut",
        onUpdate: () => {
          const val = obj.p;
          // Update Clip Path
          if (nextLayoutRef.current) {
            nextLayoutRef.current.style.clipPath = `polygon(0 0, ${val}% 0, 0 ${val}%)`;
          }

          // Update Line
          // Line connects (val, 0) and (0, val) (in %).
          // We can position a line div. 
          // Let's center it at (val/2, val/2) and rotate -45deg.
          // Length needs to cover the intersection.
          // Max length is diagonal of screen ~141%. 
          // Let's make it huge (300%) and just move center.
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
    <>
      <Loader />

      <div className="relative w-full h-screen overflow-hidden bg-black">

        {/* Bottom Layer (Previous Layout) */}
        {/* If Not Transitioning, we just show Active. 
            If Transitioning, Bottom is Previous. */}
        <div className="absolute inset-0 z-0">
          {/* If we are transitioning, show previous. Else show active. */}
          {/* Wait, if not transitioning, Active is visible. 
               If transitioning, Previous is at bottom, Active is at top (masked). */}

          {(isTransitioning && previousLayout) ? (
            previousLayout === 'hiphop' ? <HipHopLayout onSwitch={() => { }} /> : <ModernLayout onSwitch={() => { }} />
          ) : (
            // When not transitioning, this layer IS the active layout
            activeLayout === 'hiphop' ? <HipHopLayout onSwitch={switchLayout} /> : <ModernLayout onSwitch={switchLayout} />
          )}
        </div>

        {/* Top Layer (Active Layout - Masked) */}
        {/* Only render if transitioning */}
        {isTransitioning && (
          <div
            ref={nextLayoutRef}
            className="absolute inset-0 z-10 will-change-[clip-path]"
            style={{ clipPath: 'polygon(0 0, 0 0, 0 0)' }}
          >
            {activeLayout === 'hiphop' ? (
              <HipHopLayout onSwitch={switchLayout} />
            ) : (
              <ModernLayout onSwitch={switchLayout} />
            )}
          </div>
        )}

        {/* Diagonal White Line */}
        {isTransitioning && (
          <div
            ref={lineRef}
            className="absolute z-20 w-[300%] h-[20px] bg-white pointer-events-none"
            style={{
              transform: `translate(-50%, -50%) rotate(${lineAngle}deg)`,
              boxShadow: '0 0 15px rgba(255,255,255,0.3)' // Subtle glow
            }}
          />
        )}

      </div>
    </>
  );
}

export default App;
