import { Meteor } from 'meteor/meteor'
import { Messages } from '/imports/collections'

Meteor.publish('messageList', function() {
  return Messages.find()
});