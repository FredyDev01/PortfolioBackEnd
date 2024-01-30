import mongoose from 'mongoose'

const { Schema } = mongoose

const mdlCounter = new Schema({
  model: String,
  sequence: { type: Number, default: 1 },
})

mdlCounter.index({ model: 1 }, { unique: true })

export default mongoose.model('mdlCounter', mdlCounter, 'counter')
