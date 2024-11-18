//script génération de clef secrète -> dans private.key
const crypto = require('crypto')
const fs =require('fs')

// génère un nombre binaire de 32 bytes formaté en ascii
const secret = crypto.randomBytes(32).toString('hex')

fs.writeFileSync('private.key',secret)