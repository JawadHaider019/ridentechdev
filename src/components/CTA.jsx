// components/CTA.jsx
"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
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

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });

      // Content animation
      tl.from(contentRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });

      // Badge animation
      tl.from(badgeRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.7");

      // Title animation
      tl.from(titleRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: "power4.out"
      }, "-=0.6");

      // Description animation
      tl.from(descriptionRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.5");

      // Button animation
      tl.from(buttonRef.current, {
        y: 20,
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        ease: "back.out(1.4)"
      }, "-=0.4");

    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === sectionRef.current) t.kill(true);
      });
    };
  }, [mounted]);

  if (!mounted) return (
    <section ref={sectionRef} className="relative py-20 md:py-24 overflow-hidden min-h-[400px]" />
  );

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-24 overflow-hidden bg-white"
    >
      {/* Background Container - White theme */}
      <div className="absolute inset-0 flex justify-center items-start pointer-events-none">
        <div
          className="w-full max-w-7xl mx-auto h-full bg-black rounded-2xl md:rounded-3xl border border-gray-100 shadow-sm"
          style={{
            minHeight: '320px',
            maxHeight: '420px',
            width: 'calc(100% - 2rem)',
            margin: '0 auto'
          }}
        />
      </div>


      {/* Content */}
      <div ref={contentRef} className="relative z-10 max-w-6xl mx-auto">
        <div className="px-4 md:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div
            ref={badgeRef}
            className="inline-flex items-center bg-gray-50 text-gray-700 rounded-full px-4 py-2 mb-6 border border-gray-200"
          >
            <Sparkles className="w-4 h-4 mr-2 text-gray-500" />
            <span className="text-xs font-manrope tracking-wider">LIMITED SPOTS</span>
          </div>

          {/* Title */}
          <h2
            ref={titleRef}
            className="font-marcellus text-3xl md:text-4xl lg:text-5xl text-gray-100 mb-4"
          >
            Ready to <span className="text-gray-200 ">Launch?</span>
          </h2>

          {/* Description */}
          <p
            ref={descriptionRef}
            className="font-instrument text-gray-200 max-w-2xl mx-auto mb-8 text-lg"
          >
            Join 100+ founders who launched in 4 weeks. Let&apos;s build something great together.
          </p>

          {/* CTA Button */}
          <div ref={buttonRef} className="flex justify-center">
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-full text-sm font-medium overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-gray-900/20 font-manrope"
            >
              <span className="relative z-10">Book Free Call</span>
              <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
