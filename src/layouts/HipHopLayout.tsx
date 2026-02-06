import LoaderButton from '../components/Loader/LoaderButton';

interface HipHopLayoutProps {
    onSwitch: () => void;
    onNavigate?: (page: string) => void;
}

export default function HipHopLayout({ onSwitch, onNavigate }: HipHopLayoutProps) {
    return (
        <div className="w-full min-h-screen bg-blue-900 flex items-center justify-center relative overflow-hidden">
            <div className="text-center z-10 flex flex-col items-center gap-8">
                <div>
                    <h1 className="text-9xl font-black text-white italic tracking-tighter uppercase mb-4">
                        Hip Hop
                    </h1>
                    <p className="text-blue-200 text-xl font-medium tracking-wide">
                        Experience the rhythm
                    </p>
                </div>

                <div className="flex gap-4">
                    <LoaderButton onClick={onSwitch} />
                    {onNavigate && (
                        <button
                            onClick={() => onNavigate('inscription')}
                            className="px-8 py-3 rounded-full border border-blue-400 text-blue-100 hover:bg-blue-800 transition-all duration-300 uppercase tracking-widest text-sm font-medium"
                        >
                            Inscription
                        </button>
                    )}
                </div>
            </div>
            {/* Decorative background element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] font-bold text-white/5 pointer-events-none select-none">
                BEAT
            </div>
        </div>
    );
}
