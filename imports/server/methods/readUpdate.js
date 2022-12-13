import { Meteor } from 'meteor/meteor'
import { Read } from '/imports/collections'

Meteor.methods({
  readUpdate(room_id, click_time){
    const sel ={roomId: room_id}
    const option = {$set: { readAt: click_time}}

    Read.update(sel, option)
  }
})