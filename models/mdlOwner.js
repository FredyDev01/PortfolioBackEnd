import mongoose from 'mongoose'

const { Schema } = mongoose

const mdlOwner = new Schema({
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  _id: {
    type: Number,
    require: true,
  },
})

export default mongoose.model('mdlOwner', mdlOwner, 'owner')
