import { useEffect, useState } from 'react';

export default function useSize() {
    const [windowDimension, setWindowDimension] = useState(null);

    useEffect(() => {
        setWindowDimension(window.innerWidth);
    }, []);

    useEffect(() => {
        function handleResize() {
            setWindowDimension(window.innerWidth);
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return {
        isMobile: windowDimension < 768,
        isTablet: windowDimension >= 768 && windowDimension <= 886,
        isDesktop: windowDimension >= 1024,
    };
}
