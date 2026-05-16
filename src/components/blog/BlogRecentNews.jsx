import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, ArrowRight, MapPin, Share2, Users, ChevronLeft, ChevronRight } from 'lucide-react';

const BlogRecentNews = ({ recentNews, currentSlide, setCurrentSlide, totalSlides, nextSlide, prevSlide }) => {
  const itemsPerSlide = 5;
  const safeRecentNews = recentNews && Array.isArray(recentNews) ? recentNews : [];
  const displayedNews = safeRecentNews.slice(
    currentSlide * itemsPerSlide,
    (currentSlide + 1) * itemsPerSlide
  );

  const getLink = (item) => {
    return item?.type === 'event' ? `/event/${item.slug || item.id}` : `/blog/${item.slug || item.id}`;
  };

  const defaultImage = 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop';

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <span className="text-small text-accent">Actualités</span>
          <h2 className="text-h2-m md:text-h2-d text-primary mt-2">Actualités récentes</h2>
          <p className="text-text-muted mt-3 max-w-2xl">
            Découvrez nos dernières nouvelles, événements et formations pour rester informé des avancées dans le domaine de la gouvernance d'entreprise, de la comptabilité et du droit OHADA.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedNews.map((item, index) => {
            const isFeatured = index === 0 && currentSlide === 0;
            
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={isFeatured ? 'lg:col-span-2' : ''}
              >
                <Link 
                  to={getLink(item)}
                  className="block bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300 h-full"
                >
                  <div className={`flex ${isFeatured ? 'flex-col lg:flex-row' : 'flex-col'} h-full`}>
                    <div className={`relative ${isFeatured ? 'lg:w-[45%] h-56 lg:h-auto min-h-[280px]' : 'h-40'} overflow-hidden flex-shrink-0`}>
                      <img 
                        src={item?.image || defaultImage} 
                        alt={item?.title || 'News'}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent lg:bg-gradient-to-r" />
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1.5 text-xs font-medium rounded-full ${
                          item?.type === 'event' ? 'bg-accent text-white' : 'bg-primary text-white'
                        }`}>
                          {item?.type === 'event' ? 'Événement' : 'Article'}
                        </span>
                      </div>
                    </div>
                    
                    <div className={`p-5 flex flex-col justify-between ${isFeatured ? 'lg:w-[55%]' : ''}`}>
                      <div className="mb-4">
                        <h3 className={`font-bold text-primary mb-3 group-hover:text-accent transition-colors ${isFeatured ? 'text-xl lg:text-2xl line-clamp-2' : 'text-base line-clamp-2'} leading-tight`}>
                          {item?.title || 'Titre'}
                        </h3>
                        
                        {item?.excerpt && (
                          <p className={`text-sm text-text-muted leading-relaxed ${isFeatured ? 'line-clamp-5' : 'line-clamp-3'}`}>{item.excerpt}</p>
                        )}
                        
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-text-muted mt-3">
                          <div className="flex items-center gap-2">
                            <Calendar size={14} className="text-accent" />
                            <span>{item?.date || ''}</span>
                          </div>
                          {item?.type === 'event' ? (
                            <>
                              <div className="flex items-center gap-2">
                                <Clock size={14} className="text-accent" />
                                <span>{item?.time || ''}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin size={14} className="text-accent" />
                                <span>{item?.location || ''}</span>
                              </div>
                            </>
                          ) : (
                            <div className="flex items-center gap-2">
                              <Clock size={14} />
                              <span>{item?.readTime || '5 min'}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {item?.type === 'event' ? (
                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                              <Users size={12} className="text-green-600" />
                            </div>
                            <span className="text-sm font-medium text-green-600">
                              {item?.registered || 0} inscrit{(item?.registered || 0) > 1 ? 's' : ''}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <button className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-accent hover:text-white transition-colors">
                              <Share2 size={16} />
                            </button>
                            <button className="py-2 px-4 bg-accent text-white text-sm font-medium rounded-full hover:bg-orange-400 transition-colors flex items-center gap-2">
                              Voir <ArrowRight size={14} />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 bg-primary/10 rounded-full flex items-center justify-center">
                              <User size={14} className="text-primary" />
                            </div>
                            <span className="text-sm font-medium text-primary">{item?.author || 'Auteur'}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-accent hover:text-white transition-colors">
                              <Share2 size={14} />
                            </button>
                            <span className="text-accent text-sm font-medium flex items-center gap-1">
                              Lire <ArrowRight size={14} />
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="flex items-center justify-between mt-8 pt-4 border-t border-gray-100">
          <span className="text-sm text-text-muted">
            Page {currentSlide + 1} sur {totalSlides}
          </span>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
                currentSlide === 0 
                  ? 'border-gray-200 text-gray-300 cursor-not-allowed' 
                  : 'border-gray-300 text-primary hover:border-accent hover:bg-accent hover:text-white'
              }`}
            >
              <ChevronLeft size={18} />
            </button>
            
            <div className="flex items-center gap-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`transition-all duration-300 ${
                    currentSlide === index 
                      ? 'w-6 bg-accent' 
                      : 'w-2 bg-gray-300 hover:bg-accent/50'
                  } h-2 rounded-full`}
                />
              ))}
            </div>
            
            <button 
              onClick={nextSlide}
              disabled={currentSlide === totalSlides - 1}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                currentSlide === totalSlides - 1 
                  ? 'border border-gray-200 text-gray-300 cursor-not-allowed' 
                  : 'bg-primary text-white hover:bg-accent'
              }`}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogRecentNews;
