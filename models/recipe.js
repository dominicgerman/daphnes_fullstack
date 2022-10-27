const mongoose = require('mongoose')
const slugify = require('slugify')

const recipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A recipe must have a name'],
      unique: true,
    },
    slug: String,
    description: {
      type: String,
      required: [true, 'A recipe must have a description'],
    },
    menuDescription: {
      type: String,
      required: [true, 'A recipe must have a menu description'],
    },
    similarTo: [{ type: mongoose.Schema.ObjectId, ref: 'Recipe' }],
    tags: [String],
    about: {
      type: String,
      required: [true, 'A recipe must have an About paragraph'],
    },
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
    imageCover: {
      type: String,
      default: 'our_founder.jpg',
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    menuItem: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
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
