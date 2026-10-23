# Guida di stile — Piemme Nord Oftalmica

Guida visiva della landing page, ricavata da `styles.css`: **il riferimento resta il CSS**. Se un valore cambia lì, va aggiornato anche qui. Serve a mantenere coerenti colori, caratteri, misure e componenti quando si aggiunge o si modifica qualcosa.

## Contesto

- **Marchio**: Piemme Nord Oftalmica, marchio di Piemme S.r.l.
- **Pubblico**: professionisti della visione (oculisti, ottici e optometristi, medicina estetica) in Nord Italia. È un sito **B2B**, riservato agli operatori sanitari: nessun negozio, nessun modulo
- **Tono visivo**: clinico e luminoso. Molto bianco, azzurri freddi, un solo blu di marchio, l'arancio solo come piccolo accento. Titoli grandi, compatti e decisi; testo secondario piccolo e grigio-blu
- **Lingue**: italiano (`index.html`) e inglese (`en/index.html`), con lo stesso CSS

## Colori

Tutti i colori ricorrenti sono token in `:root`. **Un colore che si ripete va portato in un token**, non copiato.

| Token         | Valore    | Ruolo                                                                      | Contrasto su bianco |
| ------------- | --------- | -------------------------------------------------------------------------- | ------------------: |
| `--ink`       | `#12283b` | Testo principale (`body`)                                                  |              15,1:1 |
| `--ink-deep`  | `#0d2135` | Titoli h2 e h3                                                             |              16,3:1 |
| `--muted`     | `#597083` | Testo secondario: descrizioni, didascalie, numeri delle schede             |               5,2:1 |
| `--blue`      | `#087bb5` | Colore del marchio: parole evidenziate, link, voce di menu attiva, filetti |               4,7:1 |
| `--blue-deep` | `#006caa` | Inizio del gradiente dei pulsanti primari, etichette                       |               5,6:1 |
| `--navy`      | `#092f49` | Testo del pulsante bianco al passaggio del mouse                           |                   — |
| `--orange`    | `#f28a41` | Accento: punto finale del titolo, pallini decorativi. Mai per il testo     |               2,5:1 |
| `--ice`       | `#e5f5fc` | Fondo dei cerchi delle icone                                               |                   — |
| `--sky`       | `#eaf6fb` | Fondo dell'icona della didascalia Academy                                  |                   — |
| `--cloud`     | `#f6fbfd` | Inizio del gradiente della sezione Academy                                 |                   — |
| `--line`      | `#dbe9f0` | Bordi e separatori                                                         |                   — |
| `--white`     | `#fff`    | Fondo della pagina e delle schede                                          |                   — |

Gli sfondi delle sezioni non sono token, ma vanno riusati così come sono:

| Superficie        | Valore                                                                        | Dove          |
| ----------------- | ----------------------------------------------------------------------------- | ------------- |
| Gradiente chiaro  | `linear-gradient(110deg, #fbfeff 4%, #eff9fc 43%, #ddf0f8 76%, #ecf9fd 100%)` | Hero          |
| Gradiente azzurro | `linear-gradient(135deg, #e9f5fa, #f4f9fc 48%, #eaf5f9)`                      | Partner       |
| Gradiente scuro   | `linear-gradient(105deg, #052840, #075174 65%, #0b6382)`                      | Dry Eye       |
| Pannello azzurro  | `linear-gradient(110deg, #e8f7fc 0%, #d9f1fa 70%, #e5f9fe)`                   | Contatti      |
| Blu notte         | `#092b43`                                                                     | Piè di pagina |

Regole:

- il testo deve avere contrasto almeno **4,5:1** con il suo fondo. `--muted` regge su bianco (5,2:1) e sul fondo azzurro dei partner (4,7:1): **non schiarirlo**
- il testo bianco dei pulsanti primari regge solo sul gradiente scuro attuale (4,6:1 sul punto più chiaro)
- l'arancio **non va usato per il testo**: su bianco ha contrasto 2,5:1

## Caratteri

- **Carattere**: quello di sistema (`--font`: `Inter, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif`). Inter è in testa alla lista ma **non viene caricato**: si vede solo se è installato sul computer del visitatore. Caricarlo da Google Fonts trasmetterebbe l'IP dei visitatori a terzi; se lo si vuole davvero, va ospitato in `assets/`
- **Firma tipografica**: titoli molto pesanti (780–800) con lettere **ravvicinate** (spaziatura negativa); occhielli piccoli in maiuscolo con lettere **distanziate** (0,15em). Il contrasto fra i due è ciò che dà carattere alla pagina
- Nei titoli, la parte da evidenziare va in blu con `<span class="text-blue">` (nella hero e nella sezione Dry Eye con le loro classi)

