// components/Footer.jsx
"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Send, Sparkles } from "lucide-react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa6";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const [mounted, setMounted] = useState(false);
  const footerRef = useRef(null);
  const contentRef = useRef(null);
  const newsletterRef = useRef(null);
  const columnsRef = useRef([]);
  const socialRefs = useRef([]);
  const bigLogoRef = useRef(null);
  const privacyLinksRef = useRef(null);

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const ctx = gsap.context(() => {
      // Create master timeline with scroll trigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      });

      // 1. Content container fade in
      tl.from(contentRef.current, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out"
      });

      // 2. Newsletter section
      tl.from(newsletterRef.current, {
        opacity: 0,
        y: 30,
        scale: 0.98,
        duration: 1,
        ease: "power2.out"
      }, "-=0.7");

      // 3. Columns stagger
      tl.from(columnsRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=0.6");

      // 4. Social icons pop
      tl.from(socialRefs.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
        stagger: 0.05,
        ease: "back.out(1.7)"
      }, "-=0.4");

      // 5. Big logo reveal
      tl.from(bigLogoRef.current, {
        opacity: 0,
        y: 40,
        scale: 0.95,
        duration: 1.2,
        ease: "power3.out"
      }, "-=0.3");

      // 6. Privacy links
      tl.from(privacyLinksRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.4");

    }, footerRef);

    const currentFooter = footerRef.current;
    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === currentFooter) t.kill(true);
      });
    };
  }, [mounted]);

  if (!mounted) return (
    <footer ref={footerRef} className="w-full bg-black min-h-[400px]" />
  );

  // Hover handlers for social icons
  const handleSocialEnter = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1.2,
      rotate: 5,
      backgroundColor: "rgba(255,255,255,0.1)",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleSocialLeave = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      rotate: 0,
      backgroundColor: "transparent",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  // Hover handlers for links
  const handleLinkEnter = (e) => {
    gsap.to(e.currentTarget, {
      x: 5,
      color: "#ffffff",
      duration: 0.2,
      ease: "power1.out"
    });
  };

  const handleLinkLeave = (e) => {
    gsap.to(e.currentTarget, {
      x: 0,
      color: "#9ca3af",
      duration: 0.2,
      ease: "power1.out"
    });
  };

  // Hover handlers for subscribe button
  const handleSubscribeEnter = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1.05,
      boxShadow: "0 10px 25px -5px rgba(255,255,255,0.2)",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleSubscribeLeave = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      boxShadow: "none",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  return (
    <footer
      ref={footerRef}
      className="w-full bg-black text-white overflow-hidden relative"
      style={{
        zIndex: 20,
        minHeight: "600px",
        marginTop: 0,
        paddingTop: "4rem",
        paddingBottom: "2rem"
      }}
    >
      {/* Main Footer Content */}
      <div
        ref={contentRef}
        className="w-full h-full px-6 md:px-20"
      >
        <div className="max-w-7xl mx-auto w-full">
          {/* Newsletter Section */}
          <div
            ref={newsletterRef}
            className="mb-20 border-b border-gray-800 pb-16"
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="sparkle-icon w-5 h-5 text-gray-200" />
              <span className="font-['Manrope'] text-xs text-gray-100 tracking-wider">NEWSLETTER</span>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <h2 className="font-['Marcellus'] text-3xl md:text-4xl text-white lg:mb-0 max-w-xl leading-tight">
                Get the latest tips for social media growth and marketing straight to your inbox!
              </h2>

              <div className="flex w-full gap-4 max-w-xl">
                <input
                  type="email"
                  placeholder="jhon@example.com"
                  className="flex-1 px-6 py-4 bg-transparent border border-gray-800 text-white placeholder-gray-600 focus:outline-none focus:border-gray-500 transition-all duration-300 font-['Manrope'] text-sm hover:border-gray-600"
                />
                <button
                  onMouseEnter={handleSubscribeEnter}
                  onMouseLeave={handleSubscribeLeave}
                  className="subscribe-btn group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-white/10 font-['Manrope'] text-sm font-medium whitespace-nowrap"
                >
                  <span className="relative z-10">Subscribe</span>
                  <Send className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </button>
              </div>
            </div>

          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-8 mb-16">
            {/* Site Map */}
            <div ref={el => columnsRef.current[0] = el} className="space-y-4">
              <h3 className="font-['Manrope'] text-gray-200 text-xs tracking-wider">SITE MAP</h3>
              <ul className="space-y-2">
                {['Home', 'Services', 'Pricing', 'Blogs', 'Projects'].map((item) => (
                  <li key={item}>
                    <Link
                      href={`/${item.toLowerCase()}`}
                      onMouseEnter={handleLinkEnter}
                      onMouseLeave={handleLinkLeave}
                      className="footer-link font-['Manrope'] text-gray-400 hover:text-white transition-colors duration-300 text-sm inline-block"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div ref={el => columnsRef.current[1] = el} className="space-y-4">
              <h3 className="font-['Manrope'] text-gray-200 text-xs tracking-wider">SUPPORT</h3>
              <ul className="space-y-2">
                {['Contact Us', 'About Us', 'Team Member', 'Login Now', 'Register Now'].map((item) => (
                  <li key={item}>
                    <Link
                      href={`/${item.toLowerCase().replace(' ', '-')}`}
                      onMouseEnter={handleLinkEnter}
                      onMouseLeave={handleLinkLeave}
                      className="footer-link font-['Manrope'] text-gray-400 hover:text-white transition-colors duration-300 text-sm inline-block"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Utilities */}
            <div ref={el => columnsRef.current[2] = el} className="space-y-4">
              <h3 className="font-['Manrope'] text-gray-200 text-xs tracking-wider">UTILITIES</h3>
              <ul className="space-y-2">
                {['Licensing', 'Style Guide', 'Changelog', 'Instructions', '404 Not Found'].map((item) => (
                  <li key={item}>
                    <Link
                      href={`/${item.toLowerCase().replace(' ', '-')}`}
                      onMouseEnter={handleLinkEnter}
                      onMouseLeave={handleLinkLeave}
                      className="footer-link font-['Manrope'] text-gray-400 hover:text-white transition-colors duration-300 text-sm inline-block"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div ref={el => columnsRef.current[3] = el} className="space-y-4">
              <h3 className="font-['Manrope'] text-gray-200 text-xs tracking-wider">CONTACT US</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 group">
                  <Phone className="w-4 h-4 text-gray-100 flex-shrink-0 transition-transform duration-300 group-hover:rotate-12" />
                  <a
                    href="tel:+91123456789"
                    onMouseEnter={handleLinkEnter}
                    onMouseLeave={handleLinkLeave}
                    className="footer-link font-['Manrope'] text-gray-300 hover:text-white transition-colors duration-300 text-sm"
                  >
                    +91 123 456789
                  </a>
                </div>

                <div className="flex items-center gap-3 group">
                  <Mail className="w-4 h-4 text-gray-100 flex-shrink-0 transition-transform duration-300 group-hover:rotate-12" />
                  <a
                    href="mailto:hello@domain.com"
                    onMouseEnter={handleLinkEnter}
                    onMouseLeave={handleLinkLeave}
                    className="footer-link font-['Manrope'] text-gray-300 hover:text-white transition-colors duration-300 text-sm"
                  >
                    hello@domain.com
                  </a>
                </div>

                <div className="flex items-start gap-3 group">
                  <MapPin className="w-4 h-4 text-gray-100 flex-shrink-0 mt-1 transition-transform duration-300 group-hover:rotate-12" />
                  <span className="font-['Manrope'] text-gray-300 text-sm">
                    Springfield 1234 Elmwood Street, IL 62701 USA
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="font-['Manrope'] text-xs text-gray-100">
                © {currentYear} RidenTech. All rights reserved.
              </p>

              {/* Social Links */}
              <div className="flex gap-4">
                {[
                  { icon: <FaFacebookF className="w-4 h-4" />, href: "#" },
                  { icon: <FaTwitter className="w-4 h-4" />, href: "#" },
                  { icon: <FaInstagram className="w-4 h-4" />, href: "#" },
                  { icon: <FaLinkedinIn className="w-4 h-4" />, href: "#" },
                  { icon: <FaYoutube className="w-4 h-4" />, href: "#" }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    ref={el => socialRefs.current[index] = el}
                    onMouseEnter={handleSocialEnter}
                    onMouseLeave={handleSocialLeave}
                    className="w-10 h-10 border border-gray-800 hover:border-gray-600 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 bg-white/5"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Large RIDEN Logo */}
          <div
            ref={bigLogoRef}
            className="w-full text-center my-8"
          >
            <h1 className="font-['Manrope'] text-[20vw] md:text-[25vw] lg:text-[30vw] font-black uppercase text-white/10 hover:text-white/20 leading-none tracking-tight select-none transition-all duration-500 hover:scale-105">
              RIDEN
            </h1>
          </div>

          {/* Privacy Links */}
          <div
            ref={privacyLinksRef}
            className="flex justify-center gap-6"
          >
            <Link
              href="/privacy"
              onMouseEnter={handleLinkEnter}
              onMouseLeave={handleLinkLeave}
              className="footer-link font-['Manrope'] text-xs text-gray-100 hover:text-white transition-colors duration-300"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              onMouseEnter={handleLinkEnter}
              onMouseLeave={handleLinkLeave}
              className="footer-link font-['Manrope'] text-xs text-gray-100 hover:text-white transition-colors duration-300"
            >
              Terms
            </Link>
            <Link
              href="/sitemap"
              onMouseEnter={handleLinkEnter}
              onMouseLeave={handleLinkLeave}
              className="footer-link font-['Manrope'] text-xs text-gray-100 hover:text-white transition-colors duration-300"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>

  );
}