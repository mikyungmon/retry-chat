import { Meteor } from 'meteor/meteor'
import { Rooms,Read } from '/imports/collections'

Meteor.methods({
  roomInsert() {
    const date = new Date()
    const roomData = {
      updatedAt: date,
      lastUserId: "",
      lastUserName: "새로운 방 생성!",
      lastUserAvatar: "https://www.pngarts.com/files/10/Default-Profile-Picture-Free-PNG-Image.png",
      lastMessage: "create new chat room!",
      joiner: [this.userId]
    }
    const room_id = Rooms.insert(roomData)    // 데이터 넣고 ._id값 반환

    Read.insert({
      readAt : date,
      userId : this.userId,
      roomId : room_id
    })

    return room_id
  }
})