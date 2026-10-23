# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Landing page Piemme Nord Oftalmica — prototipo v1

Prototipo **statico** e **bilingue (IT/EN)** di landing page one-page per Piemme Nord Oftalmica (marchio di Piemme S.r.l., distributore di SBM Sistemi e Optopol). È un lavoro separato dal software diagnostico descritto nel `CLAUDE.md` di `oftalmico/`, ma ne eredita le regole: **documentazione, commenti e messaggi in italiano**, accenti tipografici veri.

## Avvio

Nessun build, nessuna dipendenza, nessun test, nessun linter. Si apre `index.html` (italiano) o `en/index.html` (inglese) nel browser oppure si serve la cartella:

```bash
python -m http.server 8000
```

## Struttura

- `index.html` — la pagina italiana, che è il riferimento per la struttura: tutto il contenuto in un'unica pagina con sezioni ancorate: `#inizio`, `#valore`, `#partner`, `#dry-eye`, `#soluzioni`, `#formazione`, `#contatti`. Le icone sono uno sprite SVG inline in testa al `<body>` (`<symbol id="i-…">`), richiamate con `<svg class="icon" aria-hidden="true"><use href="#i-…"/></svg>`: una nuova icona va aggiunta lì. Il tratto comune delle icone sta nella classe `.icon`
- `en/index.html` — la pagina inglese: stessa struttura, stessi `id` di sezione, testi tradotti. Carica i file condivisi con `../` (`../styles.css`, `../script.js`, `../assets/…`). Il testo inglese è stato rivisto il 13 ottobre 2026 secondo `docs/PM_Nord_Oftalmica_EN_Translation_Review.md` (36 modifiche, applicate anche a descrizioni, JSON-LD e `llms.txt`). Termine clinico: «dry eye disease»; «Dry Eye» con maiuscole resta solo nel titolo e nel menu
- `styles.css` — token di colore, carattere e misure in `:root` (`--blue`, `--muted`, `--font`, `--header-height`, `--container`…): un colore ripetuto va portato in un token, non copiato; breakpoint a 1190, 1050, 780, 610, 390 e 359 px, più `prefers-reduced-motion`. Sotto i 360 px testata più compatta (logo a 40 px, selettore di lingua stretto), altrimenti logo, selettore e menu non stanno su una riga
- `script.js` — IIFE senza dipendenze, condiviso dalle due pagine: menu mobile (apertura, chiusura con Esc e clic esterno), barra di avanzamento dello scroll, evidenziazione della voce di menu attiva, selettore di lingua. Le etichette del pulsante del menu non sono nel codice: le legge dagli attributi `data-label-open` / `data-label-close` di `#menu-toggle`, scritti nella lingua di ogni pagina
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
- `dist/` — copia dei soli file pubblicabili (le due pagine, `styles.css`, `script.js`, `robots.txt`, `sitemap.xml`, `llms.txt`, `web.config` e `assets/` senza `old/`), con la stessa struttura, per l'installazione sul server IIS. `web.config` dichiara a IIS il tipo MIME di `.webp` e `.txt` e il documento predefinito `index.html`: non serve a Vercel ed è escluso da `.vercelignore`. È esclusa dal repository (`.gitignore`) e non si aggiorna da sola: va rigenerata dopo ogni commit (vedi «Git e pubblicazione»)

## Accoppiamenti da non rompere

