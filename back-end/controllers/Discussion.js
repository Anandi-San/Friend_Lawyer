import {Op} from "sequelize";
import Discussion from "../models/DiscussionModel.js";
import User from "../models/UserModel.js";

export const getDiscussion = async (req , res) => {
    try {
        let response;
        if(req.role === "admin"){
            response = await Discussion.findAll({
                attributes:['uuid','title','content'],
                include:[{
                    model: User, 
                    attributes: ['name','email']
                }]
            });
        }else{
            response = await Discussion.findAll({
                attributes:['uuid','title','content'],
                where:{
                    userId: req.userId
                },
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getDiscussionById = async (req , res) => {
    try {
        const discussion = await Discussion.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!discussion) return res.status(404).json({msg: "Data tidak ditemukan"});
        let response;
        if(req.role === "admin"){
            response = await Discussion.findOne({
                attributes:['uuid','title','content'],
                where:{
                    id: discussion.id
                },
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }else{
            response = await Discussion.findOne({
                attributes:['uuid','title','content'],
                where:{
                    [Op.and]:[{id: discussion.id}, {userId: req.userId}]
                },
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}
    

export const createDiscussion = async (req, res) => {
    const {title, content} = req.body;
    try {
        await Discussion.create({
            title: title,
            content: content,
            userId: req.userId
        });
        res.status(201).json({msg: "Product Created Successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updateDiscussion = async (req , res) => {
    try {
        const discussion = await Discussion.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!discussion) return res.status(404).json({msg: "Data tidak ditemukan"});
        const {title, content} = req.body;
        if(req.role === "admin"){
            await Discussion.update({title, content},{
                where:{
                    id: discussion.id
                }
            });
        }else{
            if(req.userId !== discussion.userId) return res.status(403).json({msg: "Akses terlarang"});
            await Discussion.update({title, content},{
                where:{
                    [Op.and]:[{id: discussion.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Product updated successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const deleteDiscussion = async (req , res) => {
    try {
        const discussion = await Discussion.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!discussion) return res.status(404).json({msg: "Data tidak ditemukan"});
        if(req.role === "admin"){
            await Discussion.destroy({
                where:{
                    id: discussion.id
                }
            });
        }else{
            if(req.userId !== discussion.userId) return res.status(403).json({msg: "Akses terlarang"});
            await Discussion.destroy({
                where:{
                    [Op.and]:[{id: discussion.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Product deleted successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}