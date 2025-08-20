export default class Status{

    static STATUSKOODIT ={
        OHJELMAVIRHE: 0,
        EI_LOYTYNYT: 1,
        LISAYS_OK: 2,
        EI_LISATTY: 3,
        JO_KAYTOSSA: 4,
        POISTO_OK: 5,
        EI_POISTETTU: 6,
        PAIVITYS_OK: 7,
        EI_PAIVITETTY: 8,
        PERUSAVAIN_RISTIRIITAINEN: 9,

    }

    static TYYPIT ={
        VIRHE: 'virhe',
        INFO: 'info',
    }
    static STATUSVIESTIT ={
    OHJELMAVIRHE: ()=>({
        viesti:'Anteeksi! Virhe ohjelmassamme.',
        statuskoodi:Status.STATUSKOODIT.OHJELMAVIRHE,
        tyyppi:Status.TYYPIT.VIRHE
    }),
    EI_LOYTYNYT: avain=>({
        viesti: `Annetilla avaimella ${avain} ei löytynyt tietoja`,
        statuskoodi:Status.STATUSKOODIT.EI_LOYTYNYT,
        tyyppi:Status.TYYPIT.VIRHE
    }),
    LISAYS_OK: avain=>({
        viesti: `Tieto avaimella ${avain} lisättiin`,
        statuskoodi: Status.STATUSKOODIT.LISAYS_OK,
        tyyppi: Status.TYYPIT.INFO
    }),
    EI_LISATTY: ()=> ({
        viesti: 'Tietoja ei lisätty',
        statuskoodi: Status.STATUSKOODIT.EI_LISATTY,
        tyyppi: Status.TYYPIT.VIRHE
    }),
    JO_KAYTOSSA: avain => ({
        viesti: `Perusavain ${avain} oli jo käytössä`,
        statuskoodi: Status.STATUSKOODIT.JO_KAYTOSSA,
        tyyppi: Status.TYYPIT.VIRHE
    }),
    POISTO_OK: avain => ({
        viesti: `Tieto avaimella ${avain} poistettiin`,
        statuskoodi: Status.STATUSKOODIT.POISTO_OK,
        tyyppi: Status.TYYPIT.INFO
    }),
    EI_POISTETTU: () => ({
        viesti: `Tietoja avaimella ${avain} ei poistettu`,
        statuskoodi: Status.STATUSKOODIT.EI_POISTETTU,
        tyyppi: Status.TYYPIT.VIRHE
    }),
    PAIVITYS_OK: avain => ({
        viesti: `Tieto avaimella ${avain} päivitettiin`,
        statuskoodi: Status.STATUSKOODIT.PAIVITYS_OK,
        tyyppi: Status.TYYPIT.INFO
    }),
    EI_PAIVITETTY: () => ({
        viesti: `Tietoja ei muutettu`,
        statuskoodi: Status.STATUSKOODIT.EI_PAIVITETTY,
        tyyppi: Status.TYYPIT.VIRHE
    }),
    PERUSAVAIN_RISTIRIITAINEN: (perusavain, avain) => ({
        viesti: `Olion perusavain ${perusavain} ei ole sama kuin resurssin avain ${avain}`,
        statuskoodi: Status.STATUSKOODIT.PERUSAVAIN_RISTIRIITAINEN,
        tyyppi: Status.TYYPIT.VIRHE
    })
}
}
//luokan loppu