import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Lightbulb, TrendingUp, Heart, BarChart3, Target, Zap, CheckCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const featuresRef = useRef([]);
  const imageRef = useRef(null);
  const ctaRef = useRef(null);
  const borderLineRef = useRef(null);
  const contentWrapperRef = useRef(null);
  const [clipPath, setClipPath] = useState("");

  // Features data from your input
  const features = [
    {
      icon: <Lightbulb className="w-5 h-5" />,
      title: "Innovate to Lead",
      description: "Foster creativity and embrace innovation to stay ahead of the competition."
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      title: "Optimize for Growth",
      description: "Streamline processes and resources to maximize efficiency and profitability."
    },
    {
      icon: <Heart className="w-5 h-5" />,
      title: "Engage with Purpose",
      description: "Build meaningful relationships with customers through authentic connections."
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      title: "Scale with Strategy",
      description: "Expand your business by implementing structured, scalable plans for long-term success."
    }
  ];

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    // Set responsive clip path based on screen size
    const updateClipPath = () => {
      if (window.innerWidth < 768) {
        setClipPath("path('M 10,20 L 100,20 A 10,10 0,0,0 110,10 L 110,10 A 10,10 0,0,1 120,0 L 260,0 A 10,10 0,0,1 270,10 L 270,235 A 10,10 0,0,1 260,245 L 10,245 A 10,10 0,0,1 0,235 L 0,30 A 10,10 0,0,1 10,20 Z')");
      } else if (window.innerWidth < 1024) {
        setClipPath("path('M 15,30 L 150,30 A 15,15 0,0,0 165,15 L 165,15 A 15,15 0,0,1 180,0 L 390,0 A 15,15 0,0,1 405,15 L 405,352 A 15,15 0,0,1 390,367 L 15,367 A 15,15 0,0,1 0,352 L 0,45 A 15,15 0,0,1 15,30 Z')");
      } else {
        setClipPath("path('M 20,40 L 200,40 A 20,20 0,0,0 220,20 L 220,20 A 20,20 0,0,1 240,0 L 520,0 A 20,20 0,0,1 540,20 L 540,470 A 20,20 0,0,1 520,490 L 20,490 A 20,20 0,0,1 0,470 L 0,60 A 20,20 0,0,1 20,40 Z')");
      }
    };

    updateClipPath();
    window.addEventListener('resize', updateClipPath);

    // Set initial states
    const initialTargets = [
      badgeRef.current, titleRef.current, headingRef.current,
      descriptionRef.current, ...featuresRef.current.filter(Boolean),
      borderLineRef.current, ctaRef.current, imageRef.current
    ].filter(Boolean);

    if (initialTargets.length > 0) {
      gsap.set(initialTargets, {
        opacity: 0,
        y: 30
      });
    }

    // Explicitly set scaleX for borderLineRef if it exists
    if (borderLineRef.current) {
      gsap.set(borderLineRef.current, { scaleX: 0 });
    }

    const ctx = gsap.context(() => {
      // Create a master timeline with delays
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
          once: true // Only animate once
        }
      });

      // Badge animation with delay
      if (badgeRef.current) {
        masterTl.to(badgeRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out"
        }, 0.2); // 0.2s delay
      }

      // Title and subtitle with staggered delay
      const titleTargets = [titleRef.current].filter(Boolean);
      if (titleTargets.length > 0) {
        masterTl.to(titleTargets, {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.2,
          ease: "power4.out"
        }, 0.4); // 0.4s delay
      }

      // Heading with delay
      if (headingRef.current) {
        masterTl.to(headingRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out"
        }, 0.6); // 0.6s delay
      }

      // Image animation with delay - NO FLOATING
      if (imageRef.current) {
        masterTl.fromTo(imageRef.current,
          {
            opacity: 0,
            scale: 0.9,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 1.4,
            ease: "power3.out"
          },
          0.8 // 0.8s delay
        );
      }

      // Description with delay
      if (descriptionRef.current) {
        masterTl.to(descriptionRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out"
        }, 1.0); // 1.0s delay
      }

      // Features with staggered delay
      const validFeatures = featuresRef.current.filter(el => el);
      if (validFeatures.length > 0) {
        validFeatures.forEach((feature, index) => {
          masterTl.to(feature, {
            x: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out"
          }, 1.2 + (index * 0.15)); // Staggered starting at 1.2s
        });
      }

      // Border line with delay
      if (borderLineRef.current) {
        masterTl.to(borderLineRef.current, {
          scaleX: 1,
          opacity: 1,
          duration: 1,
          ease: "power3.out"
        }, 1.8); // 1.8s delay
      }

      // CTA with delay
      if (ctaRef.current) {
        masterTl.to(ctaRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "back.out(1.2)"
        }, 2.0); // 2.0s delay
      }

      // Parallax effect for background elements (continuous)
      gsap.to('.mission-bg-1', {
        y: 30,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

      gsap.to('.mission-bg-2', {
        y: -30,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === sectionRef.current) t.kill(true);
      });
      window.removeEventListener('resize', updateClipPath);
    };
  }, [mounted]);

  // Hover handlers for feature items
  const handleFeatureEnter = (e) => {
    gsap.to(e.currentTarget, {
      x: 5,
      duration: 0.3,
      ease: "power2.out"
    });
    gsap.to(e.currentTarget.querySelector('.feature-icon'), {
      scale: 1.1,
      backgroundColor: '#1f2937',
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleFeatureLeave = (e) => {
    gsap.to(e.currentTarget, {
      x: 0,
      duration: 0.3,
      ease: "power2.out"
    });
    gsap.to(e.currentTarget.querySelector('.feature-icon'), {
      scale: 1,
      backgroundColor: '#111827',
      duration: 0.3,
      ease: "power2.out"
    });
  };

  if (!mounted) return <section ref={sectionRef} className="relative py-24 bg-white overflow-hidden" />;

  return (
    <section ref={sectionRef} className="relative py-24 bg-white overflow-hidden">
      {/* Background decorative elements with parallax */}
      <div className="mission-bg-1 absolute top-40 right-0 w-96 h-96 bg-gray-100 rounded-full filter blur-3xl opacity-20"></div>
      <div className="mission-bg-2 absolute bottom-20 left-20 w-72 h-72 bg-gray-100 rounded-full filter blur-3xl opacity-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          {/* Floating Badge */}
          <div
            ref={badgeRef}
            className="inline-flex items-center bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-full px-5 py-2.5 mb-6 shadow-lg opacity-0"
          >
            <Zap className="w-4 h-4 mr-2" />
            <span className="text-sm font-manrope font-medium tracking-wide">OUR MISSION</span>
          </div>

          {/* Titles with animation */}
          <h2 ref={titleRef} className="font-manrope text-4xl md:text-5xl lg:text-6xl text-gray-900 font-bold mb-4 opacity-0">
            Your Success,
            <span className="relative">
              Our  <span className="text-gray-400">Priority.</span>
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 ">
          {/* Left Side - Image */}
          <div className="relative order-2 lg:order-1 flex items-center justify-center">
            <div className="relative h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] w-full max-w-[400px] sm:max-w-[450px] md:max-w-[500px] lg:max-w-[550px] mx-auto">
              <div
                ref={imageRef}
                className="absolute inset-0 w-full h-full shadow-2xl opacity-0"
                style={{
                  clipPath: clipPath,
                }}
              >
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage: "url('/aboutus.jpg')"
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="order-1 lg:order-2 flex flex-col justify-between h-full">
            <div className="space-y-6">
              {/* Heading with animation */}
              <p ref={headingRef} className="font-instrument text-lg md:text-xl text-gray-600 leading-relaxed opacity-0">
                We are dedicated to helping you achieve your goals with intuitive, user-friendly digital solutions. Our commitment to your success drives everything we do and sets us apart.
              </p>

              {/* Description Text */}
              <div ref={descriptionRef} className="opacity-0">
                <p className="font-instrument text-base md:text-lg text-gray-600 leading-relaxed">
                  Our approach combines strategic thinking with technical excellence to deliver solutions that not only meet but exceed expectations.
                </p>
              </div>

              {/* Features List */}
              <div className="flex flex-col -mt-8">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    ref={el => featuresRef.current[index] = el}
                    className="flex items-start space-x-4 cursor-pointer group opacity-0"
                    style={{ transform: 'translateX(30px)' }}
                    onMouseEnter={handleFeatureEnter}
                    onMouseLeave={handleFeatureLeave}
                  >
                    <div className="feature-icon flex-shrink-0 w-10 h-10 bg-gray-900 text-white rounded-lg flex items-center justify-center transition-all duration-300">
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-manrope text-base md:text-lg text-gray-900 font-medium mb-1">
                        {feature.title}
                      </h3>
                      <p className="font-instrument text-sm md:text-base text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA with animation */}
            <div ref={ctaRef} className="mt-8 pt-4 opacity-0">
              <Link
                to="/contact"
                className="group inline-flex items-center space-x-2 bg-gray-900 text-white px-8 py-4 rounded-lg text-sm font-medium hover:bg-gray-800 transition-all duration-300 hover:shadow-lg font-manrope"
              >
                <span>Contact Us</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;