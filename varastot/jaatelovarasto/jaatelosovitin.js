function muunna(muunnettavaOlio){
    if(!muunnettavaOlio) return {};

    return Object.assign(muunnettavaOlio, {
        id: +muunnettavaOlio.id, //tai Number(muunnettavaOlio.id)
        hinta:+muunnettavaOlio.hinta
    })
}

export {muunna}