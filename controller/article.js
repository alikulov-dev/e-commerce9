const Article = require('../model/article');
const fs = require('fs')
const path = require('path')

exports.createOne = async (req, res, next) => {
    const result = new Article({
        title: req.body.title,
        description: req.body.description,
        content: req.body.content,
        photo: `${req.file.filename}`
    })
    result.save()
    .then(() => {
        res.status(201).json({message: "Data is created", data: result})
    })
    .catch((error) => {
        res.status(400).json({message: "Data is not created", data: error})
    })
}

exports.updateOne = async (req, res, next) => {
    await Article.findById({ _id: req.params.id })
    .exec((error, data) => {
        if (error) {
          throw error
        } else {
          const filePath = path.join(
            __dirname,
            "../public/uploads/" + data.photo
          );
          fs.unlink(filePath, async (err) => {
            if (err) throw err;
          });
        }
      });
    const result = await Article.findByIdAndUpdate(req.params.id)
    result.title = req.body.title
    result.description = req.body.description
    result.content = req.body.content
    result.photo = `${req.file.filename}`

    result.save()
    .then(() => {
        res.status(200).json({message: "Successfully", data: result})
    })
    .catch((error) => {
        res.status(400).json({message: "Badly", data: error})
    })
}
exports.deleteOne = async (req, res, next) => {
    await Article.findById({ _id: req.params.id }).exec(async (error, data) => {
        if (error) {
          res.send(error);
        } else {
          const filePath = path.join(
            __dirname,
            "../public/uploads/" + data.image
          );
          fs.unlink(filePath, async (err) => {
            if (err) throw err;
            await Article.findByIdAndDelete({ _id: req.params.id });
            res.status(200).json({message: "Successfully", data: []})
          });
        }
      });
}

exports.getItem = async (req, res,next ) => {
    const result = await Article.findById(req.params.id)
    res.status(200).json({message: "Successfully", data: result})
}
exports.getItems = async (req, res,next ) => {
    const result = await Article.find()
    res.status(200).json({message: "Successfully", data: result})
}