import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

import incrementId from '../midelwares/incrementId.js'

const { Schema } = mongoose

const mdlKnowledge = new Schema({
  urlImage: {
    type: String,
    require: true,
  },
  nameImage: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  resume: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  level: {
    type: String,
    require: true,
  },
  _id: {
    type: Number,
    require: true,
  },
})

mdlKnowledge.pre('save', incrementId('mdlKnowledge'))
mdlKnowledge.index({ title: 1 }, { unique: true })
mdlKnowledge.plugin(mongoosePaginate)

export default mongoose.model('mdlKnowledge', mdlKnowledge, 'knowledges')
