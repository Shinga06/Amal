import os

base64_path = r"C:\Users\Bongumusa\source\repos\Amal\logo_base64.txt"
html_path = r"C:\Users\Bongumusa\source\repos\Amal\index.html"

with open(base64_path, "r", encoding="ascii") as f:
    base64_data = f.read().strip()

base64_src = f"data:image/jpeg;base64,{base64_data}"

with open(html_path, "r", encoding="utf-8") as f:
    html_content = f.read()

# 1. Update CSS
old_nav_style = """    .nav-logo-svg {
      height: 52px;
      width: auto;
    }"""
new_nav_style = """    .nav-logo-img {
      height: 60px;
      width: auto;
      display: block;
      transition: height var(--transition-smooth);
    }
    
    header.scrolled .nav-logo-img {
      height: 48px;
    }"""

old_hero_style = """    .hero-logo-svg {
      width: 100%;
      height: auto;
    }"""
new_hero_style = """    .hero-logo-img {
      width: 100%;
      height: auto;
      max-width: 480px;
      display: block;
      margin: 0 auto;
    }"""

old_mobile_style = """      .nav-logo-svg {
        height: 44px;
      }"""
new_mobile_style = """      .nav-logo-img {
        height: 48px;
      }"""

html_content = html_content.replace(old_nav_style, new_nav_style)
html_content = html_content.replace(old_hero_style, new_hero_style)
html_content = html_content.replace(old_mobile_style, new_mobile_style)

# 2. Remove SVG <g id="amal-logo-mark"> definition from defs
start_tag = '      <!-- Shared Logo graphic element containing the bronze circular arc and white poppy bouquet -->'
if start_tag in html_content:
    start_idx = html_content.find(start_tag)
    end_tag = '      </g>'
    end_idx = html_content.find(end_tag, start_idx)
    if end_idx != -1:
        # Remove from start_idx to end_idx + len(end_tag) + newline
        rest = html_content[end_idx + len(end_tag):]
        # Skip leading newlines if any
        if rest.startswith('\r\n'):
            rest = rest[2:]
        elif rest.startswith('\n'):
            rest = rest[1:]
        html_content = html_content[:start_idx] + rest
        print("Removed SVG <g id='amal-logo-mark'> definition.")
else:
    print("Warning: start_tag not found in HTML.")

# 3. Replace header logo
old_header_logo = """      <a href="#hero" class="brand-logo-link" aria-label="Amalgamated Creations and Décor Home">
        <svg viewBox="0 0 540 220" class="nav-logo-svg" xmlns="http://www.w3.org/2000/svg">
          <!-- Reference defined logo graphic -->
          <use href="#amal-logo-mark" />
          <!-- Brand Typography text -->
          <text x="245" y="125" font-family="var(--font-script)" font-size="95" fill="url(#bronzeGradient)" font-weight="normal">Amal</text>
          <text x="250" y="165" font-family="var(--font-serif)" font-size="28" fill="url(#bronzeGradient)" letter-spacing="3">creations and decor</text>
        </svg>
      </a>"""

new_header_logo = f"""      <a href="#hero" class="brand-logo-link" aria-label="Amalgamated Creations and Décor Home">
        <img src="{base64_src}" alt="Amal — creations and decor" class="nav-logo-img">
      </a>"""

if old_header_logo in html_content:
    html_content = html_content.replace(old_header_logo, new_header_logo)
    print("Replaced header logo.")
else:
    # Try with raw LF instead of CRLF in python
    old_header_logo_lf = old_header_logo.replace('\r\n', '\n')
    if old_header_logo_lf in html_content:
        html_content = html_content.replace(old_header_logo_lf, new_header_logo)
        print("Replaced header logo (LF).")
    else:
        print("Warning: old_header_logo not found in HTML.")

# 4. Replace hero logo
old_hero_logo = """      <!-- Hero Right: Logo & Circular Arc Visual -->
      <div class="hero-visual reveal stagger-3">
        <div class="hero-logo-wrapper">
          <!-- Large Vector SVG Logo representing the premium branding -->
          <svg viewBox="0 0 540 240" class="hero-logo-svg" xmlns="http://www.w3.org/2000/svg">
            <use href="#amal-logo-mark" />
            <text x="245" y="135" font-family="var(--font-script)" font-size="95" fill="url(#bronzeGradient)">Amal</text>
            <text x="250" y="175" font-family="var(--font-serif)" font-size="28" fill="url(#bronzeGradient)" letter-spacing="3">creations and decor</text>
          </svg>
        </div>
      </div>"""

new_hero_logo = f"""      <!-- Hero Right: Logo & Circular Arc Visual -->
      <div class="hero-visual reveal stagger-3">
        <div class="hero-logo-wrapper">
          <img src="{base64_src}" alt="Amal — creations and decor" class="hero-logo-img">
        </div>
      </div>"""

if old_hero_logo in html_content:
    html_content = html_content.replace(old_hero_logo, new_hero_logo)
    print("Replaced hero logo.")
else:
    old_hero_logo_lf = old_hero_logo.replace('\r\n', '\n')
    if old_hero_logo_lf in html_content:
        html_content = html_content.replace(old_hero_logo_lf, new_hero_logo)
        print("Replaced hero logo (LF).")
    else:
        print("Warning: old_hero_logo not found in HTML.")

# 5. Replace footer logo
old_footer_logo = """      <!-- Mini Reconstructed Logo inside Footer -->
      <a href="#hero" aria-label="Scroll back to top">
        <svg viewBox="0 0 540 220" class="footer-logo" xmlns="http://www.w3.org/2000/svg">
          <use href="#amal-logo-mark" />
          <text x="245" y="125" font-family="var(--font-script)" font-size="95" fill="url(#bronzeGradient)">Amal</text>
          <text x="250" y="165" font-family="var(--font-serif)" font-size="28" fill="url(#bronzeGradient)" letter-spacing="3">creations and decor</text>
        </svg>
      </a>"""

new_footer_logo = f"""      <!-- Logo inside Footer -->
      <a href="#hero" aria-label="Scroll back to top" style="display: inline-block;">
        <img src="{base64_src}" alt="Amal — creations and decor" class="footer-logo">
      </a>"""

if old_footer_logo in html_content:
    html_content = html_content.replace(old_footer_logo, new_footer_logo)
    print("Replaced footer logo.")
else:
    old_footer_logo_lf = old_footer_logo.replace('\r\n', '\n')
    if old_footer_logo_lf in html_content:
        html_content = html_content.replace(old_footer_logo_lf, new_footer_logo)
        print("Replaced footer logo (LF).")
    else:
        print("Warning: old_footer_logo not found in HTML.")

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html_content)

print("Update completed successfully.")
