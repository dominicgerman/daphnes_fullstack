const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A recipe must have a name'],
      unique: true,
    },
    slug: String,
    description: String,
    menuDescription: String,
    strength: String,
    similarTo: [{ type: mongoose.Schema.ObjectId, ref: 'Recipe' }],
    tags: [String],
    about: String,
    ingredients: [
      {
        name: String,
        measure: String,
      },
    ],
    instructions: {
      type: String,
      required: [true, 'A recipe must have instructions'],
    },
    notes: {
      type: String,
    },
    difficulty: {
      type: String,
      required: [true, 'A recipe must have a difficulty'],
      enum: {
        values: ['easy', 'intermediate', 'advanced'],
        message: 'Difficulty must be easy, intermediate or advanced',
      },
    },
    imageCover: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
  },
  // virtual fields are not stored in the database; they're calculated in real-time (like averages)
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

recipeSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

recipeSchema.index({ name: 'text', 'ingredients.name': 'text' })

recipeSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true })
  next()
})

module.exports = mongoose.model('Recipe', recipeSchema)