- **Le due lingue vanno tenute allineate.** Ogni modifica di contenuto o di struttura va fatta in `index.html` e in `en/index.html`, con gli stessi `id` di sezione: il selettore di lingua conserva l'ancora (`#partner` resta `#partner`), e `script.js` e `styles.css` sono gli stessi per entrambe
- **Lingua automatica.** Uno script in testa a ogni pagina, prima del CSS, decide la lingua e se serve passa all'altra pagina con `location.replace`, conservando l'ancora. Vale la scelta fatta con il selettore, salvata in `localStorage` con chiave `pno-lang` (`it` o `en`); se manca, la prima lingua del browser: italiano → IT, qualunque altra → EN (scelta dell'utente, 12 ottobre 2026). I crawler non vengono reindirizzati, così entrambe le pagine sono indicizzabili. Lo script è duplicato nelle due pagine e cambia solo per la lingua della pagina (`<html lang>`): se si modifica, va modificato in entrambe
- **Selettore di lingua** (`.lang-switch` in testata): il clic salva `pno-lang` e porta all'altra pagina con la stessa ancora. La lingua corrente ha `aria-current="true"`. Sotto i 610 px, nascosto il pulsante della consulenza, è il selettore a spingere a destra il gruppo selettore + menu (`margin-left: auto`)
- La voce di menu attiva si calcola dai link con attributo `data-nav`: ogni `href` deve puntare a un `id` di sezione esistente. Una nuova sezione da evidenziare richiede sia l'`id` sia il link `data-nav`
- Il breakpoint del menu mobile, **1050 px**, compare due volte: nella media query di `styles.css` e nella costante `MOBILE_NAV_MAX` di `script.js`. Vanno cambiati insieme
- In testata c'è la versione orizzontale del logo (occhio a sinistra, nome e slogan a destra), fornita dall'utente il 12 ottobre 2026 apposta per la testata. L'altezza del logo (`.brand-mark`, 72/64/56/48 px secondo il breakpoint) e `--header-height` (104/96/84 px) vanno regolate insieme: rimpicciolendo il logo, lo slogan diventa illeggibile
- `--header-height` regola `scroll-padding-top` su `html`: se cambia l'altezza della testata, le ancore restano allineate solo passando dalla variabile. Non aggiungere anche `scroll-margin-top` alle sezioni: i due valori si sommano e lo scarto raddoppia
- I testi in grigio chiaro sono stati portati a `--muted` per raggiungere il contrasto 4,5:1; il bianco dei pulsanti primari regge solo sul gradiente scuro attuale. Prima di schiarire un colore di testo, ricontrollare il contrasto
- Il carattere Inter non viene caricato: si usa il carattere di sistema. Caricarlo da Google Fonts trasmetterebbe l'IP dei visitatori a terzi; va eventualmente ospitato in `assets/`

## SEO e indicizzazione

- **Dominio.** Tutti gli indirizzi assoluti usano `https://www.piemmeweb.it` (indicato dall'utente il 23 ottobre 2026, al posto del segnaposto `dominio-da-definire.it`): `canonical`, `hreflang`, Open Graph e JSON-LD in entrambe le pagine, `sitemap.xml`, la riga `Sitemap:` di `robots.txt`, `llms.txt`. Se il dominio cambia, sostituirlo ovunque con un solo cerca-e-sostituisci e controllare che non resti nessuna occorrenza del vecchio
- **URL canonici**: `/` per l'italiano e `/en/` per l'inglese, non `index.html`. Il selettore di lingua resta su `index.html` relativo, perché deve funzionare anche aprendo i file dal disco
- **In testa a ogni pagina**: `title`, `description`, `canonical`, `hreflang` (it, en, x-default → EN), Open Graph e Twitter card, `apple-touch-icon`, JSON-LD (`Organization`, `WebSite`, `WebPage`). Vanno tenuti allineati nelle due lingue. I dati del JSON-LD (contatti, indirizzo, partita IVA) devono coincidere con quelli visibili nel piè di pagina: se cambiano i recapiti, cambiano in tre punti per pagina
- **File alla radice**: `robots.txt` (tutto aperto, anche ai crawler AI, scelta dell'utente del 12 ottobre 2026), `sitemap.xml` (le due pagine con le alternative di lingua; aggiornare `lastmod` quando cambia il contenuto), `llms.txt` (riassunto per gli assistenti AI, in inglese e italiano: va aggiornato se cambiano servizi, marchi o contatti)
- **Immagini**: `assets/og-image.jpg` (1200×630, anteprima nei social: foto della hero con il logo a colori) e `assets/apple-touch-icon.png` (180×180, occhio del logo su fondo bianco)
- **Parole chiave di riferimento** (ipotesi, senza dati di volume: verificarle in Search Console dopo la pubblicazione):
  - IT: strumentazione oftalmica, strumenti oftalmici, distributore Nord Italia, diagnosi Dry Eye / occhio secco, analisi della superficie oculare, OCT, angio-OCT, SBM Sistemi, Optopol, OS1000, LUNA X, REVO HR, assistenza tecnica, usato, formazione oftalmica, Verona, Sommacampagna
  - EN: ophthalmic equipment distributor Northern Italy, dry eye disease diagnosis, ocular surface analysis, OCT and OCT angiography (OCTA), SBM Sistemi and Optopol reseller, ophthalmic equipment technical support, ophthalmic training
- I nomi degli strumenti (OS1000, LUNA X, REVO HR) sono quelli visibili nelle foto del sito: non aggiungerne altri senza conferma del cliente

## Git e pubblicazione

- Repository: https://github.com/pizzeghellaa-sudo/PM_Nord.git, ramo `main`. Ogni push su `main` avvia una pubblicazione su Vercel (progetto `pm_nord`)
- **Nei messaggi di commit solo caratteri Latin-1**: le lettere accentate, «» e × vanno bene, i simboli fuori da Latin-1 no (frecce come →, emoji). Il commit `a0fd08e`, con una freccia nel messaggio, è l'unico che Vercel ha rifiutato, anche ripubblicandolo, con l'errore «Git information retrieval failed». Tutti i commit precedenti, con soli caratteri Latin-1, erano andati a buon fine. La causa è dedotta da questa corrispondenza, non confermata dal log di Vercel
- **Dopo ogni commit, rigenerare `dist/`** (scelta dell'utente, 13 ottobre 2026): serve per l'installazione sul server IIS (dal 23 ottobre 2026; prima era un Apache locale), su cui l'utente la ricopia lui. Si svuota e si ricopia da capo, così un file rimosso dalla pagina non resta in `dist/`:

  ```bash
  rm -rf dist && mkdir -p dist/en dist/assets \
    && cp index.html styles.css script.js robots.txt sitemap.xml llms.txt web.config dist/ \
    && cp en/index.html dist/en/ \
    && find assets -maxdepth 1 -type f -exec cp {} dist/assets/ \;
  ```

  Se si aggiunge alla radice un nuovo file da pubblicare, va aggiunto anche a questo comando

## Guida di stile

`DESIGN.md` raccoglie colori, caratteri, misure, componenti e uso dei loghi, ricavati da `styles.css`: va consultata prima di aggiungere o modificare elementi visivi e aggiornata quando cambia un token. Il riferimento resta il CSS. Non viene pubblicata su Vercel (`.vercelignore`). Le due guide generate in automatico da typeui.sh, che contenevano valori errati, sono in `assets/old/` e non vanno usate.

## Cartella `misc/`

`misc/` è un deposito di materiale temporaneo (bozze, archivi, copie di lavoro): **va ignorata**. Non leggerne i file, non usarli come riferimento, non aggiornarli e non citarli nella documentazione.

## Vincoli del prototipo

Il 23 ottobre 2026 il cliente ha rivisto e approvato la landing, chiedendone la pubblicazione: l'approvazione copre i punti che erano in attesa della sua conferma (parole chiave aggiunte ai testi, testo inglese rivisto, dati societari e link esterni). Restano validi:

- il logo ufficiale è stato fornito dal cliente il 12 ottobre 2026 ed è in uso in testata, nel piè di pagina e come favicon. Contiene lo slogan in italiano, quindi compare in italiano anche nella pagina inglese: se il cliente fornisce una versione inglese, va usata in `en/index.html`
- le immagini sono state sostituite con le versioni ad alta risoluzione fornite dal cliente (vedi `assets/` sopra)
- nessun modulo raccoglie dati e non ci sono cookie né tracciamento: i contatti sono link `mailto:` e `tel:`. L'unico dato salvato nel browser è la lingua scelta con il selettore (`localStorage`, chiave `pno-lang`), una preferenza chiesta dal visitatore. Introdurre un form o un'analitica richiede la revisione dei testi privacy e cookie
- dopo la pubblicazione: verificare il dominio in Google Search Console e Bing Webmaster Tools e inviare `sitemap.xml`; creare il profilo Google Business della sede di Sommacampagna; chiedere a SBM Sistemi e Optopol di elencare il rivenditore sui loro siti
