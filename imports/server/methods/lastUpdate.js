import { Meteor } from 'meteor/meteor'
import { Rooms,Messages } from '/imports/collections'

Meteor.methods({
  lastUpdate(room_id){
    const last_name = Messages.findOne({roomId: room_id},{sort: {createdAt:-1}}).nickName
    const last_avatar = Messages.findOne({roomId: room_id},{sort: {createdAt:-1}}).avatarImg
    const last_message = Messages.findOne({roomId: room_id},{sort: {createdAt:-1}}).message
    const last_userid = Messages.findOne({roomId: room_id},{sort: {createdAt:-1}})._id
    const createdAt = Messages.findOne({roomId: room_id},{sort: {createdAt:-1}}).createdAt
    const sel ={_id: room_id}
    const option = {$set: { lastUserName: last_name,
                            lastUserAvatar: last_avatar,
                            lastMessage: last_message,
                            lastUserId : last_userid,
                            updatedAt: createdAt}}
    // console.log(room_id,last_name,last_avatar, last_message, last_userid, createdAt)
    Rooms.update(sel, option)
  }
})