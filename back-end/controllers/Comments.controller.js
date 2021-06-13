const {Comments} = require('../models')
const express = require('express')
const watson = require('../watson')
const Helpers = require('../helpers/Helpers')

module.exports = {

    /**
     *  @param {Request}  req
     *  @param {Response} res
     */

    async set(req, res, next) {
        const {
            text
        } = req.body
        if (Helpers.existrOrEror(text)) {
            return res.status(400).json({
                message: "Erro no texto comentado."
            })
        }
        let speechText
        try {
            speechText = await watson.synthesize(text)
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
        let comments
        try {
            comments = await Comments.create({
                text: text,
                upload_file: textToSpeech.fileName,
                upload_dir: textToSpeech.fileDir
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
        return res.status(200).json({
            text: comments.dataValues.text,
            url: `audio/${comments.dataValues.upload_file}`
        })


    },

    /**
     * @param {Request} req
     * @param {Response} res
     */
    async get(req, res) {
        let comments
        try {
            comments = await Comments.findAll()
        } catch (error) {
            return res.status(500).json({
                message: error.parent.sqlMessage
            })
        }

        if (Helpers.existrOrEror(comments)) {
            return res.status(401).json({
                message: "Comentário não encontrado"
            })
        }

        const result = comments.map(
            (comments) => {
                return {
                    text: comments.text,
                    url: `audio/${comments.upload_file}`
                }
            }
        )    

        return res.status(200).json(result)
    }


}

