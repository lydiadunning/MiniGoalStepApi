# A Mini Api - Finding a Solution

## _A little Node.js API_

Working on my Food Plan project, I ran onto trouble with how to effectively structure data in MongoDB. I wanted to keep a list of option suggestions, called cues, allowing users to build their own list of options from these cues and their own ideas. It wasn't working, so I decided to build a little REST api to figure out how to solve the problem.

The first solution I tried was using a mixed type in the mongoose Schema, so it could be filled in with either a string or an object id. This ultimately wasn't the right way to use the mixed type, which is better for storing data in a json format without mongoose caring what's in there.

I solved the problem using mongoose discriminators.

## Technologies
* Node JS
* Express, nodemon, mongoose
* MongoDB
* Requests in VSCode REST Client 

## The Demo Problem

This api saves goals to a noSQL database. Each goal contains an optional list of steps to achieve the goal. To support an imaginary app, the api saves cue steps a user can choose to add to their list of steps. Users can also add their own custom steps.

## Solution

### Differentiate Cue steps

Mongo expects a discriminator to define how two Schemas differ. I chose to add an "active" property to the cue Schema. 

First, I defined the Schema used by all steps:
```
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
```

Then, I added a discriminator to Step:

```
const cueStep = Step.discriminator('Cue', new Schema({ active: Boolean }))
```

This cue step will have all the properties defined in stepSchema, with the additional property `active: Boolean`. 

### How Schemas with a discriminator work in practice

Queries for Steps return both Step and CueStep objects, and both can be referenced in the same property.  In the Goal schema, 

```
const goalSchema = new Schema ({
  ...
  steps: [{
    type: 'ObjectId',
    ref: 'Step',
    required: false
  }],
  ...
})
```

## Conclusion

Discriminators are a better solution for my current problem than what I had tried previously.
Edit: Nope. This wasn't actually a problem at all, and required no solution. 

## Try it Out 

To launch this api, download a copy, install dependencies, and add a .env file to the root directory with a MongoDB connection URI.
```
MONGODB_URI= *Your MongoDB URI goes here* 
```
Launch with the command `npm run dev`.  Since the api only exists to trial solutions for a problem, it's only set up to run the development version.
