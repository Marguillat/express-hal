const express = require('express')
const { users } = require('../database')
const router = express.Router()
const bcrypt = require('bcrypt')
const hal = require('../hal')
const jwt = require('../jwt')

function authenticate(login,password) {
    let admin = users.find((admin)=>(
        admin.pseudo == login && bcrypt.compareSync(password,admin.password)
    ))

    if (admin === undefined){
        return false
    }

    return true
}

router
    .post('/',(req,res,next)=>{

        const body = req.body

        let message = "vos id sont incorrectes"
        let code = 401

        if(authenticate(body.login, body.password)){
            code = 200

            let responseObject = {
                "_links":{
                    "self":hal.halLinkObject('/login'),
                    "reservations":hal.halLinkObject('/concerts/{id}/reservations','string','',true)
                },
                "jwt":jwt.createJWT(body.login,'1 day')
            }

            res.status(code).format({
                'application/hal+json': ()=>{
                    res.send(responseObject)
                }
            })
        }else{
            res.status(code).format({
                'application/hal+json': ()=>{
                    res.send({"msg":message})
                }
            })
        }
    })

module.exports = router