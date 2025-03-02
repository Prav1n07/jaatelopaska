import http from 'node:http';

const port=3000;
const host='localhost';

const resurssi={viesti:'Hei maailma!'};

const palvelin=http.createServer((req, res)=>{
    res.writeHead(200, {
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin': '*'
    });
    res.write(JSON.stringify(resurssi));
    res.end();
});

palvelin.listen(port,host,()=>console.log(`${host}:${port} palvelee`));