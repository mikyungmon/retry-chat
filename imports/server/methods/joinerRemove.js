import { Meteor } from 'meteor/meteor'
import { Rooms } from '/imports/collections'

Meteor.methods({
  joinerRemove(room_id){
    const sel ={_id: room_id}
    const option = {$pull: { joiner: this.userId}}

    Rooms.update(sel, option)
  }
})