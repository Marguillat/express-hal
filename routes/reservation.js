const express = require('express')
const router = express.Router()

router.get('/:id/reservation',(req,res)=>{
    console.log(req.params);
    res.send('res')
})

module.exports = router