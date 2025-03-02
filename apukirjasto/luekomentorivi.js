import path from 'node:path';

const virheViesti=`
##########################################
Käyttö: node datapalvelin <varastoasetustiedosto>

Esimerkki: node datapalvelin jaatelovarasto
########################`;


async function lueKomentorivi(){
    return new Promise((resolve, reject)=>{
        if(process.argv.length<3){
            reject(virheViesti);
        }
        else{
            let[, , asetustiedostonNimi] = process.argv;
            const tiedostotunniste=path.extname(asetustiedostonNimi);
            if(tiedostotunniste===''){
                asetustiedostonNimi+='.json';
            }
            else if(tiedostotunniste.toLocaleLowerCase()!=='.json'){
                reject(virheViesti);
            }
            resolve(asetustiedostonNimi);

        }
    });
}

export {lueKomentorivi}