const { Schema, model } = require('mongoose');

const stepSchema = new Schema ({
  step: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true
  }
})
const Step = model('Step', stepSchema)

const processStep = Step.discriminator('Process', new Schema({ active: Boolean }))

const goalSchema = new Schema ({
  goalName: {
    type: String,
    required: true
  },
  dueDate: { 
    type: Date, 
    required: false
  },
  steps: [{
    type: 'ObjectId',
    ref: 'Step',
    required: false
  }],
  completed: {
    type: Boolean,
    required: true
  }
})
const Goal = model('Goal', goalSchema)



module.exports = { Goal, Step, processStep }