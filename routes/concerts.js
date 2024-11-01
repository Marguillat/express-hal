const express = require('express')
const router = express.Router()
const reservationRouter = require('./reservations')
let {concerts} = require('../database')
let hal = require('../hal')

//Path et verbe
router
    .get('/concerts',(req,res,next)=>{
        res
            .status(200)
            .json(hal.mapConcertListToResourecObject(concerts))

    })
    // .post('/concerts',(req,res,next)=>{
    //     console.log(req.body);
    // })
    .get('/concerts/:id(\\d+)',(req,res,next)=>{
        //définit id params
        const id_param = req.params.id

        //find retourne l'élément seul
        let concert = concerts.find((elem) => elem.id == id_param)

        //si le concert n'existe pas 404
        if(concert === undefined){
            res.status(404).json({})
        }
        
        const concertResourceObject = hal.mapConcertoResourceObject(concert)
        
        res
            .status(200)
            .json(concertResourceObject)
    })


router.use('/concerts',reservationRouter)
module.exports = router