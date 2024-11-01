const express = require('express')
const router = express.Router()
const {reservations} = require('../database')

router.get('/:idConcert(\\d+)/reservations/:idResa',(req,res)=>{
    //trouve une réservation
    let reservation = reservations.find((resa)=>(resa.id == req.params.idResa) && (resa.id_concert == req.params.idConcert))
    
    if (!reservation) {
        res.status(404).json({})
    }
    res.send(reservation)
})

module.exports = router