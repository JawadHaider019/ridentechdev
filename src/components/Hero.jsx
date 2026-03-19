import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";

const Hero = () => {
  const heroRef = useRef(null);
  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const headingLinesRef = useRef([]);
  const descriptionRef = useRef(null);
  const buttonsRef = useRef(null);
  const button1Ref = useRef(null);
  const button2Ref = useRef(null);
  const imageRef = useRef(null);
  const imageLoadedRef = useRef(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Preload image
  useEffect(() => {
    const img = new Image();
    img.src = '/hero.jpg';
    img.onload = () => {
      imageLoadedRef.current = true;
      setImageLoaded(true);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states immediately with zero opacity
      gsap.set(heroRef.current, { opacity: 0 });
      gsap.set(badgeRef.current, { y: -30, opacity: 0 });
      
      const validHeadingLines = headingLinesRef.current.filter(Boolean);
      gsap.set(validHeadingLines, { y: 40, opacity: 0 });
      
      gsap.set(descriptionRef.current, { y: 30, opacity: 0 });
      gsap.set(buttonsRef.current, { opacity: 0 });
      gsap.set(button1Ref.current, { scale: 0.8, opacity: 0 });
      gsap.set(button2Ref.current, { scale: 0.8, opacity: 0 });
      
      // Set image with initial states but don't wait for load to start animation
      gsap.set(imageRef.current, { 
        opacity: 0, 
        scale: 0.9,
        filter: 'blur(10px)'
      });

      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out"
        }
      });

      // Faster initial fade in
      tl.to(heroRef.current, { 
        opacity: 1, 
        duration: 0.3 
      });

      // Animate badge immediately
      tl.to(badgeRef.current, { 
        y: 0, 
        opacity: 1, 
        duration: 0.6 
      }, "-=0.2");

      // Animate heading lines
      if (validHeadingLines.length > 0) {
        tl.to(validHeadingLines, {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1
        }, "-=0.3");
      }

      // Animate description
      tl.to(descriptionRef.current, { 
        y: 0, 
        opacity: 1, 
        duration: 0.6 
      }, "-=0.4");

      // Show buttons container
      tl.to(buttonsRef.current, { 
        opacity: 1, 
        duration: 0.3 
      }, "-=0.3");

      // Animate buttons
      tl.to([button1Ref.current, button2Ref.current], { 
        scale: 1, 
        opacity: 1, 
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.2)"
      }, "-=0.2");

      // Image animation - start earlier and be more dramatic
      tl.to(imageRef.current, {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.6");

    }, heroRef);

    return () => {
      ctx.revert();
    };
  }, []); // Remove imageLoaded dependency to start animation immediately

  return (
    <section ref={heroRef} className="relative bg-white h-[95vh] overflow-hidden">
     
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-full">
        {/* Desktop: side-by-side, Mobile: stacked */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-0 lg:gap-12 items-center h-full">

          {/* Left Content */}
          <div className="w-full space-y-4 md:space-y-6 py-12 text-center lg:text-left">
            {/* Badge */}
            <div ref={badgeRef} className="inline-flex items-center bg-gray-100 rounded-full px-3 md:px-4 lg:px-4 py-1.5 md:py-2 lg:py-2 mx-auto lg:mx-0">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 lg:w-2 lg:h-2 bg-gray-900 rounded-full mr-1.5 md:mr-2 lg:mr-2"></span>
              <span className="text-xs md:text-sm lg:text-sm font-manrope text-gray-700 tracking-wide">WELCOME TO RIDEN TECH</span>
            </div>

            {/* Main Heading */}
            <h1 className="font-manrope text-3xl font-bold md:text-4xl lg:text-6xl text-gray-900 leading-tight">
              <span ref={el => headingLinesRef.current[0] = el} className="block">Transform Your</span>
              <span ref={el => headingLinesRef.current[1] = el} className="block text-gray-700">Business with</span>
              <span ref={el => headingLinesRef.current[2] = el} className="block relative">
                Innovative Software
              </span>
            </h1>

            {/* Description */}
            <p ref={descriptionRef} className="font-instrument text-base md:text-lg lg:text-lg text-gray-600 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              We craft cutting-edge digital solutions that drive growth, enhance efficiency, and transform complex challenges into seamless digital experiences.
            </p>

            {/* CTA Buttons */}
            <div ref={buttonsRef} className="flex flex-wrap gap-3 md:gap-4 lg:gap-4 justify-center lg:justify-start">
              <Link
                ref={button1Ref}
                to="/contact"
                className="group inline-flex items-center space-x-2 bg-gray-900 text-white px-5 md:px-8 lg:px-8 py-2.5 md:py-4 lg:py-4 rounded-lg text-xs md:text-sm lg:text-sm font-medium hover:bg-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-gray-900/20 font-manrope"
              >
                <span>Get Started</span>
                <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 lg:w-4 lg:h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                ref={button2Ref}
                to="/services"
                className="group inline-flex items-center space-x-2 bg-white text-gray-900 px-5 md:px-8 lg:px-8 py-2.5 md:py-4 lg:py-4 rounded-lg text-xs md:text-sm lg:text-sm font-medium border border-gray-200 hover:border-gray-900 transition-all duration-300 hover:shadow-lg font-manrope"
              >
                <span>View Services</span>
              </Link>
            </div>
          </div>

          {/* Right Content - Image Container */}
          <div className="w-full flex justify-center items-center">
            <div
              className="relative w-full max-w-[280px] sm:max-w-[400px] lg:max-w-[550px] aspect-[1.1/1]"
            >
              {/* Loading placeholder */}
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
              )}
              
              {/* Main Image Container with Clip Path */}
              <div
                ref={imageRef}
                className="absolute inset-0 w-full h-full transition-opacity duration-300"
                style={{
                  clipPath: 'url(#heroClipPath)',
                  WebkitClipPath: 'url(#heroClipPath)',
                  opacity: imageLoaded ? 1 : 0
                }}
              >
                {/* IT-Related Image */}
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url('${imageLoaded ? '/hero.jpg' : ''}')`
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive SVG ClipPath Definition */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <clipPath id="heroClipPath" clipPathUnits="objectBoundingBox">
            <path d="M 0.037 0.082 L 0.37 0.082 A 0.037 0.041 0 0 0 0.407 0.041 L 0.407 0.041 A 0.037 0.041 0 0 1 0.444 0 L 0.963 0 A 0.037 0.041 0 0 1 1 0.041 L 1 0.959 A 0.037 0.041 0 0 1 0.963 1 L 0.037 1 A 0.037 0.041 0 0 1 0 0.959 L 0 0.122 A 0.037 0.041 0 0 1 0.037 0.082 Z" />
          </clipPath>
        </defs>
      </svg>
    </section>
  );
};

export default Hero;