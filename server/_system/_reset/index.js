import removeAll from './_removeAll'
import createUser from './_createUser'
import { Meteor } from 'meteor/meteor'

async function _resetDB() {
  await removeAll()
  await createUser()
}

(async function() {
  const userCount = Meteor.users.find({}).count()
  if (!userCount) {
    await _resetDB()
  }
})()

Meteor.methods({ _resetDB })