const multer = require('multer')
const uploadRouter = require('express').Router()

const multerStorage = multer.diskStorage({
  destination: (request, file, cb) => {
    cb(null, 'build/imgs')
  },
  filename: (request, file, cb) => {
    cb(null, file.originalname)
  },
})

const multerFilter = (request, file, cb) => {
  if (file.mimetype === 'image/jpeg') {
    cb(null, true)
  } else {
    cb(logger.error('Not a JPG! Please only upload JPG files!'), false)
  }
}

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
})

uploadRouter.post('/', upload.single('photo'), function (req, res) {
  return res.sendStatus(200).end()
})

module.exports = uploadRouter
