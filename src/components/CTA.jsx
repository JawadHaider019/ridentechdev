import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Add useNavigate
import { ArrowRight, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate(); // Add navigate
  const pathname = location.pathname;

  const [mounted, setMounted] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle button click for same-page navigation
  const handleContactClick = (e) => {
    e.preventDefault();
    
    if (pathname === '/contact') {
      // If already on contact page, just scroll to top
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    } else {
      
      navigate('/contact');
    }
  };

  useEffect(() => {
    if (!mounted) return;

    setHasAnimated(false);

    const elements = [badgeRef.current, titleRef.current, descriptionRef.current, buttonRef.current].filter(Boolean);

    gsap.set(elements, { 
      opacity: 0, 
      y: 30,
      clearProps: "transform" 
    });

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
              setHasAnimated(true);
              
              // Staggered reveal with faster animation
              gsap.to(elements, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out",
                clearProps: "transform"
              });
              
              observer.disconnect();
            }
          });
        },
        { threshold: 0.15 }
      );

      if (sectionRef.current) observer.observe(sectionRef.current);

      return () => {
        observer.disconnect();
      };
    }, 100);


    return () => {
      clearTimeout(timer);
      gsap.killTweensOf(elements);
    };
  }, [mounted, pathname, hasAnimated]);

  if (!mounted) return <section ref={sectionRef} className="relative py-20 md:py-24 overflow-hidden" />;

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-24 overflow-hidden"
    >
      
      <div
        className="absolute inset-0 bg-fixed bg-cover bg-center"
        style={{
          backgroundImage: "url('/cta.png')",
        }}
      />

      <div
        className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-black/90"
        style={{
          opacity: 0.85,
        }}
      />

      {/* Content */}
      <div ref={contentRef} className="relative z-10 max-w-6xl mx-auto">
        <div className="px-4 md:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div
            ref={badgeRef}
            className="inline-flex items-center bg-white/10 backdrop-blur-sm text-white rounded-full px-4 py-2 mb-6 border border-white/20"
          >
            <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
            <span className="text-xs font-manrope tracking-wider uppercase">Work with us</span>
          </div>

          {/* Title */}
          <h2
            ref={titleRef}
            className="font-manrope font-bold text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white mb-4 leading-tight"
          >
            Let's Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Together</span>
          </h2>

          {/* Description */}
          <p
            ref={descriptionRef}
            className="font-instrument text-gray-300 max-w-2xl mx-auto mb-8 text-lg md:text-xl"
          >
            Have a project idea or need expert guidance?
            Our team is ready to help you bring your vision to life.
          </p>

          {/* CTA Button - Updated with onClick handler */}
          <div ref={buttonRef} className="flex justify-center">
            <button
              onClick={handleContactClick}
              className="group relative inline-flex items-center gap-3 bg-white text-gray-900 px-8 py-4 rounded-full text-sm font-medium overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-white/30 font-manrope cursor-pointer"
            >
              <span className="relative z-10">Contact Us</span>
              <ArrowRight className="relative z-10 w-4 h-4 transition-all duration-300 group-hover:translate-x-1" />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </button>
          </div>
        </div>
      </div>
    </section>

  );
}