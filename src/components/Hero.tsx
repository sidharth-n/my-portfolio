import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Github,
  Linkedin,
  Twitter,
  FileDown,
  MessageSquare,
} from "lucide-react"
import Demo from "./AiAssistant"

const Hero: React.FC = () => {
  const [displayText, setDisplayText] = useState("")
  const [roleIndex, setRoleIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const [currentRole, setCurrentRole] = useState("")

  const roles = ["AI Product Manager", "Front-End Developer"]
  const greeting = "Hello World! I'm Sid"
  const typingSpeed = 100
  const eraseSpeed = 50
  const roleDelay = 1000

  const socialLinks = {
    github: "https://github.com/sidharth-n",
    twitter: "https://x.com/sid_ai_dev?s=21",
    linkedin: "https://www.linkedin.com/in/sidharth-n-52828b226",
    cv: "/Sidharth_N_CV.pdf",
  }

  // Typing animation for greeting
  useEffect(() => {
    let currentIndex = 0
    const timer = setInterval(() => {
      if (currentIndex <= greeting.length) {
        setDisplayText(greeting.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(timer)
      }
    }, typingSpeed)
    return () => clearInterval(timer)
  }, [])

  // Typing animation for roles
  useEffect(() => {
    let timer: NodeJS.Timeout

    const typeRole = () => {
      const role = roles[roleIndex]
      let currentIndex = 0
      let isErasing = false

      const animate = () => {
        if (!isErasing) {
          if (currentIndex <= role.length) {
            setCurrentRole(role.slice(0, currentIndex))
            currentIndex++
            timer = setTimeout(animate, typingSpeed)
          } else {
            timer = setTimeout(() => {
              isErasing = true
              animate()
            }, roleDelay)
          }
        } else {
          if (currentIndex >= 0) {
            setCurrentRole(role.slice(0, currentIndex))
            currentIndex--
            timer = setTimeout(animate, eraseSpeed)
          } else {
            setRoleIndex(prev => (prev + 1) % roles.length)
            isErasing = false
            timer = setTimeout(animate, roleDelay)
          }
        }
      }

      animate()
    }

    typeRole()
    return () => clearTimeout(timer)
  }, [roleIndex])

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden section-padding"
    >
      <div
        className="section-bg"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=2000")',
        }}
      />
      <div className="section-overlay" />
      <div className="section-glow" />

      <div className="max-w-7xl mx-auto relative z-10 w-full px-4">
        <div className="text-center space-y-8 md:space-y-12">
          {/* Retro Computer Terminal */}
          <div className="bg-dark-light/30 backdrop-blur-sm p-4 md:p-8 rounded-lg border border-primary/20 shadow-[0_0_15px_rgba(34,211,238,0.2)] max-w-3xl mx-auto">
            {/* Terminal Header */}
            <div className="flex items-center justify-between mb-4 border-b border-primary/20 pb-2">
              <div className="flex space-x-2">
                <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-500/50"></div>
                <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-500/50"></div>
              </div>
              <div className="text-primary/50 text-xs md:text-sm">
                terminal@sid:~
              </div>
            </div>

            {/* Terminal Content */}
            <div className="font-mono space-y-4">
              <div className="flex items-center space-x-2 text-primary mb-4 md:mb-6 justify-center">
                <span className="text-primary/50">$</span>
                <span
                  className="text-lg md:text-2xl lg:text-4xl break-words"
                  style={{ textShadow: "0 0 10px rgba(34,211,238,0.5)" }}
                >
                  {displayText}
                  <span className="animate-pulse">_</span>
                </span>
              </div>

              <div
                className="text-base md:text-xl lg:text-3xl text-cyan-400 break-words"
                style={{ textShadow: "0 0 10px rgba(34,211,238,0.3)" }}
              >
                {currentRole}
                <span className="animate-pulse">|</span>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 0.8 }}
                className="text-base md:text-lg lg:text-xl text-gray-400 mt-4 md:mt-6"
              >
                Building Towards Singularity
              </motion.div>
            </div>
          </div>

          {/* AI Assistant - directly show it */}
          <div className="max-w-4xl mx-auto">
            <Demo />
          </div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-3 md:gap-6"
          >
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 md:px-6 py-2 md:py-3 bg-dark-light/30 backdrop-blur-sm rounded-full hover:bg-dark-light/50 transition-colors border border-primary/20"
            >
              <Github size={16} className="text-primary" />
              <span className="text-sm md:text-base">GitHub</span>
            </a>
            <a
              href={socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 md:px-6 py-2 md:py-3 bg-dark-light/30 backdrop-blur-sm rounded-full hover:bg-dark-light/50 transition-colors border border-primary/20"
            >
              <Twitter size={16} className="text-primary" />
              <span className="text-sm md:text-base">Twitter</span>
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 md:px-6 py-2 md:py-3 bg-dark-light/30 backdrop-blur-sm rounded-full hover:bg-dark-light/50 transition-colors border border-primary/20"
            >
              <Linkedin size={16} className="text-primary" />
              <span className="text-sm md:text-base">LinkedIn</span>
            </a>
          </motion.div>

          {/* CV Download Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.5, duration: 0.8 }}
          >
            <motion.a
              href={socialLinks.cv}
              download
              className="inline-flex items-center space-x-2 px-3 md:px-4 py-2 bg-primary/10 rounded-full border border-primary/20 hover:bg-primary/20 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FileDown size={14} className="text-primary" />
              <span className="text-primary text-xs md:text-sm">
                Download CV
              </span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
