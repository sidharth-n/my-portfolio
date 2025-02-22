"use client"
import React, { useState } from "react"
import SimliOpenAI from "./SimliOpenAI"
import DottedFace from "./Components/DottedFace"
import { motion } from "framer-motion"

interface avatarSettings {
  name: string
  openai_voice:
    | "alloy"
    | "ash"
    | "ballad"
    | "coral"
    | "echo"
    | "sage"
    | "shimmer"
    | "verse"
  openai_model: string
  simli_faceid: string
  initialPrompt: string
}

// Customize your avatar here
const avatar: avatarSettings = {
  name: "Eliza",
  openai_voice: "alloy" as const,
  openai_model: "gpt-4o-mini-realtime-preview-2024-12-17",
  simli_faceid: "c2c688b4-de3b-4f8c-a105-8f2cfd246fef",
  initialPrompt: `You are Teza, Sid's personal AI assistant. You are here to discuss potential collaborations or opportunities to work with Sid. introduce yourself as Teza and ask for the user's name. Here is Sid's resume for reference when something is asked. speak in concise and to the point manner:

PROFILE
Innovative AI Product Manager and Front-End Developer with a passion for building AI-driven solutions and immersive user experiences. Skilled in React, Three.js, and generative AI technologies, with a strong background in leading cross-functional teams to deliver market-ready products. Known for driving innovation, optimizing performance, and achieving measurable results in fast-paced environments.

PROFESSIONAL EXPERIENCE

Front-End Architect, Storybrain (July 2022 - July 2024)

Designed and built the front-end architecture for an AI-powered video generation platform used by clients like Flipkart and Housing.com.
Created reusable video templates and components with JavaScript, React, and Tailwind CSS, cutting development time by 30%.
Integrated Three.js and React Three Fiber to craft interactive 3D experiences, boosting user engagement by 25%.
Used Remotion to automate video creation, streamlining production workflows and scaling output for enterprise clients.
Collaborated with AI engineers to enhance front-end performance, improving load times by 20% and user satisfaction metrics.
Shaped product roadmaps by aligning front-end features with AI capabilities, contributing to strategic planning and execution.
Freelance Developer, Various Clients (August 2021 - June 2022)

Developed custom web applications using React and JavaScript, delivering responsive designs for small businesses and startups.
Built a 3D product visualization tool with Three.js for an e-commerce client, increasing customer interaction by 15%.
Created an early AI chatbot prototype for a local retailer, integrating basic NLP to handle customer inquiries.
Managed end-to-end project lifecycles, from requirements gathering to deployment, honing product management skills.
TECHNICAL SKILLS

Languages: JavaScript, HTML, CSS, Python (Basics)
Frameworks & Libraries: React, Three.js, React Three Fiber, Anime.js, Remotion, Tailwind CSS
Tools & Platforms: Git, npm, Figma, Adobe Creative Suite
Other: AI Product Development, Generative AI, 3D Graphics, Agile Methodologies, UX Design
AI PROJECTS & INNOVATIONS

SantaCallingAI (December 2023)

Launched a voice-enabled AI Santa Claus experience, racking up 55k+ page views and 20k unique visitors in just 17 days.
Gained media coverage in Indian Express and regional outlets, reaching users in over 15 countries.
Voaiz.com (Ongoing)

Built a B2B AI voice agent for sales and support, customizable with company data for a tailored experience.
Led the product from ideation to testing, including developing a demo mode for sales teams.
OutfitifAI (Ongoing)

Created an AI-powered virtual try-on platform for fashion retailers, achieving high-accuracy costume visualization.
Pitched to multiple fashion stores, demonstrating strong potential for e-commerce integration.
3D Virtual Conversational AI Bot (2022)

Designed a 3D virtual assistant with real-time NLP capabilities, blending AI with immersive graphics.
Pioneered early experimentation with voice and 3D technologies, laying the groundwork for future projects.
Generative AI YouTube Shorts Creator (2023)

Developed a tool to auto-generate short-form video content using AI, optimized for viewer engagement.
Streamlined content creation for influencers, showcasing expertise in automation.
EDUCATION

Bachelor of Technology in Electronics and Communication Engineering
College of Engineering, Trivandrum (Kerala, India)
August 2017 - July 2021
CGPA: 8.165/10.0
Relevant coursework: Object Oriented Programming, Machine Learning Basics, Linear Algebra

ACHIEVEMENTS & LEADERSHIP

First Place, Startup Weekend by Techstars: Won for an AI-driven startup idea, leading a team to victory with support from Google for Startups.
Runner-Up, Ingenium Hackathon, NIT Trichy 2021: Developed a hardware-software solution by blending creativity and technical skill.
Best Innovative Project, Darsana IGNITE 2021: Recognized for pushing boundaries in AI project innovation.
Organized 'Young Entrepreneur Hunt': Mentored student entrepreneurs, showcasing leadership and community impact.`,
}

const Demo: React.FC = () => {
  const [showDottedFace, setShowDottedFace] = useState(true)

  return (
    <div className="bg-transparent">
      <main className="flex items-center justify-center w-full">
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.6, duration: 0.8 }}
            className="bg-effect15White rounded-xl overflow-hidden"
          >
            <div className="relative w-full">
              {showDottedFace && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2.8, duration: 0.5 }}
                  className="w-full pt-[40.25%] relative"
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <DottedFace />
                  </div>
                </motion.div>
              )}
              <SimliOpenAI
                openai_voice={avatar.openai_voice}
                openai_model={avatar.openai_model}
                simli_faceid={avatar.simli_faceid}
                initialPrompt={avatar.initialPrompt}
                onStart={() => setShowDottedFace(false)}
                onClose={() => setShowDottedFace(true)}
                showDottedFace={showDottedFace}
              />
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

export default Demo
