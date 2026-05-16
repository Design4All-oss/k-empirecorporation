import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { usePost, usePosts } from '../hooks';
import LoadingSpinner from '../components/ui/Loading';

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 32 32" fill="currentColor">
    <path d="M16,2c-7.732,0-14,6.268-14,14,0,6.566,4.52,12.075,10.618,13.588v-9.31h-2.887v-4.278h2.887v-1.843c0-4.765,2.156-6.974,6.835-6.974,.887,0,2.417,.174,3.043,.348v3.878c-.33-.035-.904-.052-1.617-.052-2.296,0-3.183,.87-3.183,3.13v1.513h4.573l-.786,4.278h-3.787v9.619c6.932-.837,12.304-6.74,12.304-13.897,0-7.732-6.268-14-14-14Z"/>
  </svg>
);

const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 32 32" fill="currentColor">
    <path d="M18.42,14.009L27.891,3h-2.244l-8.224,9.559L10.855,3H3.28l9.932,14.455L3.28,29h2.244l8.684-10.095,6.936,10.095h7.576l-10.301-14.991h0Zm-3.074,3.573l-1.006-1.439L6.333,4.69h3.447l6.462,9.243,1.006,1.439,8.4,12.015h-3.447l-6.854-9.804h0Z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 32 32" fill="currentColor">
    <path d="M28.278,3.722H3.722C2.231,3.722,1,4.953,1,6.444v19.111c0,1.491,1.231,2.722,2.722,2.722h24.556c1.491,0,2.722-1.231,2.722-2.722V6.444C31,4.953,29.769,3.722,28.278,3.722zM10.389,24.444H7.556V13.722h2.833v10.722zM8.972,11.722c-0.935,0-1.694-0.759-1.694-1.694c0-0.935,0.759-1.694,1.694-1.694c0.935,0,1.694,0.759,1.694,1.694C10.667,10.963,9.907,11.722,8.972,11.722zM24.444,24.444h-2.833v-6.222c0-0.935-0.759-1.694-1.694-1.694c-0.935,0-1.694,0.759-1.694,1.694v6.222h-2.833V13.722h2.833v1.528c0.559-0.867,1.528-1.694,2.833-1.694c1.694,0,2.833,1.194,2.833,3.111v6.778H24.444z"/>
  </svg>
);

const BlogSingle = () => {
  const { slug } = useParams();
  const { data: apiPost, isLoading, error } = usePost(slug);
  const { data: apiPosts } = usePosts(1, 5);
  
  const getAuthorName = (author) => {
    if (!author) return 'Auteur';
    if (typeof author === 'string') return author;
    if (typeof author === 'object' && author.name) return author.name;
    return 'Auteur';
  };

  const getAuthorImage = (author) => {
    if (!author) return null;
    if (typeof author === 'string') return null;
    if (typeof author === 'object' && author.avatar) return author.avatar;
    return null;
  };
  
  const post = apiPost;
  const authorName = post ? getAuthorName(post.author) : 'Auteur';
  const authorImg = post ? getAuthorImage(post.author) : null;
  
  const allPosts = apiPosts || [];
  const relatedPosts = post ? allPosts.filter(p => p.id !== post.id).slice(0, 2) : [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <LoadingSpinner text="Chargement de l'article..." />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">Article not found</h1>
          <Link to="/blog" className="text-accent hover:underline">
            Back to blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-[400px] md:h-[500px] overflow-hidden">
        <img
          src={post.image || 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=600&fit=crop'}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-20 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl shadow-lg p-8 md:p-12"
            >
              <span className="inline-block px-3 py-1 bg-accent text-white text-sm font-medium rounded-full mb-4">
                {post.categories?.[0]?.name || post.category || 'Article'}
              </span>

              <h1 className="text-h2-m md:text-h2-d text-primary font-bold mb-6 leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  {authorImg && (
                    <img 
                      src={authorImg} 
                      alt={authorName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <div className="font-semibold text-primary">{authorName}</div>
                    <div className="text-sm text-text-muted">{post.authorRole}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-text-muted">
                  <Calendar size={16} />
                  <span className="text-sm">{post.date}</span>
                </div>
                <div className="flex items-center gap-1 text-text-muted">
                  <Clock size={16} />
                  <span className="text-sm">{post.readTime} de lecture</span>
                </div>
              </div>

              <div 
                className="text-text-muted leading-relaxed [&_p]:mb-4 [&_p]:whitespace-normal [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-4 [&_li]:mb-2 [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-4 [&_h1]:mt-6 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mb-3 [&_h2]:mt-5 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mb-2 [&_h3]:mt-4"
                dangerouslySetInnerHTML={{ __html: post.content }}
                style={{
                  overflowWrap: 'break-word',
                  wordBreak: 'break-word',
                  maxWidth: '100%',
                }}
              />

              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-gray-100">
                  {post.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-text-muted text-sm rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between mt-8 pt-8 border-t border-gray-100">
                <span className="text-text-muted">Partager cet article</span>
                <div className="flex items-center gap-3">
                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary hover:bg-accent hover:text-white transition-colors"
                  >
                    <FacebookIcon />
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary hover:bg-accent hover:text-white transition-colors"
                  >
                    <XIcon />
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary hover:bg-accent hover:text-white transition-colors"
                  >
                    <LinkedinIcon />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-1 space-y-8">
            <div className="lg:sticky lg:top-8">
              <div className="bg-white rounded-3xl shadow-lg p-6">
                <h3 className="text-lg text-accent font-bold font-display mb-4">Articles similaires</h3>
                <div className="space-y-4">
                  {relatedPosts.map((relatedPost) => (
                    <Link 
                      key={relatedPost.id}
                      to={`/blog/${relatedPost.slug}`}
                      className="group flex gap-4"
                    >
                      <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                        <img 
                          src={relatedPost.image} 
                          alt={relatedPost.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-primary line-clamp-2 group-hover:text-accent transition-colors">
                          {relatedPost.title}
                        </h4>
                        <span className="text-xs text-text-muted mt-1 block">
                          {relatedPost.readTime} de lecture
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="bg-primary rounded-3xl p-6 text-white mt-8">
                <h3 className="text-lg font-bold mb-2">Newsletter</h3>
                <p className="text-white/70 text-sm mb-4">Recevez nos dernieres actualites et articles</p>
                <div className="flex gap-3">
                  <input 
                    type="email" 
                    placeholder="Votre email" 
                    className="flex-1 px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-accent"
                  />
                  <button className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white hover:bg-accent-light transition-colors flex-shrink-0">
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-16"></div>
      </div>
    </div>
  );
};

export default BlogSingle;