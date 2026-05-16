import React, { useState } from 'react';
import { Inbox } from 'lucide-react';

const HomeNewsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Newsletter subscription:', email);
  };

  return (
    <section className="py-8 md:py-12 -mb-32 relative z-20">
      <div className="max-w-container mx-auto px-4 relative z-10">
          <div className="bg-accent rounded-3xl p-8 md:p-16 shadow-md relative overflow-hidden flex flex-col items-center text-center">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/[0.03] rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/[0.05] rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 relative z-10">
            {/* Left Column - Title & Text */}
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-h2-m md:text-h2-d font-bold text-white font-display leading-none mb-4 whitespace-nowrap">
                Restez informé
              </h2>
              <p className="text-body text-white/80 max-w-sm">
                Inscrivez-vous à notre newsletter pour ne rien manquer de nos actualités.
              </p>
            </div>

            {/* Right Column - Form */}
            <div className="flex-shrink-0 w-full max-w-md">
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-end gap-6">
                <div className="flex-1 relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none">
                    <Inbox size={28} strokeWidth={1.5} />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Votre adresse email"
                    className="w-full pl-12 bg-transparent border-b border-white/40 text-white placeholder:text-white/50 focus:outline-none focus:border-white pb-1"
                    required
                  />
                </div>
                <button type="submit" className="px-6 py-3 bg-white text-primary font-semibold rounded-pill hover:bg-white/90 transition-colors">
                  S'inscrire
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeNewsletter;
