import mongoose from 'mongoose'

import MdlCounter from '../models/mdlCounter.js'

const incrementId = (model) =>
  async function proccess(next) {
    const doc = this
    try {
      const document = await MdlCounter.findOne({ model })
      let sequence = 1
      if (!document) {
        const collectionName = mongoose.models[model].collection.name
        const [{ _id }] = await mongoose.connection
          .collection(collectionName)
          .find()
          .sort({ _id: -1 })
          .limit(1)
          .toArray()
        if (_id) {
          sequence = _id + 1
        }
      }
      const counter = await MdlCounter.findOneAndUpdate(
        { model },
        { $inc: { sequence } },
        { new: true, upsert: true }
      )
      doc._id = counter.sequence
      return next()
    } catch (err) {
      return next(err)
    }
  }

export default incrementId
