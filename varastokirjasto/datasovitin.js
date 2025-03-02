

class Muunnin {
    #muunnettavat

    constructor(numerokentät=[]){
        this.#muunnettavat=numerokentät;
    }

    muunna(muunnettavaOlio){
        if(!muunnettavaOlio) return {};
        if(this.#muunnettavat.lenght===0) return muunnettavaOlio;
        const uusi={};
        const avaimet=Object.keys(muunnettavaOlio);
        for(const avain of avaimet){
            if(this.#muunnettavat.includes(avain)){
                if (muunnettavaOlio[avain]!=null){
                    let apu = +muunnettavaOlio[avain];
                    if(!isNaN(apu)){
                        uusi[avain]=apu;
                    }
                }
            }
            else{
                uusi[avain] = muunnettavaOlio[avain];
            }
            
        }
        return uusi;
    }

    }


export{Muunnin}