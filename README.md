# Femish Culture — Dergi Web Sitesi

🔗 **Canlı site:** [femishculture.com](https://femishculture.com)
📦 **GitHub:** [github.com/FatmaMihranOzdemir/femish-clone](https://github.com/FatmaMihranOzdemir/femish-clone)
👩‍💻 **Geliştiren:** Fatma Mihran Özdemir

![Femish Culture ana sayfa](screenshots/ana-sayfa.png)

## Proje Hakkında

**Femish**, üniversite öğrencilerinin bir araya gelerek çıkardığı bağımsız bir kültür ve sanat dergisidir. Bu web sitesini, dergiye destek olmak ve onu daha geniş bir kitleye ulaştırmak amacıyla hazırladım.

Site sayesinde okurlar dergiyi indirmeden, doğrudan tarayıcı üzerinden sayfa sayfa okuyabiliyor. Ayrıca dergi ekibi hakkında bilgi alıp başvuru formuna ve sosyal medya hesaplarına ulaşabiliyor.

## Özellikler

- **Dergi okuyucu:** Femish #01'in kapağı ve 37 sayfası, site içinde açılan tam ekran bir okuyucuda gösteriliyor.
  - Fare tekerleği, dokunmatik ekran ya da sürükleyerek sayfalar arasında gezinme
  - Yakınlaştırma / uzaklaştırma
  - `ESC` tuşu ile okuyucudan çıkma
  - Kaydırmanın son sayfada durması (sayfanın altında boşluk kalmaması)
  - Kapak ve ilk sayfanın önceden yüklenmesi sayesinde hızlı açılış
- **Bölümler:** Ana sayfa, Sayılarımız, Hakkımızda, İletişim
- **Başvurular:** Dergiye katılmak isteyenler için Google Form bağlantısı
- **İletişim:** E-posta, Instagram ve TikTok bağlantıları
- **Mobil uyumlu tasarım:** Telefonda açılır hamburger menü, her ekran boyutuna uyan yazı ve görseller
- **SEO:** Sayfa başlığı, açıklama, anahtar kelimeler ve sosyal medya paylaşım kartları (Open Graph / Twitter)
- **Erişilebilirlik:** Butonlarda `aria-label` açıklamaları, klavye ile kullanılabilen okuyucu

## Kullanılan Teknolojiler

| Teknoloji | Kullanım amacı |
|---|---|
| [Next.js 16](https://nextjs.org) (App Router) | React tabanlı web çatısı |
| [React 19](https://react.dev) | Arayüz bileşenleri ve durum yönetimi (`useState`, `useEffect`, `useRef`) |
| [TypeScript](https://www.typescriptlang.org) | Tip güvenli JavaScript |
| [Tailwind CSS v4](https://tailwindcss.com) | Stil ve mobil uyumlu tasarım |
| `next/image`, `next/font` | Görsel optimizasyonu ve Geist yazı tipi |
| [Vercel](https://vercel.com) | Yayınlama (her `main` push'unda otomatik deploy) |
| Git & GitHub | Sürüm kontrolü |
| VS Code | Geliştirme ortamı (IDE) |

## Kurulum

Bilgisayarınızda [Node.js](https://nodejs.org) (20 veya üzeri) kurulu olmalıdır.

```bash
# 1. Depoyu klonlayın
git clone https://github.com/FatmaMihranOzdemir/femish-clone.git
cd femish-clone

# 2. Paketleri yükleyin
npm install

# 3. Geliştirme sunucusunu başlatın
npm run dev
```

Tarayıcıda [http://localhost:3000](http://localhost:3000) adresini açın.

Canlıya almadan önce üretim sürümünü denemek için:

```bash
npm run build
npm start
```

Vercel'de yayına alma adımları için: [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

## Proje Yapısı

```
femish-clone/
├── app/
│   ├── layout.tsx     # Sayfa iskeleti, yazı tipleri ve SEO bilgileri
│   ├── page.tsx       # Ana sayfa, menü, bölümler ve dergi okuyucu
│   └── globals.css    # Genel stiller (Tailwind)
├── public/
│   ├── femish-logo.png
│   ├── magazine-cover.jpg      # Dergi kapağı
│   └── sayfa-1.jpg … sayfa-37.jpg  # Dergi sayfaları
├── screenshots/       # README ekran görüntüleri
├── DEPLOYMENT_GUIDE.md
└── package.json
```

## Yapay Zeka Kullanımı

Bu projeyi geliştirirken **[YAPAY ZEKA ARACI — ör. Cursor / ChatGPT / Claude]** yapay zeka asistanından şu aşamalarda yardım aldım:

1. **Planlama:** Sitenin bölümlerini (ana sayfa, sayılar, hakkımızda, iletişim) ve derginin site içinde nasıl gösterileceğini yapay zeka ile birlikte planladım.
2. **Bileşen üretimi:** Tam ekran dergi okuyucusunu, mobil hamburger menüyü ve iletişim bölümünü istemler yazarak oluşturdum. Üretilen kodu kendi tasarımıma göre düzenledim.
3. **Hata ayıklama:** Dergide aşağı kaydırınca son sayfanın altında boşluk kalması ve okuyucu açıkken arka planın kayması gibi sorunları yapay zekaya açıklayarak çözdüm.
4. **Performans:** 37 sayfalık derginin hızlı açılması için sadece kapak ve ilk sayfanın önceden yüklenmesi fikrini yapay zeka ile değerlendirdim.
5. **Mobil uyum, SEO ve erişilebilirlik:** Farklı ekran boyutları için Tailwind sınıfları, Open Graph etiketleri ve `aria-label` açıklamaları konusunda öneriler aldım.
6. **Yayınlama ve dokümantasyon:** Vercel'e deploy adımlarını, alan adı (femishculture.com) bağlamayı ve bu README'nin taslağını yapay zeka desteğiyle hazırladım.

Yapay zekanın ürettiği her kodu tarayıcıda test ederek doğruladım; çalışmayan ya da tasarıma uymayan kısımları yeniden istem yazarak veya elle düzelterek geliştirdim.

## Ekran Görüntüleri

| Ana sayfa | Dergi okuyucu |
|---|---|
| ![Ana sayfa](screenshots/ana-sayfa.png) | ![Dergi okuyucu](screenshots/dergi-okuyucu.png) |

| Dergiden bir sayfa | Hakkımızda (mobil görünüm) |
|---|---|
| ![Dergiden bir sayfa](screenshots/dergi-sayfasi.png) | ![Hakkımızda mobil](screenshots/mobil-hakkimizda.png) |

## İletişim

- E-posta: [femishculture@gmail.com](mailto:femishculture@gmail.com)
- Instagram: [@femish.culture](https://www.instagram.com/femish.culture)
- TikTok: [@femish.culture](https://www.tiktok.com/@femish.culture)
