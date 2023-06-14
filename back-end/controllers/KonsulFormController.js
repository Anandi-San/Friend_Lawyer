// import { Op } from "sequelize";
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
        "status",
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

export const getnotifByUserId = async (req, res) => {
  const { userId } = req.params;
  console.log(userId);

  try {
    const response = await FormConsultant.findAll({
      attributes: ["uuid", "day", "hours", "problem", "status", "lawyerid"],
      include: [
        {
          model: Users,
          as: "client", // Menggunakan "client" sebagai alias untuk asosiasi client
          attributes: ["name"],
          where: { uuid: userId }, // Menambahkan kondisi where untuk mencocokkan dengan UUID client
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

//   try {
//     const response = await FormConsultant.findAll({
//       attributes: [
//         "uuid",
//         "day",
//         "hours",
//         "problem",
//         "status",
//         "lawyerid",
//       ],
//       include: [
//         {
//           model: Users,
//           as: "lawyer",
//           attributes: ["name"],
//         },
//       ],
//     });
//     res.status(200).json(response);
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// };

export const getKonsulFormById = async (req, res) => {
  const { id } = req.params;

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
        "status",
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
          attributes: ["id", "name", "uuid"],
        },
      ],
      where: {
        '$lawyer.uuid$': id,
      },
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
    if (!formconsultant) return res.status(404).json({ msg: "Data not found" });

    const {
      full_name,
      email,
      phonenumber,
      day,
      hours,
      problem,
      clientid,
      lawyerid,
      status,
    } = req.body;

    if (req.role === "admin") {
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
          status,
        },
        {
          where: {
            uuid: req.params.id,
          },
        }
      );
    } else {
      if (req.userId !== formconsultant.lawyerid)
        return res.status(403).json({ msg: "Unauthorized access" });

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
          status,
        },
        {
          where: {
            uuid: req.params.id,
            lawyerid: req.userId,
          },
        }
      );
    }

    res.status(200).json({ msg: "Form updated successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteKonsulForm = async (req, res) => {
  try {
    const formconsultant = await FormConsultant.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!formconsultant)
      return res.status(404).json({ msg: "Data tidak ditemukan" });

    if (req.role === "admin" || req.role === "Lawyer") {
      // Periksa jika pengguna memiliki izin untuk menghapus data
      if (req.role === "lawyer" && req.userId !== formconsultant.userId)
        return res.status(403).json({ msg: "Akses terlarang" });

      await FormConsultant.destroy({
        where: {
          id: formconsultant.id,
        },
      });

      res.status(200).json({ msg: "Data berhasil dihapus" });
    } else {
      return res.status(403).json({ msg: "Akses terlarang" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

