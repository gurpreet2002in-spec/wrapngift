import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname, hash, key } = useLocation();

    useEffect(() => {
        // Handle immediate scroll to top on pathname change
        if (!hash) {
            window.scrollTo(0, 0);
        } else {
            // Handle hash scrolling
            const id = hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [pathname, hash, key]); // Include key to trigger on same-page link clicks

    return null;
};

export default ScrollToTop;
