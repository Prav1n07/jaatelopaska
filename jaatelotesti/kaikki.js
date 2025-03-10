(function(){

    document.addEventListener('DOMContentLoaded', alusta);

    async function alusta() {
        const tulosalue = document.getElementById('tulosalue');
        
        const data = await fetch('http://localhost:3001/jäätelöt');
        const jaatelot = await data.json();

        //console.log(jaatelot);

        for(const jaatelo of jaatelot){
            const tr = document.createElement('tr');
            tr.appendChild(teeSolu(jaatelo.id));
            tr.appendChild(teeSolu(jaatelo.nimi));
            tr.appendChild(teeSolu(jaatelo.hinta));
            tr.appendChild(teeSolu(jaatelo.kuva));
            tr.appendChild(kuva(jaatelo.kuva));
            tulosalue.appendChild(tr);
        }

    }

    function teeSolu(tieto) {
        const td = document.createElement('td');
        td.textContent = tieto;
        return td;
    }

    function kuva(tieto){
        const kuva = document.createElement('img');
        kuva.src = tieto;
        return kuva;
        
    }

})();