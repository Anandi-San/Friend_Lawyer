import Message from "../models/MessageModel.js";
import User from "../models/UserModel.js";
import Discussion from "../models/DiscussionModel.js";

export const getMessages = async (req, res) => {
  try {
    let response;
    if (req.role === "admin") {
      response = await Message.findAll({
        attributes: ["uuid", "pesan"],
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
          {
            model: Discussion,
            attributes: ["title"],
          },
        ],
      });
    } else {
      response = await Message.findAll({
        attributes: ["uuid", "pesan"],
        where: {
          userId: req.userId,
        },
        include: [
          {
            model: User,
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

export const getMessageById = async (req, res) => {
  try {
    const message = await Message.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!message) return res.status(404).json({ msg: "Data tidak ditemukan" });
    let response;
    if (req.role === "admin") {
      response = await Message.findOne({
        attributes: ["uuid", "pesan"],
        where: {
          id: message.id,
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
          {
            model: Discussion,
            attributes: ["title"],
          },
        ],
      });
    } else {
      response = await Discussion.findOne({
        attributes: ["uuid", "title", "content"],
        where: {
          [Op.and]: [{ id: discussion.id }, { userId: req.userId }],
        },
        include: [
          {
            model: User,
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

export const getMessageByDiscussion = async (req, res) => {
  const { discussionId } = req.params;
  // console.log(discussionId)
  try {
    const message = await Message.findAll({
      include: [{
        model: Discussion,
        // where: ["message.discussionId = discussion.id"],
        required: true
      },
      {
        model: User,
        attributes: ["name"], // Mengambil atribut 'name' dari tabel 'User'
        // as: "user" // Memberikan alias 'user' pada relasi antara Message dan User
      }
    ],
      where: {
        discussionId: discussionId,
      },
    });
    if (!message) return res.status(404).json({ msg: "Data tidak ditemukan" });
    let response;
    if (req.role === "admin") {
      response = await Discussion.findAll({
        include: [
          {
          model: Message,
          attributes: ["uuid", "pesan", "discussionId", "updatedAt"],
          include:[{
            model: User,
                attributes: ["name"],
                // as: "user"
          }]
        },
      ],
            attributes: [],
        where: {
          "uuid": discussionId
        }
      })

    } else {
      response = await Discussion.findAll({
        attributes: ["uuid", "title", "content"],
        where: {
          [Op.and]: [{ discussionId: discussion.id }, { userId: req.userId }],
        },
        include: [
          {
            model: User,
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

export const createMessage = async (req, res) => {
  const { discussionId } = req.params;
  const { pesan } = req.body;
  try {
    await Message.create({
      pesan: pesan,
      userId: req.userId,
      discussionId: discussionId,
    });
    res.status(201).json({ msg: "Massage Created Successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteMessage = async (req, res) => {
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
