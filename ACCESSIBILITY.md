# Accessibilitat — Portfolio Bernat Saiz

Aquest document descriu les decisions d'accessibilitat (WCAG 2.2 nivell AA, amb criteris AAA on sigui viable), la implementació tècnica i les limitacions.

---

## 1. Decisions preses

### 1.1 Estructura base (WCAG AA)

- **Idioma**: `<html lang="ca">` a tot el lloc.
- **Skip link**: Enllaç "Salta al contingut" visible en focus (posició fixed, contrast alt). Primer element interactiu del document.
- **Landmarks**: Un únic `<main id="main">`; seccions amb `<section>`, `<header>`, `<nav>`, `<article>` segons el context.
- **Capçaleres**: Jerarquia coherent (h1 → h2 → h3) sense salts. A la landing: h1 (nom), h2 (Selected Work, Info), h3 (títols de projecte, Experience, Contact). A les pàgines interiores: h1 (títol de la pàgina), h2 (Context, Role, etc.).

### 1.2 Contrast (AA / AAA)

- **Text normal**: Mínim 4.5:1. Colors de text secundari (etiquetes, meta) pujats a #888–#999 sobre fons fosc.
- **Text gran**: Mínim 3:1. Títols en #fff sobre #191853 / #0D0D1A.
- **Focus**: Outline 3px (4px si `prefers-contrast: more`) amb contrast ≥3:1.
- **Design tokens** a `BaseLayout.astro`: `--color-text`, `--color-text-muted`, `--color-focus`, `--focus-width`, `--focus-offset`, `--line-length-max`. El panell d'accessibilitat ofereix modes "Contrast alt (AA)" i "Contrast ultra (AAA)".

### 1.3 Teclat

- Tota la navegació i enllaços són utilitzables només amb teclat.
- Focus visible amb `:focus-visible` (no s’elimina amb `outline: none`).
- No hi ha focus traps; el diàleg del panell d'accessibilitat es tanca amb Escape i gestiona el focus (nat del `<dialog>`).
- No s’utilitzen divs clicables; enllaços i botons semàntics.

### 1.4 Moviment (2.3.3)

- `prefers-reduced-motion: reduce`: durada d’animacions i transicions a 0.01ms; `scroll-behavior: auto`.
- Animacions de la landing (hero, cards, section reveal) dins de `@media (prefers-reduced-motion: no-preference)`.
- **RotatingLine**: no inicia l’interval de rotació si `prefers-reduced-motion: reduce`; es mostra la primera línia fixa.
- Transicions de fletxes (back, project nav) també condicionades a `prefers-reduced-motion`.

### 1.5 Imatges i enllaços

- Imatges amb `alt` descriptiu (títol del projecte a les cards; "screenshot N" a les galeries).
- Elements decoratius amb `aria-hidden="true"` (fletxes, símbols).
- Enllaços externs (LinkedIn) amb `rel="noopener noreferrer"` i `aria-label` que indica "obre en finestra nova".
- Enllaços "Back" / "Landing" amb `aria-label` descriptius per a lectors de pantalla.

### 1.6 Formularis

- No hi ha formularis de contacte o login al lloc actual. El botó "Show all experience" (info) és un `<button type="button">` amb `aria-expanded` i `aria-controls`; el script actualitza `aria-expanded` en obrir/tancar.

### 1.7 Zoom i reflow (1.4.10, 1.4.4)

- Viewport amb `width=device-width, initial-scale=1`; no es desactiva el zoom.
- Layout fluid (clamp, %, vw) per permetre reflow correcte a 200% i 400% zoom. No s’usa `overflow: hidden` al body que impideixi scroll.
- El panell d'accessibilitat permet "Limitar amplada de línia" (AAA, ~70ch) per facilitar la lectura.

---

## 2. Panell d'accessibilitat

**Component**: `src/components/AccessibilityPanel.astro`

- **Botó**: Fix a la cantonada inferior dreta, `aria-label="Opcions d'accessibilitat"`, accessible per teclat, focus visible.
- **Diàleg**: `<dialog>` modal amb `aria-labelledby` i `aria-describedby`. Es tanca amb Escape o botó "Tancar".
- **Preferències**: Guardades a `localStorage` (clau `a11y-prefs`) i aplicades com a classes a `<html>` al carregar i en canviar opcions.

**Opcions implementades**:

