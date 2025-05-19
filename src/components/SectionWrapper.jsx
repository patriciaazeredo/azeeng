import React from 'react';
    import { motion } from 'framer-motion';

    const SectionWrapper = ({ id, title, children, className = "", titleClassName = "" }) => (
      <motion.section
        id={id}
        className={`py-16 md:py-24 ${className}`}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          {title && <h1 className={`text-4xl font-bold text-center mb-12 md:mb-16 text-sky-700 ${titleClassName}`}>{title}</h1>}
          {children}
        </div>
      </motion.section>
    );
    
    export default SectionWrapper;