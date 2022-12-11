import { Messages, Rooms, Read } from '/imports/collections'
import { Meteor } from 'meteor/meteor'

export default function() {
  console.log('=== 모든 데이터 삭제 시작!')

  Meteor.users.remove({})
  Messages.remove({})
  Rooms.remove({})
  Read.remove({})

  console.log('모든 데이터 삭제 완료! ===')
}