import { Meteor } from 'meteor/meteor'
import '/imports/collections'
import '/imports/server/methods'
import '/imports/server/publications'
import './_system'

Meteor.startup(() => {
  console.log(`Server started at ${new Date()}`)
  console.log(Meteor.users.find({}).count())
})
