import Message from "../models/MessageModel.js";
import User from "../models/UserModel.js";
import Discussion from "../models/DiscussionModel.js";

export const getMessages = async (req, res) => {
  try {
    const response = await Message.findAll({
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

  try {
    const messages = await Message.findAll({
      include: [
        {
          model: Discussion,
          required: true
        },
        {
          model: User,
          attributes: ["name"]
        }
      ],
      where: {
        discussionId: discussionId
      }
    });

    if (!messages) return res.status(404).json({ msg: "Data tidak ditemukan" });

    const response = await Discussion.findAll({
      include: [
        {
          model: Message,
          attributes: ["uuid", "pesan", "discussionId", "updatedAt"],
          include: [
            {
              model: User,
              attributes: ["name"]
            }
          ]
        }
      ],
      attributes: [],
      where: {
        uuid: discussionId
      }
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


export const createMessage = async (req, res) => {
  const { pesan } = req.body;
  const { discussionId } = req.params;

  try {
    const discussion = await Discussion.findOne({
      where: {
        uuid: discussionId,
      },
    });

    if (!discussion) {
      return res.status(404).json({ msg: "Discussion not found" });
    }

    await Message.create({
      pesan: pesan,
      userId: req.userId,
      discussionId: discussion.id,
    });

    res.status(201).json({ msg: "Message Created Successfully" });
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
