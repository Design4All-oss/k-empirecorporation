import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useFormations } from '../../hooks';

const HomeFormationsPreview = () => {
  const { data: apiFormations, isLoading } = useFormations();
  const scrollRef = useRef(null);

  // Use API data or fallback to default
  const formations = apiFormations && apiFormations.length > 0 
    ? apiFormations.slice(0, 6) // Show up to 6 formations
    : [
        { id: 1, title: "Formations inter-entreprises", text: "Des sessions ouvertes réunissant des professionnels de divers horizons pour favoriser les échanges d'expériences.", format: "Présentiel", duration: "3 jours", modules: "5" },
        { id: 2, title: "Formations intra-entreprise", text: "Des programmes conçus spécifiquement pour votre organisation, adaptés à vos enjeux et à vos équipes.", format: "En ligne", duration: "2 jours", modules: "4" },
        { id: 3, title: "Formations en ligne", text: "Des formations accessibles à distance via visioconférence, pour toucher vos équipes où qu'elles se trouvent.", format: "En ligne", duration: "1 jour", modules: "3" }
      ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'out-expo' },
    },
  };

  const formationImages = [
    '/assets/images/formationImage.png',
    '/assets/images/formationImage.png', 
    '/assets/images/formationImage.png'
  ];

  return (
    <section className="py-16 md:py-24 bg-primary relative overflow-hidden">
      <div className="absolute -bottom-16 md:-bottom-24 left-1/2 -translate-x-1/2 overflow-visible pointer-events-none">
        <p className="text-[120px] md:text-[180px] font-normal text-transparent whitespace-nowrap leading-none tracking-tight" style={{ WebkitTextStroke: '0.3px rgba(255, 255, 255, 0.33)', fontFamily: 'Space Grotesk, sans-serif' }}>
          FORMATIONS PROFESSIONNELLES
        </p>
      </div>

      <div className="max-w-container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'out-expo' }}
            className="lg:w-[500px] flex-shrink-0 flex flex-col justify-between py-8"
          >
            <div>
              <h2 className="text-h2-m md:text-h2-d text-white font-bold font-display leading-tight mb-6">
                Formations certifiantes et sur mesure
              </h2>
              <p className="text-white/70 text-body leading-relaxed">
                Nos formations sont conçues pour apporter des compétences immédiatement mobilisables sur le terrain, en combinant apports théoriques, études de cas et mises en situation.
              </p>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => scroll('left')}
                className="w-12 h-12 rounded-full border border-white/40 flex items-center justify-center text-white/80 hover:bg-white/10 hover:text-white transition-all duration-300 cursor-pointer"
              >
                <ArrowLeft size={20} />
              </button>
              <button 
                onClick={() => scroll('right')}
                className="w-12 h-12 rounded-full border border-white/40 flex items-center justify-center text-white/80 hover:bg-white/10 hover:text-white transition-all duration-300 cursor-pointer"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </motion.div>

          <div className="lg:w-[calc(100%-420px-32px)] overflow-hidden">
            <motion.div
              ref={scrollRef}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
              style={{ scrollSnapType: 'x mandatory' }}
            >
            {formations.map((formation, index) => (
              <motion.div
                key={formation.id || index}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-xl cursor-pointer flex-shrink-0 snap-center bg-white shadow-xl"
                style={{ width: '340px', scrollSnapAlign: 'start', flexShrink: 0 }}
              >
                {/* Cover Image */}
                <div className="relative h-48 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{
                      backgroundImage: `url(${formation.image || '/assets/images/formationImage.png'})`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  
                  {/* Badge - Format */}
                  <div className="absolute top-4 right-4 px-3 py-1 bg-accent text-white text-xs font-semibold rounded-full">
                    {formation.format || 'Présentiel'}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Title */}
                  <h3 className="font-bold text-primary text-lg leading-tight mb-3 group-hover:text-accent transition-colors">
                    {formation.title}
                  </h3>

                  {/* Description Excerpt */}
                  <p className="text-text-muted text-sm leading-relaxed mb-4 line-clamp-2">
                    {formation.hook || formation.text || 'Formation professionnelle pour développer vos compétences et booster votre carrière.'}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center gap-4 mb-5 text-xs text-text-muted">
                    <div className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{formation.duration || '3 jours'}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      <span>{formation.objectives?.length || '5'} modules</span>
                    </div>
                  </div>

                  {/* Subscribe Button - Circle with expand on hover */}
                  <button className="group/btn w-12 h-12 rounded-full bg-primary hover:bg-accent text-white flex items-center justify-center transition-all duration-500 ease-out hover:w-[180px] hover:px-4 hover:rounded-full overflow-hidden hover:justify-start relative">
                    <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover/btn:max-w-[100px] transition-all duration-500 ease-out opacity-0 group-hover/btn:opacity-100 font-semibold text-sm">
                      S'inscrire
                    </span>
                    <ArrowRight size={20} className="flex-shrink-0 transition-transform duration-300 group-hover/btn:translate-x-0 relative z-10 ml-0 group-hover/btn:ml-2" />
                  </button>
                </div>
              </motion.div>
            ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeFormationsPreview;
