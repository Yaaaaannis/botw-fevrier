import LoaderButton from '../components/Loader/LoaderButton';

interface HipHopLayoutProps {
    onSwitch: () => void;
}

export default function HipHopLayout({ onSwitch }: HipHopLayoutProps) {
    return (
        <div className="w-full min-h-screen bg-blue-900 flex items-center justify-center relative overflow-hidden">
            <div className="text-center z-10">
                <h1 className="text-9xl font-black text-white italic tracking-tighter uppercase mb-8">
                    Hip Hop
                </h1>
                <p className="text-blue-200 text-xl font-medium tracking-wide mb-12">
                    Experience the rhythm
                </p>
                <LoaderButton onClick={onSwitch} />
            </div>
            {/* Decorative background element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] font-bold text-white/5 pointer-events-none select-none">
                BEAT
            </div>
        </div>
    );
}
