const { Goal, Step, cueStep }  = require('./model.js')
const router = require('express').Router()

// get all steps and cue steps
router.get('/steps/all', async (request, response) => {
  const steps = await Step.find({})
  response.json(steps)
})

// get all goals
router.get('/goals', async (request, response) => {
  const goals = await Goal.find({}).populate('steps')

  response.json(goals)
})

// add an array of new cue steps
router.post('/cue', async (request, response) => {
  try {
    const result = await cueStep.insertMany(request.body)
    response.status(201).json(result)
  } catch (exception) {
    response.status(400)
  }
})

// add new steps
router.post('/step', async (request, response) => {
  try {
    const result = new Step(request.body)
    const step = await result.save()
    response.status(201).json(step)
  } catch (exception) {
    response.status(400)
  }
})

// add new goal with steps
router.post('/goal', async (request, response) => {
  try {
    const result = new Goal(request.body)
    const goal = await result.save()
    response.status(201).json(goal)
  } catch (exception) {
    response.status(400)
  }
})


module.exports = router