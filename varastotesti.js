import path from 'node:path';
import http from 'node:http'

//määritellään __dirname annetaan nimeksi JUURIPOLKU
import { fileURLToPath } from 'node:url';
const JUURIPOLKU =
    fileURLToPath(new URL('.', import.meta.url))

    console.log(JUURIPOLKU);

import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

const asetukset=require('./varastot/jaatelovarasto/asetukset.json');
import {Muunnin} from './varastokirjasto/datasovitin.js';
import { LukijaKirjoittaja } from './varastokirjasto/lukijakirjoittaja.js';

const varastotiedostopolku=
    path.join(JUURIPOLKU, 'varastot', 'jaatelovarasto', 'jaatelot.json');

import { Varastokerros } from './datakerros/varastokerros.js';

const KIRJASTOT={
    varastoconfig:asetukset,
    sovitin:Muunnin,
    varastofunktiot:{LukijaKirjoittaja},
    polut:{
        varastotiedostopolku,
        kuvakansiopolku:path.join(JUURIPOLKU,'varastot','jaatelovarasto','kuvat')
    }
};

//console.log(KIRJASTOT);

const varasto=new Varastokerros(KIRJASTOT);
/*
console.log(varasto.resurssi)

console.log(varasto.perusavain);
console.log(varasto.hakuavaimet);
varasto.hae('id', 1).then(console.log); */

//varasto.haeKaikki().then(console.log);
//varasto.haeAvaimet().then(console.log).catch(console.log) 
//varasto.haeArvot('hinta').then(console.log).catch(console.log)
//varasto.haeArvot('hinta',false).then(console.log).catch(console.log)
//varasto.haeArvot('hinta',true).then(console.log).catch(console.log)
//varasto.haeKuvalista().then(console.log).catch(console.log);
//varasto.haeKuva('vadelma.jpg').then(console.log).catch(console.log);



kaynnistaPalvelin(KIRJASTOT);

function kaynnistaPalvelin(KIRJASTOT){

    const varasto=new Varastokerros(KIRJASTOT);

    const port=3000;
    const host='localhost';
    const palvelin=http.createServer(async (req,res)=>{

        const {pathname, searchParams}=
            new URL(`http://${req.headers.host}${req.url}`);

        const reitti=decodeURIComponent(pathname);

 

        try{
            switch(reitti){
                case '/':return lahetaJson(res,varasto.resurssi);
                case `/${varasto.resurssi}`:
                    return lahetaJson(res, await varasto.haeKaikki());
                case `/${varasto.resurssi}/avaimet`:
                    return lahetaJson(res, await varasto.haeAvaimet());
                case `/${varasto.resurssi}/hakuavaimet`:
                    return lahetaJson(res, varasto.hakuavaimet);
                case `/${varasto.resurssi}/perusavain`:
                    return lahetaJson(res, varasto.perusavain);
                case `/${varasto.resurssi}/numeeriset`:
                    return lahetaJson(res, varasto.numeeriset);
                case `/${varasto.resurssi}/kuvatyypit`:
                    return lahetaJson(res,varasto.tuetutKuvatyypit);
                case `/${varasto.resurssi}/kuvalista`:
                    return lahetaJson(res, await varasto.haeKuvalista());
                case `/${varasto.resurssi}/arvot`:
                    const hakuavain = searchParams.get('avain');
                    if(hakuavain){
                        const kertaalleen=searchParams.has('kertaalleen');
                        return lahetaJson(res,
                            await varasto.haeArvot(hakuavain,kertaalleen));
                    }

                    return lahetaVirheilmoitus(res, `hakuavainta 'avain' ei löydy`);

                case `/${varasto.resurssi}/ehdolla`:
                    const avain=valitsehakuavain(searchParams,varasto.hakuavaimet)
                    if(avain){
                        const hakuarvo=searchParams.get(avain);
                        return lahetaJson(res, await varasto.hae(avain,hakuarvo))
                    }
                    return lahetaVirheilmoitus(res, `hakuavain ei ole joukossa '${varasto.hakuavaimet.join(', ')}'`);

                case `/${varasto.resurssi}/kuvat`:
                    const nimi=searchParams.get('nimi');
                    if(nimi){
                        const kuva=await varasto.haeKuva(nimi);
                        if(kuva && kuva.kuvaData && kuva.mime){
                            return lahetaKuva(res, kuva);
                        }
                    }
                    res.statusCode=404;
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.end();
                    break;

                default:
                    lahetaVirheilmoitus(res,`Resurssia ${reitti} ei löydy`);
            } //switch loppu
        }

        catch(virhe){
            lahetaVirheilmoitus(res,virhe.message);
        }

    }) //createServer loppu



    palvelin.listen(port,host,
        ()=>console.log(`${host}:${port} palvelee...`));

 

}//kaynnistaPalvelin loppu

 

//nämä siirretään lopuksi omaan moduliinsa

function lahetaJson(res, jsonresurssi,statuskoodi=200){
    const jsonData=JSON.stringify(jsonresurssi);

    res.writeHead(statuskoodi,{
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin':'*'

    });
    res.end(jsonData);
}

 

function lahetaVirheilmoitus(res,viesti){
    lahetaJson(res,{viesti,tyyppi:'virhe'});
}


function valitsehakuavain(hakuParams,hakuavaimet){
    for(const avain of hakuavaimet){
        if(hakuParams.has(avain)){
            return avain;
        }
    }
    return null;
}

function lahetaKuva(res,kuvaresurssi){
    res.writeHead(200,{
        'Content-Type':kuvaresurssi.mime.tyyppi,
        'Content-Lenght':Buffer.byteLength(kuvaresurssi.kuvaData, kuvaresurssi.mime.koodaus),

    'Access-Control-Allow-Origin':'*'
    });
    res.end(kuvaresurssi.kuvaData, kuvaresurssi.mime.koodaus);
}