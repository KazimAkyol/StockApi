"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
// app.use(authentication):

module.exports = async (req, res, next) => {

    const auth = req.headers?.authorization || null
    const tokenKey = auth ? auth.split(' ')

    if (tokenKey) {
        if (tokenKey[0] == ' Token') {
            
            const tokenData = await Token.findOne({token: tokenKey[1]}).populate('userId')
            req.user = tokenData ? tokenData.userId : null
        } else if (tokenKey[0] == Bearer) {
            jwt.verify(tokenKey[1], process.env.ACCESS_KEY, (err, userData) => userData ? req.user=userData : req.user=null {
                
            })
        }
    }

    next()
}