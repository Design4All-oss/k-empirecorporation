import React from 'react';
import { motion } from 'framer-motion';

const AboutValues = () => {
  const content = {
    fr: {
      title: 'Notre Identité',
      description:
        "Conseil. Expertise. Executive Education.\nK-EMPIRE CORPORATION accompagne les organisations et les décideurs confrontés à des enjeux complexes, stratégiques et réglementaires. À la croisée du droit, de la gouvernance, de la stratégie et du développement des compétences, nous mobilisons une expertise de haut niveau pour éclairer la décision, sécuriser l'action et renforcer la performance.\nUne exigence : l'excellence. Une vocation : créer de l'impact.",
      values: [
        {
          id: 'safety',
          label: 'Sécurité',
          elevated: true,
          icon: (
            <svg
              className="w-8 h-8 md:w-9 md:h-9 text-accent"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          ),
        },
        {
          id: 'efficient',
          label: 'Célérité',
          elevated: false,
          icon: (
            <svg
              className="w-8 h-8 md:w-9 md:h-9 text-accent"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Outer gear teeth */}
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              {/* Clock face & hands */}
              <circle cx="12" cy="12" r="6" />
              <polyline points="12 9 12 12 14 14" />
            </svg>
          ),
        },
        {
          id: 'precision',
          label: 'Professionnalisme',
          elevated: false,
          icon: (
            <svg
              className="w-8 h-8 md:w-9 md:h-9 text-accent"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Concentric circles and crosshair lines */}
              <circle cx="12" cy="12" r="8" />
              <circle cx="12" cy="12" r="3" />
              <line x1="12" y1="2" x2="12" y2="6" />
              <line x1="12" y1="18" x2="12" y2="22" />
              <line x1="2" y1="12" x2="6" y2="12" />
              <line x1="18" y1="12" x2="22" y2="12" />
            </svg>
          ),
        },
        {
          id: 'innovation',
          label: 'Innovation',
          elevated: true,
          icon: (
            <svg
              className="w-8 h-8 md:w-9 md:h-9 text-accent"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18h6" />
              <path d="M10 21h4" />
              <path d="M12 2v2" />
              <path d="M4.93 4.93l1.41 1.41" />
              <path d="M19.07 4.93l-1.41 1.41" />
              <path d="M2 12h2" />
              <path d="M20 12h2" />
              <path d="M9 14.25A5.5 5.5 0 0 1 7 10a5 5 0 1 1 10 0 5.5 5.5 0 0 1-2 4.25V16a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-1.75z" />
            </svg>
          ),
        },
      ],
      vision: {
        title: 'Vision',
        text: "Devenir une institution panafricaine de référence en conseil stratégique, expertise de haut niveau et Executive Education, ouverte sur le monde.",
      },
      mission: {
        title: 'Mission',
        text: "Éclairer la décision, renforcer les capacités et créer de l'impact en mobilisant expertise, intelligence stratégique, innovation et technologie au service des organisations et des décideurs.",
      },
    },
  };

  const current = content.fr;

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-primary px-3 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background radial highlight for subtle depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-800/20 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-5xl lg:max-w-6xl mx-auto relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-10 sm:mb-14 md:mb-16"
        >
          <h2 className="text-h2-m md:text-h2-d text-white font-bold font-display leading-tight mb-6 whitespace-pre-line tracking-tight">
            {current.title}
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-white/70 leading-relaxed max-w-none mx-auto font-sans whitespace-pre-line">
            {current.description}
          </p>
        </motion.div>

        {/* Floating Blue Pill overlapping the white card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative z-40 mx-auto max-w-xl md:max-w-2xl lg:max-w-[740px] bg-white rounded-2xl md:rounded-3xl px-6 sm:px-10 md:px-14 py-7 md:py-8 shadow-2xl text-primary mb-[-40px] sm:mb-[-50px]"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 items-center">
            {current.values.map((item) => (
              <div
                key={item.id}
                className={`flex flex-col items-center text-center transition-all duration-300 group cursor-default ${
                  item.elevated
                    ? 'md:-translate-y-3'
                    : 'md:translate-y-3'
                }`}
              >
                <div className="mb-2.5 p-1 rounded-full transition-transform duration-300 group-hover:scale-110 text-accent">
                  {item.icon}
                </div>
                <span className="text-sm md:text-base font-semibold tracking-wide text-primary">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* White Card with Vision and Mission (overlapped by the floating blue pill) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="relative z-10 -mt-10 sm:-mt-12 md:-mt-14 max-w-3xl lg:max-w-4xl mx-auto bg-accent rounded-3xl md:rounded-[36px] pt-16 sm:pt-20 md:pt-22 pb-8 sm:pb-10 px-6 sm:px-12 md:px-16 shadow-xl shadow-neutral-900/5 border border-accent-light/30"
        >
          {/* Two Columns Grid */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-14 relative items-start">
            {/* Vertical Divider for desktop */}
            <div className="hidden md:block absolute left-1/2 top-2 bottom-4 w-px bg-white/30 -translate-x-1/2" />

            {/* Column 1: Vision */}
            <div className="flex flex-col items-start md:pr-4">
              <div className="flex items-center gap-2.5 mb-3.5">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white">
                  {/* Eye with Target Icon */}
                  <svg
                    className="w-6 h-6 md:w-7 md:h-7"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                    <circle cx="12" cy="12" r="1" fill="currentColor" />
                    <line x1="12" y1="6" x2="12" y2="7.5" />
                    <line x1="12" y1="16.5" x2="12" y2="18" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold font-display text-white">
                  {current.vision.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm md:text-[15px] text-white/80 leading-relaxed font-sans">
                {current.vision.text}
              </p>
            </div>

            {/* Column 2: Mission */}
            <div className="flex flex-col items-start md:pl-4">
              <div className="flex items-center gap-2.5 mb-3.5">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white">
                  {/* Target with Checkmark Icon */}
                  <svg
                    className="w-6 h-6 md:w-7 md:h-7"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <circle cx="12" cy="12" r="5" />
                    <polyline points="10 12 11.5 13.5 14.5 10.5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold font-display text-white">
                  {current.mission.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm md:text-[15px] text-white/80 leading-relaxed font-sans">
                {current.mission.text}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutValues;