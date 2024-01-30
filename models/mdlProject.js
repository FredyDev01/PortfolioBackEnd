import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

import incrementId from '../midelwares/incrementId.js'

const { Schema } = mongoose

const mdlProject = new Schema({
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
  functionality: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    require: true,
  },
  technologies: {
    type: Array,
    require: true,
  },
  seeCode: {
    type: String,
    require: true,
  },
  seeProject: {
    type: String,
    require: true,
  },
  _id: {
    type: Number,
    require: true,
  },
})

mdlProject.pre('save', incrementId('mdlProject'))
mdlProject.index({ title: 1 }, { unique: true })
mdlProject.plugin(mongoosePaginate)

export default mongoose.model('mdlProject', mdlProject, 'projects')
