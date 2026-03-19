import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import gsap from "gsap";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState({});
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Get current pathname for active link detection
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();

  // Refs for GSAP animations
  const navbarRef = useRef(null);
  const navLinksRef = useRef([]);
  const ctaButtonRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const dropdownRefs = useRef({});
  const underlineRefs = useRef({});
  const mobileDropdownRefs = useRef({});
  const logoRef = useRef(null);
  const accentLineRef = useRef(null);

  // Timeout ref for hover delay
  const hoverTimeoutRef = useRef(null);

  // Check if a link is active - FIXED to prevent multiple active classes
  const isActive = (href) => {
    // Handle home page
    if (href === '/') {
      return pathname === href;
    }
    
    // For parent routes (like /services, /industries, /blogs)
    // Only mark as active if on exact parent route, not on child routes
    const parentRoutes = ['/services', '/industries', '/blogs'];
    if (parentRoutes.includes(href)) {
      return pathname === href;
    }
    
    // For child routes (like /services/software-development)
    // Check if the current pathname exactly matches the href
    return pathname === href;
  };

  // Check if a parent route should be highlighted when on a child route
  // This is for visual indication in dropdown menus
  const isParentRouteActive = (parentHref) => {
    // Only return true if we're on a child route of this parent
    // and NOT on the parent route itself
    return pathname?.startsWith(parentHref + '/') && pathname !== parentHref;
  };

  // Function to handle navigation with scrolling to specific service
  const handleServiceNavigation = (e, href, serviceTitle) => {
    e.preventDefault();

    // Close mobile menu if open
    setIsOpen(false);

    // Close any open dropdowns
    setActiveDropdown(null);

    // Clear mobile expanded state
    setMobileExpanded({});

    // Remove all underline hover effects
    Object.keys(underlineRefs.current).forEach(key => {
      if (underlineRefs.current[key]) {
        gsap.set(underlineRefs.current[key], { scaleX: 0 });
      }
    });

    // Create a URL-friendly ID from the service title
    const serviceId = serviceTitle.toLowerCase()
      .replace(/[&]/g, 'and')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');

    // If we're already on the services page, just scroll
    if (pathname === '/services') {
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        scrollToService(serviceId);
      });
    } else {
      // Navigate to services page with hash
      navigate(`/services#${serviceId}`, { replace: true });
    }
  };

  // Function to scroll to a specific service
  const scrollToService = (serviceId) => {
    // First, try to find the element
    const findAndScrollToElement = () => {
      const element = document.getElementById(serviceId);
      if (element) {
        const yOffset = -100; // Offset for fixed navbar
        const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
        
        window.scrollTo({ 
          top: y, 
          behavior: 'smooth' 
        });

        // Highlight the element temporarily
        element.style.transition = 'all 0.3s ease';
        element.style.boxShadow = '0 0 0 2px rgba(0,0,0,0.1), 0 0 0 4px rgba(59,130,246,0.5)';
        setTimeout(() => {
          element.style.boxShadow = '';
        }, 2000);
        
        return true;
      }
      return false;
    };

    // Try immediately
    if (!findAndScrollToElement()) {
      // If not found, wait a bit and try again (for dynamic content)
      let attempts = 0;
      const maxAttempts = 10;
      const interval = setInterval(() => {
        attempts++;
        if (findAndScrollToElement() || attempts >= maxAttempts) {
          clearInterval(interval);
        }
      }, 100);
    }
  };

  // Handle hash navigation on page load
  useEffect(() => {
    if (!mounted) return;

    if (pathname === '/services' && window.location.hash) {
      const serviceId = window.location.hash.replace('#', '');
      // Wait a bit for the page to fully render
      setTimeout(() => {
        scrollToService(serviceId);
      }, 300);
    }
  }, [pathname, mounted]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Clean up active states when pathname changes
  useEffect(() => {
    // Close any open dropdowns
    setActiveDropdown(null);
    // Close mobile menu
    setIsOpen(false);
    // Clear mobile expanded state
    setMobileExpanded({});
    
    // Remove all underline hover effects
    Object.keys(underlineRefs.current).forEach(key => {
      if (underlineRefs.current[key]) {
        gsap.set(underlineRefs.current[key], { scaleX: 0 });
      }
    });
  }, [pathname]);

  // Run animations after mounted
  useEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Navbar slide down
      if (navbarRef.current) {
        tl.fromTo(navbarRef.current,
          { y: -100, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, ease: "power4.out" }
        );
      }

      // Accent line animation
      if (accentLineRef.current) {
        tl.fromTo(accentLineRef.current,
          { scaleX: 0, transformOrigin: "left" },
          { scaleX: 1, duration: 1.5, ease: "power4.out" },
          "-=0.8"
        );
      }

      // Logo fade in
      if (logoRef.current) {
        tl.fromTo(logoRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.6"
        );
      }

      // Nav links fade in one by one
      const validNavLinks = navLinksRef.current.filter(el => el);
      if (validNavLinks.length > 0) {
        tl.fromTo(validNavLinks,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out"
          },
          "-=0.4"
        );
      }

      // CTA button fade in
      if (ctaButtonRef.current) {
        tl.fromTo(ctaButtonRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.6, ease: "power2.out" },
          "-=0.2"
        );
      }
    });

    return () => ctx.revert();
  }, [mounted]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
        if (navbarRef.current) {
          gsap.to(navbarRef.current, {
            backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.95)" : "rgba(255, 255, 255, 1)",
            backdropFilter: isScrolled ? "blur(8px)" : "blur(0px)",
            duration: 0.6,
            ease: "power3.inOut"
          });
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  // Animate mobile menu
  useEffect(() => {
    if (isOpen && mobileMenuRef.current) {
      gsap.fromTo(mobileMenuRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power4.out" }
      );

      if (mobileMenuRef.current.children.length > 0) {
        gsap.fromTo(
          mobileMenuRef.current.children,
          { x: -30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power3.out" }
        );
      }
    }
  }, [isOpen]);

  // Animate desktop dropdown
  useEffect(() => {
    if (window.innerWidth >= 1024 && activeDropdown && dropdownRefs.current[activeDropdown]) {
      const dropdown = dropdownRefs.current[activeDropdown];

      gsap.fromTo(dropdown,
        { y: -15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
      );

      const dropdownItems = dropdown.querySelectorAll('.dropdown-item');
      if (dropdownItems.length > 0) {
        gsap.fromTo(
          dropdownItems,
          { y: -8, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, stagger: 0.03, delay: 0.1, ease: "power2.out" }
        );
      }
    }
  }, [activeDropdown]);

  // Animate mobile dropdown expand/collapse
  useEffect(() => {
    Object.keys(mobileExpanded).forEach((key) => {
      const element = mobileDropdownRefs.current[key];
      if (element) {
        if (mobileExpanded[key]) {
          element.style.height = 'auto';
          const height = element.scrollHeight;
          element.style.height = '0px';
          element.offsetHeight;

          gsap.to(element, {
            height: height,
            opacity: 1,
            duration: 0.5,
            ease: "power3.inOut",
            onComplete: () => {
              element.style.height = 'auto';
            }
          });
        } else {
          const height = element.scrollHeight;
          element.style.height = height + 'px';
          element.offsetHeight;

          gsap.to(element, {
            height: 0,
            opacity: 0,
            duration: 0.4,
            ease: "power3.in"
          });
        }
      }
    });
  }, [mobileExpanded]);

  // Animate underline on hover
  const handleUnderlineHover = (key, isHovering) => {
    if (underlineRefs.current[key]) {
      gsap.to(underlineRefs.current[key], {
        scaleX: isHovering ? 1 : 0,
        duration: 0.5,
        ease: "power3.out"
      });
    }
  };

  // Clear any existing hover timeout
  const clearHoverTimeout = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  // Handle mouse enter on nav item
  const handleNavItemEnter = (title) => {
    clearHoverTimeout();
    if (window.innerWidth >= 1024) {
      if (activeDropdown !== title) {
        if (activeDropdown) {
          handleUnderlineHover(`${activeDropdown}-desktop`, false);
        }
        setActiveDropdown(title);
        handleUnderlineHover(`${title}-desktop`, true);
      }
    }
  };

  // Handle mouse leave from nav item
  const handleNavItemLeave = () => {
    clearHoverTimeout();
    hoverTimeoutRef.current = setTimeout(() => {
      if (window.innerWidth >= 1024 && activeDropdown) {
        const dropdown = dropdownRefs.current[activeDropdown];
        if (!dropdown || !dropdown.matches(':hover')) {
          handleUnderlineHover(`${activeDropdown}-desktop`, false);
          setActiveDropdown(null);
        }
      }
      hoverTimeoutRef.current = null;
    }, 100);
  };

  // Handle mouse enter on dropdown
  const handleDropdownEnter = (title) => {
    clearHoverTimeout();
    if (window.innerWidth >= 1024) {
      if (activeDropdown !== title) {
        if (activeDropdown) {
          handleUnderlineHover(`${activeDropdown}-desktop`, false);
        }
        setActiveDropdown(title);
        handleUnderlineHover(`${title}-desktop`, true);
      }
    }
  };

  // Handle mouse leave from dropdown
  const handleDropdownLeave = (title) => {
    clearHoverTimeout();
    hoverTimeoutRef.current = setTimeout(() => {
      if (window.innerWidth >= 1024 && activeDropdown === title) {
        const navItem = document.querySelector(`[data-navitem="${title}"]`);
        if (!navItem || !navItem.matches(':hover')) {
          handleUnderlineHover(`${title}-desktop`, false);
          setActiveDropdown(null);
        }
      }
      hoverTimeoutRef.current = null;
    }, 100);
  };

  // Handle click on regular nav link (non-service)
  const handleNavLinkClick = (e, href) => {
    e.preventDefault();
    
    // Close mobile menu if open
    setIsOpen(false);
    // Close any open dropdowns
    setActiveDropdown(null);
    // Clear mobile expanded state
    setMobileExpanded({});
    
    // Remove all underline hover effects
    Object.keys(underlineRefs.current).forEach(key => {
      if (underlineRefs.current[key]) {
        gsap.set(underlineRefs.current[key], { scaleX: 0 });
      }
    });
    
    // Navigate to the href
    navigate(href);
  };

  // Handle click on dropdown link
  const handleDropdownLinkClick = (e, href, serviceTitle) => {
    e.preventDefault(); // Prevent default to handle manually
    
    // Remove underline hover effects for the current dropdown
    if (activeDropdown) {
      handleUnderlineHover(`${activeDropdown}-desktop`, false);
    }
    
    // Close dropdown
    setActiveDropdown(null);
    
    // Close mobile menu if open
    setIsOpen(false);
    
    // Clear mobile expanded state
    setMobileExpanded({});
    
    // Remove all underline hover effects
    Object.keys(underlineRefs.current).forEach(key => {
      if (underlineRefs.current[key]) {
        gsap.set(underlineRefs.current[key], { scaleX: 0 });
      }
    });

    if (serviceTitle) {
      handleServiceNavigation(e, href, serviceTitle);
    } else {
      // For non-service dropdown items (like Industries)
      navigate(href);
    }
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  const navItems = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Services",
      href: "/services",
      dropdown: [
        { title: "Software Development", href: "/services/software-development", category: "Development" },
        { title: "Website Development", href: "/services/website-development", category: "Development" },
        { title: "Mobile App Development", href: "/services/mobile-app-development", category: "Development" },
        { title: "API & Systems Integration", href: "/services/api-systems-integration", category: "Development" },
        { title: "AI & Machine Learning", href: "/services/ai-machine-learning", category: "Development" },
        { title: "Cloud Architecture", href: "/services/cloud-architecture", category: "Cloud & Infrastructure" },
        { title: "DevOps & Automation", href: "/services/devops-automation", category: "Cloud & Infrastructure" },
        { title: "Cloud Workspace Management", href: "/services/cloud-workspace-management", category: "Cloud & Infrastructure" },
        { title: "Managed IT Services", href: "/services/managed-it-services", category: "Cloud & Infrastructure" },
        { title: "Database Architecture", href: "/services/database-architecture", category: "Cloud & Infrastructure" },
        { title: "UI/UX Design", href: "/services/ui-ux-design", category: "Design & Marketing" },
        { title: "Social Media Management", href: "/services/social-media-management", category: "Design & Marketing" },
        { title: "SEO & Growth Strategy", href: "/services/seo-growth-strategy", category: "Design & Marketing" },
        { title: "Digital Marketing", href: "/services/digital-marketing", category: "Design & Marketing" },
        { title: "Content Writing", href: "/services/content-writing", category: "Design & Marketing" },
        { title: "E-Commerce Solutions", href: "/services/ecommerce-solutions", category: "Business Solutions" },
        { title: "Business Process Outsourcing", href: "/services/business-process-outsourcing", category: "Business Solutions" }
      ]
    },
    {
      title: "Industries",
      href: "/industries",
      dropdown: [
        { title: "Healthcare & Life Sciences", href: "/industries/healthcare-life-sciences" },
        { title: "Finance & Legal", href: "/industries/finance-legal" },
        { title: "Retail & E-Commerce", href: "/industries/retail-ecommerce" },
        { title: "Logistics & Supply Chain", href: "/industries/logistics-supply-chain" },
        { title: "Education & EdTech", href: "/industries/education-edtech" },
        { title: "Real Estate & Construction", href: "/industries/real-estate-construction" },
        { title: "Hospitality & Tourism", href: "/industries/hospitality-tourism" },
        { title: "Non-Profit & Government", href: "/industries/non-profit-government" }
      ]
    },
    {
      title: "Blogs",
      href: "/blogs"
    },
    {
      title: "Contact",
      href: "/contact"
    }
  ];

  // Group services by category
  const groupedServices = navItems.find(item => item.title === "Services")?.dropdown.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {});

  // Toggle mobile dropdown
  const toggleMobileDropdown = (title) => {
    setMobileExpanded(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  return (
    <nav
      ref={navbarRef}
      className={`fixed w-full z-50 top-0 transition-shadow duration-700 ${scrolled ? "shadow-lg border-b border-gray-100" : "border-b border-gray-100"
        }`}
      style={{ backgroundColor: scrolled ? "rgba(255, 255, 255, 0.95)" : "rgba(255, 255, 255, 1)", backdropFilter: scrolled ? "blur(8px)" : "none" }}
    >
      {/* Premium accent line */}
      <div
        ref={accentLineRef}
        className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900"
        style={{ transform: "scaleX(0)", transformOrigin: "left" }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo with Marcellus font */}
          <div className="flex-shrink-0" ref={logoRef} style={{ opacity: 0 }}>
            <Link to="/" className="font-marcellus text-2xl tracking-wide text-gray-900">
              Riden<span className="text-gray-500 ml-1 text-lg font-light">Tech</span>
            </Link>
          </div>

          {/* Desktop Menu - Only visible on large screens (lg) */}
          <div className="hidden lg:flex lg:items-center lg:space-x-1 gap-5">
            {navItems.map((item, index) => {
              const active = isActive(item.href);
              const isParentActive = item.dropdown ? isParentRouteActive(item.href) : false;

              return (
                <div
                  key={item.title}
                  className="relative"
                  ref={el => navLinksRef.current[index] = el}
                  style={{ opacity: 0 }}
                  data-navitem={item.title}
                  onMouseEnter={() => handleNavItemEnter(item.title)}
                  onMouseLeave={handleNavItemLeave}
                >
                  {item.dropdown ? (
                    <div className="flex items-center">
                      <Link
                        to={item.href}
                        className={`py-2 text-sm font-medium relative group font-manrope ${
                          active ? 'text-gray-900' : isParentActive ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
                        }`}
                        onClick={(e) => handleNavLinkClick(e, item.href)}
                      >
                        {item.title}
                      </Link>
                      <button
                        className="py-2"
                        onMouseEnter={() => handleNavItemEnter(item.title)}
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-300 ${
                            active ? 'text-gray-900' : isParentActive ? 'text-gray-900' : 'text-gray-600'
                          } ${activeDropdown === item.title ? "rotate-180" : ""}`}
                        />
                      </button>

                      {/* Hover underline effect - only shows on hover, not for active */}
                      <span
                        ref={el => underlineRefs.current[`${item.title}-desktop`] = el}
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900 transform scale-x-0"
                        style={{ display: (active || isParentActive) ? 'none' : 'block' }}
                      ></span>

                      {/* Active indicator for items with dropdown */}
                      {(active || isParentActive) && (
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900"></span>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      className={`relative px-0 py-2 text-sm font-medium group inline-block font-manrope ${
                        active ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
                      }`}
                      onClick={(e) => handleNavLinkClick(e, item.href)}
                      onMouseEnter={() => {
                        if (window.innerWidth >= 1024 && !active) {
                          handleUnderlineHover(`${item.title}-desktop`, true);
                        }
                      }}
                      onMouseLeave={() => handleUnderlineHover(`${item.title}-desktop`, false)}
                    >
                      {item.title}
                      {/* Hover underline effect */}
                      <span
                        ref={el => underlineRefs.current[`${item.title}-desktop`] = el}
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900 transform scale-x-0"
                      ></span>
                      {/* Active indicator */}
                      {active && (
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900"></span>
                      )}
                    </Link>
                  )}

                  {/* Full Width Dropdown Menu - Only for desktop */}
                  {item.dropdown && activeDropdown === item.title && window.innerWidth >= 1024 && (
                    <div
                      ref={el => dropdownRefs.current[item.title] = el}
                      className="fixed left-0 right-0 top-20 w-screen bg-white border-t border-gray-100 shadow-xl z-50"
                      style={{ left: 0, right: 0 }}
                      onMouseEnter={() => handleDropdownEnter(item.title)}
                      onMouseLeave={() => handleDropdownLeave(item.title)}
                    >
                      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        {item.title === "Services" ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8">
                            {Object.entries(groupedServices).map(([category, services]) => (
                              <div key={category} className="mb-6">
                                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 font-manrope">
                                  {category}
                                </h3>
                                <div className="flex flex-col space-y-1">
                                  {services.map((service) => {
                                    const isServiceActive = pathname === service.href; // Exact match only
                                    return (
                                      <Link
                                        key={service.title}
                                        to={service.href}
                                        className="group/link dropdown-item"
                                        onClick={(e) => handleDropdownLinkClick(e, service.href, service.title)}
                                      >
                                        <div className={`flex items-center justify-between py-1.5 px-2 -mx-2 rounded-sm transition-all duration-300 ${
                                          isServiceActive ? 'bg-gray-50' : 'hover:bg-gray-50'
                                        }`}>
                                          <span className={`text-sm font-instrument ${
                                            isServiceActive ? 'text-gray-900 font-medium' : 'text-gray-700 group-hover/link:text-gray-900'
                                          }`}>
                                            {service.title}
                                          </span>
                                          <ArrowRight className={`w-3 h-3 flex-shrink-0 transition-opacity duration-300 ${
                                            isServiceActive ? 'opacity-100 text-gray-900' : 'text-gray-400 opacity-0 group-hover/link:opacity-100'
                                          }`} />
                                        </div>
                                      </Link>
                                    );
                                  })}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : item.title === "Industries" ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6">
                            {item.dropdown.map((industry) => {
                              const isIndustryActive = pathname === industry.href; // Exact match only
                              return (
                                <Link
                                  key={industry.title}
                                  to={industry.href}
                                  className="group dropdown-item"
                                  onClick={(e) => handleDropdownLinkClick(e, industry.href)}
                                >
                                  <div className={`flex items-center justify-between py-1.5 px-2 -mx-2 rounded-sm transition-all duration-300 ${
                                    isIndustryActive ? 'bg-gray-50' : 'hover:bg-gray-50'
                                  }`}>
                                    <span className={`text-sm font-instrument ${
                                      isIndustryActive ? 'text-gray-900 font-medium' : 'text-gray-700 group-hover:text-gray-900'
                                    }`}>
                                      {industry.title}
                                    </span>
                                    <ArrowRight className={`w-3 h-3 flex-shrink-0 transition-opacity duration-300 ${
                                      isIndustryActive ? 'opacity-100 text-gray-900' : 'text-gray-400 opacity-0 group-hover:opacity-100'
                                    }`} />
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6">
                            {item.dropdown.map((dropItem) => {
                              const isDropItemActive = pathname === dropItem.href; // Exact match only
                              return (
                                <Link
                                  key={dropItem.title}
                                  to={dropItem.href}
                                  className="group dropdown-item"
                                  onClick={(e) => handleDropdownLinkClick(e, dropItem.href)}
                                >
                                  <div className={`py-1.5 px-2 -mx-2 rounded-sm transition-all duration-300 ${
                                    isDropItemActive ? 'bg-gray-50' : 'hover:bg-gray-50'
                                  }`}>
                                    <div className="flex justify-between items-start">
                                      <div>
                                        <div className={`text-sm font-instrument ${
                                          isDropItemActive ? 'text-gray-900 font-medium' : 'text-gray-900 group-hover:text-gray-700'
                                        }`}>
                                          {dropItem.title}
                                        </div>
                                        {dropItem.description && (
                                          <div className={`text-xs font-instrument ${
                                            isDropItemActive ? 'text-gray-600' : 'text-gray-500'
                                          }`}>
                                            {dropItem.description}
                                          </div>
                                        )}
                                      </div>
                                      <ArrowRight className={`w-4 h-4 flex-shrink-0 ml-2 mt-0.5 transition-opacity duration-300 ${
                                        isDropItemActive ? 'opacity-100 text-gray-900' : 'text-gray-400 opacity-0 group-hover:opacity-100'
                                      }`} />
                                    </div>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Desktop CTA Button - Only visible on large screens */}
          <div className="hidden lg:block" ref={ctaButtonRef} style={{ opacity: 0 }}>
            <Link
              to="/contact"
              className="relative group inline-flex items-center space-x-2 bg-gray-900 text-white px-6 py-2.5 rounded-lg text-sm font-medium overflow-hidden transition-all duration-500 hover:shadow-lg hover:shadow-gray-900/20 font-manrope"
              onClick={(e) => handleNavLinkClick(e, "/contact")}
              onMouseEnter={() => handleUnderlineHover('cta', true)}
              onMouseLeave={() => handleUnderlineHover('cta', false)}
            >
              <span className="relative z-10">Get Started</span>
              <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </Link>
          </div>

          {/* Mobile/Tablet menu button - Visible up to lg breakpoint */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 focus:outline-none transition-all duration-300"
            >
              {isOpen ? <X className="w-6 h-6 transition-transform duration-300 rotate-90" /> : <Menu className="w-6 h-6 transition-transform duration-300" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Menu with Collapsible Dropdowns - Visible up to lg breakpoint */}
      {isOpen && (
        <div
          ref={mobileMenuRef}
          className="lg:hidden bg-white border-t border-gray-100 shadow-xl"
        >
          <div className="px-4 py-6 max-h-[80vh] overflow-y-auto">
            {navItems.map((item) => {
              const active = isActive(item.href);
              const isParentActive = item.dropdown ? isParentRouteActive(item.href) : false;

              return (
                <div key={item.title} className="mb-3">
                  {item.dropdown ? (
                    <div>
                      {/* Mobile category header */}
                      <div className="flex items-center justify-between">
                        <Link
                          to={item.href}
                          className={`py-3 px-0 text-sm font-medium transition-all duration-300 font-manrope ${
                            active ? 'text-gray-900' : isParentActive ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavLinkClick(e, item.href);
                          }}
                        >
                          {item.title}
                        </Link>
                        <button
                          onClick={() => toggleMobileDropdown(item.title)}
                          className="p-2"
                        >
                          <ChevronDown
                            className={`w-4 h-5 transition-all duration-500 ${
                              active ? 'text-gray-900' : isParentActive ? 'text-gray-900' : 'text-gray-500'
                            } ${mobileExpanded[item.title] ? "rotate-180" : ""}`}
                          />
                        </button>
                      </div>

                      {/* Collapsible dropdown items */}
                      <div
                        ref={el => mobileDropdownRefs.current[item.title] = el}
                        className="overflow-hidden"
                        style={{ height: 0, opacity: 0 }}
                      >
                        <div className="space-y-1 pt-3 pl-4">
                          {item.dropdown.map((dropItem) => {
                            const isDropItemActive = pathname === dropItem.href; // Exact match only
                            return (
                              <Link
                                key={dropItem.title}
                                to={dropItem.href}
                                className={`flex items-center justify-between py-2 pl-5 pr-2 text-sm rounded-lg transition-all duration-300 font-instrument ${
                                  isDropItemActive
                                    ? 'text-gray-900 font-medium bg-gray-50'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                }`}
                                onClick={(e) => {
                                  if (item.title === "Services") {
                                    e.preventDefault();
                                    handleServiceNavigation(e, dropItem.href, dropItem.title);
                                  } else {
                                    e.preventDefault();
                                    setIsOpen(false);
                                    setMobileExpanded({});
                                    setActiveDropdown(null);
                                    navigate(dropItem.href);
                                  }
                                }}
                              >
                                <span>{dropItem.title}</span>
                                <ArrowRight className={`w-3 h-4 transition-transform duration-300 flex-shrink-0 ${
                                  isDropItemActive ? 'opacity-100 text-gray-900' : 'text-gray-400 group-hover:translate-x-1'
                                }`} />
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      className={`relative block py-3 px-0 text-sm font-medium transition-all duration-300 font-manrope w-full ${
                        active ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavLinkClick(e, item.href);
                      }}
                    >
                      {item.title}
                    </Link>
                  )}
                </div>
              );
            })}

            {/* Mobile CTA Button */}
            <div className="pt-6 mt-3 border-t border-gray-100">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center w-full space-x-2 bg-gray-900 text-white px-6 py-3.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-all duration-300 font-manrope"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavLinkClick(e, "/contact");
                }}
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;