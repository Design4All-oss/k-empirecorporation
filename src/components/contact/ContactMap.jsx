import React from 'react';

const ContactMap = () => {
  return (
    <section className="w-full min-h-[85vh] bg-white !mt-0">
      <div className="relative w-full h-full">
        {/* Google Maps Embed */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3934.5314745335695!2d1.1820078744769706!3d9.549370790534226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x102b8b49c7f94b57%3A0xe87073c9278c1385!2sK-Empire%20Corporation!5e0!3m2!1sen!2stg!4v1775183861657!5m2!1sen!2stg"
          width="100%"
          height="100%"
          style={{ border: 0, minHeight: '85vh' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="K-Empire Corporation Location"
        />
      </div>
    </section>
  );
};

export default ContactMap;