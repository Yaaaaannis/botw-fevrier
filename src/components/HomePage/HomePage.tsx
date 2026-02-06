import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import HipHopLayout from '../../layouts/HipHopLayout';
import ModernLayout from '../../layouts/ModernLayout';

export default function HomePage() {
    const { theme, switchTheme } = useTheme();
    const navigate = useNavigate();

    return theme === 'hiphop'
        ? <HipHopLayout onSwitch={switchTheme} onNavigate={(path) => navigate(path)} />
        : <ModernLayout onSwitch={switchTheme} onNavigate={(path) => navigate(path)} />;
}
