# Piemme Nord Oftalmica — landing page (prototipo)

Prototipo **statico, responsive e navigabile**, realizzato in HTML, CSS e JavaScript senza framework né dipendenze esterne.

## Come aprirlo

Aprire `index.html` (italiano) o `en/index.html` (inglese) in qualsiasi browser moderno, oppure avviare un server statico locale dalla cartella del progetto:

```bash
python -m http.server 8000
```

Quindi aprire `http://localhost:8000`.

## Funzionalità

- Unica pagina con ancore e scorrimento fluido
- Due lingue, italiano e inglese, con selettore IT | EN in testata. Alla prima visita la lingua si sceglie da quella del browser (italiano → IT, tutte le altre → EN); la scelta fatta con il selettore viene ricordata
- Menu sticky, evidenziazione automatica della sezione attiva e progress bar di scorrimento
- Navigazione responsive con menu mobile e supporto alla tastiera
- CTA per email e telefono (`mailto:` / `tel:`) e link ai siti dei partner
- Layout ottimizzato per desktop, tablet e smartphone
- Rispetto dell'impostazione di sistema «riduci movimento»
- Ottimizzazione per motori di ricerca e assistenti AI: titoli e descrizioni con parole chiave, URL canonici, `hreflang`, anteprime social (Open Graph), dati strutturati JSON-LD, `robots.txt`, `sitemap.xml` e `llms.txt`

## Struttura

- `index.html`: contenuti e struttura semantica, in italiano
- `en/index.html`: la stessa pagina in inglese, che usa CSS, JavaScript e immagini della cartella principale
- `styles.css`: design e breakpoint responsive
- `script.js`: comportamento menu e navigazione
- `assets/`: immagini e loghi usati dalle pagine

## Da verificare prima di pubblicare

- Il **logo ufficiale** (fornito il 12 ottobre 2026) è in uso in testata, nel piè di pagina e come favicon. Se disponibile, una versione SVG darebbe un risultato più nitido dei PNG attuali.
- Far rivedere al cliente il testo inglese, in particolare la dicitura legale del piè di pagina.
- Dopo la pubblicazione: verificare il sito in Google Search Console e Bing Webmaster Tools e inviare `sitemap.xml`; controllare i dati strutturati con il Rich Results Test di Google; creare il profilo Google Business della sede.
- Revisionare contenuti e dati societari, inclusi riferimenti privacy/cookie (nessun tracking o cookie è implementato nel prototipo).
- Confermare destinazioni e autorizzazioni d'uso di tutti i collegamenti esterni.

Nessun modulo raccoglie dati: i pulsanti di contatto avviano il client email o telefonico dell'utente.
