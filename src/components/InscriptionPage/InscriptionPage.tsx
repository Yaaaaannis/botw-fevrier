import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { inscriptionTheme } from '../../data/inscriptionTheme';
import type { GridItem } from '../../data/inscriptionTheme';
import hhSwitch from '../../assets/img/hip-hop/switch.svg';
import { useTheme } from '../../context/ThemeContext';
import { WaveBackground } from '../WaveBackground';
import { UnicornBackground } from '../UnicornBackground';
import { InscriptionModal } from './InscriptionModal';

export default function InscriptionPage() {
    const { theme, switchTheme } = useTheme();
    const navigate = useNavigate();
    const data = inscriptionTheme[theme];
    const [selectedItem, setSelectedItem] = useState<GridItem | null>(null);

    return (

        <div
            className={`w-full min-h-screen ${data.backgroundClass} relative overflow-hidden flex flex-col bg-cover bg-center `}
            style={{
                backgroundImage: theme === 'hiphop' ? 'none' : (data.backgroundImage ? `url(${data.backgroundImage})` : undefined),
                backgroundSize: theme === 'hiphop' ? '120%' : 'cover'
            }}
        >
            {theme === 'hiphop' ? (
                <UnicornBackground
                    scale={data.backgroundScale}
                    zoom={data.backgroundZoom}
                />
            ) : (
                data.backgroundImage && <WaveBackground imagePath={data.backgroundImage} />
            )}

            {/* Header */}
            <div className={`w-full absolute top-0 left-0 h-full pointer-events-none z-20 ${data.textColor}`}>
                {/* Back Button / Inscription Text */}
                <div
                    className="absolute text-[16px] leading-[21px] tracking-tight hover:opacity-70 cursor-pointer pointer-events-auto px-4"
                    style={{
                        left: '20px',
                        top: 'calc(50% - 10.5px + 0.5px)',
                        width: '83px',
                        height: '21px',
                        opacity: theme === 'modern' ? 0.2 : 1,
                        fontFamily: theme === 'hiphop' ? 'Lalezar, sans-serif' : 'serif'
                    }}
                    onClick={() => navigate('/')}
                >
                    {theme === 'modern' ? "Inscription" : "Inscription"}
                </div>

                {/* Title (Text or Image) */}
                {(theme === 'modern' || data.titleImage) && (
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
                )}

                {/* Videos Text */}
                <div
                    className="absolute text-[16px] leading-[21px] tracking-tight  hover:opacity-70 cursor-pointer pointer-events-auto "
                    style={{
                        right: '19px',
                        top: 'calc(50% - 10.5px + 0.5px)',
                        width: '51px',
                        height: '21px',
                        fontFamily: theme === 'hiphop' ? 'Lalezar, sans-serif' : 'serif'
                    }}
                >
                    {theme === 'hiphop' ? "Videos" : "Videos"}
                </div>
            </div>

            {/* Hip Hop Decorative Background Text */}


            {/* Main Content */}
            <div className="flex-1 w-full flex items-center justify-center p-8 z-10">
                {data.gridItems ? (
                    // Grid Layout (Modern & HipHop)
                    <div className="grid grid-cols-4 gap-[20px] max-w-[924px] mx-auto">
                        {data.gridItems.map((item) => (
                            <div
                                key={item.id}
                                className="relative w-[216px] h-[216px] group overflow-hidden bg-gray-200 cursor-pointer"
                                onClick={() => setSelectedItem(item)}
                            >
                                <img
                                    src={item.image}
                                    alt={`Class ${item.date}`}
                                    className={`w-full h-full object-cover transition-transform scale-120 duration-700 ease-out group-hover:scale-125 ${theme === 'modern' ? 'filter grayscale contrast-125' : ''}`}
                                />
                                <div className={`absolute top-4 left-4 text-white text-[20px] ${theme === 'hiphop' ? 'font-[Lalezar] leading-[100%] tracking-[-0.02em]' : 'font-serif leading-[27px]'}`}>
                                    {item.date}
                                </div>
                                <div className={`absolute bottom-4 right-4 text-white text-[20px] ${theme === 'hiphop' ? 'font-[Lalezar] leading-[100%] tracking-[-0.02em]' : 'font-serif leading-[27px]'}`}>
                                    {item.time}
                                </div>
                                {/* Optional overlay on hover */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                            </div>
                        ))}
                    </div>
                ) : null}
            </div>

            {/* Switch Vibe */}
            <button
                onClick={switchTheme}
                className={`absolute z-30 text-[16px] z-[100] font-serif tracking-tight cursor-pointer transition-opacity group whitespace-nowrap ${theme === 'hiphop'
                    ? 'text-white' // Blend mode moved to inner span
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
                            className="absolute top-0 left-0 h-full max-w-none scale-x-280 scale-y-110    "
                            style={{ width: '150px', height: '100%', objectPosition: 'left', }}
                        />
                    </div>
                )}
            </button>

            {/* Modal */}
            {selectedItem && (
                <InscriptionModal
                    isOpen={!!selectedItem}
                    onClose={() => setSelectedItem(null)}
                    item={selectedItem}
                    themeData={data}
                    theme={theme}
                />
            )}
        </div >
    );
}
