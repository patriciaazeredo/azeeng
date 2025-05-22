import React from "react";
import { Building, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-800 text-slate-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <Building size={28} className="text-sky-400 mr-3" />
              <span className="text-2xl font-semibold text-white">AZEENG</span>
            </div>
            <p className="text-sm leading-relaxed">
              Excelência técnica em vistorias, laudos, regularização de imóveis
              e consultoria especializada.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-lg font-semibold text-white mb-4">
              Links Rápidos
            </p>
            <ul className="space-y-2">
              <li>
                <a
                  href="/#services"
                  className="hover:text-sky-400 transition-colors duration-300 text-sm"
                >
                  Nossos Serviços
                </a>
              </li>
              <li>
                <a
                  href="/#about"
                  className="hover:text-sky-400 transition-colors duration-300 text-sm"
                >
                  Quem Somos
                </a>
              </li>
              <li>
                <a
                  href="/#portfolio"
                  className="hover:text-sky-400 transition-colors duration-300 text-sm"
                >
                  Portfólio
                </a>
              </li>
              <li>
                <a
                  href="/#faq"
                  className="hover:text-sky-400 transition-colors duration-300 text-sm"
                >
                  Dúvidas Frequentes
                </a>
              </li>
              <li>
                <a
                  href="/#contact"
                  className="hover:text-sky-400 transition-colors duration-300 text-sm"
                >
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <p className="text-lg font-semibold text-white mb-4">Contato</p>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <MapPin size={18} className="mr-3 mt-1 text-sky-400 shrink-0" />
                <span>
                  Linhares - ES <br />
                  Atendemos em toda a região
                </span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-3 text-sky-400 shrink-0" />
                <a
                  href="mailto:suporte@azeeng.com.br"
                  className="hover:text-sky-400 transition-colors duration-300"
                >
                  suporte@azeeng.com.br
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-3 text-sky-400 shrink-0" />
                <a
                  href="tel:+5527998928611"
                  className="hover:text-sky-400 transition-colors duration-300"
                >
                  (27) 99892-8611
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter/Placeholder */}
          <div>
            <p className="text-lg font-semibold text-white mb-4">
              Mantenha-se Informado
            </p>
            <p className="text-sm mb-3">
              Receba nossas dicas e novidades sobre engenharia e construção.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Seu e-mail"
                className="w-full px-3 py-2 rounded-l-md text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
              <button
                type="submit"
                className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-r-md text-sm font-medium transition-colors duration-300"
              >
                Inscrever
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-8 text-center">
          <p className="text-sm">
            &copy; {currentYear} AZEENG Serviços de Engenharia. Todos os
            direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
