
const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()



router.post('/timeline/eating-drinking', (req, res) => {
  res.redirect('/timeline/summary-points')
})

router.post('/timeline/activities-considered', (req, res) => {
  res.redirect('/timeline/points-awarded-question')
})

