import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { Menu, X, Brain, Code, Award, Mail } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Skills', icon: Brain },
    { name: 'Projects', icon: Code },
    { name: 'Recognitions', icon: Award },
    { name: 'Contact', icon: Mail },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-dark-light/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to="hero"
            smooth={true}
            duration={500}
            className="text-2xl font-montserrat font-bold gradient-text cursor-pointer"
          >
            Sid
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(({ name, icon: Icon }) => (
              <Link
                key={name}
                to={name.toLowerCase()}
                smooth={true}
                duration={500}
                className="flex items-center space-x-2 text-gray-300 hover:text-primary cursor-pointer"
              >
                <Icon size={18} />
                <span>{name}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-primary"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-dark-light rounded-lg mt-2">
              {navItems.map(({ name, icon: Icon }) => (
                <Link
                  key={name}
                  to={name.toLowerCase()}
                  smooth={true}
                  duration={500}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-300 hover:text-primary hover:bg-gray-800 cursor-pointer"
                >
                  <Icon size={18} />
                  <span>{name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;