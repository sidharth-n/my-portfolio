import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, Github, Twitter, Linkedin, MessageSquare } from 'lucide-react';

const Contact: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const contactInfo = {
    email: 'sidharthnofficial@gmail.com',
    phone: '+918848663072',
    social: {
      github: 'https://github.com/sidharth-n',
      twitter: 'https://x.com/sid_ai_dev?s=21',
      linkedin: 'https://www.linkedin.com/in/sidharth-n-52828b226',
    }
  };

  const whatsappMessage = encodeURIComponent("Hey, I'm interested in discussing potential opportunities with you!");

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div className="section-bg" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&q=80&w=2000")' }} />
      <div className="section-overlay" />
      <div className="section-glow" />

      <div className="max-w-4xl mx-auto relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4 gradient-text">Let's Connect</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Whether you're looking to collaborate on an AI project, discuss tech innovations, or explore opportunities, I'm just a message away.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Quick Contact Options */}
            <div className="space-y-6">
              <div className="bg-dark/80 backdrop-blur-sm p-6 rounded-xl neon-border">
                <h3 className="text-xl font-semibold mb-4 gradient-text">Quick Connect</h3>
                <div className="space-y-4">
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="flex items-center space-x-3 text-gray-300 hover:text-primary transition-colors p-2 rounded-lg hover:bg-dark-light/50"
                  >
                    <Mail className="w-5 h-5" />
                    <span>{contactInfo.email}</span>
                  </a>
                  <a
                    href={`https://wa.me/${contactInfo.phone.replace('+', '')}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-gray-300 hover:text-primary transition-colors p-2 rounded-lg hover:bg-dark-light/50"
                  >
                    <MessageSquare className="w-5 h-5" />
                    <span>Message on WhatsApp</span>
                  </a>
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="flex items-center space-x-3 text-gray-300 hover:text-primary transition-colors p-2 rounded-lg hover:bg-dark-light/50"
                  >
                    <Phone className="w-5 h-5" />
                    <span>{contactInfo.phone}</span>
                  </a>
                </div>
              </div>

              <div className="bg-dark/80 backdrop-blur-sm p-6 rounded-xl neon-border">
                <h3 className="text-xl font-semibold mb-4 gradient-text">Social Links</h3>
                <div className="grid grid-cols-3 gap-4">
                  <a
                    href={contactInfo.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center p-4 rounded-lg hover:bg-dark-light/50 transition-colors group"
                  >
                    <Github className="w-6 h-6 text-gray-400 group-hover:text-primary transition-colors" />
                    <span className="mt-2 text-sm text-gray-400 group-hover:text-primary transition-colors">GitHub</span>
                  </a>
                  <a
                    href={contactInfo.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center p-4 rounded-lg hover:bg-dark-light/50 transition-colors group"
                  >
                    <Twitter className="w-6 h-6 text-gray-400 group-hover:text-primary transition-colors" />
                    <span className="mt-2 text-sm text-gray-400 group-hover:text-primary transition-colors">Twitter</span>
                  </a>
                  <a
                    href={contactInfo.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center p-4 rounded-lg hover:bg-dark-light/50 transition-colors group"
                  >
                    <Linkedin className="w-6 h-6 text-gray-400 group-hover:text-primary transition-colors" />
                    <span className="mt-2 text-sm text-gray-400 group-hover:text-primary transition-colors">LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-dark/80 backdrop-blur-sm p-6 rounded-xl neon-border">
              <h3 className="text-xl font-semibold mb-4 gradient-text">Send a Message</h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 bg-dark/50 rounded-lg border border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary text-gray-100"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 bg-dark/50 rounded-lg border border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary text-gray-100"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 bg-dark/50 rounded-lg border border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary text-gray-100"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-primary hover:bg-primary-dark text-dark font-semibold rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2"
                >
                  <Mail size={18} />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;