| Livello                | Dimensione                  | Peso | Interlinea | Spaziatura lettere | Colore                             |
| ---------------------- | --------------------------- | ---- | ---------- | ------------------ | ---------------------------------- |
| h1 (hero)              | `clamp(58px, 5.8vw, 80px)`  | 800  | 1,02       | -0,035em           | `#0c2539`, seconda riga `--blue`   |
| h2 (sezioni)           | `clamp(32px, 3.8vw, 48px)`  | 780  | 1,12       | -0,02em            | `--ink-deep`                       |
| h3 (schede)            | 19–24 px                    | 760  | 1,19       | -0,035em           | `--ink-deep`                       |
| Occhiello              | 11 px, maiuscolo            | 780  | —          | 0,15em             | `#3e6277`, filetto `--blue`        |
| Sottotitolo hero       | `clamp(18px, 1.58vw, 21px)` | 450  | 1,61       | —                  | `#324f62`                          |
| Descrizione di sezione | 16 px                       | 400  | 1,7        | —                  | `--muted`                          |
| Testo delle schede     | 12,5–13 px                  | 400  | 1,55–1,6   | —                  | `--muted`                          |
| Voce di menu           | 12 px                       | 650  | —          | —                  | `#344a5b`, attiva `--blue`         |
| Pulsante               | 13 px                       | 700  | 1,2        | —                  | vedi «Pulsanti»                    |
| Link con freccia       | 12 px                       | 750  | —          | —                  | `--blue`                           |
| Note e piè di pagina   | 10–12 px                    | 400  | 1,6–1,9    | —                  | su blu notte: `#a8c5d4`, `#88aabd` |

Sotto i 610 px titoli e testi si riducono: le dimensioni sono nelle media query di `styles.css`.

## Misure e disposizione

| Misura                                       | Valore                                                                          |
| -------------------------------------------- | ------------------------------------------------------------------------------- |
| Larghezza massima (`--container`)            | 1232 px, con margine laterale 44 px per lato (32, 22, 18 px sotto i breakpoint) |
| Altezza testata (`--header-height`)          | 104 px; 96 px sotto 1190; 84 px sotto 780                                       |
| Altezza del logo in testata (`.brand-mark`)  | 72 px; 64, 56, 48 px; 40 px sotto 360                                           |
| Spazio verticale delle sezioni (`.section`)  | 112 px; 79 px sotto 780; 73 px sotto 610                                        |
| Distanza fra le schede                       | 18–22 px                                                                        |
| Raggio delle schede (`--radius`)             | 18 px (schede valore 16, partner 17: valori storici, non da replicare)          |
| Raggio di pannelli e foto                    | 20–22 px                                                                        |
| Raggio di icone quadrate e pulsante menu     | 11–12 px                                                                        |
| Pulsanti, etichette, parole chiave           | a pillola (`999px`)                                                             |
| Ombra delle schede al passaggio (`--shadow`) | `0 15px 45px rgba(12, 57, 82, .07)`                                             |

### Breakpoint

| Larghezza | Cosa cambia                                                                                        |
| --------- | -------------------------------------------------------------------------------------------------- |
| ≤ 1190 px | Testata più bassa, margini laterali ridotti                                                        |
| ≤ 1050 px | Menu a scomparsa (anche `MOBILE_NAV_MAX` in `script.js`), schede valore e soluzioni su due colonne |
| ≤ 780 px  | Hero su una colonna, partner su una colonna, piè di pagina su due colonne                          |
| ≤ 610 px  | Sparisce il pulsante «Richiedi una consulenza» in testata, soluzioni su una colonna                |
| ≤ 390 px  | Titolo hero ridotto, pulsanti a tutta larghezza, schede valore su una colonna                      |
| ≤ 359 px  | Logo a 40 px e selettore di lingua compatto                                                        |

Il breakpoint di 1050 px compare in due file: vanno cambiati insieme.

## Componenti

### Pulsanti

- **Forma**: pillola, altezza minima 52 px (42 px in testata), freccia a destra che si sposta di 3 px al passaggio del mouse; il pulsante si alza di 2 px
- **Primario** (`.button-primary`): gradiente blu, testo bianco, ombra azzurra. Uno solo per gruppo di azioni
- **Contorno** (`.button-outline`): bordo `#96b7c9`, testo `#164159`; al passaggio, bordo `--blue` e fondo bianco
- **Contorno chiaro** (`.button-white-outline`): solo su fondo scuro (Dry Eye)
- Le etichette sono azioni chiare: «Richiedi una consulenza», «Scrivici una email», non «Clicca qui»

### Schede

- Fondo bianco, bordo sottile azzurro-grigio, raggio 16–18 px
- Al passaggio del mouse si alzano di 4–5 px e prendono l'ombra `--shadow`
- **Valori**: icona in cerchio `--ice` con numero «01–04» in alto a destra
- **Partner**: etichetta a pillola, logo del partner, foto dello strumento in basso a destra
- **Soluzioni**: icona quadrata, numero, testo, link con freccia, foto in basso

