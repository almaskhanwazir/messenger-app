const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");
const { Op } = require("sequelize");
// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { conversationId } = req.body;
    if(conversationId){
      Message.update(
        { isRead: true },
        {
          where: {
            [Op.and]: {
              conversationId: conversationId,
              senderId: {[Op.not]: senderId},
            },
          },
        }
      );
    }
  

    res.json({ message: "Read messages success", success: true });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
