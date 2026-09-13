import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Award, ArrowRight, Users } from 'lucide-react';
import { ABOUT_CONTENT } from '../../constants/content';
import { Link } from 'react-router-dom';

const AboutVision = () => {
  const { vision } = ABOUT_CONTENT;

  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden z-20">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">
          
          {/* Left Column - Image with Experience Badge */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative rounded-lg overflow-hidden h-[450px] md:h-[600px]">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800"
                alt="Notre vision"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="pt-16 lg:pt-0"
          >
            <h2 className="text-h2-m md:text-h2-d text-primary font-bold font-display mb-6 leading-tight">
              Nous aspirons à devenir l'Académie où l'excellence devient autorité.
            </h2>

            {/* Paragraph */}
            <p className="text-text-muted mb-10 leading-relaxed text-lg">
              {vision.highlight}
            </p>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-8 mb-10">
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="flex-shrink-0 w-14 h-14 rounded-full bg-[#fdfaf2] flex items-center justify-center shadow-sm border border-accent/20">
                  <Globe className="text-accent w-7 h-7" strokeWidth={1.5} />
                </div>
                <div className="mt-2 sm:mt-0">
                  <h4 className="text-xl font-bold text-primary mb-2 font-display">Afrique & Inter.</h4>
                  <p className="text-sm text-text-muted leading-relaxed">Un rayonnement au-delà des frontières.</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="flex-shrink-0 w-14 h-14 rounded-full bg-[#fdfaf2] flex items-center justify-center shadow-sm border border-accent/20">
                  <Users className="text-accent w-7 h-7" strokeWidth={1.5} />
                </div>
                <div className="mt-2 sm:mt-0">
                  <h4 className="text-xl font-bold text-primary mb-2 font-display">K-Empire Alumni Club</h4>
                  <p className="text-sm text-text-muted leading-relaxed">Un réseau puissant de leaders et d'experts.</p>
                </div>
              </div>
            </div>

            {/* Button */}
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-accent text-primary px-8 py-4 rounded-full font-bold hover:bg-primary hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl group w-full sm:w-auto"
            >
              Rejoindre l'Académie
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutVision;
