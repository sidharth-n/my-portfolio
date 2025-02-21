import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Palette, Layout, Users, Code, Cpu, Box } from 'lucide-react';

const Skills: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skills = [
    {
      category: 'Creative Development',
      icon: Palette,
      items: ['Anime.js', 'Remotion', 'Figma', 'Motion Design', 'Interactive Animations'],
    },
    {
      category: '3D & Frontend',
      icon: Box,
      items: ['Three.js', 'Blender', 'React', 'JavaScript', 'Tailwind CSS'],
    },
    {
      category: 'Team Leadership',
      icon: Users,
      items: ['Project Planning', 'Team Coordination', 'Resource Management', 'Client Communication', 'Stakeholder Management'],
    },
    {
      category: 'Development Tools',
      icon: Code,
      items: ['Git', 'VS Code', 'Cursor', 'Chrome DevTools', 'npm'],
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
    <section id="skills" className="section-padding relative overflow-hidden">
      <div className="section-bg" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&q=80&w=2000")' }} />
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
            <h2 className="text-4xl font-bold mb-4 gradient-text">Technical Arsenal</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Crafting immersive digital experiences through creative development, 3D visualization, and innovative frontend solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skill) => (
              <motion.div
                key={skill.category}
                variants={itemVariants}
                className="bg-dark/80 backdrop-blur-sm p-6 rounded-xl neon-border transform hover:scale-105 transition-transform duration-300"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <skill.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{skill.category}</h3>
                </div>
                <ul className="space-y-3">
                  {skill.items.map((item) => (
                    <li key={item} className="text-gray-300 flex items-center space-x-2">
                      <Cpu className="w-4 h-4 text-primary-dark" />
                      <span className="hover:text-primary transition-colors">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;