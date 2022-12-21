import { Meteor } from 'meteor/meteor'
import { Rooms } from '/imports/collections'

Meteor.methods({
  roomRemove(room_id){
    const sel ={_id: room_id}
    console.log(Rooms.remove(sel))
  }
})