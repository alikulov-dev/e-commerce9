const Snippet = require('../model/snippet');
const fs = require('fs')
const path = require('path')

exports.createOne = async (req, res, next) => {
    const result = new Snippet({
        title: req.body.title,
        subtitle: req.body.subtitle,
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
    const result = await Snippet.findByIdAndUpdate(req.params.id)
    result.title = req.body.title
    result.subtitle = req.body.subtitle
    result.save()
    .then(() => {
        res.status(200).json({message: "Successfully", data: result})
    })
    .catch((error) => {
        res.status(400).json({message: "Badly", data: error})
    })
}
exports.deleteOne = async (req, res, next) => {
    await Snippet.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({message: "Successfully", data: []})
}

exports.getItem = async (req, res,next ) => {
    const result = await Snippet.findById(req.params.id)
    res.status(200).json({message: "Successfully", data: result})
}
exports.getItems = async (req, res,next ) => {
    const result = await Snippet.find()
    res.status(200).json({message: "Successfully", data: result})
}