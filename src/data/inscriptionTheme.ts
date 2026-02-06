
import modern1 from '../assets/img/modern/1.png';
import modern2 from '../assets/img/modern/2.png';
import modern3 from '../assets/img/modern/3.png';
import modern4 from '../assets/img/modern/4.png';
import modern5 from '../assets/img/modern/5.png';
import modern6 from '../assets/img/modern/6.png';
import modern7 from '../assets/img/modern/7.png';
import modern8 from '../assets/img/modern/8.png';
import modern9 from '../assets/img/modern/9.png';
import modern10 from '../assets/img/modern/10.png';
import modern11 from '../assets/img/modern/11.png';
import modern12 from '../assets/img/modern/12.png';

export interface GridItem {
    id: number;
    image: string;
    date: string;
    time: string;
}

// Hip Hop Assets
import hh1 from '../assets/img/hip-hop/1.png';
import hh2 from '../assets/img/hip-hop/2.png';
import hh3 from '../assets/img/hip-hop/3.png';
import hh4 from '../assets/img/hip-hop/4.png';
import hh5 from '../assets/img/hip-hop/5.png';
import hh6 from '../assets/img/hip-hop/6.png';
// hh7 is missing from the file list
import hh8 from '../assets/img/hip-hop/8.png';
import hh9 from '../assets/img/hip-hop/9.png';
import hh10 from '../assets/img/hip-hop/10.png';
import hhBg from '../assets/img/hip-hop/bg.png';
import hhVector from '../assets/img/hip-hop/vector.svg';

export interface InscriptionThemeData {
    backgroundClass: string;
    backgroundImage?: string;
    backgroundScale?: number; // Resolution scale (0-1)
    backgroundZoom?: number; // CSS scale (visual zoom)
    titleImage?: string; // Added optional title image
    textColor: string;
    accentColor: string;
    title: string;
    description: string;
    buttonText: string;
    decorativeText: string;
    gridItems?: GridItem[];
    // Modal Data
    modalSubtitle: string;
    modalDescription: string;
    modalLevelInfo: string;
    duration: string;
    reservationLabel: string;
}

export const inscriptionTheme: Record<'hiphop' | 'modern', InscriptionThemeData> = {
    hiphop: {
        backgroundClass: "bg-[#1F2021]",
        backgroundImage: hhBg,
        backgroundScale: 0.5, // Lower resolution for performance
        backgroundZoom: 1.2, // Visual zoom
        titleImage: hhVector, // Replaces text title
        textColor: "text-white",
        accentColor: "border-white/30 text-white bg-white/10 hover:bg-white/20",
        title: "Hip Hop",
        description: "Become part of the movement. Sign up for workshops and battles.",
        buttonText: "Register Now",
        decorativeText: "SIGN UP",
        gridItems: [
            { id: 1, image: hh1, date: "02/03", time: "18:00" },
            { id: 2, image: hh2, date: "05/03", time: "14:00" },
            { id: 3, image: hh3, date: "12/03", time: "18:00" },
            { id: 4, image: hh4, date: "18/03", time: "21:00" },
            { id: 5, image: hh5, date: "02/03", time: "18:00" },
            { id: 6, image: hh6, date: "05/03", time: "14:00" },
            { id: 7, image: hh8, date: "12/03", time: "18:00" },
            { id: 8, image: hh9, date: "18/03", time: "21:00" },
            { id: 9, image: hh10, date: "02/03", time: "18:00" },
            { id: 10, image: hh1, date: "05/03", time: "14:00" },
            { id: 11, image: hh2, date: "12/03", time: "18:00" },
            { id: 12, image: hh3, date: "18/03", time: "21:00" },
        ],
        modalSubtitle: "Open to adults of all levels.",
        modalDescription: "Move at your own rhythm in a guided hip hop session. This class focuses on body awareness, fluidity, and musicality.",
        modalLevelInfo: "Beginner to intermediate\nNo previous dance experience required.",
        duration: "75 minutes",
        reservationLabel: "Reservation"
    },
    modern: {
        backgroundClass: "bg-[#FFF5EE]", // Updated to match Figma #FFF5EE
        textColor: "text-neutral-800",
        accentColor: "border-neutral-800 text-neutral-800 hover:bg-neutral-800 hover:text-white",
        title: "Studio Pulsation",
        description: "Begin your journey. Enroll in contemporary dance classes.",
        buttonText: "Enroll",
        decorativeText: "JOIN US",
        gridItems: [
            { id: 1, image: modern1, date: "02/03", time: "18:00" },
            { id: 2, image: modern2, date: "05/03", time: "14:00" },
            { id: 3, image: modern3, date: "12/03", time: "18:00" },
            { id: 4, image: modern4, date: "18/03", time: "21:00" },
            { id: 5, image: modern5, date: "02/03", time: "18:00" },
            { id: 6, image: modern6, date: "05/03", time: "14:00" },
            { id: 7, image: modern7, date: "12/03", time: "18:00" },
            { id: 8, image: modern8, date: "18/03", time: "21:00" },
            { id: 9, image: modern9, date: "02/03", time: "18:00" },
            { id: 10, image: modern10, date: "05/03", time: "14:00" },
            { id: 11, image: modern11, date: "12/03", time: "18:00" },
            { id: 12, image: modern12, date: "18/03", time: "21:00" },
        ],
        modalSubtitle: "Open to adults of all levels.",
        modalDescription: "Move at your own rhythm in a guided contemporary dance session. This class focuses on body awareness, fluidity, and musicality.",
        modalLevelInfo: "Beginner to intermediate\nNo previous dance experience required.",
        duration: "75 minutes",
        reservationLabel: "Reservation"
    }
};
