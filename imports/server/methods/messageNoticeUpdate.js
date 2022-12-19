import { Meteor } from 'meteor/meteor'
import { Messages } from '/imports/collections'

Meteor.methods({
  messageNoticeUpdate(room_id) {
    const sel = { roomId: room_id }
    const option = { $Set: { notice: true } }

    Messages.update(sel, option)
  }
})
