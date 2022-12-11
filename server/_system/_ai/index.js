import { Meteor } from 'meteor/meteor'
import { Rooms } from '/imports/collections'
import _randUser from './_randUser'
import _createRoom from './_createRoom'
import _randRoom from './_randRoom'
import _joinRoom from './_joinRoom'
import _sendMessage from './_sendMessage'

Meteor.methods({
  _ai() {
    if (!Meteor.userId()) {
      return
    }

    const user = _randUser()
    const query = {
      'joiner.0': { $exists: true }
    }
    const roomCount = Rooms.find(query).count()

    if (roomCount < 3) {
      return _createRoom(user)
    }

    const room = _randRoom()
    const already = room.joiner.includes(user._id)

    if (already) {
      falseOrTrue(10) ?
        _sendMessage(room, user) :
        _joinRoom(room, user, false)
    }
    else {
      _joinRoom(room, user)
      falseOrTrue(2) && _sendMessage(room, user)
    }
  },
})

function falseOrTrue(alpha = 2) {
  return Boolean(Math.floor(Math.random() * alpha))
}