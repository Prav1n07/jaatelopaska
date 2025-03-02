import http from 'node:path';
import path from 'node:path';

const urlpolku = polku => new URL(`file://${polku}`);

//määritellään JUURIPOLKU
import { fileURLToPath } from 'node:url';
const JUURIPOLKU = fileURLToPath(new URL('.', import.meta.url));

import config from './config.json' with {type:'json'};

const apukirjastoKansio=path.join(JUURIPOLKU, config.apukirjasto.kansio);
const {lueKomentorivi} = await import(urlpolku(path.join(apukirjastoKansio, config.apukirjasto.luekomentorivi)));

const {muodostaPolut} = await import(urlpolku(path.join(apukirjastoKansio, config.apukirjasto.muodostapolut)));

const {muodostaKirjastot} = await import(urlpolku(path.join(apukirjastoKansio, config.apukirjasto.muodostakirjastot)));


const palvelinkirjastoKansio= path.join(JUURIPOLKU, config.palvelinkirjasto.kansio);
const palvelinfunktiotPolku= path.join(palvelinkirjastoKansio, config.palvelinkirjasto.palvelinfunktiot);

const {default:Palvelin} = await import(urlpolku(palvelinfunktiotPolku));