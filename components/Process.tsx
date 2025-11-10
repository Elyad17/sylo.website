'use client';

import { motion } from 'framer-motion';

const steps = [
  {
    number: '1',
    title: 'Discover',
    description:
      'We learn about your business and goals. Understanding your audience and industry helps us craft the right solution.',
  },
  {
    number: '2',
    title: 'Design',
    description:
      'We sketch, wireframe and design interfaces that are both beautiful and functional, tailored to your brand.',
  },
  {
    number: '3',
    title: 'Develop',
    description:
      'Our developers implement the designs, building responsive websites using modern technologies and best practices.',
  },
  {
    number: '4',
    title: 'Launch',
    description:
      'After thorough testing, we deploy your site and ensure everything works perfectly. We also offer ongoing support.',
  },
];

const Process = () => {
  return (
    <section id="process" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Our Process</h2>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-teal-500 text-white font-bold">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
