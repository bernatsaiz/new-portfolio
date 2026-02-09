# Veure el web al navegador

**Important:** Mira sempre la terminal on corre `npm run dev`. Astro mostra la URL real (p. ex. `Local: http://localhost:4321/` o `4322` si el 4321 està ocupat). **Usa exactament aquesta URL.**

## Opció 1: Navegador extern (la més fàcil)

1. A la terminal de Cursor: **`npm run dev:open`**
2. S'obrirà el teu navegador (Chrome, Safari, etc.) amb la URL correcta.

## Opció 2: Simple Browser (dins de Cursor)

1. A la terminal: **`npm run dev`** (deixa-la oberta)
2. A la terminal, busca la línia **`Local: http://localhost:XXXX/`** i copia aquesta URL
3. Prem **Cmd+Shift+P** (Mac) o **Ctrl+Shift+P** (Windows/Linux)
4. Escriu: **Simple Browser: Show** i prem Enter
5. Enganxa la URL que has copiat (p. ex. http://localhost:4321 o http://localhost:4322)

## Si continua sense funcionar

- Tanca qualsevol altre instància del servidor (altres terminals amb `npm run dev`).
- Torna a executar `npm run dev` i usa la URL que surt a **Local:**.
- Prova **127.0.0.1** en lloc de **localhost** (p. ex. http://127.0.0.1:4321).
