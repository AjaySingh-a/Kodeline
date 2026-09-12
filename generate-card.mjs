import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const logoPath = 'c:\\Users\\ASUS\\Downloads\\Asset 1.png';
const logoBase64 = fs.readFileSync(logoPath).toString('base64');
const logoDataUri = `data:image/png;base64,${logoBase64}`;

// Standard business card: 3.5" x 2" @ 300dpi = 1050 x 600
const W = 1050;
const H = 600;

// Light theme colors (matching site's light mode)
const BG     = '#F5F2EC';
const TEXT   = '#111110';
const MUTED  = '#6E6A64';
const ACCENT = '#8A6A15';
const BORDER = '#D4D1CA';

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
     width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">

  <!-- Background -->
  <rect width="${W}" height="${H}" fill="${BG}"/>

  <!-- ── TOP BAND ─────────────────────────────── -->
  <rect x="0" y="0" width="${W}" height="6" fill="${ACCENT}" opacity="0.9"/>

  <!-- K icon (square crop, transparent bg works fine on light) -->
  <image href="${logoDataUri}" x="48" y="28" width="70" height="70"
         preserveAspectRatio="xMinYMid meet"/>

  <!-- Brand name in dark text next to K icon -->
  <text x="130" y="75"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="38" font-weight="400"
    fill="${TEXT}">Kodeline</text>

  <!-- Tagline under brand name -->
  <text x="132" y="100"
    font-family="'Courier New', Courier, monospace"
    font-size="10.5" letter-spacing="2.5"
    fill="${MUTED}">DESIGN &amp; DEVELOPMENT STUDIO  ·  EST. 2025</text>

  <!-- Full-width divider -->
  <line x1="56" y1="122" x2="${W - 56}" y2="122" stroke="${BORDER}" stroke-width="1"/>

  <!-- ── TWO-PERSON BLOCK ───────────────────────── -->

  <!-- ── AJAY (left) ── -->
  <!-- Name -->
  <text x="56" y="176"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="26" font-weight="400"
    fill="${TEXT}">Ajay</text>

  <!-- Role -->
  <text x="56" y="202"
    font-family="'Courier New', Courier, monospace"
    font-size="10" letter-spacing="2"
    fill="${ACCENT}">DESIGN &amp; TECH LEAD</text>

  <!-- Divider under role -->
  <line x1="56" y1="216" x2="300" y2="216" stroke="${BORDER}" stroke-width="0.75"/>

  <!-- Mobile label + number -->
  <text x="56" y="242"
    font-family="'Courier New', Courier, monospace"
    font-size="9.5" letter-spacing="1.5"
    fill="${MUTED}">MOBILE</text>
  <text x="56" y="262"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="17"
    fill="${TEXT}">+91 70422 79315</text>

  <!-- Email label + address -->
  <text x="56" y="296"
    font-family="'Courier New', Courier, monospace"
    font-size="9.5" letter-spacing="1.5"
    fill="${MUTED}">EMAIL</text>
  <text x="56" y="316"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="17"
    fill="${TEXT}">kodelineofficial@gmail.com</text>

  <!-- ── Centre vertical divider ── -->
  <line x1="${W / 2}" y1="136" x2="${W / 2}" y2="${H - 72}"
    stroke="${BORDER}" stroke-width="1"/>

  <!-- ── DEV (right) ── -->
  <!-- Name -->
  <text x="${W / 2 + 56}" y="176"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="26" font-weight="400"
    fill="${TEXT}">Dev</text>

  <!-- Role -->
  <text x="${W / 2 + 56}" y="202"
    font-family="'Courier New', Courier, monospace"
    font-size="10" letter-spacing="2"
    fill="${ACCENT}">DESIGN &amp; CLIENT LEAD</text>

  <!-- Divider under role -->
  <line x1="${W / 2 + 56}" y1="216" x2="${W / 2 + 300}" y2="216"
    stroke="${BORDER}" stroke-width="0.75"/>

  <!-- Mobile label + number -->
  <text x="${W / 2 + 56}" y="242"
    font-family="'Courier New', Courier, monospace"
    font-size="9.5" letter-spacing="1.5"
    fill="${MUTED}">MOBILE</text>
  <text x="${W / 2 + 56}" y="262"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="17"
    fill="${TEXT}">+91 99713 81635</text>

  <!-- Email label + address -->
  <text x="${W / 2 + 56}" y="296"
    font-family="'Courier New', Courier, monospace"
    font-size="9.5" letter-spacing="1.5"
    fill="${MUTED}">EMAIL</text>
  <text x="${W / 2 + 56}" y="316"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="17"
    fill="${TEXT}">kodelineofficial@gmail.com</text>

  <!-- ── BOTTOM STRIP ─────────────────────────── -->
  <line x1="0" y1="${H - 64}" x2="${W}" y2="${H - 64}" stroke="${BORDER}" stroke-width="1"/>
  <rect x="0" y="${H - 64}" width="${W}" height="64" fill="${BORDER}" opacity="0.25"/>

  <!-- Location -->
  <text x="56" y="${H - 32}"
    font-family="'Courier New', Courier, monospace"
    font-size="10" letter-spacing="1.5"
    fill="${MUTED}">DELHI, INDIA  ·  WORKING WORLDWIDE</text>

  <!-- Services -->
  <text x="${W - 56}" y="${H - 32}"
    font-family="'Courier New', Courier, monospace"
    font-size="10" letter-spacing="1.5"
    text-anchor="end"
    fill="${MUTED}">WEB  ·  APP  ·  AI INTEGRATION  ·  DESIGN</text>

</svg>`;

const outPath = path.join(__dirname, 'public', 'visiting-card.png');

await sharp(Buffer.from(svg))
  .png({ quality: 100, compressionLevel: 6 })
  .toFile(outPath);

console.log(`✓ Saved to public/visiting-card.png`);
