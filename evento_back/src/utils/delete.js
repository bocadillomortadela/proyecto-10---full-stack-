const cloudinary = require('cloudinary').v2

const deleteFile = (url) => {
  const imgSplit = url.split('/')

  const folder = imgSplit.at(-2)
  const file = imgSplit.at(-1).split('.')[0]

  cloudinary.uploader.destroy(`${folder}/${file}`, () => {
    console.log('destroyed')
  })
}

module.exports = { deleteFile }
