import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, GraduationCap, Video } from 'lucide-react';

const BlogHero = ({ featuredEvent }) => {
  const eventLink = featuredEvent?.slug ? `/formations/${featuredEvent.slug}` : '#';
  
  return (
    <section className="relative bg-gradient-to-r from-primary via-[#0d4a6e] to-primary overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-2xl" />
      </div>
      
      <div className="max-w-container mx-auto px-4 py-12 md:py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col justify-end"
          >
            <Link to={eventLink}>
              <div className="flex items-center gap-2 mb-3 cursor-pointer">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-4 h-4 text-white" />
                </div>
                <span className="text-accent font-medium text-sm">FORMATION À LA UNE</span>
              </div>
              
              <div className="inline-flex self-start px-3 py-1 bg-accent text-white text-xs font-medium rounded-full mb-4">
                {featuredEvent.type}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight cursor-pointer hover:text-accent transition-colors">
                {featuredEvent.title}
              </h2>
              <div className="flex flex-wrap gap-4 text-white/80 text-sm mb-6">
                <span className="flex items-center gap-2">
                  <Calendar size={16} className="text-accent" />
                  {featuredEvent.date}
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={16} className="text-accent" />
                  {featuredEvent.time}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin size={16} className="text-accent" />
                  {featuredEvent.location}
                </span>
              </div>
            </Link>
            <div className="flex items-center gap-4">
              <Link to={eventLink}>
                <button className="px-6 py-3 bg-accent text-white font-medium rounded-full hover:bg-orange-400 transition-colors">
                  Voir les détails
                </button>
              </Link>
              <div className="flex -space-x-2">
                {[...Array(3)].map((_, i) => (
                  <img 
                    key={i}
                    src={`https://i.pravatar.cc/150?img=${i + 10}`}
                    alt={`Participant ${i + 1}`}
                    className="w-8 h-8 rounded-full border-2 border-primary object-cover"
                  />
                ))}
                <div className="w-8 h-8 rounded-full bg-accent border-2 border-primary flex items-center justify-center">
                  <span className="text-white text-xs font-medium">+{featuredEvent.registered}</span>
                </div>
              </div>
              <span className="text-white/60 text-sm">{featuredEvent.registered}/{featuredEvent.spots} places</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <Link to={eventLink}>
              <div className="relative rounded-2xl overflow-hidden cursor-pointer">
                <img 
                  src={featuredEvent.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop'} 
                  alt={featuredEvent.title}
                  className="w-full h-64 md:h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="flex items-center gap-2 text-white text-sm">
                    <Video size={16} />
                    {featuredEvent.format}
                  </span>
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full">
                    Prochain événement
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BlogHero;