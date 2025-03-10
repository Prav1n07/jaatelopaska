import path from 'node:path';

function muodostaPolut(JUURI, config, varastoasetukset){

    // varastopolut
    const varastokirjastoKansio=path.join(JUURI, config.varastokirjasto.kansio);

    const datasovitinPolku=path.join( varastokirjastoKansio, config.varastokirjasto.datasovitin );

    const lukijakirjoittajaPolku=path.join(varastokirjastoKansio, config.varastokirjasto.lukijakirjoittaja);

    const mimePolku=path.join(varastokirjastoKansio, config.varastokirjasto.kuvatyypit);

    //datakerrospolut
    const datakerrosKansio = path.join(JUURI, config.datakerros.kansio);

    const tietovarastokerrosPolku = path.join(datakerrosKansio, config.datakerros.tietovarastokerros);

    const varastokerrosPolku= path.join(datakerrosKansio, config.datakerros.varastokerros);


    //varastopolut
    const{kansio, 
        asetustiedosto, 
        varastotiedosto,
        kuvakansio} = varastoasetukset.varasto;

    const varastokansioPolku=path.join(JUURI, config.varastot.kansio, kansio)

    const polut ={
        juuripolku:JUURI,
        varastokirjastoKansio,
        datasovitinPolku,
        lukijakirjoittajaPolku,
        kuvatyypitPolku:mimePolku,
        tietovarastokerrosPolku,
        varastokerrosPolku,


        //varastopolut
        varastokansioPolku,
        varastoasetuksetPolku: path.join(varastokansioPolku,asetustiedosto),
        varastotiedostoPolku: path.join(varastokansioPolku, varastotiedosto),

        kuvakansio

    }

    polut.kuvakansioPolku= kuvakansio?path.join(varastokansioPolku, kuvakansio):'';

    const avaimet=Object.keys(varastoasetukset.varasto);
    //korvataan oletus lukijakirjoittaja paikallisella versiolla
    //mikäli varastoasetuksissa on muunnin- kenttä
    
    if(avaimet.includes('muunnin') && varastoasetukset.varasto.muunnin && varastoasetukset.varasto.muunnin.length>0){
        polut.datasovitinPolku= path.join(varastokansioPolku, varastoasetukset.varasto.muunnin);
    }

    //korvataan oletus lukijakitjoittaja paikallisella versiolla
    //mikäli varastoasetuksissa on lukijakirjoittaja -kenttä

    if(avaimet.includes('lukijalukijakirjoittaja') && varastoasetukset.varasto.lukijakirjoittaja &&
    varastoasetukset.varasto.lukijakirjoittaja.length>0){
        polut.lukijakirjoittajaPolku=
        path.join(varastokansioPolku, varastoasetukset.varasto.lukijakirjoittaja);
    }

    return polut;

} //muodostapolut loppu

export {muodostaPolut}