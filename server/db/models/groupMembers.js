const { Op } = require("sequelize");
const db = require("../db");
const Message = require("./message");
const Sequelize = require("sequelize");

const GroupMember = db.define("groupMembers", {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  role: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  conversationId: {
    type: Sequelize.INTEGER,
    references: "conversations",
    referencesKey: "id",
  },
});

// find group members by conversationID

GroupMember.findGroupMembers = async function (conversationId) {
    const members = await Post.findAll({
        where: {
          conversationId: conversationId
        }
      });

  // return all members or null if it doesn't exist
  return members;
};

module.exports = GroupMember;
