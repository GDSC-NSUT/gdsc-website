"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/libs/utils";

const UnifiedNavbar = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPos = window.scrollY;
          if (!isScrolled && scrollPos > 40) {
            setIsScrolled(true);
          } else if (isScrolled && scrollPos < 20) {
            setIsScrolled(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled]);

  const darkStyles = {
    navBg: "bg-black/40 border-white/50",
    textColor: "text-white",
    textHover: "hover:text-blue-300",
    mobileBg: "bg-black/40 border-white/10",
    mobileMenuBg: "bg-black/40 border-white/10",
    mobileHover: "hover:bg-white/10",
    overlayBg: "bg-black/60",
    subText: "text-gray-200",
  };

  const lightStyles = {
    navBg: "bg-[#E3E3E3]/50 border-white/20",
    textColor: "text-neutral-900",
    textHover: "hover:text-blue-600",
    mobileBg: "bg-[#E3E3E3]/50 border-white/20",
    mobileMenuBg: "bg-[#E3E3E3]/60 border-white/20",
    mobileHover: "hover:bg-black/5",
    overlayBg: "bg-black/20",
    subText: "text-neutral-600",
  };

  const styles = isHomePage ? darkStyles : lightStyles;

  return (
    <>
      {/* Desktop Navbar */}
      <motion.nav
        initial={false}
        animate={{
          width: isScrolled ? "fit-content" : "95%",
          maxWidth: isScrolled ? "fit-content" : "1170px",
          top: "25px",
          minHeight: isScrolled ? "auto" : "78px",
        }}
        // transition={{ type: "spring", stiffness: 200, damping: 25 }}
        transition={{ type: "tween" }}
        style={{
          padding: isScrolled ? "8px 16px" : "8px 24px",
        }}
        className={cn(
          "hidden min-[820px]:flex items-center justify-between rounded-[50px] border backdrop-blur-xl shadow-lg antialiased overflow-hidden",
          styles.navBg,
          isHomePage
            ? "fixed z-50 left-1/2 -translate-x-1/2"
            : "sticky z-50 mx-auto mt-8"
        )}
      >
        <div className="flex items-center gap-3">
          <motion.div
            className="relative shrink-0"
            animate={{
              height: isScrolled ? 40 : 60,
              width: isScrolled ? 40 : 60,
            }}
            transition={{type: "tween"}}
          >
            <Image
              src="/logo.svg"
              alt="GDG Logo"
              fill
              className="object-contain"
              sizes="60px"
              priority
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 1, width: 400, paddingLeft: 12 }}
            animate={{
              opacity: isScrolled ? 0 : 1,
              width: isScrolled ? 0 : 400,
              // paddingLeft: isScrolled ? 0 : 12,
            }}
            transition={{ type: "tween"}}
            className="flex flex-col whitespace-nowrap overflow-hidden"
          >
            <span className={cn("text-lg 2xl:text-xl leading-tight", styles.textColor)}>
              Google Developer Groups
            </span>
            <span className={cn("text-sm 2xl:text-base", styles.subText)}>
              On Campus • Netaji Subhas University Of Technology
            </span>
          </motion.div>
        </div>

        <motion.div
          animate={{
            paddingLeft: isScrolled ? 12 : 16,
          }}
          // transition={{ type: "spring", stiffness: 200, damping: 25 }}
          transition={{ type: "tween" }}
          className={cn(
            "flex items-center gap-6 2xl:gap-8 text-lg 2xl:text-xl whitespace-nowrap shrink-0",
            styles.textColor
          )}
        >
          <Link
            href="/"
            className={cn("transition-colors", styles.textHover)}
          >
            Home
          </Link>
          <Link
            href="/events"
            className={cn("transition-colors", styles.textHover)}
          >
            Events
          </Link>
          <Link
            href="/feeds"
            className={cn("transition-colors", styles.textHover)}
          >
            Feed
          </Link>
          <Link
            href="/team"
            className={cn("transition-colors", styles.textHover)}
          >
            About Team
          </Link>
          <Link
            href="/contact"
            className={cn("transition-colors", styles.textHover)}
          >
            Contact Us
          </Link>
        </motion.div>
      </motion.nav>

      {/* Mobile Navbar */}
      {!isHomePage ? (
        <>
          <motion.nav
            initial={false}
            animate={{
              position: isScrolled ? "fixed" : "relative",
              top: isScrolled ? "0" : "auto",
            }}
            // transition={{type: "spring", stiffness: 200, damping: 25}}
            // transition={{type: "tween"}}
            className="min-[820px]:hidden border-b left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-white"
          >
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 shrink-0">
                <Image
                  src="/logo.svg"
                  alt="GDG Logo"
                  fill
                  className="object-contain"
                  sizes="40px"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className={cn("text-sm leading-tight", styles.textColor)}>
                  Google Developer Groups
                </span>
                <span className={cn("text-xs", styles.subText)}>
                  Netaji Subhas University Of Technology
                </span>
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "flex h-10 w-10 items-center justify-center relative z-50",
                styles.textColor
              )}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </motion.nav>
          {isScrolled && (
            <div className="min-[820px]:hidden h-18" aria-hidden="true" />
          )}
        </>
      ) : (
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={cn(
            "min-[820px]:hidden fixed top-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border backdrop-blur-xl shadow-lg",
            styles.mobileBg,
            styles.textColor
          )}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      )}

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className={cn(
              "fixed inset-0 z-40 backdrop-blur-sm min-[820px]:hidden flex items-start justify-end pt-24 pr-6",
              styles.overlayBg
            )}
          >
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className={cn(
                "w-48 flex flex-col gap-2 rounded-2xl border backdrop-blur-xl p-4 shadow-2xl",
                styles.mobileMenuBg
              )}
            >
              {!isHomePage && (
                <Link
                  href="/"
                  className={cn(
                    "block rounded-lg px-4 py-2 transition-colors",
                    styles.textColor,
                    styles.mobileHover
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
              )}
              <Link
                href="/events"
                className={cn(
                  "block rounded-lg px-4 py-2 transition-colors",
                  styles.textColor,
                  styles.mobileHover
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Events
              </Link>
              <Link
                href="/feeds"
                className={cn(
                  "block rounded-lg px-4 py-2 transition-colors",
                  styles.textColor,
                  styles.mobileHover
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Feed
              </Link>
              <Link
                href="/team"
                className={cn(
                  "block rounded-lg px-4 py-2 transition-colors",
                  styles.textColor,
                  styles.mobileHover
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Team
              </Link>
              <Link
                href="/contact"
                className={cn(
                  "block rounded-lg px-4 py-2 transition-colors",
                  styles.textColor,
                  styles.mobileHover
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact Us
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default UnifiedNavbar;
