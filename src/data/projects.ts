export interface Project {
  title: string
  description: string
  image: string
  stats: {
    views?: string
    users?: string
    featured?: string
    clients?: string
  }
  tags: string[]
  links: {
    demo: string
    github?: string
  }
}

export const projects: Project[] = [
  {
    title: "SantaCallingAI",
    description:
      "Voice-based AI Santa Claus interactive experience that reached users globally during the holiday season.",
    image: "/images/santa.jpg",
    stats: {
      views: "55k+",
      featured: "Indian Express",
    },
    tags: ["Voice AI", "React", "Interactive Experience"],
    links: {
      demo: "https://www.santacallingai.com",
    },
  },
  /*   {
    title: "DialToAI",
    description:
      "Restaurant management voice AI system that handles orders and customer inquiries over phone calls.",
    image: "/images/dialtoai.png",
    stats: {
      clients: "Multiple from Canada",
    },
    tags: ["Voice AI", "Restaurant Tech", "Automation"],
    links: {
      demo: "https://www.dialtoai.com",
    },
  }, */
  {
    title: "Voaiz.com",
    description:
      "B2B AI voice agent platform for sales/support automation with company-specific training capabilities.",
    image: "/images/voaiz.png",
    stats: {
      featured: "In Testing",
    },
    tags: ["B2B", "Voice AI", "Sales Automation"],
    links: {
      demo: "https://www.voaiz.com",
    },
  },
  {
    title: "OutfitifAI",
    description:
      "Virtual try-on platform for fashion retailers with AI-powered costume visualization.",
    image: "/images/outfitifai.png",
    stats: {
      featured: "In Discussion with Retailers",
    },
    tags: ["Fashion Tech", "AI Visualization", "React"],
    links: {
      demo: "https://outfitifai.vercel.app",
    },
  },
  {
    title: "RoastYourFriend",
    description:
      "Interactive AI voice agent for comedic roasts with GTA-inspired user experience.",
    image: "/images/ryf.png",
    stats: {
      users: "8k+",
    },
    tags: ["Voice AI", "Entertainment", "Interactive"],
    links: {
      demo: "https://roast2-0.vercel.app",
    },
  },
  {
    title: "TalkToJesus",
    description:
      "Bible-based AI voice interaction platform designed with respect for religious sensitivities.",
    image: "/images/taktojesus.png",
    stats: {
      featured: "Religious Tech",
    },
    tags: ["Voice AI", "Religious", "Interactive"],
    links: {
      demo: "https://talktojesus.vercel.app",
    },
  },
  {
    title: "Android Kunjappan AI",
    description:
      "3D virtual assistant inspired by Malayalam cinema with interactive voice capabilities.",
    image: "/images/androidkunjappan.png",
    stats: {
      featured: "Early Voice AI",
    },
    tags: ["3D", "Voice AI", "Cultural Tech"],
    links: {
      demo: "https://android-kunjjappan.netlify.app",
    },
  },
  {
    title: "Prettier Telegram Bot",
    description: "Text editing and enhancement telegram bot powered by GPT",
    image: "/images/prettier.png",
    stats: {
      users: "500+",
    },
    tags: ["Telegram Bot", "Text Processing", "Automation"],
    links: {
      demo: "https://t.me/prettier_text_bot",
    },
  },
]
