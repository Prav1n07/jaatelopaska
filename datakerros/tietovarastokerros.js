class Tietovarasto {
	#varastokerros;
	#STATUS;

	constructor(KIRJASTOT) {
		const { Varastokerros } = KIRJASTOT.varastokerros;
		this.#varastokerros = new Varastokerros(KIRJASTOT);
		this.#STATUS = KIRJASTOT.Status;
	}

	get tuetutKuvatyypit() {
		return this.#varastokerros.tuetutKuvatyypit;
	}

	get perusavain() {
		return this.#varastokerros.perusavain;
	}

	get hakuavaimet() {
		return this.#varastokerros.hakuavaimet;
	}

	get resurssi() {
		return this.#varastokerros.resurssi;
	}

	get numeeriset() {
		return this.#varastokerros.numeeriset;
	}

	get kuvakansio() {
		return this.#varastokerros.kuvakansio;
	}

	async haeKaikki() {
		return this.#varastokerros.haeKaikki();
	}

	async hae(avain, arvo) {
		return this.#varastokerros.hae(avain, arvo);
	}

	async haeArvot(avain, vainKerran = false) {
		return this.#varastokerros.haeArvot(avain, vainKerran);
	}

	async haeAvaimet() {
		return this.#varastokerros.haeAvaimet();
	}

	async haeKuva(kuvatiedostonNimi) {
		return this.#varastokerros.haeKuva(kuvatiedostonNimi);
	}

	async haeKuvalista() {
		return this.#varastokerros.haeKuvalista();
	}

	// REST-osuus

	kaikki() {
		return this.#varastokerros.haeKaikkiVarastosta();
	}

	haePerusavaimella(arvo) {
		return new Promise(async (resolve, reject) => {
      if (!arvo) {
        reject(this.#STATUS.STATUSVIESTIT.EI_LOYTYNYT('--tyhjä--'));
      }
      else {
        const tulos = await this.#varastokerros.haeYksiVarastosta(arvo);
        if (tulos) {
          resolve(tulos);
        }
        else {
          reject(this.#STATUS.STATUSVIESTIT.EI_LOYTYNYT(arvo));
        }
      }
		});
  }
  
  poista(arvo) {
    return new Promise(async (resolve, reject) => {
      if (!arvo) {
        reject(this.#STATUS.STATUSVIESTIT.EI_LOYTYNYT('--tyhjä--'));
      }
      else if (await this.#varastokerros.poistaVarastosta(arvo)) {
        resolve(this.#STATUS.STATUSVIESTIT.POISTO_OK(arvo));
      }
      else {
        reject(this.#STATUS.STATUSVIESTIT.EI_POISTETTU());
      }
    })
  } // poista -loppu

} // luokan loppu

export { Tietovarasto };
