import fs from 'fs';
import path from 'path';

const base64Path = path.resolve('logo_base64.txt');
const htmlPath = path.resolve('index.html');

const base64Data = fs.readFileSync(base64Path, 'ascii').trim();
const base64Src = `data:image/jpeg;base64,${base64Data}`;

let htmlContent = fs.readFileSync(htmlPath, 'utf-8');

// 1. Update CSS
const oldNavStyle = `    .nav-logo-svg {
      height: 52px;
      width: auto;
    }`;
const newNavStyle = `    .nav-logo-img {
      height: 60px;
      width: auto;
      display: block;
      transition: height var(--transition-smooth);
    }
    
    header.scrolled .nav-logo-img {
      height: 48px;
    }`;

const oldHeroStyle = `    .hero-logo-svg {
      width: 100%;
      height: auto;
    }`;
const newHeroStyle = `    .hero-logo-img {
      width: 100%;
      height: auto;
      max-width: 480px;
      display: block;
      margin: 0 auto;
    }`;

const oldMobileStyle = `      .nav-logo-svg {
        height: 44px;
      }`;
const newMobileStyle = `      .nav-logo-img {
        height: 48px;
      }`;

htmlContent = htmlContent.replace(oldNavStyle, newNavStyle);
htmlContent = htmlContent.replace(oldHeroStyle, newHeroStyle);
htmlContent = htmlContent.replace(oldMobileStyle, newMobileStyle);

// 2. Remove SVG <g id="amal-logo-mark"> definition from defs
const startTag = '      <!-- Shared Logo graphic element containing the bronze circular arc and white poppy bouquet -->';
if (htmlContent.includes(startTag)) {
    const startIdx = htmlContent.indexOf(startTag);
    const endTag = '      </g>';
    const endIdx = htmlContent.indexOf(endTag, startIdx);
    if (endIdx !== -1) {
        let rest = htmlContent.substring(endIdx + endTag.length);
        if (rest.startsWith('\r\n')) {
            rest = rest.substring(2);
        } else if (rest.startsWith('\n')) {
            rest = rest.substring(1);
        }
        htmlContent = htmlContent.substring(0, startIdx) + rest;
        console.log("Removed SVG <g id='amal-logo-mark'> definition.");
    }
} else {
    console.log("Warning: startTag not found in HTML.");
}

// 3. Replace header logo
const oldHeaderLogo = `      <a href="#hero" class="brand-logo-link" aria-label="Amalgamated Creations and Décor Home">
        <svg viewBox="0 0 540 220" class="nav-logo-svg" xmlns="http://www.w3.org/2000/svg">
          <!-- Reference defined logo graphic -->
          <use href="#amal-logo-mark" />
          <!-- Brand Typography text -->
          <text x="245" y="125" font-family="var(--font-script)" font-size="95" fill="url(#bronzeGradient)" font-weight="normal">Amal</text>
          <text x="250" y="165" font-family="var(--font-serif)" font-size="28" fill="url(#bronzeGradient)" letter-spacing="3">creations and decor</text>
        </svg>
      </a>`;

const newHeaderLogo = `      <a href="#hero" class="brand-logo-link" aria-label="Amalgamated Creations and Décor Home">
        <img src="${base64Src}" alt="Amal — creations and decor" class="nav-logo-img">
      </a>`;

if (htmlContent.includes(oldHeaderLogo)) {
    htmlContent = htmlContent.replace(oldHeaderLogo, newHeaderLogo);
    console.log("Replaced header logo.");
} else {
    const oldHeaderLogoLf = oldHeaderLogo.replace(/\r\n/g, '\n');
    if (htmlContent.includes(oldHeaderLogoLf)) {
        htmlContent = htmlContent.replace(oldHeaderLogoLf, newHeaderLogo);
        console.log("Replaced header logo (LF).");
    } else {
        console.log("Warning: oldHeaderLogo not found in HTML.");
    }
}

// 4. Replace hero logo
const oldHeroLogo = `      <!-- Hero Right: Logo & Circular Arc Visual -->
      <div class="hero-visual reveal stagger-3">
        <div class="hero-logo-wrapper">
          <!-- Large Vector SVG Logo representing the premium branding -->
          <svg viewBox="0 0 540 240" class="hero-logo-svg" xmlns="http://www.w3.org/2000/svg">
            <use href="#amal-logo-mark" />
            <text x="245" y="135" font-family="var(--font-script)" font-size="95" fill="url(#bronzeGradient)">Amal</text>
            <text x="250" y="175" font-family="var(--font-serif)" font-size="28" fill="url(#bronzeGradient)" letter-spacing="3">creations and decor</text>
          </svg>
        </div>
      </div>`;

const newHeroLogo = `      <!-- Hero Right: Logo & Circular Arc Visual -->
      <div class="hero-visual reveal stagger-3">
        <div class="hero-logo-wrapper">
          <img src="${base64Src}" alt="Amal — creations and decor" class="hero-logo-img">
        </div>
      </div>`;

if (htmlContent.includes(oldHeroLogo)) {
    htmlContent = htmlContent.replace(oldHeroLogo, newHeroLogo);
    console.log("Replaced hero logo.");
} else {
    const oldHeroLogoLf = oldHeroLogo.replace(/\r\n/g, '\n');
    if (htmlContent.includes(oldHeroLogoLf)) {
        htmlContent = htmlContent.replace(oldHeroLogoLf, newHeroLogo);
        console.log("Replaced hero logo (LF).");
    } else {
        console.log("Warning: oldHeroLogo not found in HTML.");
    }
}

// 5. Replace footer logo
const oldFooterLogo = `      <!-- Mini Reconstructed Logo inside Footer -->
      <a href="#hero" aria-label="Scroll back to top">
        <svg viewBox="0 0 540 220" class="footer-logo" xmlns="http://www.w3.org/2000/svg">
          <use href="#amal-logo-mark" />
          <text x="245" y="125" font-family="var(--font-script)" font-size="95" fill="url(#bronzeGradient)">Amal</text>
          <text x="250" y="165" font-family="var(--font-serif)" font-size="28" fill="url(#bronzeGradient)" letter-spacing="3">creations and decor</text>
        </svg>
      </a>`;

const newFooterLogo = `      <!-- Logo inside Footer -->
      <a href="#hero" aria-label="Scroll back to top" style="display: inline-block;">
        <img src="${base64Src}" alt="Amal — creations and decor" class="footer-logo">
      </a>`;

if (htmlContent.includes(oldFooterLogo)) {
    htmlContent = htmlContent.replace(oldFooterLogo, newFooterLogo);
    console.log("Replaced footer logo.");
} else {
    const oldFooterLogoLf = oldFooterLogo.replace(/\r\n/g, '\n');
    if (htmlContent.includes(oldFooterLogoLf)) {
        htmlContent = htmlContent.replace(oldFooterLogoLf, newFooterLogo);
        console.log("Replaced footer logo (LF).");
    } else {
        console.log("Warning: oldFooterLogo not found in HTML.");
    }
}

fs.writeFileSync(htmlPath, htmlContent, 'utf-8');
console.log("Update completed successfully.");
