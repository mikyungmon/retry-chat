import { Meteor } from 'meteor/meteor'
import { Read } from '/imports/collections'

Meteor.methods({
  readInsert(room_id) {
    const date = new Date()
    const readData = {
      readAt : date,
      userId : Meteor.userId(),
      roomId : room_id
    }
    Read.insert(readData)

  }
})
