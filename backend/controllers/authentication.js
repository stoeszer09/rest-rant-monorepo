const router = require('express').Router()
const db = require("../models")
const bcrypt = require('bcrypt')

const { User } = db

router.post('/super-important-route', async (req, res) => {
  if(req.session.userId) {
    console.log('Do the really super important thing!')
    res.send('Done')
  } else {
    console.log('You are not authorized to do the super important thing')
    res.send('Denied')
  }
})

router.post('/', async (req, res) => {
  let user = await User.findOne({
    where: { email: req.body.email }
  })
  
  if (!user || !await bcrypt.compare(req.body.password, user.passwordDigest)) {
    res.status(404).json({
      message: 'Could not find a user with the provided username and password'
    })
  } else {
    req.session.userId = user.userId
    res.status(200).json({ user })
  }
})

router.post('/logout', async (req, res) => {
  if(req.currentUser) {
    req.session.userId = null
    res.json({})
  } else {
    res.json({message: 'You need to be logged in before you can log out.'})
  }
})

router.get('/profile', async (req, res) => {
  //console.log("current user: ", req.currentUser)
  if (!req.currentUser) {
    res.json(null)
  }
  res.json(req.currentUser)
})

module.exports = router