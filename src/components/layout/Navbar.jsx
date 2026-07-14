import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";
const WHATSAPP_URL = "https://wa.me/5500000000000?text=Olá! Gostaria de agendar uma consulta.";

const navLinks = [
{ label: "Início", path: "/" },
{ label: "Especialidades", path: "/especialidades", hasDropdown: true },
{ label: "Exames", path: "/exames" },
{ label: "Quem Somos", path: "/quem-somos" },
{ label: "Blog", path: "/blog" },
{ label: "FAQ", path: "/faq" }];


export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const transparentRoutes = ["/", "/especialidades", "/quem-somos"];
  const isTransparentPage = transparentRoutes.includes(location.pathname);
  const showTransparent = isTransparentPage && !isScrolled;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location.pathname]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        showTransparent ?
        "bg-transparent" :
        "bg-white/90 backdrop-blur-xl shadow-lg shadow-[#735AAA]/5"}`
        }>
        
        <div
          className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg3MCwxMjUsMTcwLDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-60 pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            <Link to="/" className="flex-shrink-0 py-1">
              <Logo imgClassName="h-[52px]" />
            </Link>

            <div className="hidden md:flex items-center gap-0.5">
              {navLinks.map((link) =>
              <Link
                key={link.path}
                to={link.path}
                className={`px-2.5 lg:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                location.pathname === link.path ?
                showTransparent ? "text-white bg-white/20" : "text-[#735AAA] bg-[#735AAA]/10" :
                showTransparent ? "text-white/90 hover:text-white hover:bg-white/10" : "text-[#1E293B] hover:text-[#735AAA] hover:bg-[#735AAA]/5"} `
                }>
                  {link.label}
                </Link>
              )}
            </div>

            <div className="hidden md:flex items-center gap-2 lg:gap-3">
              <a
                href="tel:+5500000000000"
                className={`hidden lg:flex items-center gap-2 text-sm transition-colors ${showTransparent ? "text-white/90 hover:text-white" : "text-[#1E293B] hover:text-[#735AAA]"}`}>
                <Phone className="w-4 h-4" />
                <span>(21) 3400-8200
</span>
              </a>
              <a href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-[#46BEE6] to-[#735AAA] text-white px-4 lg:px-6 py-2.5 rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-[#735AAA]/30 transition-all duration-300 hover:-translate-y-0.5">
                Agendar
              </a>
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors ${showTransparent ? "text-white hover:bg-white/10" : "text-[#1E293B] hover:bg-[#735AAA]/10"}`}>
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen &&
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-0 z-40 md:hidden">
          
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25 }}
            className="absolute right-0 top-0 h-full w-80 bg-white shadow-2xl">
            
              <div className="p-6 pt-24 flex flex-col gap-2">
                {navLinks.map((link) =>
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-3 rounded-xl text-base font-medium transition-all ${
                location.pathname === link.path ?
                "text-[#735AAA] bg-[#735AAA]/10" :
                "text-[#1E293B] hover:bg-[#735AAA]/5"}`
                }>
                
                    {link.label}
                  </Link>
              )}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-gradient-to-r from-[#46BEE6] to-[#735AAA] text-white px-6 py-3.5 rounded-full text-base font-semibold">
                  
                    Agendar Consulta
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>
    </>);

}