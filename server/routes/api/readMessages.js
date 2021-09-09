const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");
const { Op } = require("sequelize");
// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.put("/", async (req, res, next) => {
  try {
    const { conversationId } = req.body;
    if (!req.user || !conversationId) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    
    const conversations = await Conversation.findAll({
      where: {
        [Op.or]: {
          user1Id: senderId,
          user2Id: senderId,
        },
      },
    });console.log(conversations)
    if(conversations){
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
      res.json({ message: "Read messages success", success: true });
    }else{
      res.json({ message: "user not belong to conversation", success: false });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
