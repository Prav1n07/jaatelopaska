# Dataapalvelin API

Yleiskäyttöinen datapalvelin datatiedostojen hakuun.

Tiedot jaetaan json-tiedostoon. Tiedot ovat taulukossa olioina.

```json
[
    {
        "id":1,
        "nimi":"Mansikka",
        "hinta":2,
        "kuva":"mansikka.png"
    },
        {
        "id":2,
        "nimi":"Mustikka",
        "hinta":3,
        "kuva":"mustikka.png"
    },
    {
        "id":3,
        "nimi":"Vadelma",
        "hinta":3,
        "kuva":"vadelma.png"
    }
]

```

Olion rakenne on vapaa, mutta vain "ensimmäiseen tasoon" kenttiä/ avaimia voi käyttää tietojen hakemisessa.

Esim seuraava on sallittu:

```json
[
    {
        "nimi": "eka",
        "tiedot":{
            "teksti": "jotain tekstiä",
            "huomautukset":["huom1", "huom2"]
        }
    }
]
```

Tässä voi hakea vain nimellä.

## Varastokerros-luokka API

## metodit

## **haekaikki()**
palauttaa taulukossa kaikki oliot. Jos eolioita ei ole tai tulee virhe, palauttaa tyhjän taulukon [].

## **hae(avain, arvo)**
palauttaa taulukossa kaikki oliot, joiden avaimen arvo on parametrina annettu `arvo`. Jos ehdon täyttäviä olioita ei löydy tai tulee virhe palauttaa tyhjän taulukon []. Jos molemmat parametrit puuttuvat, palauttaa kaikki.

```js
hae('id',1)
```

### **haeArvot(avain, vainKerran=false)**
palauttaa taulukossa kaikki parametrina annetun avaimen arvot. Jos arvoja ei löydy tai tulee virhe, palauttaa tyhjän taulukon []. Jos vainKerran on `true`, niin arvo tulee takulukkoon vain kerran. 

Esimerkki: 
```js
haeArvot('hinta');
tai
haeArvot('hinta', false);
```
palauttaa
```json
[2,3,3]
```

```js
haeArvot('hinta', true)
```

palauttaa
```json
[2,3]
```

### **haeAvaimet()**
palauttaa taulukon, jossa on kaikki olioista löytyvät avainten (kenttien) nimet. Tutkii vain ensimmäisen tason avaimet. Jos kenttiä ei löydy tai tulee virhe, palauttaa tyhjän taulukon.

Esimerkiksi jäätelövarastosta palauttaa
```json
[       "id", "nimi", "hinta", "kuva"]
```

### **haeKuvialista**
Palauttaa kuvahakemistossa olevien tiedostojen nimet taulukkona. Jos kuvia ei ole tai tuli virhe, palauttaa tyhjän taulukon.

## **haeKuva(kuvatiedostonNimi)**
palauttaa kuvan ja siihen liittyvän kuvan mime-tyypin oliona. Olion rakenne on:
```js 
{
    kuvaData,
    mime
}
```

missä kuvaData on kuvan binääridata (blob) ja
mime on esimerkiksi 

```js
{tyyppi: "image/png", koodaus:"binary"}
```

Tässä versiossa tunnistetaan kuvat: png, jpeg, jpg, gif ja ico.

Virhetilanteessa palauttaa `null`.

### getterit (vakiot)

### **perusavain**
palauttaa asetustiedostossa olevan `perusavain` kentän arvon.

### **hakuavaimet**
palauttaa asetustiedostossa olevan `hakuavaimet` kentän arvon. Hakuavaimet on taulukko.

### **resurssi**
palauttaa asetustiedostossa olevan `resurssi` kentän arvon.

### **tuetutKuvatyypit**
palauttaa tuetut kuvatyypit taulukkona

esim.
```js
['.png', '.jpeg', '.jpg', '.gif', '.ico']
```

### **numeeriset**
palauttaa numerokentät taulukkona.


## varastokäsittelijä-luokka API

Tarjoaa levyltä luku ja kirjoitus operaatiot. 

## metodit

### **lueVarasto(tiedostopolku)**
palauttaa JSON-taulukon. Virhetilanteessa palauttaa tyhjän taulukon []

### **lueKuva(kuvapolku)**

### **lueKuvalista(kuvakansiopolku)**

### **kirjoitaVarasto(tiedostopolku, data)**

## Datapalvelin palvelee reiteissä:

- `/`
    - palauttaa käytössä olevan resurssin nimen esim. `jäätelöt`
-   `/<resurssi>`
    -   /jäätelöt
-   `/<resurssi/avaimet>`
    -   /jäätelöt/avaimet
-   `/<resurssi>/hakuavaimet`
    -   /jäätelöt/hakuavain
-   `/<resurssi>/perusavain`
    -   /jäätelöt/perusavain
-   `/<resurssi>/numeeriset`
    -   /jäätelöt/numeeriset
-   `/<resurssi>/ehdolla?hakuavain=arvo`
    -   /jäätelöt/ehdolla?nimi=mansikka
    -   /jäätelöt/ehdolla?hinta=2
-   `/<resurssi>/arvot?avain=avaimennimi&kertaalleen`
    -   /jäätelöt/arvot?avain=hinta
    -   /jäätelöt/arvot?avain=hinta&kertaalleen
-   `/<resurssi>/kuvalista`
    -   /jäätelöt/kuvalista
-   `/<resurssi>/kuvatyypit`
    -   /jäätelöt/kuvatyypit
-   `/<resurssi>/kuvat?nimi=kuvannimi`
    -   /jäätelöt/kuvat?nimi=mansikka.jpg