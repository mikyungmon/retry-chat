import { Rooms, Messages, Read } from '/imports/collections'

export default function(user) {
  const now = new Date()
  const userId = user._id
  const nickName = user.nickName
  const avatarImg = user.avatarImg
  const message = `${ nickName }님이 방을 생성했습니다.`
  const roomId = Rooms.insert({
    lastUserId: userId,
    lastUserName: nickName,
    lastUserAvatar: avatarImg,
    lastMessage: message,
    updatedAt: now,
    joiner: [user._id]
  })

  Read.insert({
    readAt: now,
    userId,
    roomId
  })

  Messages.insert({
    createdAt: now,
    message,
    notice: true,
    userId,
    nickName,
    avatarImg,
    roomId
  })
}