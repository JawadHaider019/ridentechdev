// components/HeroSection.jsx
"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroSection({ 
  title = "WHAT WE DO",
  subtitle = "Transforming ideas into exceptional digital experiences",
  imageSrc = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
  overlayColor = "bg-white"
}) {
  const [mounted, setMounted] = useState(false);

  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const heroContainerRef = useRef(null);

  const heroImageRefTop = useRef(null);
  const heroImageRefBottom = useRef(null);

  useEffect(() => {
    setMounted(true);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const timeoutId = setTimeout(() => {
      if (!sectionRef.current) return;

      const ctx = gsap.context(() => {
        // Header animations
        if (titleRef.current) {
          gsap.fromTo(
            titleRef.current,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power4.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                once: true,
              },
            }
          );
        }

        if (subtitleRef.current) {
          gsap.fromTo(
            subtitleRef.current,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              delay: 0.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                once: true,
              },
            }
          );
        }

        // Hero overlays animation
        if (
          heroImageRefTop.current &&
          heroImageRefBottom.current &&
          heroContainerRef.current
        ) {
          // Top and bottom overlays fully cover image
          gsap.set(heroImageRefTop.current, { top: 0, height: "100%" });
          gsap.set(heroImageRefBottom.current, { bottom: 0, height: "100%" });

          // Slow reveal: top overlay slides up
          gsap.to(heroImageRefTop.current, {
            top: "-100%", // slides fully up
            ease: "power2.out",
            scrollTrigger: {
              trigger: heroContainerRef.current,
              start: "top bottom",
              end: "bottom top", // longer scroll distance
              scrub: 2,
            },
          });

          // Slow reveal: bottom overlay slides down
          gsap.to(heroImageRefBottom.current, {
            bottom: "-100%", // slides fully down
            ease: "power2.out",
            scrollTrigger: {
              trigger: heroContainerRef.current,
              start: "top bottom",
              end: "bottom top", // longer scroll distance
              scrub: 2,
            },
          });
        }
      }, sectionRef);

      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [mounted]);


  if (!mounted) return null;

  return (
    <section
      ref={sectionRef}
      className="w-full py-16 px-6 md:px-20 overflow-hidden"
    >
      {/* Header */}
      <div className="text-center mb-16">
        <div className="relative mb-6 flex justify-center">
          <h1
            ref={titleRef}
            className="font-manrope text-[13vw] md:text-[13vw] lg:text-[13vw] font-black uppercase text-gray-900 leading-[0.85] tracking-tight"
          >
            {title}
          </h1>
        </div>
        <p
          ref={subtitleRef}
          className="font-instrument text-xl text-gray-600 max-w-2xl mx-auto"
        >
          {subtitle}
        </p>
      </div>

        {/* Hero Image */}
        <div
          ref={heroContainerRef}
          className="w-full max-w-7xl h-[85vh]  relative overflow-hidden mx-auto flex justify-center items-center"
        >
        {/* Full image */}
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover w-full h-full mx-auto"
          priority
        />

  {/* Top overlay */}
          <div
            ref={heroImageRefTop}
            className="absolute left-0 w-full bg-white"
          ></div>


        {/* Bottom overlay */}
          <div
            ref={heroImageRefBottom}
            className="absolute left-0 w-full bg-white"
          ></div>
      </div>
    </section>
  );
}