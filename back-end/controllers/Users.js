import User from "../models/UserModel.js";
import argon2 from "argon2";

export const getUsers = async(req, res) =>{
    try {
        const response = await User.findAll({
            attributes:['uuid','name','email','role']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getUserById = async(req, res) =>{
    try {
        const response = await User.findOne({
            attributes:['uuid','name','email','role'],
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createUser = async(req, res) =>{
    const {name, email, password, confPassword} = req.body;
    if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"});
    const hashPassword = await argon2.hash(password);
    try {
        await User.create({
            name: name,
            email: email,
            password: hashPassword,
            // role: role
        });
        res.status(201).json({msg: "Register Berhasil"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const updateUser = async(req, res) =>{
    const user = await User.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    const {name, email, password, confPassword, role} = req.body;
    let hashPassword;
    if(password === "" || password === null){
        hashPassword = user.password
    }else{
        hashPassword = await argon2.hash(password);
    }
    if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"});
    try {
        await User.update({
            name: name,
            email: email,
            password: hashPassword,
            role: role
        },{
            where:{
                id: user.id
            }
        });
        res.status(200).json({msg: "User Updated"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
};


export const updateProfil = async (req, res) => {
    try {
      const user = await User.findOne({
        where: {
          uuid: req.params.id,
        },
      });
  
      if (!user) {
        return res.status(404).json({ msg: "User tidak ditemukan" });
      }
  
      const { name, email, specialization, experience, education, license } =
        req.body;
  
      if (user.role === "Lawyer") {
        // Update all fields for a lawyer
        await User.update(
          {
            name: name,
            email: email,
            specialization: specialization,
            experience: experience,
            education: education,
            license: license,
          },
          {
            where: {
              uuid: req.params.id,
            },
          }
        );
      } else {
        // Update only name and email for a regular user
        await User.update(
          {
            name: name,
            email: email,
          },
          {
            where: {
              uuid: req.params.id,
            },
          }
        );
      }
  
      res.status(200).json({ msg: "Profile Updated" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  };
  
  
  

export const updateUserbyUser = async (req, res) => {
    const { email, oldPassword, newPassword, confPassword } = req.body;
  
    try {
      const user = await User.findOne({
        where: {
          email: email,
        },
      });
  
      if (!user) {
        return res.status(404).json({ msg: "User tidak ditemukan" });
      }
  
      if (newPassword !== confPassword) {
        return res
          .status(400)
          .json({ msg: "Password baru dan Konfirmasi Password tidak cocok" });
      }
  
      const isPasswordValid = await argon2.verify(user.password, oldPassword);
      if (!isPasswordValid) {
        return res.status(401).json({ msg: "Password lama tidak cocok" });
      }
  
      const hashPassword = await argon2.hash(newPassword);
  
      await User.update(
        {
          password: hashPassword,
        },
        {
          where: {
            email: email,
          },
        }
      );
  
      res.status(200).json({ msg: "Password berhasil diperbarui" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  };
  

export const deleteUser = async(req, res) =>{
    const user = await User.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    try {
        await User.destroy({
            where:{
                id: user.id
            }
        });
        res.status(200).json({msg: "User Deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}