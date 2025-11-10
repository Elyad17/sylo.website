'use client';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-4">
        <p>&copy; {year} Sylo. All Rights Reserved.</p>
        <div className="flex space-x-4">
          <a href="#" aria-label="Instagram" className="hover:text-white">
            📸
          </a>
          <a href="#" aria-label="LinkedIn" className="hover:text-white">
            💼
          </a>
          <a href="#" aria-label="Twitter" className="hover:text-white">
            🐦
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
