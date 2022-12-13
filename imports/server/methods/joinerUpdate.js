import { Meteor } from 'meteor/meteor'
import { Rooms } from '/imports/collections'

Meteor.methods({
  joinerUpdate(room_id){
    const sel ={_id: room_id}
    const option = {$addToSet: { joiner: this.userId}}

    Rooms.update(sel, option)
  }
})