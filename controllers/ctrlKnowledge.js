import cloudinary from 'cloudinary'
import { v4 as uuidv4 } from 'uuid'

import MdlKnowledge from '../models/mdlKnowledge.js'
import MdlProject from '../models/mdlProject.js'

const ctrKnowledge = {
  getKnowledges: async (req, res) => {
    let { id } = req.params
    id = parseInt(id, 10)
    try {
      if (id === 0) {
        const { order, search, page } = req.query
        const paginate = { limit: 100, sort: { _id: order || -1 } }
        const filters = {}
        if (search) {
          filters.title = { $regex: search, $options: 'i' }
        }
        if (page) {
          paginate.limit = 6
          paginate.page = page
        }
        const { docs, totalPages } = await MdlKnowledge.paginate(
          filters,
          paginate
        )
        res
          .status(200)
          .json({ data: docs, maxPage: docs.length ? totalPages : 0 })
      } else {
        const document = await MdlKnowledge.findById(id)
        res.status(200).json({ data: document })
      }
    } catch (err) {
      res.status(500).json({
        message:
          'El servidor tuvo problemas al momento de encontrar sus conocimientos.',
      })
    }
  },

  addKnowledge: async (req, res) => {
    try {
      const data = req.body
      const { url, public_id: publicId } = await cloudinary.v2.uploader.upload(
        req.file.base64,
        { public_id: uuidv4(), folder: 'Images_Conocimientos' }
      )
      data.urlImage = url
      data.nameImage = publicId
      const knowledges = new MdlKnowledge(data)
      await knowledges.save()
      res
        .status(200)
        .json({ message: 'Su conocimiento fue guardado con exito.' })
    } catch (err) {
      console.log(process.env.CLOUDINARY_API_KEY)
      console.error(err)
      res.status(500).json({
        message:
          'El servidor tuvo problemas al momento de guardar su nuevo conocimiento.',
      })
    } finally {
      req.file = null
    }
  },

  editKnowledge: async (req, res) => {
    try {
      let { id } = req.params
      id = parseInt(id, 10)
      const data = req.body
      if (req.file) {
        const { nameImage } = await MdlKnowledge.findOne({ _id: id })
        const { url } = await cloudinary.v2.uploader.upload(req.file.base64, {
          public_id: nameImage,
        })
        data.urlImage = url
      }
      const knowledges = new MdlKnowledge(data)
      await MdlKnowledge.updateOne({ _id: id }, { $set: knowledges })
      res.status(200).json({ message: 'Conocimiento editado con exito.' })
    } catch (err) {
      res.status(500).json({
        message:
          'El servidor tuvo problemas al momento de editar su conocmiento.',
      })
    }
  },

  deleteKnowledge: async (req, res) => {
    try {
      let modifiedProject = false
      let { id } = req.params
      id = parseInt(id, 10)
      const { title, nameImage } = await MdlKnowledge.findOne({ _id: id })
      const listProjects = await MdlProject.find({
        technologies: { $in: [title] },
      })
      if (listProjects.length) {
        modifiedProject = true
        listProjects.forEach(async (project) => {
          const { technologies, _id } = project
          if (technologies.length <= 1) {
            await MdlProject.deleteOne({ _id })
          } else {
            const index = technologies.indexOf(title)
            technologies.splice(index, 1)
            await MdlProject.updateOne({ _id }, { $set: { technologies } })
          }
        })
      }
      await cloudinary.v2.uploader.destroy(nameImage)
      await MdlKnowledge.deleteOne({ _id: id })
      const documents = await MdlKnowledge.paginate({}, { limit: 6 })
      res.status(200).json({ maxPage: documents.totalPages, modifiedProject })
    } catch (err) {
      console.log(err)
      res.status(500).json({
        message:
          'El servidor tuvo problemas al momento de eliminar su conocimiento.',
      })
    }
  },
}

export default ctrKnowledge
