import cloudinary from 'cloudinary'
import { v4 as uuidv4 } from 'uuid'

export const actions = {
  addImage: 'addImage',
  editImage: 'editImage',
  deleteImage: 'deleteImage',
}

export const handleImage = async ({
  action,
  folder,
  imageBase64,
  publicId,
}) => {
  try {
    const baseFolder = 'Portfolio'
    let infoImage = {}

    if (action === actions.addImage && folder && imageBase64) {
      infoImage = await cloudinary.v2.uploader.upload(imageBase64, {
        public_id: uuidv4(),
        folder: `${baseFolder}/${folder}`,
      })
    } else if (action === actions.editImage && imageBase64 && publicId) {
      infoImage = await cloudinary.v2.uploader.upload(imageBase64, {
        public_id: publicId,
      })
    } else if (action === actions.deleteImage && publicId) {
      infoImage = await cloudinary.v2.uploader.destroy(publicId)
    }

    return infoImage
  } catch (err) {
    throw new Error(err)
  }
}
