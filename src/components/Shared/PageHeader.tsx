import { inscriptionTheme } from '../../data/inscriptionTheme';
import { useTheme } from '../../context/ThemeContext';

export function PageHeader() {
    const { theme } = useTheme();
    const data = inscriptionTheme[theme];

    if (theme !== 'modern' && !data.titleImage) {
        return null;
    }

    return (
        <div className={`w-full absolute top-0 left-0 h-full pointer-events-none z-20 ${data.textColor}`}>
            <div
                className="absolute font-serif text-[32px] leading-[43px] tracking-tight text-center pointer-events-auto"
                style={{
                    left: theme === 'modern' ? 'calc(50% - 117px + 0.5px)' : 'calc(50% - 133px)',
                    top: theme === 'modern' ? '20px' : '20px', // Lower for Hip Hop to overlap images
                    width: theme === 'modern' ? '234px' : '266px',
                    height: theme === 'modern' ? '43px' : '60px',
                    zIndex: 30 // Ensure it's on top of everything
                }}
            >
                {data.titleImage ? (
                    <img src={data.titleImage} alt={data.title} className="w-full h-full object-contain" />
                ) : (
                    data.title
                )}
            </div>
        </div>
    );
}
