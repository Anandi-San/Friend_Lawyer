import User from "../models/UserModel.js";
import argon2 from "argon2";

export const getPartners = async (req, res) => {
  try {
    const response = await User.findAll({
      attributes: ['uuid', 'name', 'email', 'specialization', 'experience', 'education', 'license'],
      where: {
          role: "lawyer"
      }
    });

    const users = response.map((user) => {
      const specializationArray = user.specialization.trim().split(',');

      const specializationObjects = specializationArray.map((specialization, index) => {
        return {
          id: index + 1,
          role_name: specialization
        };
      });

      return {
        uuid: user.uuid,
        name: user.name,
        email: user.email,
        role: user.role,
        specialization: specializationObjects,
        experience: user.experience,
        education: user.education,
        license: user.license
      };
    });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

  
  

  export const getPartnersById = async (req, res) => {
    try {
      const response = await User.findOne({
        attributes: ['uuid', 'name', 'email', 'role', 'specialization', 'experience', 'education', 'license'],
        where: {
          uuid: req.params.id,
        },
      });
  
      if (!response) {
        return res.status(404).json({ msg: "Partner not found" });
      }
  
      const specializationArray = response.specialization.trim().split(',');
  
      const specializationObjects = specializationArray.map((specialization, index) => {
        return {
          id: index + 1,
          role_name: specialization,
        };
      });
  
      const partner = {
        uuid: response.uuid,
        name: response.name,
        email: response.email,
        role: response.role,
        specialization: specializationObjects,
        experience: response.experience,
        education: response.education,
        license: response.license,
      };
  
      res.status(200).json(partner);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };
  
  
  export const createPartners = async (req, res) => {
    try {
      const { name, email, password, confPassword, role, specialization, experience, education, license } = req.body;
      
      if (password !== confPassword) {
        return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" });
      }
  
      const hashPassword = await argon2.hash(password);
  
      // Membuat partner baru dalam database
      const partner = await User.create({
        name,
        email,
        password: hashPassword,
        role,
        specialization,
        experience,
        education,
        license,
      });
  
      // Mengirim respons dengan data partner yang telah dibuat
      res.status(201).json(partner);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };
  
  

  export const updatePartners = async (req, res) => {
    const user = await User.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
    const { name, email, password, confPassword, role, specialization, experience, education, license } = req.body;
    let hashPassword;
    if (password === "" || password === null) {
      hashPassword = user.password;
    } else {
      hashPassword = await argon2.hash(password);
    }
    if (password !== confPassword) return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" });
    try {
      await User.update(
        {
          name: name,
          email: email,
          password: hashPassword,
          role: role,
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
      res.status(200).json({ msg: "User Updated" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  };
  

export const deletePartners = async(req, res) =>{
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