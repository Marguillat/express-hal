const express = require('express')
const router = express.Router()
const {reservations} = require('../database')
const hal = require('../hal')
const {checkTokenMiddleware} = require('../jwt')

router
    .get('/:idConcert(\\d+)/reservations/:idResa(\\d+)',(req,res)=>{
        //trouve une réservation
        let reservation = reservations.find((resa)=>(resa.id == req.params.idResa) && (resa.id_concert == req.params.idConcert))
        
        if (!reservation) {
            res.status(404).json({})
        }

        let resaResourceObject = hal.mapResaToResourceObject(reservation)
        res.send(resaResourceObject)
    })
    .get('/:idConcert(\\d+)/reservations', checkTokenMiddleware ,(req,res)=>{
        let reservationsList = reservations.filter((resa)=>(resa.id_concert == req.params.idConcert))

        if (!reservationsList) {
            res.status(404).json({})
        }

        let reservationsListHall = hal.mapResaListToResourceObject(reservationsList,req.params.idConcert)
        res.send(reservationsListHall)
    })

module.exports = router