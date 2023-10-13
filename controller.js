const { Goal, Step, processStep }  = require('./model.js')
const router = require('express').Router()

// get all steps and process steps
router.get('/steps/all', async (request, response) => {
  const steps = await Step.find({})
  response.json(steps)
})

// get all goals
router.get('/goals', async (request, response) => {
  const goals = await Goal.find({}).populate('steps')

  response.json(goals)
})

// add an array of new process steps
router.post('/process', async (request, response) => {
  try {
    const result = await processStep.insertMany(request.body)
    response.status(201).json(result)
  } catch (exception) {
    response.status(400)
  }
})

// add new steps
router.post('/step', async (request, response) => {
  console.log('in POST')
  console.log(request.body)
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