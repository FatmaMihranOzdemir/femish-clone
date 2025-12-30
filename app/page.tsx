'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [magazineOpen, setMagazineOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);
  const totalPages = 37;

  // Sayfa dizisi oluştur (kapak + 37 sayfa)
  const allPages = ['cover', ...Array.from({ length: totalPages }, (_, i) => i + 1)];

  // ESC tuşu ile kapatma
  useEffect(() => {
    if (!magazineOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMagazineOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [magazineOpen]);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden w-full max-w-full">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <a href="#home" className="text-white text-sm font-normal tracking-wide hover:opacity-80 transition-opacity duration-200">
                femish culture
              </a>
            </div>
            <div className="md:hidden">
              <button 
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-white hover:opacity-80 transition-opacity duration-200"
                aria-label="Menu"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {menuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#about" className="text-white text-sm font-normal hover:opacity-80 transition-opacity duration-200">
                  Hakkımızda
                </a>
                <a href="#contact" className="text-white text-sm font-normal hover:opacity-80 transition-opacity duration-200">
                  İletişim
                </a>
                <a 
                  href="https://docs.google.com/forms/d/e/1FAIpQLScC4EbqCu5frGUXG1qwPQxeHzSUpQzglssvopdPQej-URqntw/viewform?pli=1" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white text-sm font-normal hover:opacity-80 transition-opacity duration-200"
                >
                  Başvurular
                </a>
                <a href="#issues" className="text-white text-sm font-normal hover:opacity-80 transition-opacity duration-200">
                  Sayılarımız
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-black border-t border-white/10">
            <div className="px-6 py-4 space-y-4">
              <a 
                href="#about" 
                onClick={() => setMenuOpen(false)}
                className="block text-white text-sm font-normal hover:opacity-80 transition-opacity duration-200"
              >
                Hakkımızda
              </a>
              <a 
                href="#contact" 
                onClick={() => setMenuOpen(false)}
                className="block text-white text-sm font-normal hover:opacity-80 transition-opacity duration-200"
              >
                İletişim
              </a>
              <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLScC4EbqCu5frGUXG1qwPQxeHzSUpQzglssvopdPQej-URqntw/viewform?pli=1" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="block text-white text-sm font-normal hover:opacity-80 transition-opacity duration-200"
              >
                Başvurular
              </a>
              <a 
                href="#issues" 
                onClick={() => setMenuOpen(false)}
                className="block text-white text-sm font-normal hover:opacity-80 transition-opacity duration-200"
              >
                Sayılarımız
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6 lg:px-8 pt-16 w-full max-w-full overflow-x-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-7xl md:text-9xl lg:text-[12rem] font-bold uppercase tracking-tight mb-6 text-white leading-none">
            FEMISH
          </h1>
          <div className="text-lg md:text-xl text-white/90 mb-4 font-light">
            /fe-miş/ <span className="italic">isim</span>
          </div>
          <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed font-light text-left md:text-center">
            İngilizcedeki 'famish' (açlıktan ölmek, yokluk çekmek) kelimesinden türetilmiştir. 
            Bilgiye, sanata ve kolektif mücadeleye metaforik açlık olarak yeniden anlamlandırılmıştır.
          </p>
        </div>
      </section>

      {/* Issues Section */}
      <section id="issues" className="py-20 md:py-32 px-6 lg:px-8 w-full max-w-full overflow-x-hidden">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-bold mb-12 text-white uppercase tracking-tight">
            Sayılarımız
          </h2>
          <button
            onClick={() => {
              setMagazineOpen(true);
              setZoomLevel(100);
            }}
            className="block group cursor-pointer overflow-hidden rounded-lg border border-white/10 hover:border-white/20 transition-all duration-300 w-full"
          >
            <div className="relative aspect-[3/4] w-full">
              <Image
                src="/magazine-cover.jpg"
                alt="FEMISH #01 CULTURE - Ekim 2025"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
                priority
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/10 backdrop-blur-sm rounded-full p-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-32 px-6 lg:px-8 w-full max-w-full overflow-x-hidden">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-bold mb-12 text-white uppercase tracking-tight">
            Hakkımızda
          </h2>
          <div className="space-y-6 text-white/90 text-base md:text-lg leading-relaxed font-light">
            <p>
              Femish, büyürken herkesin "hayatınızın en güzel dönemi olacak" dediği, bu yüzden çoğumuzun 
              sabırsızlıkla beklediği yaşlarda — yani 20'lerinde olan birkaç gencin bir araya gelmesiyle doğdu.
            </p>
            <p>
              Bu yaşlar, çoğu zaman yeni duygularla karşılaştığımız, bazen hazırlıksız yakalandığımız ve 
              yönümüzü bulmakta zorlandığımız bir dönem. Hepimiz farklı şekillerde afalıyor, kayboluyor, 
              bazen de yeniden kendimizi kuruyoruz. Yine de umudumuzu, neşemizi, gayemizi ve heyecanımızı 
              kaybetmemeye çalışıyor, kendi yolculuğumuzda üretmenin iyileştirici gücüne inanıyoruz.
            </p>
            <p>
              Femish, bu inançtan doğan bir buluşma noktasıdır.
            </p>
            <p>
              Burada her sesin, her duygunun, her "Ben de buradayım!" diyen kişinin yeri vardır. 
              Düşüncelerimizi, hislerimizi ve üretimlerimizi paylaşarak hem kendimize hem de birbirimize tutunuyoruz.
            </p>
            <p>
              Biz, sesimizi duyurmanın ve birilerinin hayatına dokunmanın değerine inanıyoruz. Femish'te 
              her paylaşım, biraz daha büyümek, biraz daha hissetmek ve birbirimizi hatırlamak için bir fırsat. 
              Çünkü bazen bir kelime, bir çizgi ya da bir fikir, sandığımızdan çok daha fazlasını değiştirebilir.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32 px-6 lg:px-8 w-full max-w-full overflow-x-hidden">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-bold mb-12 text-white uppercase tracking-tight">
            İletişim
          </h2>
          <div className="space-y-6">
            <a 
              href="mailto:femishculture@gmail.com" 
              className="flex items-center gap-4 text-white/90 hover:text-white transition-colors duration-200 group"
            >
              <svg 
                className="w-5 h-5 text-white/70 group-hover:text-white transition-colors duration-200" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-base md:text-lg font-light">femishculture@gmail.com</span>
            </a>
            <a 
              href="https://www.instagram.com/femish.culture?igsh=MTVybHNlbm0xcnY3Mw%3D%3D&utm_source=qr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-4 text-white/90 hover:text-white transition-colors duration-200 group"
            >
              <svg 
                className="w-5 h-5 text-white/70 group-hover:text-white transition-colors duration-200" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span className="text-base md:text-lg font-light">Instagram</span>
            </a>
            <a 
              href="https://www.tiktok.com/@femish.culture?_r=1&_t=ZS-92dcD1MA1SO" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-4 text-white/90 hover:text-white transition-colors duration-200 group"
            >
              <svg 
                className="w-5 h-5 text-white/70 group-hover:text-white transition-colors duration-200" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
              <span className="text-base md:text-lg font-light">TikTok</span>
            </a>
          </div>
        </div>
      </section>

      {/* Magazine Viewer Modal */}
      {magazineOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black overflow-y-auto overscroll-none"
          onClick={() => setMagazineOpen(false)}
          style={{ overscrollBehavior: 'none' }}
        >
          {/* Close Button */}
          <button
            onClick={() => setMagazineOpen(false)}
            className="fixed top-4 right-4 z-20 bg-black/70 backdrop-blur-sm hover:bg-black/90 text-white hover:text-white/70 transition-all duration-200 p-3 rounded-full"
            aria-label="Kapat"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Zoom Controls */}
          <div className="fixed top-4 right-16 md:right-20 z-20 flex flex-row md:flex-col gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setZoomLevel(prev => Math.min(prev + 25, 200));
              }}
              className="bg-black/70 backdrop-blur-sm hover:bg-black/90 text-white hover:text-white/70 transition-all duration-200 p-2 md:p-3 rounded-full"
              aria-label="Yakınlaştır"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setZoomLevel(prev => Math.max(prev - 25, 50));
              }}
              className="bg-black/70 backdrop-blur-sm hover:bg-black/90 text-white hover:text-white/70 transition-all duration-200 p-2 md:p-3 rounded-full"
              aria-label="Uzaklaştır"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setZoomLevel(100);
              }}
              className="bg-black/70 backdrop-blur-sm hover:bg-black/90 text-white hover:text-white/70 transition-all duration-200 px-2 md:px-3 py-2 rounded-full text-xs font-light"
              aria-label="Sıfırla"
            >
              {zoomLevel}%
            </button>
          </div>

          {/* Magazine Pages Container */}
          <div 
            className="flex flex-col items-center gap-3 md:gap-6 py-4 px-0 md:px-8 w-full"
            onClick={(e) => e.stopPropagation()}
            style={{ 
              transform: `scale(${zoomLevel / 100})`, 
              transformOrigin: 'top center', 
              width: '100%',
            }}
          >
            {allPages.map((pageNum, index) => (
              <div
                key={pageNum === 'cover' ? 'cover' : pageNum}
                className="relative w-full max-w-full md:max-w-4xl bg-black/20 overflow-hidden"
              >
                <Image
                  src={pageNum === 'cover' ? '/magazine-cover.jpg' : `/sayfa-${pageNum}.jpg`}
                  alt={pageNum === 'cover' ? 'Dergi Kapağı' : `Sayfa ${pageNum}`}
                  width={1200}
                  height={1600}
                  className="w-full h-auto object-contain"
                  sizes="100vw"
                  loading={index <= 1 ? "eager" : "lazy"}
                  quality={75}
                  unoptimized={false}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-12 px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <p className="text-white/60 text-sm font-light text-center">
            © 2024 Femish Culture. Tüm hakları saklıdır.
          </p>
        </div>
      </footer>
    </div>
  );
}
