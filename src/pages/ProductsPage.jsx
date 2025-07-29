import { useState, useEffect } from 'react';
import { useLanguage } from '../utils/LanguageContext';
import { menuData } from '../data/menuData';

const ProductsPage = ({ type = 'drinks' }) => {
  const { getText } = useLanguage();
  const data = menuData[type];
  const [visibleItems, setVisibleItems] = useState(new Set());

  // Dynamic scroll-based animations - smooth fade in/out on every scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleItems(prev => {
          const newVisible = new Set(prev);
          
          entries.forEach((entry) => {
            const itemId = entry.target.dataset.index;
            if (entry.isIntersecting) {
              // Item is entering viewport - fade in smoothly
              newVisible.add(itemId);
            } else {
              // Item is leaving viewport - fade out gradually (visible during scroll)
              newVisible.delete(itemId);
            }
          });
          
          return newVisible;
        });
      },
      { 
        threshold: [0, 0.1, 0.2, 0.3], // Multiple thresholds for gradual detection
        rootMargin: '200px 0px -50px 0px' // Larger top margin, smaller bottom margin for gradual fade-out visibility
      }
    );

    // Re-observe elements whenever the component updates
    const observeElements = () => {
      const elements = document.querySelectorAll('[data-index]');
      elements.forEach(el => observer.observe(el));
    };

    // Delay observation to ensure DOM is ready
    const timeoutId = setTimeout(observeElements, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [data]); // Re-run when data changes

  if (!data) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Menu Not Found</h1>
          <p className="text-lg text-gray-300">The requested menu type is not available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white">
      {/* Clean Header Section */}
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div 
            className="mb-6 opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}
          >
            <span className="inline-block px-6 py-2 glass-morphism rounded-full text-sm font-medium tracking-wider uppercase mb-4 text-white/80">
              {type === 'drinks' ? 'Beverages' : type === 'food' ? 'Cuisine' : 'Premium Shisha'}
            </span>
          </div>
          
          <h1 
            className="text-4xl md:text-6xl font-display font-bold mb-6 text-white opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
          >
            {getText(data.title)}
          </h1>
          
          <p 
            className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}
          >
            {getText(data.subtitle)}
          </p>
        </div>
      </section>

      {/* Featured Items - Clean Menu Style */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto"> {/* Made wider from max-w-4xl to max-w-6xl */}
          {/* Featured Section Header */}
          <div 
            className="text-center mb-12 opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Featured Selection
            </h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto mb-4" />
            <p className="text-gray-400 text-base">
              Handpicked favorites that define our excellence
            </p>
          </div>

          {/* Featured Grid - Cards with Images */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {data.featured.map((item, index) => (
              <div 
                key={item.id}
                data-index={`featured-${index}`}
                className={`group relative bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden hover:bg-white/10 hover:border-white/20 hover:scale-105 ${
                  visibleItems.has(`featured-${index}`) 
                    ? 'opacity-100 translate-y-0 translate-x-0 rotate-0 scale-100 transition-all duration-700 ease-out' 
                    : `opacity-0 ${index % 2 === 0 ? 'translate-y-6 translate-x-4 rotate-1' : 'translate-y-6 translate-x-[-4px] rotate-[-1deg]'} scale-96 transition-all duration-900 ease-in-out`
                }`}
                style={{ 
                  transitionDelay: visibleItems.has(`featured-${index}`) ? `${index * 0.15}s` : `${index * 0.12}s`,
                  transitionProperty: 'opacity, transform, background-color, border-color',
                  willChange: 'opacity, transform'
                }}
              >
                {/* Image */}
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={`/images/${item.image}`}
                    alt={getText(item.name)}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                  />
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-white/90 transition-colors">
                    {getText(item.name)}
                  </h3>
                  {item.description && (
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                      {getText(item.description)}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-white">
                      {item.price}
                    </span>
                    <button className="px-4 py-2 bg-white/20 hover:bg-white/30 border border-white/30 rounded-lg text-white text-sm font-medium transition-all duration-300 hover:scale-105">
                      Order
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Menu - Clean Layout */}
      <section className="py-16 px-6 bg-white/5 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto"> {/* Made wider from max-w-4xl to max-w-6xl */}
          {/* Section Header */}
          <div 
            className="text-center mb-12 opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Complete Menu
            </h2>
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto mb-4" />
            <p className="text-gray-400 text-base">
              {getText({ 
                en: `Our full ${type} collection crafted to perfection`, 
                bg: `Нашата пълна колекция от ${type === 'drinks' ? 'напитки' : type === 'food' ? 'храна' : 'наргилета'} създадена до съвършенство` 
              })}
            </p>
          </div>

          {/* Categories */}
          <div className="space-y-12">
            {data.categories.map((category, categoryIndex) => (
              <div 
                key={categoryIndex}
                data-index={`category-${categoryIndex}`}
                className={`${
                  visibleItems.has(`category-${categoryIndex}`) 
                    ? 'opacity-100 translate-y-0 translate-x-0 rotate-0 scale-100 transition-all duration-800 ease-out' 
                    : `opacity-0 translate-y-8 ${categoryIndex % 2 === 0 ? 'translate-x-3 rotate-0.5' : 'translate-x-[-3px] rotate-[-0.5deg]'} scale-97 transition-all duration-1000 ease-in-out`
                }`}
                style={{ 
                  transitionDelay: visibleItems.has(`category-${categoryIndex}`) ? `${categoryIndex * 0.12}s` : `${categoryIndex * 0.1}s`,
                  transitionProperty: 'opacity, transform',
                  willChange: 'opacity, transform'
                }}
              >
                {/* Category Header */}
                <div className="mb-8">
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-3">
                    {getText(category.title)}
                  </h3>
                  <div className="w-16 h-px bg-gradient-to-r from-white/60 to-transparent mb-3" />
                  {category.description && (
                    <p className="text-gray-400 text-sm">
                      {getText(category.description)}
                    </p>
                  )}
                </div>

                {/* Category Items */}
                <div className="space-y-4">
                  {category.items.map((item, itemIndex) => (
                    <div 
                      key={itemIndex}
                      data-index={`item-${categoryIndex}-${itemIndex}`}
                      className={`group flex items-start justify-between py-4 px-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 ${
                        visibleItems.has(`item-${categoryIndex}-${itemIndex}`) 
                          ? 'opacity-100 translate-x-0 translate-y-0 rotate-0 scale-100 transition-all duration-750 ease-out' 
                          : `opacity-0 ${itemIndex % 2 === 0 ? 'translate-x-8 translate-y-2 rotate-0.5' : 'translate-x-[-8px] translate-y-2 rotate-[-0.5deg]'} scale-98 transition-all duration-800 ease-in-out`
                      }`}
                      style={{ 
                        transitionDelay: visibleItems.has(`item-${categoryIndex}-${itemIndex}`) 
                          ? `${itemIndex * 0.1}s` 
                          : `${itemIndex * 0.08}s`,
                        transitionProperty: 'opacity, transform, background-color, border-color',
                        willChange: 'opacity, transform'
                      }}
                    >
                      <div className="flex-1 pr-4">
                        <h4 className="text-lg font-semibold text-white mb-1 group-hover:text-white/90 transition-colors">
                          {getText(item.name)}
                        </h4>
                        {item.description && (
                          <p className="text-gray-400 text-sm leading-relaxed">
                            {getText(item.description)}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold text-white">
                          {item.price}
                        </span>
                      </div>
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
