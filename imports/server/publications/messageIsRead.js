import { Meteor } from 'meteor/meteor'
import { Read } from '/imports/collections'

Meteor.publish('messageIsRead', function() {
  return Read.find({})
});