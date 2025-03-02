export default class Palvelin{
    static lahetaJson(res, jsonresurssi,statuskoodi=200){
        const jsonData=JSON.stringify(jsonresurssi);
        const jsonPituus=Buffer.byteLength(jsonData, 'uft8');
        res.statusCode=statuskoodi;
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Lenght',jsonPituus)
        res.setHeader('Access-Control-Allow-Origin', '*');

        res.end(jsonData);
    }
    
     
    
    static lahetaVirheilmoitus(res,viesti){
        Palvelin.lahetaJson(res,{viesti,tyyppi:'virhe'});
    }
    
    
    static valitsehakuavain(hakuParams,hakuavaimet){
        for(const avain of hakuavaimet){
            if(hakuParams.has(avain)){
                return avain;
            }
        }
        return null;
    }
    
    static lahetaKuva(res,kuvaresurssi){
        res.writeHead(200,{
            'Content-Type':kuvaresurssi.mime.tyyppi,
            'Content-Lenght':Buffer.byteLength(kuvaresurssi.kuvaData, kuvaresurssi.mime.koodaus),
    
        'Access-Control-Allow-Origin':'*'
        });
        res.end(kuvaresurssi.kuvaData, kuvaresurssi.mime.koodaus);
    }
}