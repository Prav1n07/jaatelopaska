import tiedot from '../varastot/jaatelovarasto/jaatelot.json' with {type:'json'};

//console.log(tiedot);

//console.log(Object.keys(tiedot[0]));

//console.log(tiedot.map(alkio=>Object.keys(alkio)));

console.log(tiedot.flatMap(alkio=>Object.keys(alkio)));


const nimet = new Set(tiedot.flatMap(alkio => Object.keys(alkio)));
console.log(nimet)
console.log([...nimet])