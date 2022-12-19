import { Meteor } from 'meteor/meteor'
import { Read } from '/imports/collections'

Meteor.methods({
  readUpsert(room_id){
    const click_time = new Date()
    const sel ={roomId: room_id, userId: this.userId}
    const option = {$set: { readAt: click_time}}
    console.log(1)
    Read.upsert(sel, option)
  }
})