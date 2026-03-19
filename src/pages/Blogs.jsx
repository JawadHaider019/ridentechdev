import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, Calendar, Clock, Search } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { blogPosts, categories } from "@/data/blogData";
import HeroSection from "@/components/HeroSection";

gsap.registerPlugin(ScrollTrigger);

export default function BlogPage() {
    const sectionRef = useRef(null);
    const filterRef = useRef(null);
    const rowsRef = useRef([]);
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Filter posts based on category and search
    const filteredPosts = blogPosts.filter(post => {
        const matchesCategory = activeCategory === "All" || post.category === activeCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (post.author && post.author.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    // Group posts into rows of 3
    const getRows = (posts) => {
        const rows = [];
        for (let i = 0; i < posts.length; i += 3) {
            rows.push(posts.slice(i, i + 3));
        }
        return rows;
    };

    const rows = getRows(filteredPosts);

    useEffect(() => {
        if (!mounted) return;

        // Small delay to ensure DOM is ready
        const timer = setTimeout(() => {
            const ctx = gsap.context(() => {
                // Set initial states for filter
                if (filterRef.current) {
                    gsap.set(filterRef.current, {
                        opacity: 0,
                        y: 50
                    });

                    // Filter animation
                    gsap.fromTo(filterRef.current,
                        { y: 30, opacity: 0 },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 0.8,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: sectionRef.current,
                                start: "top 65%",
                                toggleActions: "play none none none"
                            }
                        }
                    );
                }

                // Animate blog post rows
                if (rowsRef.current.length > 0) {
                    rowsRef.current.forEach((row) => {
                        if (row && row.children) {
                            // Set initial states
                            gsap.set(row.children, {
                                opacity: 0,
                                y: 50
                            });

                            // Animate
                            gsap.to(row.children, {
                                y: 0,
                                opacity: 1,
                                duration: 0.8,
                                stagger: 0.1,
                                ease: "power3.out",
                                scrollTrigger: {
                                    trigger: row,
                                    start: "top 85%",
                                    end: "bottom 20%",
                                    toggleActions: "play none none none"
                                }
                            });
                        }
                    });
                }
            }, sectionRef);

            return () => {
                ctx.revert();
                ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            };
        }, 100);

        return () => clearTimeout(timer);
    }, [mounted, rows.length]); 

    if (!mounted) {
        return <div className="min-h-screen bg-white" />;
    }

    return (
        <section ref={sectionRef} className="pb-16 bg-white relative overflow-hidden min-h-screen">
         

       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Hero Section */}
                <HeroSection
                    title="NEWS & BLOG"
                    subtitle="Insights, stories, and updates from our team"
                                 />

                {/* Filter Section */}
                <div ref={filterRef} className="mb-16 mt-12">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        {/* Category Filter */}
                        <div className="flex flex-wrap gap-3 justify-center">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`px-5 py-2.5 rounded-full text-sm font-manrope font-medium transition-all duration-300 ${
                                        activeCategory === category
                                            ? "bg-gray-900 text-white shadow-lg"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        {/* Search Input */}
                        <div className="relative w-full md:w-80">
                            <input
                                type="text"
                                placeholder="Search articles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-5 py-3 pl-12 bg-gray-100 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent font-manrope text-gray-900"
                            />
                            <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-500" />
                        </div>
                    </div>
                </div>

                {/* Blog Posts Grid */}
                {filteredPosts.length > 0 ? (
                    <div className="space-y-8 mt-8">
                        {rows.map((row, rowIndex) => (
                            <div
                                key={rowIndex}
                                ref={el => rowsRef.current[rowIndex] = el}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                            >
                                {row.map((post) => (
                                    <Link
                                        to={`/blogs/${post.slug}`}
                                        key={post.id}
                                        className="group bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden hover:border-gray-400 flex flex-col h-full"
                                    >
                                        {/* Image Container */}
                                        <div className="relative h-56 w-full overflow-hidden">
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                onError={(e) => {
                                                    e.target.src = "https://via.placeholder.com/400x300?text=Blog+Post";
                                                }}
                                            />
                                            <div className="absolute top-4 left-4">
                                                <span className="px-4 py-1.5 bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-manrope font-semibold uppercase tracking-wider rounded-full shadow-lg">
                                                    {post.category}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content Container */}
                                        <div className="p-6 flex flex-col flex-grow">
                                            {/* Meta Data */}
                                            <div className="flex items-center gap-4 mb-3 text-gray-500">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4" />
                                                    <span className="text-sm font-manrope">{post.day} {post.month}, {post.year}</span>
                                                </div>
                                               
                                            </div>

                                            {/* Title */}
                                            <h3 className="font-marcellus text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-gray-700 transition-colors duration-300">
                                                {post.title}
                                            </h3>

                                            {/* Excerpt */}
                                            <p className="font-instrument text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                                                {post.excerpt}
                                            </p>

                                            {/* Author and Read More */}
                                            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
                                                        <img 
                                                            src={post.authorImage || `https://ui-avatars.com/api/?name=${post.author || 'Author'}&background=random`} 
                                                            alt={post.author || 'Author'}
                                                            className="w-full h-full object-cover"
                                                            onError={(e) => {
                                                                e.target.src = "https://via.placeholder.com/32x32?text=Author";
                                                            }}
                                                        />
                                                    </div>
                                                    <span className="font-manrope text-sm text-gray-700">{post.author || 'Riden Tech'}</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                   
                                                    <div className="flex items-center gap-1 text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                                                        <span className="font-manrope text-sm font-medium">Read</span>
                                                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ))}
                    </div>
                ) : (
                    // No Results
                    <div className="text-center py-20">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
                            <Search className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="font-instrument text-xl text-gray-500">No articles found matching your criteria.</p>
                        <button
                            onClick={() => {
                                setActiveCategory("All");
                                setSearchQuery("");
                            }}
                            className="mt-6 px-6 py-3 bg-gray-900 text-white rounded-lg font-manrope text-sm hover:bg-gray-800 transition-colors duration-300"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}

             </div>
        </section>
    );
}