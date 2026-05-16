import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, ArrowRight, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlogArticles = ({ posts, currentPostsSlide, setCurrentPostsSlide, totalPostsSlides, nextPostsSlide, prevPostsSlide }) => {
  const postsPerSlide = 3;
  const safePosts = posts && Array.isArray(posts) ? posts : [];
  const displayedPosts = safePosts.slice(
    currentPostsSlide * postsPerSlide,
    (currentPostsSlide + 1) * postsPerSlide
  );

  // Fallback image
  const defaultImage = 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop';

  return (
    <div className="relative">
      <section className="py-16 md:py-24 min-h-[500px] bg-gray-50">
        <div className="max-w-container mx-auto px-4 pb-48">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-h2-m md:text-h2-d text-primary">Articles de blog</h2>
            <p className="text-text-muted mt-3 max-w-2xl">
              Explorez nos articles approfondis sur la gouvernance d'entreprise, la comptabilité, le droit des affaires et bien plus encore.
            </p>
          </motion.div>

          {/* Blog Grid - 3 Columns */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedPosts.map((post, index) => (
              <Link to={`/blog/${post.slug || post.id}`} key={post.id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="group h-full"
                >
                  <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all duration-300 h-full flex flex-col">
                    {/* Column 1: Image */}
                    <div className="relative h-40 overflow-hidden flex-shrink-0">
                      <img 
                        src={post?.image || defaultImage} 
                        alt={post?.title || 'Article'}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className="px-2 py-1 bg-accent text-white text-xs font-medium rounded-full">
                          {post?.category || 'Article'}
                        </span>
                      </div>
                    </div>
                    
                    {/* Column 2: Content */}
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="text-base font-bold text-primary mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                        {post?.title || 'Titre'}
                      </h3>
                      <p className="text-sm text-text-muted mb-4 line-clamp-3">
                        {post?.excerpt || 'Description'}
                      </p>
                      
                        {/* Column 3: Tags & Info */}
                      <div className="mt-auto pt-3 border-t border-gray-100">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-1 text-xs text-text-muted">
                            <Clock size={12} className="text-accent" />
                            <span>{post?.readTime || '5'} min de lecture</span>
                          </div>
                          <span className="text-xs text-text-muted">{post?.date || ''}</span>
                        </div>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {post?.category === 'Gouvernance' && (
                            <>
                              <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">Entreprise</span>
                              <span className="px-2 py-1 bg-green-50 text-green-600 text-xs rounded-full">Stratégie</span>
                            </>
                          )}
                          {post?.category === 'Fiscalité' && (
                            <>
                              <span className="px-2 py-1 bg-orange-50 text-orange-600 text-xs rounded-full">Impôt</span>
                              <span className="px-2 py-1 bg-purple-50 text-purple-600 text-xs rounded-full">PME</span>
                            </>
                          )}
                          {post?.category === 'Management' && (
                            <>
                              <span className="px-2 py-1 bg-pink-50 text-pink-600 text-xs rounded-full">Leadership</span>
                              <span className="px-2 py-1 bg-indigo-50 text-indigo-600 text-xs rounded-full">Équipe</span>
                            </>
                          )}
                          {post?.category === 'Droit' && (
                            <>
                              <span className="px-2 py-1 bg-red-50 text-red-600 text-xs rounded-full">OHADA</span>
                              <span className="px-2 py-1 bg-yellow-50 text-yellow-600 text-xs rounded-full">Contrats</span>
                            </>
                          )}
                          {post?.category === 'Comptabilité' && (
                            <>
                              <span className="px-2 py-1 bg-cyan-50 text-cyan-600 text-xs rounded-full">Digital</span>
                              <span className="px-2 py-1 bg-teal-50 text-teal-600 text-xs rounded-full">Cabinet</span>
                            </>
                          )}
                          {post?.category === 'Négociation' && (
                            <>
                              <span className="px-2 py-1 bg-violet-50 text-violet-600 text-xs rounded-full">Vente</span>
                              <span className="px-2 py-1 bg-amber-50 text-amber-600 text-xs rounded-full">Technique</span>
                            </>
                          )}
                        </div>

                        {/* Author + Button on same line */}
                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                              <User size={12} className="text-primary" />
                            </div>
                            <span className="text-xs font-medium text-primary">{post?.author?.name || post?.author || 'Auteur'}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={(e) => e.preventDefault()}
                              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-accent hover:text-white transition-colors"
                            >
                              <Share2 size={14} />
                            </button>
                            <div className="w-px h-5 bg-gray-200"></div>
                            <span className="text-accent text-sm font-medium flex items-center gap-1">
                              Lire <ArrowRight size={14} />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Slider Navigation for Blog Posts */}
          <div className="flex items-center justify-between mt-8 pt-4 border-t border-gray-100">
            <span className="text-sm text-text-muted">
              Page {currentPostsSlide + 1} sur {totalPostsSlides}
            </span>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={prevPostsSlide}
                disabled={currentPostsSlide === 0}
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
                  currentPostsSlide === 0 
                    ? 'border-gray-200 text-gray-300 cursor-not-allowed' 
                    : 'border-gray-300 text-primary hover:border-accent hover:bg-accent hover:text-white'
                }`}
              >
                <ChevronLeft size={18} />
              </button>
              
              {/* Dots */}
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPostsSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPostsSlide(index)}
                    className={`transition-all duration-300 ${
                      currentPostsSlide === index 
                        ? 'w-6 bg-accent' 
                        : 'w-2 bg-gray-300 hover:bg-accent/50'
                    } h-2 rounded-full`}
                  />
                ))}
              </div>
              
              <button 
                onClick={nextPostsSlide}
                disabled={currentPostsSlide === totalPostsSlides - 1}
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
                  currentPostsSlide === totalPostsSlides - 1 
                    ? 'border-gray-200 text-gray-300 cursor-not-allowed' 
                    : 'border-gray-300 text-primary hover:border-accent hover:bg-accent hover:text-white'
                }`}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogArticles;
