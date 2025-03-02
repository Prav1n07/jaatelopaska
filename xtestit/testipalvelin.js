import path from 'node:path';

import { LukijaKirjoittaja } from '../varastokirjasto/lukijakirjoittaja.js';

import {muunna} from '../varastot/jaatelovarasto/jaatelosovitin.js';

const tmp =  {
    "id":2,
    "nimi":"Mustikka",
    "hinta":3,
    "kuva":"mustikka.png"
}

//console.log(muunna(tmp));
 const lukija= new LukijaKirjoittaja();
const varastopolku='./varastot/jaatelovarasto/jaatelot.json';

lukija.lueVarasto(varastopolku).then(console.log); 

