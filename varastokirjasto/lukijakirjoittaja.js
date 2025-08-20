import fs from 'node:fs/promises';

class Oletus{
    muunna(muunnettava){
        return muunnettava;
    }
}

class LukijaKirjoittaja{
    #muunnin

    constructor(muunnin=new Oletus()){
        this.#muunnin=muunnin;
    }

    async lueVarasto(tiedostopolku){
        try{
            const data = await fs.readFile(tiedostopolku, 'utf8');
            // console.log('#'+data+'#')
            return JSON.parse(data).map(arvo=>this.#muunnin.muunna(arvo));
        }
        catch(virhe){
            console.log(virhe);
            return [];
        }
    }//Luevarasto loppu

        async lueKuva(kuvapolku){
            try{
                return await fs.readFile(kuvapolku, 'binary');
            }
            catch(virhe){
                console.log("luekuva" + virhe);
                return null;
            }
        } //luekuva loppu

        async lueKuvalista(kuvakansiopolku){
            try{
                const hakemisto=await fs.readdir(kuvakansiopolku, {withFileTypes:true});
                const apu = hakemisto.filter(tiedosto=>!tiedosto.isDirectory());
                return apu.map(tiedosto=>tiedosto.name)
            }
            catch(virhe){
                console.log(virhe);
                return [];
            }
        } //luekuvalista loppu

  async kirjoitaVarasto(varastotiedosto, data) {
    try {
      const muunnettuData = data.map(arvo => this.#muunnin.muunna(arvo));
      await fs.writeFile(varastotiedosto, JSON.stringify(muunnettuData, null, 4), {
        encoding: 'utf8',
        flag: 'w'
      });
      
      return true;
    }
    catch (virhe) {
      // console.log(virhe)
      return false;
    }
  }
  
}





export {LukijaKirjoittaja}