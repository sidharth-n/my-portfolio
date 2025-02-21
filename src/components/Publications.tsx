import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BookOpen, Calendar, ExternalLink } from 'lucide-react';

const Publications: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const publications = [
    {
      title: 'The Future of AI in Healthcare',
      journal: 'Indian Express',
      date: 'March 2024',
      description: 'An in-depth analysis of how AI is transforming healthcare delivery and patient care.',
      link: '#',
    },
    {
      title: 'Voice AI: The Next Frontier in Human-Computer Interaction',
      journal: 'Tech Magazine',
      date: 'January 2024',
      description: 'Exploring the potential of voice AI technology in creating more natural user interfaces.',
      link: '#',
    },
    {
      title: 'Building Ethical AI Systems',
      journal: 'AI Ethics Journal',
      date: 'December 2023',
      description: 'A comprehensive guide to developing AI systems with ethical considerations at their core.',
      link: '#',
    },
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <section id="publications" className="section-padding relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed bg-no-repeat"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&q=80&w=2000")',
        }}
      >
        <div className="absolute inset-0 bg-dark/75" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="space-y-12"
        >
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4 gradient-text">Publications</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Sharing insights and expertise through research and thought leadership in AI and technology.
            </p>
          </div>

          <div className="space-y-6">
            {publications.map((pub) => (
              <motion.div
                key={pub.title}
                variants={itemVariants}
                className="bg-dark/80 backdrop-blur-sm p-6 rounded-xl neon-border"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <BookOpen className="w-5 h-5 text-primary" />
                      <h3 className="text-xl font-semibold">{pub.title}</h3>
                    </div>
                    <div className="flex items-center space-x-4 text-gray-300">
                      <span className="font-medium">{pub.journal}</span>
                      <div className="flex items-center space-x-1">
                        <Calendar size={14} />
                        <span>{pub.date}</span>
                      </div>
                    </div>
                    <p className="text-gray-300">{pub.description}</p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <a
                      href={pub.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-primary hover:text-primary-dark transition-colors"
                    >
                      <span>Read Article</span>
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Publications;