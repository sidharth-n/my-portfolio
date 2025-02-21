import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, Users, Eye, Award } from 'lucide-react';
import { projects } from '../data/projects';

const Projects: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
    <section id="projects" className="section-padding relative overflow-hidden">
      <div className="section-bg" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1465101162946-4377e57745c3?auto=format&fit=crop&q=80&w=2000")' }} />
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
            <h2 className="text-4xl font-bold mb-4 gradient-text">Featured Projects</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              A showcase of innovative solutions that combine technical excellence with real-world impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <motion.div
                key={project.title}
                variants={itemVariants}
                className="bg-dark/80 backdrop-blur-sm rounded-xl overflow-hidden card-hover"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-60" />
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {project.stats.views && (
                        <div className="flex items-center space-x-1 text-gray-300">
                          <Eye size={16} />
                          <span>{project.stats.views}</span>
                        </div>
                      )}
                      {project.stats.users && (
                        <div className="flex items-center space-x-1 text-gray-300">
                          <Users size={16} />
                          <span>{project.stats.users}</span>
                        </div>
                      )}
                      {project.stats.featured && (
                        <div className="flex items-center space-x-1 text-gray-300">
                          <Award size={16} />
                          <span>{project.stats.featured}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex space-x-3">
                      {project.links.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-300 hover:text-primary transition-colors"
                        >
                          <Github size={20} />
                        </a>
                      )}
                      <a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-primary transition-colors"
                      >
                        <ExternalLink size={20} />
                      </a>
                    </div>
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

export default Projects;