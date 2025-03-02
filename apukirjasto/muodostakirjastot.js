const urlpolku = polku => new URL(`file://${polku}`);

async function muodostaKirjastot(polut){

    const {Muunnin} = await import(urlpolku(polut.datasovitinPolku));
    const {LukijaKirjoittaja}= await import(urlpolku(polut.lukijakirjoittajaPolku));
    const {Tietovarasto}= await import(urlpolku(polut.tietovarastokerrosPolku));
    const {Varastokerros} = await import(urlpolku(polut.varastokerrosPolku));

    const varastoconfig = await import(urlpolku(polut.varastoasetuksetPolku), {with:{type: 'json'}});

    const kuvatyypit = await import(urlpolku(polut.kuvatyypitPolku), {with:{type: 'json'}});

    return {
        varastoconfig:varastoconfig.default,
        sovitin:Muunnin,
        tietovarasto:{Tietovarasto},
        varastokerros:{Varastokerros},
        lukijakirjoittaja:{LukijaKirjoittaja},
        kuvatyypit:kuvatyypit.default,
        polut
    }

}

export {muodostaKirjastot}