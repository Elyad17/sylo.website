'use client';

import { motion } from 'framer-motion';

const services = [
  {
    title: 'Web Development',
    description:
      'Build modern, fast websites using the latest technologies. From landing pages to custom web applications, we bring your vision to life.',
    icon: (
      <svg
        className="w-8 h-8 text-teal-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16 18l6-6-6-6M8 6l-6 6 6 6"
        />
      </svg>
    ),
  },
  {
    title: 'UI/UX Design',
    description:
      'Human‑centred design that looks great and feels even better. We create intuitive interfaces that convert visitors into customers.',
    icon: (
      <svg
        className="w-8 h-8 text-teal-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.75 3v18m0 0h-6v-6m6 6H21m-6-6v6M3 9.75h18m0 0v-6h-6m6 6H3"
        />
      </svg>
    ),
  },
  {
    title: 'Performance Optimisation',
    description:
      'Slow websites lose visitors. We optimise your site for speed, accessibility and search engines so you stay ahead of the competition.',
    icon: (
      <svg
        className="w-8 h-8 text-teal-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 13a9 9 0 0118 0 9 9 0 01-18 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v10l3-3"
        />
      </svg>
    ),
  },
  {
    title: 'Maintenance & Support',
    description:
      'Keep your site running smoothly with ongoing updates, security monitoring and technical support from our expert team.',
    icon: (
      <svg
        className="w-8 h-8 text-teal-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12h6m0 0l-3-3m3 3l-3 3m0-3H5m14 0H9m0 0L6 6m3 6l-3 3"
        />
      </svg>
    ),
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              className="bg-gray-50 p-6 rounded-xl shadow-md hover:-translate-y-1 hover:shadow-lg transition-transform"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-sm text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
