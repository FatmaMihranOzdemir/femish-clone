'use client';

import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import Image from 'next/image';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [magazineOpen, setMagazineOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(50);

  const totalPages = 37;

  const allPages = useMemo(
    () => ['cover', ...Array.from({ length: totalPages }, (_, i) => i + 1)],
    [totalPages]
  );

  const containerRef = useRef<HTMLDivElement | null>(null);
  const lastPageRef = useRef<HTMLDivElement | null>(null);
  const pagesWrapperRef = useRef<HTMLDivElement | null>(null);
  const maxScrollRef = useRef<number>(0);
  const [magazineContentHeight, setMagazineContentHeight] = useState<number | null>(null);

  const closeToHome = () => {
    setMagazineOpen(false);
    setTimeout(() => {
      document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Sadece kapak + 1. sayfa ön yükle — en az veri, en hızlı açılış
  const preloadMagazineImages = useCallback(() => {
    ['/magazine-cover.jpg', '/sayfa-1.jpg'].forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  // Sayfa yüklenir yüklenmez ön yükle (0ms) — dergi tıklanınca hemen görünsün
  useEffect(() => {
    preloadMagazineImages();
  }, [preloadMagazineImages]);

  // Dergi okuyucu: son sayfa geldiğinde aşağı kaydırma son sayfada biter, sonrası yok
  const recomputeMaxScroll = useCallback(() => {
    const container = containerRef.current;
    const last = lastPageRef.current;
    const wrapper = pagesWrapperRef.current;
    if (!container || !last || !wrapper) return;

    const contentEnd = last.offsetTop + last.offsetHeight;
    setMagazineContentHeight(contentEnd);

    const max = Math.max(0, contentEnd - container.clientHeight);
    maxScrollRef.current = max;

    if (container.scrollTop > maxScrollRef.current) {
      container.scrollTop = maxScrollRef.current;
    }
  }, []);

  // Scroll sırasında son sayfayı geçmemek: ekranda son sayfanın altında boşluk kalmasın
  const clampScrollToLastPage = useCallback(() => {
    const container = containerRef.current;
    const last = lastPageRef.current;
    if (!container || !last) return;

    const cr = container.getBoundingClientRect();
    const lr = last.getBoundingClientRect();

    if (lr.bottom < cr.bottom) {
      const diff = cr.bottom - lr.bottom;
      container.scrollTop = Math.max(0, container.scrollTop - diff);
    }
    if (container.scrollTop > maxScrollRef.current) {
      container.scrollTop = maxScrollRef.current;
    }
  }, []);

  // ESC ile kapatma + body scroll kilidi + son sayfa scroll kilidi
  useEffect(() => {
    if (!magazineOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeToHome();
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    window.addEventListener('keydown', handleKeyDown);

    // İlk açılışta ortala
    setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.scrollTop = 0;
        // Yatay olarak ortala
        const container = containerRef.current;
        const scrollWidth = container.scrollWidth;
        const clientWidth = container.clientWidth;
        if (scrollWidth > clientWidth) {
          container.scrollLeft = (scrollWidth - clientWidth) / 2;
        }
      }
    }, 100);

    // Scroll kilidi: son sayfadan sonra inilmesin, son sayfada kalsın
    const container = containerRef.current;
    const onScroll = () => {
      if (!container) return;
      const max = maxScrollRef.current;
      if (container.scrollTop > max) {
        container.scrollTop = max;
      }
      clampScrollToLastPage();
    };

    // İlk hesap + zoom değişince/imageler yüklenince tekrar hesap (son sayfadan sonra boşluk kalmasın)
    const t1 = setTimeout(recomputeMaxScroll, 50);
    const t2 = setTimeout(recomputeMaxScroll, 250);
    const t3 = setTimeout(recomputeMaxScroll, 800);
    const t4 = setTimeout(recomputeMaxScroll, 1500);

    container?.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', recomputeMaxScroll);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;

      container?.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', recomputeMaxScroll);

      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
    // clampScrollToLastPage ref kullandığı için deps'e eklenmez; boyut sabit kalmalı
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [magazineOpen, zoomLevel, recomputeMaxScroll]);

  return (
    <div className="bg-black text-white overflow-x-hidden w-full max-w-full">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-[9999] bg-black/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <a
                href="#home"
                className="text-white text-sm font-normal tracking-wide hover:opacity-80 transition-opacity duration-200"
              >
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

      {/* Hero */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6 lg:px-8 pt-20 w-full max-w-full">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-7xl md:text-9xl lg:text-[12rem] font-bold uppercase tracking-tight mb-6 text-white leading-none">
            FEMISH
          </h1>
          <div className="text-lg md:text-xl text-white/90 mb-4 font-light">
            /fe-miş/ <span className="italic">isim</span>
          </div>
          <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed font-light text-left md:text-center">
            İngilizcedeki 'famish' (açlıktan ölmek, yokluk çekmek) kelimesinden türetilmiştir. Bilgiye, sanata ve
            kolektif mücadeleye metaforik açlık olarak yeniden anlamlandırılmıştır.
          </p>
        </div>
      </section>

      {/* Issues */}
      <section id="issues" className="py-20 md:py-32 px-6 lg:px-8 w-full max-w-full">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-tight mb-6 text-center">
            Sayılarımız
          </h2>

          <div className="max-w-[280px] md:max-w-[320px] mx-auto">
            <button
              onClick={(e) => {
                e.preventDefault();
                setZoomLevel(50);
                setMagazineOpen(true);
              }}
              onMouseEnter={preloadMagazineImages}
              onFocus={preloadMagazineImages}
              className="block group cursor-pointer overflow-hidden rounded-lg border border-white/10 hover:border-white/20 transition-all duration-300 w-full"
            >
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src="/magazine-cover.jpg"
                  alt="FEMISH #01 CULTURE - Ekim 2025"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 320px, 384px"
                  priority
                  quality={78}
                />
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

            <p className="text-white text-center mt-4 text-sm md:text-base font-light">Femish #01</p>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 md:py-32 px-6 lg:px-8 w-full max-w-full">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-12 text-white uppercase tracking-tight break-words">Hakkımızda</h2>
          <div className="space-y-6 text-white/90 text-base md:text-lg leading-relaxed font-light">
            <p>
              Femish, büyürken herkesin "hayatınızın en güzel dönemi olacak" dediği, bu yüzden çoğumuzun sabırsızlıkla
              beklediği yaşlarda — yani 20'lerinde olan birkaç gencin bir araya gelmesiyle doğdu.
            </p>
            <p>
              Bu yaşlar, çoğu zaman yeni duygularla karşılaştığımız, bazen hazırlıksız yakalandığımız ve yönümüzü bulmakta
              zorlandığımız bir dönem. Hepimiz farklı şekillerde afalıyor, kayboluyor, bazen de yeniden kendimizi kuruyoruz.
              Yine de umudumuzu, neşemizi, gayemizi ve heyecanımızı kaybetmemeye çalışıyor, kendi yolculuğumuzda üretmenin
              iyileştirici gücüne inanıyoruz.
            </p>
            <p>Femish, bu inançtan doğan bir buluşma noktasıdır.</p>
            <p>
              Burada her sesin, her duygunun, her "Ben de buradayım!" diyen kişinin yeri vardır. Düşüncelerimizi, hislerimizi
              ve üretimlerimizi paylaşarak hem kendimize hem de birbirimize tutunuyoruz.
            </p>
            <p>
              Biz, sesimizi duyurmanın ve birilerinin hayatına dokunmanın değerine inanıyoruz. Femish'te her paylaşım, biraz
              daha büyümek, biraz daha hissetmek ve birbirimizi hatırlamak için bir fırsat. Çünkü bazen bir kelime, bir çizgi
              ya da bir fikir, sandığımızdan çok daha fazlasını değiştirebilir.
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 md:py-32 px-6 lg:px-8 w-full max-w-full">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-12 text-white uppercase tracking-tight break-words">İletişim</h2>

          <div className="space-y-6">
            <a
              href="mailto:femishculture@gmail.com"
              className="flex items-center gap-4 text-white/90 hover:text-white transition-colors duration-200 group"
            >
              <svg className="w-5 h-5 text-white/70 group-hover:text-white transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              <svg className="w-5 h-5 text-white/70 group-hover:text-white transition-colors duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
              </svg>
              <span className="text-base md:text-lg font-light">Instagram</span>
            </a>

            <a
              href="https://www.tiktok.com/@femish.culture?_r=1&_t=ZS-92dcD1MA1SO"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 text-white/90 hover:text-white transition-colors duration-200 group"
            >
              <svg className="w-5 h-5 text-white/70 group-hover:text-white transition-colors duration-200" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
              <span className="text-base md:text-lg font-light">TikTok</span>
            </a>
          </div>
        </div>
      </section>

      {/* Magazine Viewer Modal */}
      {magazineOpen && (
        <div
          className="fixed inset-0 z-[10001] bg-black/80 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeToHome();
          }}
        >
          {/* Üst satır: mobilde yana kaydırılabilir — linkler alanı flex-1 min-w-0 ile sınırlı, overflow-x-auto ile kayar */}
          <div
            role="button"
            tabIndex={0}
            onClick={closeToHome}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') closeToHome(); }}
            className="fixed top-0 left-0 right-0 z-[10000] bg-black/95 backdrop-blur-sm cursor-pointer border-b border-white/10"
            aria-label="Dergiden çıkmak için tıklayın"
          >
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
              <div className="flex items-center h-16 gap-3 min-w-0 w-full">
                <span className="text-white text-sm font-normal tracking-wide flex-shrink-0">femish culture</span>
                <div
                  className="flex-1 min-w-0 overflow-x-auto overflow-y-hidden py-2 -my-2 magazine-scroll-hide"
                  style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-x' }}
                  role="presentation"
                >
                  <div className="flex items-baseline gap-4 sm:gap-6 md:gap-8 flex-nowrap pr-4">
                    <span className="text-white text-sm font-normal whitespace-nowrap flex-shrink-0">Hakkımızda</span>
                    <span className="text-white text-sm font-normal whitespace-nowrap flex-shrink-0">İletişim</span>
                    <span className="text-white text-sm font-normal whitespace-nowrap flex-shrink-0">Başvurular</span>
                    <span className="text-white text-sm font-normal whitespace-nowrap flex-shrink-0">Sayılarımız</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Çıkış butonu — üst satırla üst üste gelmez, görünür */}
          <button
            onClick={closeToHome}
            className="fixed top-20 right-4 md:top-20 md:right-6 z-[10000] bg-white text-black text-sm font-medium px-4 py-2.5 rounded-md hover:bg-white/90 transition-colors shadow-lg"
            aria-label="Dergiden çık"
          >
            Çıkış
          </button>

          {/* Modal content */}
          <div className="h-full w-full flex items-center justify-center p-2 md:p-4 pt-28 md:pt-32">
            <div
              ref={containerRef}
              data-magazine-container
              tabIndex={0}
              role="region"
              aria-label="Dergi sayfaları — fare tekerleği, dokunmatik veya sürükleyerek kaydırabilirsiniz"
              className="relative bg-black rounded-lg w-full max-w-3xl h-full overflow-y-auto overflow-x-auto overflow-scroll shadow-2xl magazine-scroll-hide"
              onMouseDown={(e) => e.stopPropagation()}
              style={{
                touchAction: 'pan-x pan-y pinch-zoom',
                WebkitOverflowScrolling: 'touch',
                overscrollBehavior: 'contain'
              }}
            >
              {/* Pages - yükseklik içeriğin bittiği yerde kesilsin, son sayfadan sonra scroll yok */}
              <div 
                ref={pagesWrapperRef}
                className="flex flex-col items-center gap-4 md:gap-6 pt-4 pb-0 px-2 md:px-6 w-full box-border flex-shrink-0"
                style={{
                  transform: `scale(${zoomLevel / 100})`,
                  transformOrigin: 'top center',
                  width: `${100 * (100 / zoomLevel)}%`,
                  minWidth: `${100 * (100 / zoomLevel)}%`,
                  ...(magazineContentHeight != null && { height: magazineContentHeight, minHeight: magazineContentHeight }),
                }}
              >
                {allPages && allPages.length > 0 ? (
                  allPages.map((pageNum, index) => {
                    const isCover = pageNum === 'cover';
                    const isLast = index === allPages.length - 1;
                    const pageNumber = isCover ? null : pageNum;

                    return (
                      <div
                        key={isCover ? 'cover' : String(pageNum)}
                        ref={isLast ? lastPageRef : null}
                        className={`relative w-full max-w-[800px] bg-black/20 mx-auto ${isLast ? '!mb-0 !pb-0' : ''}`}
                        style={{
                          marginBottom: isLast ? 0 : undefined,
                          paddingBottom: isLast ? 0 : undefined,
                        }}
                      >
                        <Image
                          src={isCover ? '/magazine-cover.jpg' : `/sayfa-${pageNum}.jpg`}
                          alt={isCover ? 'Dergi Kapağı' : `Sayfa ${pageNum}`}
                          width={800}
                          height={1067}
                          className="w-full h-auto object-contain"
                          sizes="(max-width: 768px) 85vw, 800px"
                          priority={index <= 1}
                          loading={index <= 1 ? 'eager' : 'lazy'}
                          quality={72}
                          fetchPriority={index === 0 ? 'high' : undefined}
                          onLoad={isLast ? () => { setTimeout(recomputeMaxScroll, 0); setTimeout(recomputeMaxScroll, 100); } : undefined}
                        />

                      </div>
                    );
                  })
                ) : (
                  <div className="text-white">Sayfalar yükleniyor...</div>
                )}
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
