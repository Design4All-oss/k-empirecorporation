import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useReducedMotion } from 'framer-motion';
import { RefreshCw, ArrowRight } from 'lucide-react';

const DEFAULT_MESSAGE =
  "Nous améliorons actuellement notre site pour mieux vous servir. Le retour est imminent.";

const Maintenance = ({ message }) => {
  const reduce = useReducedMotion();
  const text = message || DEFAULT_MESSAGE;

  return (
    <div className="relative min-h-screen overflow-hidden bg-primary text-white">
      <Helmet>
        <title>Site en maintenance | K-EMPIRE Corporation</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content={text} />
      </Helmet>

      {/* Trame discrète, même langage que les héros du site */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-40 [background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)] [-webkit-mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]"
        />
        <div className="absolute -top-40 right-[-10rem] w-[42rem] h-[42rem] bg-accent/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center justify-center px-6 py-16 text-center"
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/50">
          K-EMPIRE Corporation
        </p>

        <span className="mt-8 block h-1 w-12 bg-accent" aria-hidden="true" />

        <h1 className="mt-8 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
          Site en maintenance
        </h1>

        <p className="mt-6 max-w-[55ch] text-sm leading-relaxed text-white/70 md:text-base">
          {text}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center gap-2 rounded-pill select-none bg-accent px-6 py-3 md:px-8 md:py-4 font-normal text-small tracking-tight text-white transition-all duration-300 hover:bg-accent-dark hover:cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <RefreshCw size={16} />
            Recharger
          </button>
          <a
            href="mailto:contact@k-empirecorporation.com"
            className="group inline-flex items-center justify-center gap-2 rounded-pill select-none bg-transparent px-6 py-3 md:px-8 md:py-4 font-normal text-small tracking-tight text-white transition-all duration-300 hover:bg-white/10 hover:cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Nous contacter
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

        <p className="mt-12 text-xs text-white/45">
          Une question en attendant ? contact@k-empirecorporation.com
        </p>
      </motion.div>
    </div>
  );
};

export default Maintenance;
