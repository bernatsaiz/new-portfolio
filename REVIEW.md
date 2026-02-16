# Revisió de codi — Portfolio Bernat Saiz

## Canvis aplicats

### 1. Unificació de l’escala tipogràfica (root)
- **Problema:** `global.css` definia `html { font-size: 16px }` i `BaseLayout.astro` definia `html { font-size: 18px }`. La càrrega de global després del layout feia que prevalgués 16px, amb intenció de disseny no clara.
- **Solució:** S’han tret de `global.css` el reset duplicat (`*` box-sizing, `html`, `body`). Ara només **BaseLayout** defineix el reset i `font-size: 18px` a `html`. `global.css` queda per estils específics del portfolio (enllaços, focus, img, `.faulty-terminal-bg`, `.interior-header`).

### 2. Fitxers CSS no usats
- **Problema:** `src/styles/a11y-tokens.css` i `src/styles/accessibility-tokens.css` no s’importaven en cap fitxer.
- **Solució:** Fitxers eliminats. Les variables d’accessibilitat es defineixen a `BaseLayout.astro` (`:root` i classes a `html`).

### 3. Duplicació de CSS
- **Problema:** Reset (box-sizing, html, body) duplicat entre `global.css` i `BaseLayout.astro`.
- **Solució:** Eliminat el bloc duplicat de `global.css`; el layout és la font única del reset.

---

## Inconsistències i punts a revisar (no canviats)

### Components no usats
- **`RotatingLine.astro`**: No s’importa (el hero fa servir text estàtic “Currently @ Domestic Data Streamers”). Es pot eliminar si no es preveu tornar a fer servir la rotació.
- **`ExperimentScene.tsx`**, **`Stone3DBackground.astro`**, **`CodeRainBackground.astro`**, **`AsciiBackground.astro`**: No s’importen en cap pàgina. Són candidats a esborrar si no formen part de plans futurs (p. ex. secció Experiments amb WebGL).

### Dades (otherWork / experiments)
- **otherWork.ts**: Els enllaços de “TEDxUPF Talk” i “Destruir la Democràcia” apunten a `ted.com` i `open.spotify.com` genèrics; convé substituir-los pels URLs reals quan estiguin disponibles.
- **experiments.ts**: Descripcions i URLs són placeholders (“Experiment 1”, github.com, codepen.io). Cal actualitzar-los amb contingut real o amagar la secció fins que hi hagi experiments.

### Performance (ja correcte)
- Imatges dels projectes: `loading={i < 2 ? "eager" : "lazy"}` per les dues primeres (LCP), la resta lazy.
- Fonts: `preconnect` a Google Fonts al layout.
- FaultyTerminalBackground: `client:load` només al hero; la resta de la pàgina és estàtica.

### Mida de `index.astro`
- El fitxer té ~1.400 línies (HTML + estils + tema light). Es podria extraure els estils del hero, work, other-work, experiments i footer a un o més fitxers CSS (per exemple `src/styles/home.css`) i importar-los des de `index.astro` per millorar la mantenibilitat. No s’ha fet canvi per no alterar el comportament actual.

---

## Resum

| Àmbit        | Acció |
|-------------|--------|
| Font-size root | Unificat: només BaseLayout (18px). |
| CSS mort    | Eliminats `a11y-tokens.css` i `accessibility-tokens.css`. |
| Duplicació  | Eliminat reset duplicat de `global.css`. |
| Components  | Eliminats RotatingLine i 4 components WebGL/experiments no usats. |
| Dades       | Comentaris TODO afegits a otherWork.ts i experiments.ts. |
| Estils home | Extraïts a src/styles/home.css; index.astro ~270 línies. |
