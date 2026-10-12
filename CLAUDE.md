# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Landing page Piemme Nord Oftalmica — prototipo v1

Prototipo **statico** di landing page one-page per Piemme Nord Oftalmica (marchio di Piemme S.r.l., distributore di SBM Sistemi e Optopol). È un lavoro separato dal software diagnostico descritto nel `CLAUDE.md` di `oftalmico/`, ma ne eredita le regole: **documentazione, commenti e messaggi in italiano**, accenti tipografici veri.

## Avvio

Nessun build, nessuna dipendenza, nessun test, nessun linter. Si apre `index.html` nel browser oppure si serve la cartella:

```bash
python -m http.server 8000
```

## Struttura

- `index.html` — tutto il contenuto, in un'unica pagina con sezioni ancorate: `#inizio`, `#valore`, `#partner`, `#dry-eye`, `#soluzioni`, `#formazione`, `#contatti`. Le icone sono uno sprite SVG inline in testa al `<body>` (`<symbol id="i-…">`), richiamate con `<svg class="icon" aria-hidden="true"><use href="#i-…"/></svg>`: una nuova icona va aggiunta lì. Il tratto comune delle icone sta nella classe `.icon`
- `styles.css` — token di colore, carattere e misure in `:root` (`--blue`, `--muted`, `--font`, `--header-height`, `--container`…): un colore ripetuto va portato in un token, non copiato; breakpoint a 1190, 1050, 780, 610 e 390 px, più `prefers-reduced-motion`
- `script.js` — IIFE senza dipendenze: menu mobile (apertura, chiusura con Esc e clic esterno), barra di avanzamento dello scroll, evidenziazione della voce di menu attiva
- `assets/` — le immagini che la pagina carica. `assets/old/` contiene gli originali forniti dal cliente, da cui le immagini pubblicate sono ricavate: la pagina non li usa, ma vanno conservati per rigenerarle. La cartella è esclusa dal repository (`.gitignore`), quindi esiste solo in locale: va tenuta al sicuro altrove. Le versioni caricate prima dell'esclusione restano comunque nella cronologia git. Se un originale viene aggiornato, va rigenerato il file pubblicato corrispondente. Ogni file pubblicato e il suo originale:
  - `hero-eye.webp` — da `Rettangolo 57.png` (1920×1054), ritaglio (722, 13)–(1910, 1047), che riproduce l'inquadratura della bozza. Se si cambia il ritaglio, ricontrollare `object-position` di `.hero-image`
  - `dry-eye.webp` — da `dry-eye1.webp`, stessa immagine ricodificata a qualità 80
  - `sbm-device.webp` — da `sbm-device1.jpeg`, ritagliato attorno all'OS1000 con proporzioni 115:131
  - `optopol-device.webp` — da `optopol-device1.png`, ritagliato attorno allo strumento intero
  - `logo-testata.png` — da `logo_header.jpeg` (versione orizzontale su fondo bianco), ritagliato e con il bianco reso trasparente
  - `logo-negativo.png` (piè di pagina) e `favicon.png` — da `logo_mod_Piemme_neg.png` e `logo_mod_Piemme_col_colore.png` (3508×2481, con ampi margini trasparenti)
  - `logo-sbm.webp` — da `sbm sistemi Topaz Gigapixel 2x - Scala copia.jpg`, un JPG ingrandito con fondo bianco. Il fondo bianco funziona solo perché la scheda è bianca: se SBM fornisce un SVG o un PNG trasparente, va preferito
  - `logo-optopol.svg` — il vettoriale ufficiale, usato così com'è
  - `academy.webp` — da `academy1.webp`, stessa immagine ricodificata a qualità 80. In alto ha una fascia bianca di 54 px, presente anche nell'originale
  - `ottici.webp` — da `ottici.jpeg`, stessa immagine convertita in WebP a qualità 80
  - `oculisti.webp` — da `oculisti.jpeg` (LUNA X, 1600×985), ritaglio (0, 175)–(1600, 919): proporzioni 2,15:1 come il riquadro su desktop, con lo strumento intero
  - `estetica.webp` — da `estetica.jpeg` (1600×774), stessa immagine convertita in WebP a qualità 80

## Accoppiamenti da non rompere

- La voce di menu attiva si calcola dai link con attributo `data-nav`: ogni `href` deve puntare a un `id` di sezione esistente. Una nuova sezione da evidenziare richiede sia l'`id` sia il link `data-nav`
- Il breakpoint del menu mobile, **1050 px**, compare due volte: nella media query di `styles.css` e nella costante `MOBILE_NAV_MAX` di `script.js`. Vanno cambiati insieme
- In testata c'è la versione orizzontale del logo (occhio a sinistra, nome e slogan a destra), fornita dall'utente il 12 ottobre 2026 apposta per la testata. L'altezza del logo (`.brand-mark`, 72/64/56/48 px secondo il breakpoint) e `--header-height` (104/96/84 px) vanno regolate insieme: rimpicciolendo il logo, lo slogan diventa illeggibile
- `--header-height` regola `scroll-padding-top` su `html`: se cambia l'altezza della testata, le ancore restano allineate solo passando dalla variabile. Non aggiungere anche `scroll-margin-top` alle sezioni: i due valori si sommano e lo scarto raddoppia
- I testi in grigio chiaro sono stati portati a `--muted` per raggiungere il contrasto 4,5:1; il bianco dei pulsanti primari regge solo sul gradiente scuro attuale. Prima di schiarire un colore di testo, ricontrollare il contrasto
- Il carattere Inter non viene caricato: si usa il carattere di sistema. Caricarlo da Google Fonts trasmetterebbe l'IP dei visitatori a terzi; va eventualmente ospitato in `assets/`

## Cartella `misc/`

`misc/` è un deposito di materiale temporaneo (bozze, archivi, copie di lavoro): **va ignorata**. Non leggerne i file, non usarli come riferimento, non aggiornarli e non citarli nella documentazione.

## Vincoli del prototipo

Dal `README.md`, da verificare prima di pubblicare:

- il logo ufficiale è stato fornito dal cliente il 12 ottobre 2026 ed è in uso in testata, nel piè di pagina e come favicon
- le immagini sono ricavate dalle bozze, da sostituire con fotografie originali
- nessun modulo raccoglie dati e non ci sono cookie né tracciamento: i contatti sono link `mailto:` e `tel:`. Introdurre un form o un'analitica richiede la revisione dei testi privacy e cookie
- dati societari, recapiti e link esterni (sbmsistemi.com, optopol.com) vanno confermati dal cliente
