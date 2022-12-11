import { Messages, Read, Rooms } from '/imports/collections'

export default function(room, user, join = true) {
  const roomId = room._id
  const userId = user._id
  const now = new Date()
  const nickName = user.nickName
  const avatarImg = user.avatarImg
  const message = `${nickName}님이 ${join ? '입장' : '퇴장'}.`

  const query1 = { _id: roomId }
  const doc1 = {
    $set: {
      updatedAt: now,
      lastUserId: userId,
      lastUserName: nickName,
      lastUserAvatar: avatarImg,
      lastMessage: message,
    },
    $addToSet: {
      joiner: userId,
    },
  }
  Rooms.update(query1, doc1)

  const query2 = { userId, roomId }
  const doc2 = {
    $set: {
      readAt: now,
    },
  }
  Read.upsert(query2, doc2)

  Messages.insert({
    createdAt: now,
    notice: true,
    message,
    userId,
    nickName,
    avatarImg,
    roomId,
  })
}