const jwt = require('jsonwebtoken')
const fs = require('fs')

const SECRET = fs.readFileSync('private.key')
//déclarez un middle ware

function createJWT(login, expiration= '1 day') {
    // génération du jot
    return jwt.sign({
            //génération du payload
            login:login,
            isAdmin: true,
        },
        SECRET, //cléf secret
        {//options
            expiresIn : expiration
        }
        )
}

const checkTokenMiddleware = (req,res,next)=>{ //middleware pour express
    // récupère le jwt

    // le jwt est dans le headers
    const token = req.headers.autorization

    // // fonction qui remplace "token.split(' ')[1]" --> plus safe etc
    // const extractBearerToken = headervalue => {
    //     if(typeof headervalue !== 'string'){
    //         return false;
    //     }
    //     const matches = headervalue.match(/(bearer)\s+(\S+)/i);
    //     return matches && matches[2];
    // }

    if (token) {
        try {
          const decoded = jwt.verify(token.split(' ')[1], SECRET)
          if (decoded) {
            next() // prochain middleware de la route
          } else {
            return res.status(401).send({})
          }
        } catch (error) {
          return res.status(401).send(error)
        }
      } else {
        return res.status(401).send({})
      }
}

module.exports = {createJWT,checkTokenMiddleware}