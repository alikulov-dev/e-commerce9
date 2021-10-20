const express = require('express')
const router = express.Router()

router.get('/',(req,res)=>{
    req.session.isAuth = true;
    res.render('./pages/templates' )
})

module.exports = router;
