import User from "../models/UserModel.js";

export const verifyUser = async(req, res, next) => {
    if(!req.session.userId){
        return res.status(401).json({msg: "Mohon login ke akun Anda!"});
    }
    const user = await User.findOne({
        attributes:['id', 'uuid','name','email','role'],
        where: {
            uuid: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    req.userId = user.id;
    req.role = user.role;
    // console.log(req)
    next();
}

export const adminOnly = async(req, res, next) => {
    const user = await User.findOne({
        attributes:['uuid','name','email','role'],
        where: {
            uuid: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    if(user.role !== "admin") return res.status(403).json({msg: "akses dilarang"});
    next();
}

export const AdminorpartnersOnly = async(req, res, next) => {
    const user = await User.findOne({
        attributes:['uuid','name','email','role'],
        where: {
            uuid: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    if(user.role == "user") return res.status(403).json({msg: "akses dilarang"});
    next();
}