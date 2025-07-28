// Menu data extracted from the previous DG Hookah site
export const menuData = {
  drinks: {
    title: {
      en: "Discover Our Exquisite Drink Menu",
      bg: "Открийте нашето изискано меню с напитки"
    },
    subtitle: {
      en: "Refreshing flavors. Crafted for your delight.",
      bg: "Освежаващи вкусове. Приготвени за вашето удоволствие."
    },
    featured: [
      {
        id: 1,
        name: { en: "Cocktail Classic", bg: "Класически коктейл" },
        price: "$8.00",
        image: "drink1.jpg"
      },
      {
        id: 2,
        name: { en: "Mint Mojito", bg: "Ментов Мохито" },
        price: "$7.50",
        image: "drink2.jpg"
      },
      {
        id: 3,
        name: { en: "Berry Smoothie", bg: "Плодов Смути" },
        price: "$6.00",
        image: "drink3.jpg"
      }
    ],
    categories: [
      {
        title: { en: "Coffee", bg: "Кафе" },
        items: [
          { name: { en: "Espresso", bg: "Еспресо" }, price: "$3.00" },
          { name: { en: "Cappuccino", bg: "Капучино" }, price: "$4.00" },
          { name: { en: "Latte", bg: "Лате" }, price: "$4.50" }
        ]
      },
      {
        title: { en: "Lemonades", bg: "Лимонади" },
        items: [
          { name: { en: "Classic Lemonade", bg: "Класическа лимонада" }, price: "$4.00" },
          { name: { en: "Strawberry Lemonade", bg: "Ягодова лимонада" }, price: "$5.00" }
        ]
      },
      {
        title: { en: "Cocktails", bg: "Коктейли" },
        items: [
          { name: { en: "Mojito", bg: "Мохито" }, price: "$7.50" },
          { name: { en: "Margarita", bg: "Маргарита" }, price: "$8.00" },
          { name: { en: "Gin & Tonic", bg: "Джин с тоник" }, price: "$7.00" }
        ]
      },
      {
        title: { en: "Shots", bg: "Шотове" },
        items: [
          { name: { en: "Tequila", bg: "Текила" }, price: "$5.00" },
          { name: { en: "Jägermeister", bg: "Йегермайстер" }, price: "$5.50" }
        ]
      }
    ]
  },

  food: {
    title: {
      en: "Explore Our Delicious Food Selection",
      bg: "Разгледайте нашата вкусна селекция от храна"
    },
    subtitle: {
      en: "Fresh ingredients. Exceptional taste.",
      bg: "Свежи съставки. Изключителен вкус."
    },
    featured: [
      {
        id: 1,
        name: { en: "Chicken Wrap", bg: "Пилешко Руло" },
        price: "$9.50",
        image: "food1.jpg"
      },
      {
        id: 2,
        name: { en: "Loaded Nachos", bg: "Начос с добавки" },
        price: "$8.00",
        image: "food2.jpg"
      },
      {
        id: 3,
        name: { en: "Fresh Salad", bg: "Свежа салата" },
        price: "$7.00",
        image: "food3.jpg"
      }
    ],
    categories: [
      {
        title: { en: "Chabatta & Sandwiches", bg: "Чабата и Сандвичи" },
        items: [
          { 
            name: { 
              en: "Chabatta - Chorizo, Tomatoes, Ketchup, Mayonnaise, Chips", 
              bg: "Чабата - чоризо, домати, кетчуп, майонеза, чипс" 
            }, 
            price: "$9.00" 
          },
          { 
            name: { 
              en: "Club Sandwich - Chicken, Bacon, Egg, Tomatoes, Lettuce, Mayo, Chips", 
              bg: "Клуб сандвич - пиле, бекон, яйце, домати, маруля, майонеза, чипс" 
            }, 
            price: "$10.00" 
          },
          { 
            name: { 
              en: "Toast Sandwich - Ham, Cheese, Tomatoes, Pickles, Ketchup", 
              bg: "Тост сандвич - шунка, кашкавал, домати, кисели краставички, кетчуп" 
            }, 
            price: "$7.00" 
          }
        ]
      },
      {
        title: { en: "Desserts", bg: "Десерти" },
        items: [
          { 
            name: { 
              en: "Soufflé - Rich Chocolate Soufflé with Ice Cream", 
              bg: "Суфле - богато шоколадово суфле със сладолед" 
            }, 
            price: "$8.00" 
          },
          { 
            name: { 
              en: "Chocolate Pancakes - Pancakes, Chocolate Sauce, Strawberries, Whipped Cream", 
              bg: "Шоколадови палачинки - палачинки, шоколадов сос, ягоди, сметана" 
            }, 
            price: "$7.50" 
          }
        ]
      }
    ]
  },

  hookahs: {
    title: {
      en: "Discover Our Premium Hookah Selection",
      bg: "Открийте нашата премиум селекция от наргилета"
    },
    subtitle: {
      en: "Crafted with care. Enjoyed with style.",
      bg: "Приготвено с грижа. Наслаждавано със стил."
    },
    featured: [
      {
        id: 1,
        name: { en: "Double Apple", bg: "Двойна ябълка" },
        price: "$18.00",
        image: "hookah1.jpg"
      },
      {
        id: 2,
        name: { en: "Mint Chill", bg: "Ментово охлаждане" },
        price: "$17.00",
        image: "hookah2.jpg"
      },
      {
        id: 3,
        name: { en: "Fruit Fusion", bg: "Плодов микс" },
        price: "$19.50",
        image: "hookah3.jpg"
      }
    ],
    categories: [
      {
        title: { en: "Must Have", bg: "Задължителни" },
        items: [
          { name: { en: "Cherry Cola", bg: "Черешова кола" }, price: "$20.00" },
          { name: { en: "Raspberry", bg: "Малина" }, price: "$20.00" },
          { name: { en: "Blueberry Muffin", bg: "Боровинков мъфин" }, price: "$20.00" },
          { name: { en: "Lemon Pie", bg: "Лимонов пай" }, price: "$20.00" }
        ]
      },
      {
        title: { en: "OZZ", bg: "ОЗЗ" },
        items: [
          { name: { en: "African Queen", bg: "Африканска кралица" }, price: "$22.00" },
          { name: { en: "African King", bg: "Африкански крал" }, price: "$22.00" },
          { name: { en: "Wild Jungle", bg: "Дива джунгла" }, price: "$22.00" }
        ]
      },
      {
        title: { en: "Element", bg: "Елемент" },
        items: [
          { name: { en: "Cherry", bg: "Череша" }, price: "$25.00" },
          { name: { en: "Grape", bg: "Грозде" }, price: "$25.00" },
          { name: { en: "Watermelon", bg: "Диня" }, price: "$25.00" }
        ]
      }
    ]
  }
};

