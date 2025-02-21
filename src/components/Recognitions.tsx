import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Youtube, Newspaper, Award, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

const Recognitions: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const recognitions = [
    {
      type: 'news',
      title: `Ho ho ho! This X'mas, spread joy with personalised Santa greetings`,
      source: 'The New Indian Express',
      date: 'December 22, 2024',
      link: 'https://www.newindianexpress.com/states/kerala/2024/Dec/22/ho-ho-ho-this-xmas-spread-joy-with-personalised-santa-greetings',
    },
    {
      type: 'video',
      title: 'Kerala Startup Mission CEO Recognition',
      description: 'Acknowledged by Kerala Startup Mission CEO Anoop Ambika',
      videoId: 'srvm0IYu12k',
      link: 'https://youtu.be/srvm0IYu12k?si=KLhvCpnjzfn2_a5I',
    },
    {
      type: 'video',
      title: 'Kerala Industries Minister Acknowledgment',
      description: 'Recognition from P. Rajeev, Minister for Industries',
      videoId: 'AEGuDxrbX8E',
      link: 'https://youtu.be/AEGuDxrbX8E?si=Rrv0IQleyfSIJK1W',
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { x: 20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
    },
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const cardWidth = container.offsetWidth;
    const scrollLeft = container.scrollLeft;
    const scrollWidth = container.scrollWidth;

    let targetScroll: number;
    if (direction === 'left') {
      targetScroll = Math.max(0, Math.floor(scrollLeft / cardWidth) * cardWidth - cardWidth);
    } else {
      targetScroll = Math.min(
        scrollWidth - cardWidth,
        Math.ceil(scrollLeft / cardWidth) * cardWidth + cardWidth
      );
    }

    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
  };

  return (
    <section id="recognitions" className="section-padding relative overflow-hidden">
      <div className="section-bg" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000")' }} />
      <div className="section-overlay" />
      <div className="section-glow" />

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="space-y-12"
        >
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4 gradient-text">Recognitions</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Honored by industry leaders and featured in prominent media for innovative AI solutions.
            </p>
          </div>

          <div className="relative group">
            {/* Scroll Buttons - Only visible on desktop */}
            <button
              onClick={() => scroll('left')}
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-dark/80 hover:bg-dark-light/80 text-primary p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-dark/80 hover:bg-dark-light/80 text-primary p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <ChevronRight size={24} />
            </button>

            {/* Scrollable Container */}
            <div
              ref={containerRef}
              className="flex overflow-x-auto space-x-6 pb-6 snap-x snap-mandatory scroll-smooth scrollbar-hide"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {recognitions.map((item) => (
                <motion.div
                  key={item.title}
                  variants={itemVariants}
                  className="flex-none w-full md:w-[600px] snap-center bg-dark/80 backdrop-blur-sm rounded-xl overflow-hidden card-hover"
                >
                  {item.type === 'video' ? (
                    <div className="relative pt-[56.25%]">
                      <iframe
                        className="absolute inset-0 w-full h-full"
                        src={`https://www.youtube.com/embed/${item.videoId}`}
                        title={item.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <div className="relative h-48">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-dark flex items-center justify-center">
                        <Newspaper className="w-16 h-16 text-primary/50" />
                      </div>
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      {item.type === 'video' ? (
                        <div className="bg-red-600 text-white px-3 py-1 rounded-full flex items-center space-x-1">
                          <Youtube size={16} />
                          <span className="text-sm">Video</span>
                        </div>
                      ) : (
                        <div className="bg-blue-600 text-white px-3 py-1 rounded-full flex items-center space-x-1">
                          <Newspaper size={16} />
                          <span className="text-sm">News</span>
                        </div>
                      )}
                    </div>

                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    {item.description && (
                      <p className="text-gray-300 mb-4">{item.description}</p>
                    )}
                    {item.source && (
                      <div className="text-gray-400 mb-4">{item.source} • {item.date}</div>
                    )}
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-primary hover:text-primary-dark transition-colors"
                    >
                      <span>View Original</span>
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        #recognitions-container::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default Recognitions;