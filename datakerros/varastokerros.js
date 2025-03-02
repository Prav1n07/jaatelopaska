import path from 'node:path';

class Varastokerros {
    #lukija
    #varastopolku
    #kuvakansioPolku
    #asetukset
    #MIMETYYPIT

    constructor(KIRJASTOT) {
        this.#asetukset = KIRJASTOT.varastoconfig;
        this.#MIMETYYPIT=KIRJASTOT.kuvatyypit;
        this.#varastopolku = KIRJASTOT.polut.varastotiedostoPolku;
        this.#kuvakansioPolku = KIRJASTOT.polut.kuvakansioPolku;
        const {LukijaKirjoittaja} = KIRJASTOT.varastofunktiot;
        const Muunnin = KIRJASTOT.sovitin;
        this.#lukija = new LukijaKirjoittaja(new Muunnin(this.#asetukset.numerokentät));
    }

    get tuetutKuvatyypit(){
        return Object.keys(this.#MIMETYYPIT);
    }

    get numeeriset() {
        return this.#asetukset.numerokentät;
    }

    get perusavain() {
        return this.#asetukset.perusavain;
    }

    get hakuavaimet() {
        return this.#asetukset.hakuavaimet;
    }

    get resurssi() {
        return this.#asetukset.resurssi;
    }

    async haeKaikki() {
        const tiedot = await this.#lukija.lueVarasto(this.#varastopolku);
        return tiedot.filter(alkio => Object.keys(alkio).length > 0);

       // return await this.#lukija.lueVarasto(this.#varastopolku).filter(alkio=>Object.keys(alkio).lenght>0);
    }

    async hae(avain, arvo) {
        if (arguments.length < 2) return [];
        const tiedot = await this.#lukija.lueVarasto(this.#varastopolku);
        return tiedot.filter(alkio => alkio[avain] == arvo); // '1' == 1
    }

    async haeArvot(avain, vainKerran=false) {
        try {
            const tiedot = await this.#lukija.lueVarasto(this.#varastopolku);
            const arvot = [];
            for (const alkio of tiedot) {
                if (alkio[avain] && typeof alkio[avain] !== 'undefined') {
                    arvot.push(alkio[avain]);
                }
            }
            
            if(vainKerran) {
                const apu = new Set(arvot);
                return [...apu];
            }
            
            return arvot;
        }
        catch (virhe) {
            console.log(virhe);
            return [];
        }
    }

    async haeAvaimet() {
        try {
            const tiedot = await this.#lukija.lueVarasto(this.#varastopolku);
            const nimet = new Set(tiedot.flatMap(alkio => Object.keys(alkio)));
            return [...nimet]
        }
        catch (virhe) {
            console.log(virhe);
            return [];
        }
    } 

        async haeKuva(kuvatiedostonNimi){
            if(this.#kuvakansioPolku && this.#kuvakansioPolku.length>0){
                try{
                    const tiedostotunniste=path.extname(kuvatiedostonNimi).toLocaleLowerCase();
                    if(!this.#MIMETYYPIT[tiedostotunniste]) return null;
                    const mime= this.#MIMETYYPIT[tiedostotunniste];
                    const kuvapolku=path.join(this.#kuvakansioPolku, kuvatiedostonNimi);
                    const kuvaData=await this.#lukija.lueKuva(kuvapolku);
                    return {kuvaData, mime}
                }
                catch(virhe){
                    console.log(virhe);
                    return null;
                }
            }
            else{
            return null;
            }
        }

        async haeKuvalista (){
            const kuvat=await this.#lukija.lueKuvalista(this.#kuvakansioPolku);
            const tuetutTyypit=Object.keys(this.#MIMETYYPIT);
            return kuvat.filter(kuva => tuetutTyypit.includes(
                path.extname(kuva).toLocaleLowerCase()));
        }

} // luokan loppu

export {Varastokerros}