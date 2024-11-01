/**
 * Export des fonctions helpers pour la spécification HAL
 * Voir la spécification HAL : https://stateless.group/hal_specification.html
 * Voir la spécification HAL (RFC, source) : https://datatracker.ietf.org/doc/html/draft-kelly-json-hal
 */

/**
 * Retourne un Link Object, conforme à la spécification HAL
 * @param {*} url 
 * @param {*} type 
 * @param {*} name 
 * @param {*} templated 
 * @param {*} deprecation 
 * @returns 
 */
function halLinkObject(path, type = '', name = '', templated = false, deprecation = false) {

    return {
        "href": path,
        "templated": templated,
        ...(type && { "type": type }),
        ...(name && { "name": name }),
        ...(deprecation && { "deprecation": deprecation })
    }
}

/**
 * Retourne une représentation Ressource Object (HAL) d'un concert
 * @param {*} concertData Données brutes d'un concert
 * @returns un Ressource Object Concert (spec HAL)
 */
function mapConcertoResourceObject(concertData, baseURL) {
    return {
        "_links": {
            // A compléter
            "self": halLinkObject(`/concerts/${concertData.id}`),
            "concerts": halLinkObject('concerts'),
            "book": halLinkObject(`/concerts/${concertData.id}/reservations`)
            // "reservation": halLinkObject(...)
        },
        //Données d'un concert à ajouter ici...
        artist: concertData.artist_name,
        date: concertData.date_concert,
        location: concertData.location_concert,
        nb_seats: concertData.number_seats,
    }
}


function mapConcertListToResourecObject(concertData){

    // préparer les concerts embarqués
    const _embedded = concertData.map((concert)=>mapConcertoResourceObject(concert))


    // liste des concerts à venir
    return{
        "_links": {
            // A compléter
            "self": halLinkObject(`/concerts/`),
            // "reservation": halLinkObject(...)
        },
        "_embedded":{
            "concerts": _embedded
        }
    }
}

/**
 * Retourne une représentation Ressource Object (HAL) d'une reservation
 * @param {*} resaData Données brutes d'un concert
 * @returns un Ressource Object Concert (spec HAL)
 */
function mapResaToResourceObject(resaData) {
    return {
        "_links": {
            // A compléter
            "self": halLinkObject(`/concerts/${resaData.id_concert}/reservations/${resaData.id}`),
            "concerts": halLinkObject('concerts'),
            // "reservation": halLinkObject(...)
        },
        //Données d'un concert à ajouter ici...
        status: resaData.status
    }
}


module.exports = { halLinkObject, mapConcertoResourceObject,mapConcertListToResourecObject,mapResaToResourceObject };