export const contactInfo = {
  business: {
    en: "DG Hookah Bar",
    bg: "ДГ Хука Бар"
  },
  address: {
    en: "Your Street 123, City",
    bg: "ул. Вашата 123, Град"
  },
  phone: "+123456789",
  email: "contact@dghookah.com",
  social: {
    instagram: "@dghookah",
    facebook: "DG Hookah Bar"
  },
  hours: {
    en: "Mon-Sun, 17:00–03:00",
    bg: "Пон–Нед, 17:00–03:00"
  },
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=DG+Hookah+bar+%26+coffee,+кв.+Казанлъшка+роза,+ул.+Славянска,+6100+Казанлък"
};

export const carouselSlides = [
  {
    id: 1,
    image: "1.jpg",
    title: {
      en: "Welcome to DG Hookah",
      bg: "Добре дошли в DG Hookah"
    },
    subtitle: {
      en: "Experience flavors like never before.",
      bg: "Насладете се на вкусове както никога досега."
    }
  },
  {
    id: 2,
    image: "2.jpg",
    title: {
      en: "Chill Atmosphere",
      bg: "Атмосферни вибрации"
    },
    subtitle: {
      en: "Relax with friends in style.",
      bg: "Релаксирайте с приятели в стил."
    }
  },
  {
    id: 3,
    image: "3.jpg",
    title: {
      en: "Premium Shishas",
      bg: "Премиум Шиша"
    },
    subtitle: {
      en: "Enjoy only the finest blends.",
      bg: "Насладете се само на най-добрите смеси."
    }
  }
];

export const infoSections = [
  {
    id: 1,
    image: "4.jpg",
    title: {
      en: "Exquisite Flavors",
      bg: "Изискани вкусове"
    },
    description: {
      en: "Discover unique blends that elevate your experience.",
      bg: "Открийте уникални смеси, които издигат вашето изживяване."
    },
    reverse: false
  },
  {
    id: 2,
    image: "5.jpg",
    title: {
      en: "Atmospheric Vibes",
      bg: "Атмосферни вибрации"
    },
    description: {
      en: "Step into a world of aesthetic ambiance and chill music.",
      bg: "Потопете се в свят на естетична атмосфера и релаксираща музика."
    },
    reverse: true
  }
];

export const homeFeatures = [
  {
    id: 1,
    image: "6.jpg",
    title: {
      en: "Drinks",
      bg: "Напитки"
    },
    route: "/drinks"
  },
  {
    id: 2,
    image: "7.jpg",
    title: {
      en: "Hookah",
      bg: "Наргиле"
    },
    route: "/hookahs"
  },
  {
    id: 3,
    image: "8.jpg",
    title: {
      en: "Food",
      bg: "Храна"
    },
    route: "/food"
  }
];
