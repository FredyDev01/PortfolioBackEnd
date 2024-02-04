import MdlProject from '../models/mdlProject.js'
import { actions, handleImage } from '../utils/image.js'

const ctrProject = {
  getProjects: async (req, res) => {
    let { id } = req.params
    id = parseInt(id, 10)
    try {
      if (id === 0) {
        const { type, order, search, technologies, page } = req.query
        const paginate = { limit: 100, sort: { _id: order || -1 } }
        const filters = {}
        if (search) {
          filters.title = { $regex: search, $options: 'i' }
        }
        if (type) {
          filters.type = type
        }
        if (technologies) {
          filters.technologies = { $all: technologies }
        }
        if (page) {
          paginate.limit = 6
          paginate.page = page
        }
        const { docs, totalPages } = await MdlProject.paginate(
          filters,
          paginate
        )
        res
          .status(200)
          .json({ data: docs, maxPage: docs.length ? totalPages : 0 })
      } else {
        const document = await MdlProject.findById(id)
        res.status(200).json({ data: document })
      }
    } catch (err) {
      res.status(500).json({
        message:
          'El servidor tuvo problemas al momento de encontrar los datos de sus proyectos.',
      })
    }
  },

  addProject: async (req, res) => {
    try {
      const data = req.body
      const { url, public_id: publicId } = await handleImage({
        action: actions.addImage,
        folder: 'Projects',
        imageBase64: req.file.base64,
      })
      data.urlImage = url
      data.nameImage = publicId
      const project = new MdlProject(data)
      await project.save()
      res.status(200).json({ message: 'Su proyecto fue guardado con exito.' })
    } catch (err) {
      res.status(500).Mensaje({
        message:
          'El servidor tuvo problemas al momento de ingrezar su nuevo proyecto.',
      })
    } finally {
      req.file = null
    }
  },

  editProject: async (req, res) => {
    try {
      let { id } = req.params
      id = parseInt(id, 10)
      const data = req.body
      if (req.file) {
        const { nameImage } = await MdlProject.findOne({ _id: id })
        const { url } = await handleImage({
          action: actions.editImage,
          imageBase64: req.file.base64,
          publicId: nameImage,
        })
        data.urlImage = url
      }
      const project = new MdlProject(data)
      await MdlProject.updateOne({ _id: id }, { $set: project })
      res.status(200).json({ message: 'Proyecto editado con exito.' })
    } catch (err) {
      res.status(500).json({
        message: 'El servidor tuvo problemas al intentar editar su proyecto.',
      })
    }
  },

  deleteProject: async (req, res) => {
    try {
      let { id } = req.params
      id = parseInt(10, id)
      const { nameImage } = await MdlProject.findOne({ _id: id })
      await handleImage({ action: actions.deleteImage, publicId: nameImage })
      await MdlProject.deleteOne({ _id: id })
      res.status(200).json({ message: 'El proyecto se elimino con exito.' })
    } catch (err) {
      res.status(500).json({
        message: 'El servidor tuvo problemas al intentar eliminar su proyecto.',
      })
    }
  },
}

export default ctrProject
