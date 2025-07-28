import { useLanguage } from '../utils/LanguageContext';
import { menuData } from '../data/menuData';

const ProductsPage = ({ type = 'drinks' }) => {
  const { getText } = useLanguage();
  const data = menuData[type];

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-800 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Menu Not Found</h1>
          <p className="text-lg text-gray-300">The requested menu type is not available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-800 text-white">
      {/* Hero Section */}
      <section className="py-20 px-6 text-center bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-pink-300 mb-6 opacity-0 animate-fade-in-up">
            {getText(data.title)}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 opacity-0 animate-fade-in-up">
            {getText(data.subtitle)}
          </p>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {data.featured.map((item) => (
              <div 
                key={item.id}
                className="group relative overflow-hidden rounded-xl shadow-xl aspect-[4/3] transform transition-all duration-500 hover:scale-105 opacity-0 animate-fade-in-up"
              >
                <img 
                  src={`/images/${item.image}`}
                  alt={getText(item.name)}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-2 text-center">
                    {getText(item.name)}
                  </h3>
                  <p className="text-pink-300 font-bold text-lg text-center">
                    {item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Menu */}
      <section className="py-16 px-6 bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-12 opacity-0 animate-fade-in-up">
            {getText({ 
              en: `Full ${type.charAt(0).toUpperCase() + type.slice(1)} Menu`, 
              bg: `Пълно меню с ${type === 'drinks' ? 'напитки' : type === 'food' ? 'храна' : 'наргилета'}` 
            })}
          </h2>

          <div className="space-y-12">
            {data.categories.map((category, index) => (
              <div 
                key={index}
                className="opacity-0 animate-fade-in-up"
              >
                <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-600 pb-2">
                  {getText(category.title)}
                </h3>
                
                <div className="space-y-4">
                  {category.items.map((item, itemIndex) => (
                    <div 
                      key={itemIndex}
                      className="flex justify-between items-center py-3 border-b border-gray-700 border-dashed hover:bg-gray-800 transition-colors duration-300 px-4 rounded"
                    >
                      <span className="text-gray-200 text-lg">
                        {getText(item.name)}
                      </span>
                      <span className="text-pink-300 font-bold text-lg">
                        {item.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
