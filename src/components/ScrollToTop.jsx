import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If there's a hash (like #service-id), handle hash scrolling
    if (hash) {
      // Small delay to ensure the element is rendered
      setTimeout(() => {
        const element = document.getElementById(hash.replace('#', ''));
        if (element) {
          const yOffset = -100; // Offset for fixed navbar (adjust based on your navbar height)
          const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
          window.scrollTo({ 
            top: y, 
            behavior: 'smooth' 
          });
        } else {
          // If element not found, just scroll to top
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant'
          });
        }
      }, 100);
    } else {
      // No hash, scroll to top immediately
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant' // Use 'instant' for no animation, 'smooth' for smooth scrolling
      });
    }
  }, [pathname, hash]); // Re-run when pathname or hash changes

  return null; // This component doesn't render anything
};

export default ScrollToTop;