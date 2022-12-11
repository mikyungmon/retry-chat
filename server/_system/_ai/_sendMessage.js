import { Rooms, Read, Messages } from '/imports/collections'
import _createMessage from './_createMessage'

export default function(room, user) {
  const now = new Date()
  const roomId = room._id
  const userId = user._id
  const nickName = user.nickName
  const avatarImg = user.avatarImg
  const message = _createMessage()

  const query1 = { _id: roomId }
  Rooms.update(query1, {
    $set: {
      updatedAt: now,
      lastUserId: userId,
      lastUserName: nickName,
      lastUserAvatar: avatarImg,
      lastMessage: message,
    }
  })

  const query2 = { roomId, userId }
  Read.update(query2, {
    $set: {
      readAt: now
    }
  })

  Messages.insert({
    createdAt: now,
    notice: false,
    message,
    userId,
    nickName,
    avatarImg,
    roomId
  })
}