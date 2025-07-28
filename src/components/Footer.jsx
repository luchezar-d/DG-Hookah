import { useLanguage } from '../utils/LanguageContext';
import { contactInfo } from '../data/menuData';

const Footer = () => {
  const { getText } = useLanguage();

  return (
    <footer id="contact" className="bg-gray-900 text-gray-300 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Contact Info */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold text-pink-300 mb-4">
            {getText({ en: "Contact Info", bg: "Контакт" })}
          </h3>
          <div className="space-y-2">
            <p className="font-semibold">{getText(contactInfo.business)}</p>
            <p>{getText(contactInfo.address)}</p>
            <p>{getText({ en: "Phone", bg: "Телефон" })}: {contactInfo.phone}</p>
            <p>{getText({ en: "Email", bg: "Имейл" })}: {contactInfo.email}</p>
          </div>
        </div>

        {/* Social Media */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold text-pink-300 mb-4">
            {getText({ en: "Connect With Us", bg: "Свържете се с нас" })}
          </h3>
          <div className="space-y-2">
            <p>{getText({ en: "Instagram", bg: "Инстаграм" })}: {contactInfo.social.instagram}</p>
            <p>{getText({ en: "Facebook", bg: "Фейсбук" })}: {contactInfo.social.facebook}</p>
            <p>{getText({ en: "Hours", bg: "Работно време" })}: {getText(contactInfo.hours)}</p>
          </div>
        </div>

        {/* Location */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold text-pink-300 mb-4">
            {getText({ en: "Find Us Here", bg: "Намерете ни тук" })}
          </h3>
          
          <a 
            href={contactInfo.mapsUrl}
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block mb-4 px-4 py-2 border border-pink-300 text-pink-300 hover:bg-pink-300 hover:text-gray-900 rounded-lg transition-all duration-300 font-semibold"
          >
            📍 {getText({ en: "Open in Google Maps", bg: "Отвори в Google Maps" })}
          </a>
          
          <div className="w-full h-48 rounded-lg overflow-hidden shadow-lg">
            <iframe 
              src="https://maps.google.com/maps?q=Sofia&t=&z=13&ie=UTF8&iwloc=&output=embed"
              allowFullScreen 
              loading="lazy"
              className="w-full h-full border-0"
              title="DG Hookah Location"
            />
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="mt-12 pt-8 border-t border-gray-700 text-center">
        <p className="text-gray-400">
          © 2024 DG Hookah Bar. {getText({ en: "All rights reserved.", bg: "Всички права запазени." })}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
