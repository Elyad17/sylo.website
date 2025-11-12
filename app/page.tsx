import Hero from '../components/Hero';
import WhyUs from '../components/WhyUs';
import Services from '../components/Services';
import Process from '../components/Process';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Sylo – Innovative Web Solutions',
  description:
    'Sylo is a full-service web development agency. We blend creativity and technology to build fast, accessible and visually striking websites.',
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhyUs />
      <Services />
      <Process />
      <Contact />
      <Footer />
    </>
  );
}
