# Golazo - Discord Destek/Ticket Botu

Discord.js v14 ile yazılmış, Components V2 destekli modern destek/ticket botu.

## Özellikler

- **Modern UI** — Components V2 (Container, Separator, Section, MediaGallery) ile tamamen özelleştirileştirilmiş panel
- **5 Kategori** — Teknik Destek, Değer, Bütçe, Satın Alma, Ödül Talep
- **Ticket Yönetimi** — Üstleme, kapatma, kullanıcı ekleme/çıkarma, isim değiştirme, not ekleme
- **Puanlama Sistemi** — Ticket kapatılırken 1-5 arası puanlama, DM ve log kanalına bildirim
- **Otomatik Temizlik** — Puanlama sonrası ticket kanalı otomatik silinir
- **Türkçe** — Tamamen Türkçe arayüz

## Kurulum

1. Depoyu klonlayın:
```bash
git clone https://github.com/KULLANICI_ADINIZ/golazo.git
cd golazo
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. `config.example.json` dosyasını `config.json` olarak kopyalayın:
```bash
cp config.example.json config.json
```

4. `config.json` dosyasını kendi değerlerinizle doldurun:

| Alan | Açıklama |
|------|----------|
| `botToken` | Bot token'ınız |
| `clientId` | Bot client ID |
| `guildId` | Sunucu ID |
| `yetkiliRolId` | Yetkili rol ID |
| `adminRolId` | Admin rol ID |
| `logKanalId` | Log kanal ID |
| `kategoriId` | Ticket kategorisi ID |

5. Slash komutlarını kaydedin:
```bash
npm run deploy
```

6. Botu başlatın:
```bash
npm start
```

## Kullanım

- `/panel` — Destek panelini gönderir
- Paneldeki butona tıklayarak kategori seçimi yapılır
- Seçilen kategoride otomatik ticket kanalı açılır

## Teknolojiler

- [Discord.js v14](https://discord.js.org/)
- Components V2 API

## Lisans

MIT