| Categoria | Opció | Classe a `<html>` | Nota |
|-----------|--------|-------------------|------|
| Visual | Text més petit / gran | `a11y-text-smaller` / `a11y-text-larger` | Escala font-size |
| Visual | Contrast alt (AA) / ultra (AAA) | `a11y-contrast-aa` / `a11y-contrast-aaa` | Puja color de text |
| Visual | Monocrom / Invertit | `a11y-monochrome` / `a11y-invert` | filter CSS |
| Visual | Més interlineat / espai lletres | `a11y-line-height` / `a11y-letter-spacing` | line-height, letter-spacing |
| Visual | Limitar amplada de línia | `a11y-line-length` | max-width 70ch a main |
| Moviment | Desactivar animacions | `a11y-no-motion` | transition/animation 0.01ms |
| Moviment | Desactivar scroll suau | `a11y-no-smooth-scroll` | scroll-behavior: auto |
| Navegació | Ressaltar focus | `a11y-focus-strong` | Outline groc 4px |
| Interacció | Àrees clicables més grans | `a11y-touch-targets` | min 44×44px en enllaços/botons |

El panell no bloqueja el lector de pantalla (és un diàleg semàntic) i no és un overlay de tercers.

---

## 3. Criteris WCAG 2.2 aplicats (resum)

- **1.1.1** Contingut no textual: alts a imatges.
- **1.3.1** Info i relacions: landmarks, capçaleres, labels/aria.
- **1.4.3** Contrast (mínim): 4.5:1 text normal, 3:1 text gran i components.
- **1.4.4** Redimensionar text: no s’impedeix zoom; escala amb font-size.
- **1.4.10** Reflow: layout fluid, sense scroll horitzontal forçat a 400%.
- **2.1.1** Teclat: tot operable amb teclat.
- **2.1.2** Sense trampes de focus.
- **2.4.1** Blocs de contingut: skip link.
- **2.4.3** Ordre del focus: ordre lògic del DOM.
- **2.4.7** Focus visible: :focus-visible amb contrast.
- **2.5.3** Etiqueta al nom: aria-label on cal.
- **3.2.1** En focus: no canvis inesperats.
- **3.3.2** Etiquetes o instruccions: N/A (sense formularis complexos).
- **2.3.3** Animació des de interaccions: respecta prefers-reduced-motion.

---

## 4. Limitacions i alternatives

- **FaultyTerminalBackground (WebGL)**: És decoratiu. No s’atura amb prefers-reduced-motion (requeriria lògica dins del component React). **Alternativa**: afegir un prop `reducedMotion` i aturar animacions o reduir intensitat.
- **Paletes daltonisme (Protanopia, etc.)**: No implementades amb filtres CSS per defecte (requeririen SVG filter o llibreria). El mode monocrom/invertit del panell pot ajudar. **Alternativa**: enllaços a extensions del navegador o documentar suport del sistema operatiu.
- **Tipografia dislèxia**: La opció al panell (classe `a11y-dyslexia`) està preparada; caldria carregar una font com OpenDyslexic i aplicar-la. **Alternativa**: afegir `<link>` condicional quan s’activi l’opció.
- **Mode lectura lineal / navegació per headings**: No implementat. **Alternativa**: afegir una pàgina "Mapa del lloc" amb llistat d’enllaços a h2/h3, o un script que mostri un menú de salts.

---

## 5. Com ampliar el sistema

1. **Nous modes del panell**: Afegir `<input>` o `<select>` amb `data-a11y="nom-classe"` i incloure la classe a la llista que s’aplica/elimina a `<html>` i a `getStored`/`setStored`.
2. **Nous estils**: Afegir regles a `BaseLayout.astro` (bloc "Panell d'accessibilitat") per a `html.nom-classe ...`.
3. **Respectar prefers-color-scheme**: Es pot afegir `@media (prefers-color-scheme: dark)` per variacions de tema; el lloc ja és fosc per defecte.
4. **Testing**: Executar Lighthouse (Accessibility), axe DevTools, i proves amb teclat (Tab, Enter, Escape) i amb un lector de pantalla (NVDA, VoiceOver).

---

## 6. Testing recomanat

- Navegació 100% amb teclat (Tab, Shift+Tab, Enter, Escape).
- Focus sempre visible; cap element amb `outline: none` sense alternativa.
- Lighthouse Accessibility objectiu 100.
- Zoom al 200% i 400%: layout sense trencar, sense scroll horitzontal.
- Lector de pantalla: verificar ordre de lectura, etiquetes d’enllaços i botons, i capçaleres de secció.
