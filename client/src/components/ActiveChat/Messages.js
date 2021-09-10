import React, { useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";
import { readMessagesAction } from "../../store/utils/thunkCreators";
import { connect } from "react-redux";

const Messages = (props) => {
  const { messages, otherUser, userId } = props;

  useEffect(() => {
    if (messages[0].conversationId) {
      props.readMsgs({ conversationId: messages[0].conversationId });
    }
  }, [messages.length]);
  return (
    <Box>
      {messages.map((message, index) => {
        const time = moment(message.createdAt).format("h:mm");

        return message.senderId === userId ? (
          <SenderBubble
            readAvtar={message.readAvtar}
            key={index}
            text={message.text}
            time={time}
            otherUser={otherUser}
          />
        ) : (
          <OtherUserBubble
            key={index}
            text={message.text}
            time={time}
            otherUser={otherUser}
          />
        );
      })}
    </Box>
  );
};

export default Messages;
