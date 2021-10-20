const Templates = require('../model/templates');
const fs = require('fs')
const path = require('path')

exports.createOne = async (req, res, next) => {
    const result = new Templates({
        title: req.body.title,
        subtitle: req.body.subtitle,
        description: req.body.description,
        license: req.body.license,
        built_with: req.body.built_with,
        preview_url: req.body.preview_url,
        download_url: req.body.download_url,
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
    await Templates.findById({ _id: req.params.id })
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
    const result = await Templates.findByIdAndUpdate(req.params.id)
        result.title = req.body.title;
        result.subtitle = req.body.subtitle;
        result.description = req.body.description;
        result.license = req.body.license;
        result.built_with = req.body.built_with;
        result.preview_url = req.body.preview_url;
        result.download_url = req.body.download_url;
        result.content = req.body.content;
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
    await Templates.findById({ _id: req.params.id }).exec(async (error, data) => {
        if (error) {
          res.send(error);
        } else {
          const filePath = path.join(
            __dirname,
            "../public/uploads/" + data.photo
          );
          fs.unlink(filePath, async (err) => {
            if (err) throw err;
            await Templates.findByIdAndDelete({ _id: req.params.id });
            res.status(200).json({message: "Successfully", data: []})
          });
        }
      });
}
exports.getItem = async (req, res,next ) => {
    const result = await Templates.findById(req.params.id)
    res.status(200).json({message: "Successfully", data: result})
}
exports.getItems = async (req, res,next ) => {
    const result = await Templates.find()
    res.status(200).json({message: "Successfully", data: result})
}