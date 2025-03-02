import http from 'node:http';
import { json } from 'node:stream/consumers';

const port = 3000;
const host = 'localhost';

const resurssi = {viesti:'Hei Maailma'};

const henkilot = {
    'Leila':123,
    'Matti':456
}

const palvelin = http.createServer((req, res) => {
    const {pathname, searchParams} = new URL(`http://${req.headers.host}${req.url}`);

    //console.log(pathname);
    //console.log(searchParams);
    const reitti = decodeURIComponent(pathname);
    //console.log(reitti);

    if (reitti==='/viesti') {
        lahetaJson(res,resurssi);
    }
    else if (reitti === '/henkilö') {
        if (searchParams.has('nimi')) {
            const nimi = searchParams.get('nimi');
            const arvo = henkilot[nimi] || 'ei löydy'
            lahetaJson(res,{nimi,arvo});
        }
        else {
            lahetaJson(res,{viesti:'nimeä ei ole'})
        }
    }
    else{
        lahetaJson(res,{viesti:'virhe'})
    }

    res.end();
})

palvelin.listen(port,host,()=>console.log(`${host}:${port} palvelee...`));

function lahetaJson(res,resurssi) {
    res.writeHead(200,{
        'Content-Type':'application/json',
        'access-control-allow-origin':'*'
    });
    res.end(JSON.stringify(resurssi));
}