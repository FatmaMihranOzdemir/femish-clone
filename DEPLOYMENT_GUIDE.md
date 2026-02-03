# Femish Culture - Deployment Rehberi (Vercel)

## 🚀 Canlıya Çıkma (Vercel ile)

### Yol 1: GitHub ile (Önerilen — otomatik deploy + kolay geri dönüş)

1. **Projeyi GitHub’a at**
   - https://github.com/new → yeni repo oluştur (örn. `femish-clone`)
   - Proje klasöründe:
   ```bash
   git add .
   git commit -m "Canlıya çıkmadan önce son sürüm"
   git branch -M main
   git remote add origin https://github.com/KULLANICI_ADI/femish-clone.git
   git push -u origin main
   ```

2. **Vercel’e bağla**
   - https://vercel.com → giriş yap (GitHub ile giriş en kolayı)
   - **Add New…** → **Project**
   - **Import** → GitHub’daki `femish-clone` repo’sunu seç
   - **Framework Preset:** Next.js (otomatik seçilir)
   - **Root Directory:** boş bırak
   - **Deploy**’a tıkla

3. **Domain (isteğe bağlı)**
   - Proje açıldıktan sonra: **Settings** → **Domains** → **Add** → `femishculture.com`
   - Domain sağlayıcında Vercel’in verdiği DNS kayıtlarını ekle

### Yol 2: Vercel CLI ile (GitHub kullanmadan)

1. **Vercel CLI kur**
   ```bash
   npm i -g vercel
   ```

2. **Giriş ve deploy**
   ```bash
   cd c:\Users\pc\femish-clone
   vercel login
   vercel
   ```
   - Sorulan sorularda Enter ile devam et (varsayılanlar yeterli)
   - Canlıya almak için: `vercel --prod`

### 2. Netlify ile Deployment (Alternatif)

1. **https://netlify.com** adresine gidin
2. Ücretsiz hesap oluşturun
3. "Add new site" → "Deploy manually"
4. Klasörü zip yapıp yükleyin
5. Domain ayarlarını yapın

## 🔄 Sorun Olursa Geri Dönüş

### Vercel üzerinden (en hızlı yol)

1. **https://vercel.com** → projeni seç (femish-clone)
2. Üstte **Deployments** sekmesine gir
3. Listede **önceki**, sorunsuz çalışan bir deployment’ı bul (yeşil tikli, tarih eski olan)
4. Sağdaki **üç nokta (⋯)** menüsüne tıkla
5. **Promote to Production** seç
6. Onayla — birkaç saniye içinde site önceki sürüme döner

Böylece kodda hiçbir şey değiştirmeden sadece Vercel’den “hangi sürüm canlıda olsun”u değiştirmiş olursun.

### GitHub kullanıyorsan — kod ile geri dönüş

```bash
# Son commit'leri gör
git log --oneline

# Belirli bir eski commit'e dön (ID'yi log'dan al)
git checkout COMMIT_ID

# Vercel GitHub’a bağlıysa otomatik yeni deploy alır;
# istemezsen: git checkout main  yapıp sonra eski halini tekrar push edebilirsin
```

## 📝 Deployment Öncesi Kontrol Listesi

- [x] Git commit yapıldı
- [ ] Local'de test edildi (`npm run build` çalışıyor mu?)
- [ ] Görseller public klasöründe
- [ ] Domain hazır (femishculture.com)
- [ ] DNS ayarları yapılacak

## 🧪 Test Komutları

```bash
# Build test (hata var mı kontrol)
npm run build

# Production modunda test
npm run build
npm start
```

## ⚠️ Önemli Notlar

1. **Görseller:** public/ klasöründeki tüm görseller otomatik olarak deploy edilir
2. **Domain:** DNS ayarları domain sağlayıcınızdan yapılmalı (24-48 saat sürebilir)
3. **SSL:** Vercel/Netlify otomatik SSL sertifikası verir (HTTPS)
4. **Yedek:** Git sayesinde her zaman geri dönebilirsiniz

## 📞 Yardım

Sorun olursa:
- Git log: `git log --oneline` - Tüm versiyonları gösterir
- Geri dönüş: `git checkout COMMIT_ID` - Önceki versiyona döner
- Vercel Support: Dashboard → Help Center





