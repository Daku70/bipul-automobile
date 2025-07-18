import { useState } from 'react';

// Import images from the 'images' folder
import tataHexa from './images/tata-hexa.png';
import ciaz from './images/ciaz.png';
import swift from './images/swift.png';
import scorpio from './images/scorpio.png';
import jeepThar from './images/jeep-thar.png';

export default function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  // Mock data for cars
  const cars = [
    {
      id: 1,
      name: 'Tata Hexa',
      image: tataHexa,
    },
    {
      id: 2,
      name: 'Maruti Suzuki Ciaz',
      image: ciaz,
    },
    {
      id: 3,
      name: 'Maruti Suzuki Swift',
      image: swift,
    },
    {
      id: 4,
      name: 'Mahindra Scorpio',
      image: scorpio,
    },
    {
      id: 5,
      name: 'Jeep Thar',
      image: jeepThar,
    },
  ];

  return (
    <div className="bg-gray-900 text-white font-sans">
      {/* Header */}
      <header className="bg-black p-4 flex justify-between items-center">
        <div>
          <span className="text-xl font-bold">MyCar</span>
        </div>
        <div className="flex items-center space-x-4">
          <p><span className="font-semibold">📞 Phone:</span> +1 (555) 123-4567</p>
          <p><span className="font-semibold">📧 Email:</span> contact@mycarrental.com</p>
          <p><span className="font-semibold">📍 Address:</span> 123 Car Drive, New York City, USA</p>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(https://placehold.co/1920x800/000000/ffffff?text=Background)' }}></div>
        <div className="relative max-w-6xl mx-auto px-6 py-24 lg:py-40">
          <div className="flex flex-col-reverse lg:flex-row lg:items-center gap-8">
            {/* Left Side (Text) */}
            <div className="w-full lg:w-1/2">
              <h1 className="text-4xl font-bold mb-4">Find your dream car</h1>
              <p className="text-lg mb-8">We are the largest luxury car rental company in New York.</p>
              <button className="px-4 py-2 text-white bg-yellow-400 rounded hover:bg-yellow-500">About Us</button>
            </div>

            {/* Right Side (Contact Us Box with 3D Parallax) */}
            <div className="w-full lg:w-1/2">
              <div
                className="bg-white p-6 rounded-lg shadow-xl transform transition-all duration-300 hover:scale-105"
                style={{
                  backgroundImage: 'url(contactus.jpg)', // Replace with your local contact us background image
                  backgroundSize: 'cover',
                  backgroundPosition: `${mousePos.x * 0.05}px ${mousePos.y * 0.05}px`,
                  backgroundRepeat: 'no-repeat',
                  height: '300px',
                  borderRadius: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  color: 'white',
                  textAlign: 'center',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease',
                }}
                onMouseMove={handleMouseMove}
              >
                <h2 className="text-2xl font-bold">Contact Us</h2>
                <p className="mt-2">Reach out to us for any questions or bookings.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section with 3D Tilt Cards */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Best of 2020 models</h2>
          <div className="flex space-x-2">
            <button className="px-2 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300">Filter</button>
            <button className="px-2 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300">Sort</button>
            <button className="px-2 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300">View All</button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {cars.map((car) => (
            <Card3D key={car.id} car={car} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black p-6 text-center text-gray-400">
        <p>© {new Date().getFullYear()} MyCar. All rights reserved.</p>
      </footer>
    </div>
  );
}

// 3D Tilt Card Component
function Card3D({ car }) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((centerY - y) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * 10;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="bg-white rounded-xl shadow-2xl overflow-hidden transform transition-transform duration-300"
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: 'transform 0.1s ease-out',
      }}
    >
      <img src={car.image} alt={car.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-900">{car.name}</h3>
        <p className="text-gray-600">Discover the latest features and performance.</p>
      </div>
    </div>
  );
}