import React, { useEffect } from 'react';
import type { GridItem, InscriptionThemeData } from '../../data/inscriptionTheme';
import { ReservationForm } from './ReservationForm';

interface InscriptionModalProps {
    isOpen: boolean;
    onClose: () => void;
    item: GridItem;
    themeData: InscriptionThemeData;
    theme: 'hiphop' | 'modern';
}

export const InscriptionModal: React.FC<InscriptionModalProps> = ({ isOpen, onClose, item, themeData, theme }) => {
    const [isReservationMode, setIsReservationMode] = React.useState(false);

    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            setIsReservationMode(false);
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    // Random YouTube video for now
    const videoUrl = "https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=0&mute=0";

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center bg-black/60 z-1000 transition-all duration-500 ${isReservationMode ? 'justify-start' : 'justify-center'}`}
            onClick={onClose}
        >
            {/* Modal Container */}
            <div
                className="relative w-[815px] h-full bg-cover bg-center overflow-hidden shadow-2xl transition-all duration-500"
                style={{ backgroundImage: `url(${item.image})` }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20" />

                {/* Content Container */}
                <div
                    className={`absolute inset-0 p-8 text-white ${theme === 'hiphop' ? 'font-[Lalezar]' : "font-['Hedvig_Letters_Serif']"
                        }`}
                >

                    {/* Title */}
                    <div className="absolute top-[20px] left-0 w-full text-center flex justify-center">
                        {themeData.titleImage ? (
                            <img
                                src={themeData.titleImage}
                                alt={themeData.title}
                                className="h-[60px] object-contain drop-shadow-md"
                            />
                        ) : (
                            <h2
                                className={`text-[32px] leading-[43px] tracking-[-0.02em] Drop-shadow-md ${theme === 'hiphop' ? 'font-[Lalezar]' : "font-['Hedvig_Letters_Serif']"
                                    } ${themeData.title === "Studio Pulsation" ? "text-black" : "text-white"
                                    }`}
                            >
                                {themeData.title === "Hip Hop" ? "Hip Hop" : "Studio Pulsation"}
                            </h2>
                        )}
                    </div>

                    {/* Video Player - Centered */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[367px] h-[206px] bg-black shadow-lg">
                        <iframe
                            width="100%"
                            height="100%"
                            src={videoUrl}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>

                    {/* Bottom Left Info */}
                    <div className="absolute left-0 pl-[20px] bottom-[140px] text-left">
                        <h3 className="text-[32px] leading-[43px] tracking-[-0.02em] mb-2">{themeData.modalSubtitle}</h3>
                        <p className={`text-[12px] leading-[16px] tracking-[-0.02em] max-w-[398px] ${theme === 'hiphop' ? "font-['Gruppo']" : ""}`}>
                            {themeData.modalDescription}
                        </p>
                    </div>

                    {/* Level Info - Top Right */}
                    <div className={`absolute right-0 pr-[14px] text-right ${theme === 'hiphop' ? 'top-[130px]' : 'top-[100px]'}`}>
                        <p
                            className={`text-[24px] tracking-[-0.02em] whitespace-pre-line ${theme === 'hiphop'
                                ? 'font-[Lalezar] leading-[100%] w-[265px] ml-auto'
                                : 'leading-[32px]'
                                }`}
                        >
                            {themeData.modalLevelInfo}
                        </p>
                    </div>

                    {/* Footer Row: Date/Time | Reservation lines | Duration */}
                    <div className="absolute bottom-0 pb-[25px] left-0 px-[20px] right-0  flex items-end justify-between border-t-0 border-white/0 pt-4">
                        {/* Date & Time */}
                        <div className="text-[24px] leading-[32px] tracking-[-0.02em]">
                            {item.date} - {item.time}
                        </div>

                        {/* Center Reservation with Lines */}
                        <div
                            className="flex items-center gap-4 text-[24px] leading-[32px] tracking-[-0.02em] cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => setIsReservationMode(true)}
                        >
                            {theme !== 'hiphop' && <div className="w-[48px] h-[1px] bg-white rotate-90 transform origin-center translate-y-2"></div>}
                            <span className="px-[12px]">{themeData.reservationLabel}</span>
                            {theme !== 'hiphop' && <div className="w-[48px] h-[1px] bg-white rotate-90 transform origin-center translate-y-2"></div>}
                        </div>

                        {/* Duration */}
                        <div className="text-[24px] pr-[12px] leading-[32px] tracking-[-0.02em]">
                            {themeData.duration}
                        </div>
                    </div>
                </div>
            </div>

            {/* Reservation Form Modal */}
            <div
                className={`absolute left-[900px] transition-all duration-500 transform ${isReservationMode ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10 pointer-events-none'}`}
                style={{ top: 'calc(50% - 253px/2 + 0.5px)' }}
                onClick={(e) => e.stopPropagation()}
            >
                <ReservationForm />
            </div>
        </div>
    );
};
