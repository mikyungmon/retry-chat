import { Meteor } from 'meteor/meteor'
import { Rooms } from '/imports/collections'

Meteor.methods({
  lastUserUpdate(room_id, last_name){
    const sel ={roomId: room_id}
    const option = {$set: { lastUserName: last_name}}
    console.log(room_id,last_name)
    Rooms.update(sel, option)  // 왜 업데이트를 안하니..
  }
})