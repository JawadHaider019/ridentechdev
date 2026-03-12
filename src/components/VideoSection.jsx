"use client";
import { useState, useEffect, useRef } from "react";
import { Zap } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 50, suffix: "+", label: "Team Members" },
  { value: 200, suffix: "+", label: "Projects Done" },
  { value: 98, suffix: "%", label: "Happy Clients" },
];

const VideoSection = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [clipPath, setClipPath] = useState("");
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const [displayValues, setDisplayValues] = useState(STATS.map(() => 0));

  const containerRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const headingRef = useRef(null);
  const labelRef = useRef(null);
  const videoRef = useRef(null);
  const statsContainerRef = useRef(null);
  const statsRef = useRef([]);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth * 0.9;
      const h = 510;
      setDims({ w, h });
      setClipPath(
        `path('M 20,60 L 150,60 L 210,0 L ${w - 20},0 A 20,20 0,0,1 ${w},20 L ${w},${h - 20} A 20,20 0,0,1 ${w - 20},${h} L 20,${h} A 20,20 0,0,1 0,${h - 20} L 0,80 A 20,20 0,0,1 20,60 Z')`
      );
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Badge
      gsap.fromTo(badgeRef.current,
        { opacity: 0, y: -20, scale: 0.9 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "back.out(1.7)",
          scrollTrigger: { trigger: badgeRef.current, start: "top 85%" },
        }
      );

      // Titles staggered
      gsap.fromTo([titleRef.current, subtitleRef.current],
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.15,
          scrollTrigger: { trigger: titleRef.current, start: "top 85%" },
        }
      );

      // Paragraph
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.3,
          scrollTrigger: { trigger: headingRef.current, start: "top 88%" },
        }
      );

      // Label
      gsap.fromTo(labelRef.current,
        { opacity: 0, x: -20 },
        {
          opacity: 1, x: 0, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: labelRef.current, start: "top 88%" },
        }
      );

      // Video container
      gsap.fromTo(videoRef.current,
        { opacity: 0, y: 50, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: videoRef.current, start: "top 85%" },
        }
      );

      // Stats cards stagger
      gsap.fromTo(statsRef.current,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out", stagger: 0.15,
          scrollTrigger: { trigger: statsContainerRef.current, start: "top 85%" },
        }
      );

      // Counter animation
      STATS.forEach((stat, i) => {
        ScrollTrigger.create({
          trigger: statsContainerRef.current,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to({ val: 0 }, {
              val: stat.value,
              duration: 2,
              ease: "power2.out",
              delay: i * 0.15,
              onUpdate: function () {
                setDisplayValues(prev => {
                  const updated = [...prev];
                  updated[i] = Math.round(this.targets()[0].val);
                  return updated;
                });
              },
            });
          },
        });
      });

    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-16 px-5 bg-white">
      <link
        href="https://fonts.googleapis.com/css2?family=Marcellus&family=Instrument+Serif:ital@0;1&family=Manrope:wght@400;500;600&family=Barlow:wght@300;400;500&display=swap"
        rel="stylesheet"
      />

      <div className="relative w-[90vw]">

        {/* Top Section */}
        <div className="text-center mb-12">

          {/* Badge */}
          <div
            ref={badgeRef}
            className="inline-flex items-center bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-full px-5 py-2.5 mb-6 shadow-lg opacity-0"
          >
            <Zap className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium tracking-wide" style={{ fontFamily: "'Manrope', sans-serif" }}>
              ABOUT RIDEN TECH
            </span>
          </div>

          {/* Titles */}
          <h2
            ref={titleRef}
            className="text-5xl md:text-6xl text-gray-900 mb-2 opacity-0"
            style={{ fontFamily: "'Marcellus', serif" }}
          >
            We're on a Mission to
          </h2>
          <h2
            ref={subtitleRef}
            className="text-5xl md:text-6xl text-gray-900 mb-6 opacity-0"
            style={{ fontFamily: "'Marcellus', serif" }}
          >
            Transform Digital
          </h2>

          {/* Subheading */}
          <p
            ref={headingRef}
            className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed opacity-0"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            We're not just developers — we're partners in your success, bringing together
            strategy, design, and technology to create exceptional digital experiences.
          </p>
        </div>

        {/* Label */}
        <div ref={labelRef} className="flex items-center gap-2.5 mb-3.5 pl-0.5 opacity-0">
          <div className="w-2 h-2 rounded-full bg-[#e07b2a] shrink-0" />
          <span
            className="text-[11px] font-medium tracking-[0.18em] text-[#1a1a1a] uppercase"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            Watch Our Video
          </span>
        </div>

        {/* Video Container */}
        <div
          ref={(el) => { containerRef.current = el; videoRef.current = el; }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative overflow-hidden cursor-pointer opacity-0"
          style={{
            width: dims.w || "90vw",
            height: dims.h || 510,
            clipPath: clipPath,
            boxShadow: isHovered
              ? "0 20px 60px rgba(0,0,0,0.22)"
              : "0 8px 30px rgba(0,0,0,0.12)",
            transition: "box-shadow 0.4s ease",
          }}
        >
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(160deg, #87CEEB 0%, #b0d4e8 40%, #c9a87c 70%, #8b6f47 100%)" }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to right, rgba(10,8,5,0.65) 0%, transparent 22%, transparent 78%, rgba(10,8,5,0.55) 100%)" }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-[40%]"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.3), transparent)" }}
          />

          {/* Play Button */}
          <div
            className="absolute top-1/2 left-1/2 z-10"
            style={{
              transform: `translate(-50%, -50%) scale(${isHovered ? 1.1 : 1})`,
              transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            <div
              className="w-[62px] h-[62px] rounded-full bg-[#e07b2a] flex items-center justify-center"
              style={{ boxShadow: "0 4px 20px rgba(224, 123, 42, 0.5)" }}
            >
              <div
                className="ml-1"
                style={{
                  width: 0, height: 0,
                  borderTop: "10px solid transparent",
                  borderBottom: "10px solid transparent",
                  borderLeft: "17px solid white",
                }}
              />
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div ref={statsContainerRef} className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {STATS.map((stat, index) => (
            <div
              key={index}
              ref={el => statsRef.current[index] = el}
              className="bg-white rounded-2xl p-8 text-center  transition-all duration-300 shadow-xl opacity-0"
            >
              <div
                className="text-5xl md:text-6xl text-black mb-2"
                style={{ fontFamily: "'Marcellus', serif" }}
              >
                {displayValues[index]}{stat.suffix}
              </div>
              <div
                className="text-gray-400 text-lg uppercase tracking-wide"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default VideoSection;