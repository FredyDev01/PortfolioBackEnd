import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

import incrementId from '../midelwares/incrementId.js'

const { Schema } = mongoose

const mdlSkill = new Schema({
  title: {
    type: String,
    require: true,
  },
  percentage: {
    type: Number,
    require: true,
    min: 1,
    max: 100,
  },
  _id: {
    type: Number,
    require: true,
  },
})

mdlSkill.pre('save', incrementId('mdlSkill'))
mdlSkill.index({ title: 1 }, { unique: true })
mdlSkill.plugin(mongoosePaginate)

export default mongoose.model('mdlSkill', mdlSkill, 'skills')
