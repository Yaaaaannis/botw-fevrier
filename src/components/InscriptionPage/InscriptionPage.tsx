import { useState } from 'react';
import { inscriptionTheme } from '../../data/inscriptionTheme';
import type { GridItem } from '../../data/inscriptionTheme';
import { useTheme } from '../../context/ThemeContext';
import { WaveBackground } from '../WaveBackground';
import { UnicornBackground } from '../UnicornBackground';
import { InscriptionModal } from './InscriptionModal';
import { NavigationOverlay } from '../Shared/NavigationOverlay';
import { PageHeader } from '../Shared/PageHeader';

export default function InscriptionPage() {
    const { theme } = useTheme();
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
                <NavigationOverlay />

                {/* Title (Text or Image) */}
                <PageHeader />
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
