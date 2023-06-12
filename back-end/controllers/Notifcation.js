import Users from "../models/UserModel";
import FormConsultant from "../models/NotifcationModel";
import {Op} from 'sequelize'

export const getNotifcation = async (req, res) => {
    try {
        const notifications = await Notification.findAll();
        res.json(notifications);
      } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ error: "Failed to fetch notifications" });
      }
};

export const getNotifcationById = async (req, res) => {
    try {
        const notification = await Notification.findOne({
          where: {
            uuid: req.params.id,
          },
        });
        if (!notification) return res.status(404).json({ msg: "Data tidak ditemukan" });
        let response;
        if (req.role === "admin") {
          response = await Notification.findOne({
            attributes: ["uuid", "pesan"],
            where: {
              id: notification.id,
            },
            include: [
              {
                model: Users,
                attributes: ["name", "email"],
              },
              {
                model: FormConsultant,
                attributes: ["fullname"],
              },
            ],
          });
        } else {
          response = await Notification.findOne({
            attributes: ["uuid", "title", "content"],
            where: {
              [Op.and]: [{ id: notification.id }, { userId: req.userId }],
            },
            include: [
              {
                model: Users,
                attributes: ["name", "email"],
              },
            ],
          });
        }
        res.status(200).json(response);
      } catch (error) {
        res.status(500).json({ msg: error.message });
      }
    };
export const createNotifcation = async (req, res) => {
    const { userId, formconsultantId, status, message } = req.body;
  try {
    const notification = await Notification.create({
      userId,
      formconsultantId,
      status,
      message,
    });
    res.status(201).json(notification);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: "Failed to create notification" });
  }
};

export const deleteNotifcation = async (req, res) => {
    try {
        const message = await Message.findOne({
          where: {
            uuid: req.params.id,
          },
        });
        if (!message) return res.status(404).json({ msg: "Data tidak ditemukan" });
        if (req.role === "admin") {
          await Message.destroy({
            where: {
              id: message.id,
            },
          });
        } else {
          if (req.userId !== message.userId)
            return res.status(403).json({ msg: "Akses terlarang" });
          await Message.destroy({
            where: {
              [Op.and]: [{ id: message.id }, { userId: req.userId }],
            },
          });
        }
        res.status(200).json({ msg: "Product deleted successfuly" });
      } catch (error) {
        res.status(500).json({ msg: error.message });
      }
};