import MdlSkill from '../models/mdlSkill.js'

const ctrSkill = {
  getSkills: async (req, res) => {
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
        const { docs, totalPages } = await MdlSkill.paginate(filters, paginate)
        res
          .status(200)
          .json({ data: docs, maxPage: docs.length ? totalPages : 0 })
      } else {
        const document = await MdlSkill.findById(id)
        res.status(200).json({ data: document })
      }
    } catch (err) {
      res.status(500).json({
        message:
          'El servidor tuvo problemas al momento de encontrar los datos de sus habilidades.',
      })
    }
  },

  addSkill: async (req, res) => {
    try {
      const data = req.body
      const skill = new MdlSkill(data)
      await skill.save()
      res.status(200).json({ message: 'Su habilidad fue guardada con exito.' })
    } catch (err) {
      res.status(500).json({
        message:
          'El servidor tuvo problemas al intentar agregar su nueva habilidad.',
      })
    }
  },

  editSkill: async (req, res) => {
    try {
      let { id } = req.params
      id = parseInt(id, 10)
      const data = req.body
      const skill = new MdlSkill(data)
      await MdlSkill.updateOne({ _id: id }, { $set: skill })
      res.status(200).json({ Mensaje: 'Habilidad editada con exito.' })
    } catch (err) {
      res.status(500).json({
        message:
          'El servidor tuvo problemas al momento de editar su habilidad.',
      })
    }
  },

  deleteSkill: async (req, res) => {
    try {
      let { id } = req.params
      id = parseInt(id, 10)
      await MdlSkill.deleteOne({ _id: id })
      res.status(200).json({ message: 'La habilidad se elimino con exito.' })
    } catch (err) {
      res.status(500).json({
        message:
          'El servidor tuvo problemas al momento de eliminar su habilidad.',
      })
    }
  },
}

export default ctrSkill
