import { Meteor } from 'meteor/meteor'
import { Messages } from '/imports/collections'

Meteor.methods({
  messageInsertIn(message, user_id, nickname, avatar_img, room_id) {
    const date = new Date()
    const messageData = {
      createdAt: date,
      message: message,
      notice: true,
      userId: user_id,
      nickName: nickname,
      avatarImg: avatar_img,
      roomId: room_id
    }
    Messages.insert(messageData)    // 데이터 넣고 ._id값 반환

  }
})