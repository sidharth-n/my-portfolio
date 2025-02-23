import React, { useRef } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import {
  Youtube,
  Newspaper,
  Award,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

const Recognitions: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const recognitions = [
    {
      type: "news",
      title: `Ho ho ho! This X'mas, spread joy with personalised Santa greetings`,
      source: "The New Indian Express",
      date: "December 22, 2024",
      link: "https://www.newindianexpress.com/states/kerala/2024/Dec/22/ho-ho-ho-this-xmas-spread-joy-with-personalised-santa-greetings",
    },
    {
      type: "news",
      title: "Kerala Youth's AI-based Santa App Goes Global",
      source: "Uni India",
      date: "December 19, 2024",
      link: "https://www.uniindia.com/kerala-youths-ai-based-santa-app-goes-global/south/news/3349665.html",
    },
    {
      type: "news",
      title: "Kerala Youth's AI-driven Santa App Achieves Global Recognition",
      source: "Technopark Today",
      date: "December 19, 2024",
      link: "https://www.technoparktoday.com/kerala-youths-ai-based-santa-app-goes-global/",
    },
    {
      type: "video",
      videoId: "srvm0IYu12k",
      link: "https://youtu.be/srvm0IYu12k?si=KLhvCpnjzfn2_a5I",
    },
    {
      type: "video",
      videoId: "AEGuDxrbX8E",
      link: "https://youtu.be/AEGuDxrbX8E?si=Rrv0IQleyfSIJK1W",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { x: 20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
    },
  }

  const scroll = (direction: "left" | "right") => {
    if (!containerRef.current) return

    const container = containerRef.current
    const cardWidth = container.offsetWidth
    const scrollLeft = container.scrollLeft
    const scrollWidth = container.scrollWidth

    let targetScroll: number
    if (direction === "left") {
      targetScroll = Math.max(
        0,
        Math.floor(scrollLeft / cardWidth) * cardWidth - cardWidth
      )
    } else {
      targetScroll = Math.min(
        scrollWidth - cardWidth,
        Math.ceil(scrollLeft / cardWidth) * cardWidth + cardWidth
      )
    }

    container.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    })
  }

  return (
    <section
      id="recognitions"
      className="section-padding relative overflow-hidden"
    >
      <div
        className="section-bg"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000")',
        }}
      />
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
            <h2 className="text-4xl font-bold mb-4 gradient-text">
              Recognitions
            </h2>
            {/*     <p className="text-gray-300 max-w-2xl mx-auto">
              Honored by industry leaders and featured in prominent media for
              innovative AI solutions.
            </p> */}
          </div>

          {/* News Articles List */}
          <div className="space-y-4">
            {recognitions
              .filter(item => item.type === "news")
              .map(item => (
                <div
                  key={item.title}
                  className="flex items-start p-6 bg-gray-800 rounded-lg shadow-lg transition-transform transform hover:scale-105"
                >
                  <div className="mr-4">
                    <Newspaper size={28} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1 text-white">
                      {item.title}
                    </h3>
                    <div className="text-gray-400 mb-2">
                      {item.source} • {item.date}
                    </div>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-primary hover:text-primary-dark transition-colors"
                    >
                      <span className="text-sm">View Original</span>
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              ))}
          </div>

          {/* Video Gallery */}
          <div className="relative group">
            <div className="flex overflow-x-auto space-x-6 pb-6 snap-x snap-mandatory scroll-smooth scrollbar-hide">
              {recognitions
                .filter(item => item.type === "video")
                .map(item => (
                  <motion.div
                    key={item.videoId}
                    variants={itemVariants}
                    className="flex-none w-full md:w-[600px] snap-center bg-dark/80 backdrop-blur-sm rounded-xl overflow-hidden card-hover"
                  >
                    <div className="relative pt-[56.25%]">
                      <iframe
                        className="absolute inset-0 w-full h-full"
                        src={`https://www.youtube.com/embed/${item.videoId}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
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
  )
}

export default Recognitions
