import { Meteor } from 'meteor/meteor'
import { Rooms } from '/imports/collections'

Meteor.publish('roomsList', function() {
  return Rooms.find({},{sort: {updatedAt: -1}})
});