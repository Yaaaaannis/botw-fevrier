

interface LoaderButtonProps {
    onClick: () => void;
}

export default function LoaderButton({ onClick }: LoaderButtonProps) {
    return (
        <button
            onClick={(e) => {
                e.stopPropagation(); // Prevent duplicate clicks if parent also handles it
                onClick();
            }}
            className="pointer-events-auto px-8 py-3 rounded-full border border-white/30 text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 uppercase tracking-widest text-sm font-medium hover:scale-105 active:scale-95"
        >
            Open
        </button>
    );
}
