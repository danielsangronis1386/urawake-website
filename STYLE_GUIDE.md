# Style Guide — URAWAKE STACKHOUSE Portfolio

## Concepto visual

Estética **brutalist-glitch**: tipografía masiva en negro absoluto, acentos neón, efectos de glitch animado y bordes minimalistas. Sin gradientes, sin sombras suaves — todo crudo y de alto contraste.

---

## Paleta de colores

| Token CSS         | Valor       | Uso                                      |
|-------------------|-------------|------------------------------------------|
| `--black`         | `#000000`   | Fondo global, superficies de cards       |
| `--white`         | `#ffffff`   | Texto principal, bordes activos          |
| `--neon-green`    | `#39FF14`   | Acento principal, labels, hovers, dots   |
| `--cyan`          | `#00FFFF`   | Capas de glitch (capa anterior)          |
| `--purple`        | `#8A2BE2`   | Capas de glitch alternadas               |
| `--dark-surface`  | `#0a0a0a`   | Superficies ligeramente elevadas         |
| `--border`        | `rgba(255,255,255,0.15)` | Separadores y bordes sutiles |
| `#ff0090`         | —           | Capa de glitch posterior (magenta)       |
| `#ff4d4d`         | —           | Estado de error en formulario            |

**Texto con opacidad reducida:**
- Cuerpo de texto secundario: `rgba(255,255,255,0.65)`
- Texto muted: `rgba(255,255,255,0.4)` – `rgba(255,255,255,0.2)`
- Placeholders: `rgba(255,255,255,0.15)`

---

## Tipografía

| Familia              | Variable CSS / clase | Uso                                      |
|----------------------|----------------------|------------------------------------------|
| **Bebas Neue**       | `h1`–`h6`, `.hero-title` | Títulos y display, siempre uppercase |
| **Inter Tight**      | Fallback de Bebas    | —                                        |
| **Space Grotesk**    | `p`, `span`, `li`   | Cuerpo de texto, inputs                  |
| **DM Mono**          | `.mono`, `.nav-link` | Labels, tags de stack, código            |

**Reglas tipográficas:**
- Todos los headings: `font-weight: 400`, `text-transform: uppercase`, `line-height: 1`
- Títulos grandes: `clamp(3.5rem, 7vw, 7rem)` — siempre fluidos con `clamp()`
- Hero title: `clamp(5rem, 28vw, 100vw)` — ocupa todo el ancho
- Letter-spacing en labels: `0.15em`; en títulos: `-0.02em` a `0.02em`

---

## Efectos y animaciones

### Glitch text (CSS)
Dos pseudo-elementos `::before` / `::after` con `clip-path: inset()` animado:
- `glitch-shift`: desplaza clips verticales aleatoriamente
- `rgb-split`: alterna `text-shadow` entre cyan/magenta y purple/neon-green
- Clase activadora: `.glitch-text` con `data-text` attribute

### Glitch title (Canvas / DOM — GlitchTitle.jsx)
- 220 capas en desktop, 50 en mobile
- Clases: `.glitch-title-wrapper`, `.glitch-word-layer`, `.glitch-letter-wrapper`, `.glitch-letter-base`, `.glitch-letter-layer`
- `will-change: transform, clip-path, opacity` en capas animadas

### Wipe-in on scroll (Services)
Texto que se "revela" al entrar al viewport:
- `.wipe-base`: color base muy tenue `rgba(255,255,255,0.08)`
- `.wipe-fill`: color lleno, clippeado con `clip-path: inset(0 100% 0 0)`
- Al añadir `.in-view`: `clip-path: inset(0 0% 0 0)` — transición `1.1s cubic-bezier(0.16,1,0.3,1)`
- Soporte para `--delay` CSS var por elemento

### Noise overlay (Hero)
SVG inline con `feTurbulence` (fractalNoise, `baseFrequency: 0.9`, 4 octavas), `opacity: 0.35`.

---

## Layouts

### Secciones principales
- Fondo: `var(--black)`, ancho: `100%`, separador: `border-top: 1px solid var(--border)`
- Hero: `100vh`, contenido alineado `flex-start` (izquierda)
- About / Contact: `grid-template-columns: 1fr 1fr`, `gap: 5rem`, `padding: 6rem 4rem`
- Services: lista vertical de bloques, padding horizontal `4rem`
- Projects: stack de `.project-card` con `border-top: 1px solid var(--border)`, `padding: 4rem 4rem 5rem`

### Asymetría brutalist
El subtítulo del hero tiene `padding-left: 3rem` para crear desalineación deliberada. El tagline usa `border-left: 2px solid var(--neon-green)` como ancla visual.

---

## Componentes reutilizables

### Accent line
`border-left: 2px solid var(--neon-green)` + `padding-left: 1.2rem` — usado en bio, success message, slide-text.

### Corner accents (portrait placeholder)
`::before` / `::after` con `border-width` parcial para esquinas en neon-green (top-left y bottom-right).

### Stack tags
```css
font-family: "DM Mono"; font-size: 0.65rem; letter-spacing: 0.1em;
text-transform: uppercase; padding: 0.3rem 0.7rem;
border: 1px solid rgba(255,255,255,0.2);
```

### Botón principal (contact-submit)
Borde blanco, fondo transparente. Hover: invertido (fondo blanco, texto negro). Sin border-radius.

### Slider arrows
Borde neon-green, visibles solo en hover del wrapper (`opacity: 0 → 1`). Hover del arrow: fondo neon-green, texto negro.

### Nav dropdown
Fondo `#000`, `border: 1px solid var(--border)`, links en DM Mono uppercase. Hover: color neon-green + `padding-left` aumentado (shift derecha de 1.2 → 1.6rem).

---

## Cards de proyectos — temas

| Clase         | Fondo     | Texto | Acento           |
|---------------|-----------|-------|------------------|
| `.card-dark`  | `#000`    | `#fff`| neon-green       |
| `.card-light` | `#fff`    | `#000`| negro invertido  |

---

## Responsive

| Breakpoint      | Descripción                                      |
|-----------------|--------------------------------------------------|
| `≤ 768px`       | Mobile: grids a 1 columna, padding reducido (~1.2rem), fuentes más pequeñas |
| `769px – 1024px`| Tablet: padding intermedio (~2–2.5rem)           |
| `> 1024px`      | Desktop: diseño completo                         |

**Imágenes en mobile:**
- Portrait: `height: 340px` → `280px` (placeholder)
- Project images: `max-height: 240px`

**Textos fluidos:** todos los títulos display usan `clamp()` para escalar entre mobile y desktop sin media queries adicionales.
