import { useNavigate, useLocation } from 'react-router-dom';
import hhSwitch from '../../assets/img/hip-hop/switch.svg';
import { useTheme } from '../../context/ThemeContext';

export function NavigationOverlay() {
    const { theme, switchTheme } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();

    const isInscriptionPage = location.pathname === '/';
    const isVideoPage = location.pathname === '/video';

    return (
        <>
            {/* Header Buttons */}
            <div className={`w-full absolute top-0 left-0 h-full pointer-events-none z-50`}>
                {/* Back Button / Inscription Text */}
                <div
                    className="absolute text-[16px] leading-[21px] tracking-tight hover:opacity-70 cursor-pointer pointer-events-auto px-4"
                    style={{
                        left: '20px',
                        top: 'calc(50% - 10.5px + 0.5px)',
                        width: '83px',
                        height: '21px',
                        opacity: theme === 'modern' ? 0.2 : 1,
                        color: theme === 'modern' ? (isVideoPage ? '#000' : '#000') : '#fff', // Adjust color based on theme/page if needed
                        fontFamily: theme === 'hiphop' ? 'Lalezar, sans-serif' : 'serif'
                    }}
                    onClick={() => navigate('/')}
                >
                    Inscription
                </div>

                {/* Videos Text */}
                <div
                    className="absolute text-[16px] leading-[21px] tracking-tight hover:opacity-70 cursor-pointer pointer-events-auto"
                    style={{
                        right: '19px',
                        top: 'calc(50% - 10.5px + 0.5px)',
                        width: '51px',
                        height: '21px',
                        color: theme === 'modern' ? (isVideoPage ? '#000' : '#000') : '#fff',
                        fontFamily: theme === 'hiphop' ? 'Lalezar, sans-serif' : 'serif'
                    }}
                    onClick={() => navigate('/video')}
                >
                    Videos
                </div>

                {/* Switch Vibe */}
                <button
                    onClick={switchTheme}
                    className={`absolute text-[16px] font-serif tracking-tight cursor-pointer transition-opacity group whitespace-nowrap pointer-events-auto ${theme === 'hiphop'
                        ? 'text-white'
                        : 'text-white mix-blend-difference hover:opacity-70'
                        }`}
                    style={{
                        left: 'calc(50% - 56px)',
                        top: 'calc(50% + 374.5px - 10.5px)',
                        width: '112px',
                        height: '21px',
                        textAlign: 'right',
                        fontSize: '16px',
                        letterSpacing: '-0.02em',
                        fontFamily: theme === 'hiphop' ? '"hip-hop", sans-serif' : '"Hedvig Letters Serif", serif'
                    }}
                >
                    <span className={`relative z-10 ${theme === 'hiphop' ? 'mix-blend-difference' : ''}`}>Switch the vibe</span>
                    {theme === 'hiphop' && (
                        <div className="absolute top-0 left-0 h-full w-0 overflow-hidden group-hover:w-full transition-[width] duration-500 ease-out z-[1]">
                            <img
                                src={hhSwitch}
                                alt="Switch Vibe"
                                className="absolute top-0 left-0 h-full max-w-none scale-x-280 scale-y-110"
                                style={{ width: '150px', height: '100%', objectPosition: 'left' }}
                            />
                        </div>
                    )}
                </button>
            </div>
        </>
    );
}
