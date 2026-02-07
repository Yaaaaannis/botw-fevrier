import { ReactLenis } from 'lenis/react';
import { useLocation } from 'react-router-dom';

function SmoothScrolling({ children }: { children: React.ReactNode }) {
    const location = useLocation();

    // Disable smooth scrolling on the video page to avoid conflicts
    if (location.pathname === '/video') {
        return <>{children}</>;
    }

    return (
        <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
            {children}
        </ReactLenis>
    );
}

export default SmoothScrolling;
