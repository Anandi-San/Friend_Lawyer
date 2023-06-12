import { Op } from "sequelize";
import FormConsultant from "../models/FormColsultant.js";
import Users from "../models/UserModel.js";

export const getKonsulForm = async (req, res) => {
  try {
    const response = await FormConsultant.findAll({
      attributes: [
        "uuid",
        "full_name",
        "email",
        "phonenumber",
        "day",
        "hours",
        "problem",
        "clientid",
        "lawyerid",
      ],
      include: [
        {
          model: Users,
          as: "client",
          attributes: ["name"],
        },
        {
          model: Users,
          as: "lawyer",
          attributes: ["name"],
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getKonsulFormById = async (req, res) => {
  try {
    const formconsultant = await FormConsultant.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!formconsultant) {
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    }

    const response = await FormConsultant.findOne({
      attributes: [
        "uuid",
        "full_name",
        "email",
        "phonenumber",
        "day",
        "hours",
        "problem",
        "clientid",
        "lawyerid",
      ],
      where: {
        uuid: req.params.id,
      },
      include: [
        {
          model: Users,
          as: "client",
          attributes: ["name", "email"],
        },
      ],
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createKonsulForm = async (req, res) => {
  try {
    const {
      full_name,
      email,
      phonenumber,
      day,
      hours,
      problem,
      status,
      clientid,
    } = req.body;
    const { userId } = req.params;
    // Pengecekan apakah userId ada dalam tabel Users
    const user = await Users.findOne({
      where: {
        uuid: userId,
      },
    });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const createdForm = await FormConsultant.create({
      full_name,
      email,
      phonenumber,
      day,
      hours,
      problem,
      status,
      clientid: clientid,
      lawyerid: parseInt(user.dataValues.id),
    });
    res.status(200).json(createdForm);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateKonsulForm = async (req, res) => {
  try {
    const formconsultant = await FormConsultant.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!formconsultant)
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    const {
      full_name,
      email,
      phonenumber,
      day,
      hours,
      problem,
      clientid,
      lawyerid,
    } = req.body;
    if (req.role === "admin") {
      await Discussion.update(
        {
          full_name,
          email,
          phonenumber,
          day,
          hours,
          problem,
          clientid,
          lawyerid,
        },
        {
          where: {
            id: formconsultant.id,
          },
        }
      );
    } else {
      if (req.userId !== formconsultant.userId)
        return res.status(403).json({ msg: "Akses terlarang" });
      await FormConsultant.update(
        {
          full_name,
          email,
          phonenumber,
          day,
          hours,
          problem,
          clientid,
          lawyerid,
        },
        {
          where: {
            [Op.and]: [{ id: formconsultant.id }, { userId: req.userId }],
          },
        }
      );
    }
    res.status(200).json({ msg: "Product updated successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// export const getFormBylawyerId = async (req, res) => {
//   const { userId } = req.params;

//   try {
//     if (req.role !== 'admin' && req.userId !== userId) {
//       return res.status(403).json({ msg: 'Akses terlarang' });
//     }

//     const forms = await FormConsultant.findAll({
//       where: {
//         lawyerid: userId,
//       },
//       include: [
//         {
//           model: Users,
//           as: 'client',
//           attributes: ['name'],
//         },
//       ],
//     });

//     res.status(200).json(forms);
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// };

export const deleteKonsulForm = async (req, res) => {
  try {
    const formconsultant = await FormConsultant.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!formconsultant)
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    if (req.role === "admin") {
      await FormConsultant.destroy({
        where: {
          id: formconsultant.id,
        },
      });
    } else {
      if (req.userId !== formconsultant.userId)
        return res.status(403).json({ msg: "Akses terlarang" });
      await Discussion.destroy({
        where: {
          [Op.and]: [{ id: formconsultant.id }, { userId: req.userId }],
        },
      });
    }
    res.status(200).json({ msg: "Product deleted successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
