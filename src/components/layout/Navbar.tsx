import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useState } from "react";
import { useScrollY } from "@/hooks/useScrollY";
import { cn } from "@/lib/utils";

// Static nav links hoisted outside component — rendering-hoist-jsx
const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

export function Navbar({ isDark, onToggleTheme }: NavbarProps) {
  const scrollY = useScrollY();
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrolled = scrollY > 20;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "glass shadow-sm shadow-black/5" : "bg-transparent",
      )}
    >
      <nav className="container-max flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a
          href="#hero"
          className="font-display font-bold text-lg text-slate-900 dark:text-white tracking-tight"
        >
          <span className="text-blue-600">K</span>hoa
          <span className="text-blue-600">.</span>dev
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden glass border-t border-white/10 dark:border-slate-800"
          >
            <ul className="container-max px-4 py-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
