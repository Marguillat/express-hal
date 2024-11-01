// Les modèles--------------------------------------------------
class Concert{
    constructor(id, date_concert, artist_name, location_concert, number_seats) {
        this.id = id;
        this.date_concert = date_concert;
        this.artist_name = artist_name;
        this.location_concert = location_concert;
        this.number_seats = number_seats;
    }
}

class Reservation{
    constructor(id, status, id_concert, id_user) {
        this.id = id;
        this.status = status;
        this.id_concert = id_concert;
        this.id_user = id_user;
    }
}

class User{
    constructor(id,pseudo,is_admin){
        this.id = id;
        this.pseudo = pseudo
        this.is_admin = is_admin
    }
}

// la database-----------------------------------------------------------
const concerts = [
    new Concert(1, new Date('2024-10-31'), 'Lady Gaga', 'France', 250),
    new Concert(2, new Date('2024-11-23'), 'The Weeknd', 'USA', 300),
    new Concert(3, new Date('2024-12-14'), 'Adele', 'UK', 200)
]

const reservations = [
    new Reservation(1, 'to-confirm', 1, 101),
    new Reservation(2, 'confirmed', 2, 102),
    new Reservation(3, 'canceled', 3, 103)
]

const users = [
    new User(101, 'JohnDoe', false),
    new User(102, 'JaneSmith', true),
    new User(103, 'MikeBrown', false)
]

module.exports = {concerts,reservations}