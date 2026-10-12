# Piemme Nord Oftalmica — landing page (prototipo)

Prototipo **statico, responsive e navigabile**, realizzato in HTML, CSS e JavaScript senza framework né dipendenze esterne.

## Come aprirlo

Aprire `index.html` in qualsiasi browser moderno, oppure avviare un server statico locale dalla cartella del progetto:

```bash
python -m http.server 8000
```

Quindi aprire `http://localhost:8000`.

## Funzionalità

- Unica pagina con ancore e scorrimento fluido
- Menu sticky, evidenziazione automatica della sezione attiva e progress bar di scorrimento
- Navigazione responsive con menu mobile e supporto alla tastiera
- CTA per email e telefono (`mailto:` / `tel:`) e link ai siti dei partner
- Layout ottimizzato per desktop, tablet e smartphone
- Rispetto dell'impostazione di sistema «riduci movimento»

## Struttura

- `index.html`: contenuti e struttura semantica
- `styles.css`: design e breakpoint responsive
- `script.js`: comportamento menu e navigazione
- `assets/`: immagini ricavate dai concept forniti in questa conversazione

## Da verificare prima di pubblicare

- Il **logo ufficiale** (fornito il 12 ottobre 2026) è in uso in testata, nel piè di pagina e come favicon. Se disponibile, una versione SVG darebbe un risultato più nitido dei PNG attuali.
- Sostituire le immagini ricavate dalle bozze con fotografie e schede prodotto originali ad alta risoluzione, se disponibili.
- Revisionare contenuti e dati societari, inclusi riferimenti privacy/cookie (nessun tracking o cookie è implementato nel prototipo).
- Confermare destinazioni e autorizzazioni d'uso di tutti i collegamenti esterni.

Nessun modulo raccoglie dati: i pulsanti di contatto avviano il client email o telefonico dell'utente.
