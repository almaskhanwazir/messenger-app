import React from "react";
import { Box } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { makeStyles } from "@material-ui/core/styles";
import { setActiveChat } from "../../store/activeConversation";
import { connect } from "react-redux";
import { readMessagesAction } from "../../store/utils/thunkCreators";
import Badge from "@material-ui/core/Badge";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab",
    },
  },
  badge: {
    borderRadius: 15,
    marginRight: 20,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 12,
    paddingRight: 12,
    fontSize: 18,
  },
}));

const Chat = (props) => {
  const classes = useStyles();
  const { conversation, readMessagesAction, user } = props;
  const { otherUser } = conversation;

  const handleClick = async (conversation) => {
    await props.setActiveChat(conversation.otherUser.username);
    if (
      conversation.messages &&
      conversation.messages.length > 0 &&
      conversation.unReadMsgsCount > 0
    ) {
      await readMessagesAction({
        conversationId: conversation.messages[0].conversationId,
      });
    }
  };
  const unreadMsgsBadge = (
    <Badge
      classes={{ badge: classes.badge }}
      color="primary"
      badgeContent={conversation.unReadMsgsCount}
      showZero
    />
  );
  return (
    <Box onClick={() => handleClick(conversation)} className={classes.root}>
      <BadgeAvatar
        photoUrl={otherUser.photoUrl}
        username={otherUser.username}
        online={otherUser.online}
        sidebar={true}
      />
      <ChatContent conversation={conversation} />
      {conversation && conversation.unReadMsgsCount > 0 && unreadMsgsBadge}
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (id) => {
      dispatch(setActiveChat(id));
    },
    readMessagesAction: (message) => {
      dispatch(readMessagesAction(message));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