### Occhiello

Filetto blu di 27 × 3 px seguito dal testo in maiuscolo. Apre ogni sezione sopra il titolo h2. Su fondo scuro: `.eyebrow-light`.

### Icone

- Sprite SVG in testa al `<body>` di ogni pagina: `arrow`, `arrow-up`, `people`, `gear`, `tool`, `refresh`, `scan`, `glasses`, `sparkle`, `check`, `mail`, `phone`, `location`, `chevron`
- **Stile**: solo contorno, tratto 1,8 (1,5–2,1 secondo la dimensione), estremità arrotondate, colore dal testo (`currentColor`). Una nuova icona va disegnata nello stesso stile e aggiunta allo sprite **di entrambe le pagine**
- Si richiamano con `<svg class="icon" aria-hidden="true"><use href="#i-…"/></svg>`

### Selettore di lingua

`IT | EN` in testata, 12 px maiuscolo distanziato; la lingua corrente è blu e ha `aria-current="true"`.

## Loghi

| File                                                | Dove                                                  | Misura                           |
| --------------------------------------------------- | ----------------------------------------------------- | -------------------------------- |
| `assets/logo-testata.png`                           | Testata, versione orizzontale a colori su trasparente | altezza 72/64/56/48/40 px        |
| `assets/logo-negativo.png`                          | Piè di pagina, versione in negativo                   | larghezza 240 px (200 sotto 610) |
| `assets/favicon.png`, `assets/apple-touch-icon.png` | Scheda del browser, icona su iPhone                   | —                                |
| `assets/logo-sbm.webp`                              | Scheda partner SBM Sistemi                            | altezza 46 px                    |
| `assets/logo-optopol.svg`                           | Scheda partner Optopol                                | altezza 36 px                    |

- In testata va **sempre** la versione orizzontale; in negativo solo su fondo scuro
- Rimpicciolendo il logo in testata lo slogan diventa illeggibile: sotto i 40 px non scendere
- Il logo ha lo slogan in italiano anche nella pagina inglese, finché il cliente non fornisce una versione inglese
- I loghi dei partner vanno usati come forniti, senza ricolorarli

## Movimento

- Transizioni brevi, 0,2–0,3 s, `ease`: colore, ombra, piccolo sollevamento
- Nessuna animazione automatica o in ciclo
- Con `prefers-reduced-motion` le transizioni e lo scorrimento morbido si spengono

## Accessibilità

- Contrasto del testo almeno 4,5:1 (vedi «Colori»)
- Le icone decorative hanno `aria-hidden="true"`; le immagini hanno un `alt` che descrive lo strumento
- Il menu mobile si apre e chiude anche da tastiera (Esc) e annuncia lo stato con `aria-expanded`
- Collegamento «Vai al contenuto» in testa alla pagina: nascosto sopra il bordo, compare in alto a sinistra quando riceve il focus

### Contorno di focus

Regola unica per tutta la pagina, in `styles.css`:

```css
:focus-visible { outline: 3px solid #ee9450; outline-offset: 4px; }
```

- **Quando compare**: solo navigando con la tastiera (`:focus-visible`). Con il clic del mouse non compare
- **Dove**: su ogni elemento che riceve il focus (link, pulsanti, voci di menu, selettore di lingua, pulsante del menu mobile), con lo stesso aspetto in tutte le sezioni e in entrambe le lingue
- **Aspetto**: contorno pieno arancio `#ee9450`, spesso 3 px, staccato di 4 px dal bordo dell'elemento. Segue la forma dell'elemento: a pillola sui pulsanti, arrotondato sul pulsante del menu, rettangolare sui link di testo. Le schede non ricevono il focus: lo ricevono i link al loro interno
- **Colore**: `#ee9450` è un valore scritto direttamente nella regola, non un token, ed è diverso da `--orange` (`#f28a41`)

## Da fare e da evitare

**Da fare**

- usare i token di `:root` per colori, raggio, ombra e misure
- riusare i componenti esistenti (schede, pulsanti, occhiello, icone) prima di crearne di nuovi
- applicare ogni modifica a **entrambe le lingue**
- controllare la pagina a 1440, 1050, 780, 610, 390 e 320 px

**Da evitare**

- nuovi colori, raggi o ombre copiati a mano invece di un token
- caratteri caricati da servizi esterni
- testo in arancio o testo grigio più chiaro di `--muted`
- titoli senza la spaziatura negativa o occhielli senza filetto
- icone piene o di stile diverso dallo sprite
- etichette vaghe come «Clicca qui» o «Scopri» senza dire che cosa
