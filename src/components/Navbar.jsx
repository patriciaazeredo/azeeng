import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, Building, LogOut, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

const NavLink = ({ to, children, onClick, isExternal = false }) => {
  if (isExternal) {
    return (
      <Link
        to={to}
        onClick={onClick}
        className="text-slate-700 hover:text-sky-600 px-3 py-2 rounded-md text-base font-medium transition-colors duration-300"
      >
        {children}
      </Link>
    );
  }
  return (
    <Link
      to={to.startsWith("#") ? `/${to}` : to}
      onClick={(e) => {
        if (to.startsWith("#")) {
          e.preventDefault();
          const targetElement = document.querySelector(to);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" });
          } else {
            // If on a different page, navigate first then scroll
            window.location.href = `/${to}`;
          }
        }
        if (onClick) onClick();
      }}
      className="text-slate-700 hover:text-sky-600 px-3 py-2 rounded-md text-base font-medium transition-colors duration-300"
    >
      {children}
    </Link>
  );
};

const MobileNavLink = ({ to, children, onClick, isExternal = false }) => {
  if (isExternal) {
    return (
      <Link
        to={to}
        onClick={onClick}
        className="block text-slate-700 hover:text-sky-600 hover:bg-sky-50 px-3 py-3 rounded-md text-lg font-medium transition-colors duration-300"
      >
        {children}
      </Link>
    );
  }
  return (
    <Link
      to={to.startsWith("#") ? `/${to}` : to}
      onClick={(e) => {
        if (to.startsWith("#")) {
          e.preventDefault();
          const targetElement = document.querySelector(to);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" });
          } else {
            window.location.href = `/${to}`;
          }
        }
        if (onClick) onClick();
      }}
      className="block text-slate-700 hover:text-sky-600 hover:bg-sky-50 px-3 py-3 rounded-md text-lg font-medium transition-colors duration-300"
    >
      {children}
    </Link>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logout realizado",
        description: "Você foi desconectado com sucesso.",
      });
      navigate("/admin/login");
    } catch (error) {
      toast({
        title: "Erro ao sair",
        description: error.message || "Não foi possível fazer logout.",
        variant: "destructive",
      });
    }
    setIsOpen(false);
  };

  const navItems = [
    { label: "Início", to: "#hero" },
    { label: "Serviços", to: "#services" },
    { label: "Quem Somos", to: "#about" },
    { label: "Portfólio", to: "#portfolio" },
    { label: "FAQ", to: "#faq" },
    { label: "Contato", to: "#contact" },
  ];

  return (
    <motion.nav
      className="bg-white/80 backdrop-blur-lg shadow-md fixed w-full z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link
            to="/"
            onClick={() =>
              document
                .getElementById("hero")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="flex items-center space-x-2"
          >
            <Building size={32} className="text-sky-600" />
            <img src="/logo.png" alt="azeeng logo" />
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <NavLink key={item.label} to={item.to}>
                {item.label}
              </NavLink>
            ))}
            {user ? (
              <>
                <NavLink to="/admin/dashboard" isExternal={true}>
                  <Button
                    variant="ghost"
                    className="text-sky-600 hover:text-sky-700"
                  >
                    <ShieldCheck className="mr-2 h-5 w-5" /> Painel
                  </Button>
                </NavLink>
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  className="text-red-600 hover:text-red-700"
                >
                  <LogOut className="mr-2 h-5 w-5" /> Sair
                </Button>
              </>
            ) : (
              <NavLink to="/admin/login" isExternal={true}>
                <Button
                  variant="outline"
                  className="text-sky-600 border-sky-600 hover:bg-sky-50"
                >
                  Admin
                </Button>
              </NavLink>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <Button
              onClick={() => setIsOpen(!isOpen)}
              variant="ghost"
              size="icon"
              className="text-slate-700 hover:text-sky-600"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={{
          open: {
            opacity: 1,
            height: "auto",
            transition: { duration: 0.3, ease: "easeInOut" },
          },
          closed: {
            opacity: 0,
            height: 0,
            transition: { duration: 0.3, ease: "easeInOut" },
          },
        }}
        className="md:hidden bg-white shadow-lg overflow-hidden"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <MobileNavLink
              key={item.label}
              to={item.to}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </MobileNavLink>
          ))}
          {user ? (
            <>
              <MobileNavLink
                to="/admin/dashboard"
                isExternal={true}
                onClick={() => setIsOpen(false)}
              >
                <ShieldCheck className="mr-2 h-5 w-5 inline-block" /> Painel
                Admin
              </MobileNavLink>
              <button
                onClick={handleLogout}
                className="w-full text-left block text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-3 rounded-md text-lg font-medium transition-colors duration-300"
              >
                <LogOut className="mr-2 h-5 w-5 inline-block" /> Sair
              </button>
            </>
          ) : (
            <MobileNavLink
              to="/admin/login"
              isExternal={true}
              onClick={() => setIsOpen(false)}
            >
              Acesso Admin
            </MobileNavLink>
          )}
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
