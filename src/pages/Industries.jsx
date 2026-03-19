import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import {
    FaHeartbeat,
    FaChartLine,
    FaShoppingCart,
    FaTruck,
    FaGraduationCap,
    FaBuilding,
    FaHotel,
    FaHandsHelping
} from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroSection from '@/components/HeroSection';

gsap.registerPlugin(ScrollTrigger);

import { industries } from "@/data/industries";

export default function IndustriesPage() {
    const [mounted, setMounted] = useState(false);
    const [imageErrors, setImageErrors] = useState({});
    const [activeHoverIndex, setActiveHoverIndex] = useState(null);
    const sectionRef = useRef(null);
    const itemsRef = useRef([]);
    const hoverTl = useRef({});

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleImageError = (industryId) => {
        setImageErrors(prev => ({
            ...prev,
            [industryId]: true
        }));
    };

    const getImageSource = (industry) => {
        if (imageErrors[industry.id]) {
            return industry.fallbackImage;
        }
        return industry.image;
    };

    const resetAllCards = (excludeIndex = null) => {
        itemsRef.current.forEach((card, idx) => {
            if (excludeIndex !== null && idx === excludeIndex) return;
            if (!card) return;

            const image = card.querySelector('.card-image');
            const icon = card.querySelector('.industry-icon');
            const number = card.querySelector('.industry-number');
            const content = card.querySelector('.card-content');
            const title = card.querySelector('.industry-title');
            const button = card.querySelector('.explore-button');
            const arrow = card.querySelector('.arrow-icon');

            if (hoverTl.current[idx]) {
                hoverTl.current[idx].kill();
            }

            const tl = gsap.timeline();

            if (image) tl.to(image, { scale: 1, duration: 0.3, ease: "power2.out" }, 0);
            if (icon) tl.to(icon, { scale: 1, duration: 0.3, ease: "power2.out" }, 0);
            if (number) tl.to(number, { opacity: 0.2, scale: 1, duration: 0.3, ease: "power2.out" }, 0);
            if (content) tl.to(content, { y: 0, duration: 0.3, ease: "power2.out" }, 0);
            if (title) tl.to(title, { color: "#111827", duration: 0.3, ease: "power1.out" }, 0);
            if (button) tl.to(button, { backgroundColor: "#111827", scale: 1, duration: 0.3, ease: "power2.out" }, 0);
            if (arrow) tl.to(arrow, { x: 0, duration: 0.3, ease: "power2.out" }, 0);

            tl.to(card, {
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                borderColor: "#E5E7EB",
                duration: 0.3,
                ease: "power2.out"
            }, 0);

            hoverTl.current[idx] = tl;
        });
    };

    const handleMouseEnter = (index) => {
        resetAllCards(index);
        setActiveHoverIndex(index);

        const card = itemsRef.current[index];
        if (!card) return;

        const image = card.querySelector('.card-image');
        const icon = card.querySelector('.industry-icon');
        const number = card.querySelector('.industry-number');
        const content = card.querySelector('.card-content');
        const title = card.querySelector('.industry-title');
        const button = card.querySelector('.explore-button');
        const arrow = card.querySelector('.arrow-icon');

        if (hoverTl.current[index]) {
            hoverTl.current[index].kill();
        }

        const tl = gsap.timeline();

        if (image) tl.to(image, { scale: 1.15, duration: 0.5, ease: "power2.out" }, 0);
        if (icon) tl.to(icon, { scale: 1.2, duration: 0.4, ease: "back.out(1.7)" }, 0);
        if (number) tl.to(number, { opacity: 0.3, scale: 1.1, duration: 0.4, ease: "power2.out" }, 0);
        if (content) tl.to(content, { y: -5, duration: 0.4, ease: "power2.out" }, 0);
        if (title) tl.to(title, { color: "#4B5563", duration: 0.3, ease: "power1.out" }, 0);
        if (button) tl.to(button, { backgroundColor: "#1F2937", scale: 1.05, duration: 0.3, ease: "back.out(1.2)" }, 0.1);
        if (arrow) tl.to(arrow, { x: 5, duration: 0.3, ease: "power2.out" }, 0.1);

        tl.to(card, {
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            borderColor: "#9CA3AF",
            duration: 0.3,
            ease: "power2.out"
        }, 0);

        hoverTl.current[index] = tl;
    };

    const handleMouseLeave = () => {
    };

    useEffect(() => {
        if (!mounted) return;

        gsap.set(itemsRef.current, { opacity: 1, y: 0 });

        const ctx = gsap.context(() => {
            gsap.fromTo(itemsRef.current,
                { y: 60, opacity: 1 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.2,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, [mounted]);

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-white">
            <HeroSection
                title="Industry Expertise"
                subtitle="Deep domain expertise across sectors delivering tailored solutions for your unique challenges"
                overlayColor="bg-white"
            />

            <section ref={sectionRef} className=" py-16 px-4 md:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col gap-4 md:gap-5 lg:gap-6">
                        {industries.map((industry, index) => {
                            const isEven = index % 2 === 0;

                            return (
                                <div
                                    key={industry.id}
                                    ref={el => itemsRef.current[index] = el}
                                    className={`group relative bg-white rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden shadow-md border border-gray-200 cursor-pointer transition-all duration-300 ${activeHoverIndex === index ? 'z-10 shadow-xl' : 'z-0'
                                        }`}
                                    onClick={() => window.location.href = `/industries/${industry.slug}`}
                                    onMouseEnter={() => handleMouseEnter(index)}
                                    onMouseLeave={() => handleMouseLeave(index)}
                                >
                                    <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                                        <div className="relative w-full lg:w-5/12 h-[200px] sm:h-[220px] md:h-[250px] lg:h-[280px] xl:h-[300px] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                                            <img
                                                src={getImageSource(industry)}
                                                alt={industry.title}
                                                className="card-image w-full h-full object-cover object-center"
                                                onError={() => handleImageError(industry.id)}
                                            />

                                            <div className={`absolute inset-0 bg-gradient-to-r ${industry.color} opacity-60 mix-blend-multiply`}></div>

                                            <div className={`industry-number absolute bottom-2 md:bottom-3 ${isEven ? 'right-2 md:right-3' : 'left-2 md:left-3'}`}>
                                                <span className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-marcellus font-black text-white/20">
                                                    {industry.number}
                                                </span>
                                            </div>

                                            <div className={`industry-icon absolute top-2 md:top-3 ${isEven ? 'right-2 md:right-3' : 'left-2 md:left-3'} bg-black/30 backdrop-blur-sm p-1.5 md:p-2 rounded-lg text-white border border-white/20`}>
                                                <div className="w-4 h-4 md:w-5 md:h-5">
                                                    {industry.icon}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card-content w-full lg:w-7/12 p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8 flex flex-col justify-center bg-white">
                                            <h3 className="industry-title font-marcellus text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-900 mb-2">
                                                {industry.title}
                                            </h3>

                                            <p className="industry-description font-instrument text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed mb-3">
                                                {industry.description}
                                            </p>

                                            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-3" />

                                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                                                <Link to={`/industries/${industry.slug}`} className="explore-button flex items-center gap-2 font-semibold text-xs bg-gray-900 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full order-1 sm:order-2">
                                                    <span className="font-manrope whitespace-nowrap">Explore Industry</span>
                                                    <div className="arrow-icon w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                                                        <ArrowRight className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-gray-900" />
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
}
