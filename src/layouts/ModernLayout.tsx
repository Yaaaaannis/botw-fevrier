
// We can reuse the same button style or make a different one. 
// For consistency, let's reuse LoaderButton but maybe we'll need to invert colors if it's on white.
// The LoaderButton is white text, so it might disappear on white background.
// I will create a variation or wrapper.

interface ModernLayoutProps {
    onSwitch: () => void;
    onNavigate?: (page: string) => void;
}

export default function ModernLayout({ onSwitch, onNavigate }: ModernLayoutProps) {
    return (
        <div className="w-full min-h-screen bg-white flex items-center justify-center relative overflow-hidden">
            <div className="text-center z-10 flex flex-col items-center gap-8">
                <div>
                    <h1 className="text-8xl font-thin text-black tracking-[1rem] uppercase mb-4">
                        Modern
                    </h1>
                    <p className="text-gray-500 text-lg font-light tracking-widest">
                        Clean lines & minimalism
                    </p>
                </div>

                <div className="flex gap-4">
                    {/* Dark button for contrast on white */}
                    <button
                        onClick={onSwitch}
                        className="px-8 py-3 rounded-full border border-black text-black hover:bg-black hover:text-white transition-all duration-300 uppercase tracking-widest text-sm font-medium"
                    >
                        Switch Style
                    </button>

                    {onNavigate && (
                        <button
                            onClick={() => onNavigate('inscription')}
                            className="px-8 py-3 rounded-full border border-gray-300 text-gray-500 hover:border-black hover:text-black transition-all duration-300 uppercase tracking-widest text-sm font-medium"
                        >
                            Inscription
                        </button>
                    )}
                </div>
            </div>
            {/* Decorative background element */}
            <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-gray-100 rounded-full blur-3xl -z-0"></div>
        </div>
    );
}
