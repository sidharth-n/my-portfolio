import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Youtube, Newspaper, Award, ExternalLink } from 'lucide-react';

const MediaCoverage: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const mediaCoverage = [
    {
      type: 'news',
      title: `Ho ho ho! This X'mas, spread joy with personalised Santa greetings`,
      source: 'The New Indian Express',
      date: 'December 22, 2024',
      link: 'https://www.newindianexpress.com/states/kerala/2024/Dec/22/ho-ho-ho-this-xmas-spread-joy-with-personalised-santa-greetings',
      image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=800'
    },
    {
      type: 'video',
      title: 'Kerala Startup Mission CEO Recognition',
      description: 'Acknowledged by Kerala Startup Mission CEO Anoop Ambika',
      link: 'https://youtu.be/srvm0IYu12k?si=KLhvCpnjzfn2_a5I',
      thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=800'
    },
    {
      type: 'recognition',
      title: 'Kerala Industries Minister Acknowledgment',
      description: 'Recognition from P. Rajeev, Minister for Industries',
      link: 'https://youtu.be/AEGuDxrbX8E?si=Rrv0IQleyfSIJK1W',
      thumbnail: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800'
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <section id="media" className="section-padding relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed bg-no-repeat"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000")',
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
            <h2 className="text-4xl font-bold mb-4 gradient-text">Media Coverage</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Featured in prominent media outlets and recognized by industry leaders for innovative AI solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mediaCoverage.map((item) => (
              <motion.div
                key={item.title}
                variants={itemVariants}
                className="bg-dark/80 backdrop-blur-sm rounded-xl overflow-hidden card-hover"
              >
                <div className="relative h-48">
                  <img
                    src={item.type === 'news' ? item.image : item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-60" />
                  <div className="absolute top-4 right-4">
                    {item.type === 'video' && (
                      <div className="bg-red-600 text-white px-3 py-1 rounded-full flex items-center space-x-1">
                        <Youtube size={16} />
                        <span className="text-sm">Video</span>
                      </div>
                    )}
                    {item.type === 'news' && (
                      <div className="bg-blue-600 text-white px-3 py-1 rounded-full flex items-center space-x-1">
                        <Newspaper size={16} />
                        <span className="text-sm">News</span>
                      </div>
                    )}
                    {item.type === 'recognition' && (
                      <div className="bg-yellow-600 text-white px-3 py-1 rounded-full flex items-center space-x-1">
                        <Award size={16} />
                        <span className="text-sm">Recognition</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="p-6">
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
                    <span>View {item.type === 'video' ? 'Video' : 'Article'}</span>
                    <ExternalLink size={16} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MediaCoverage;