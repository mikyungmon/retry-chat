import './roomListPage.html'
import './roomListPage.css'
import { Template } from 'meteor/templating'
import { Rooms,Read } from '/imports/collections'
import { FlowRouter } from "meteor/ostrio:flow-router-extra";

Template.roomListPage.onCreated(function() {
  this.subscribe('roomsList')
  this.subscribe('messageIsRead')
})

Template.roomListPage.onRendered(function() {
})

Template.roomListPage.onDestroyed(function() {
})

Template.roomListPage.helpers({
  room_list(){
    return Rooms.find()
  },

  getDate(time){
    return time.toLocaleString()
  },

  isJoiner(joiner){
    return (joiner.includes(Meteor.userId()) ) ? true: false;
  },

  isRead(room_id){
    const read = Read.findOne({userId: Meteor.userId(), roomId: room_id})?.readAt
    if(!read) return false
    const update_time = Rooms.findOne({_id:room_id}).updatedAt
    // console.log(131313, read)

    return read >= update_time ? true : false
  }
})


Template.roomListPage.events({
  "click .btn_create_room": function() {
    Meteor.call('roomInsert', (err, room_id) => {
      if(err){
        alert(err)
      }
      else{
        createRoomMessageSend(room_id)   // 방 생성 시 메세지 insert
        Meteor.call('readInsert', room_id)
        FlowRouter.go('/chatRoom/' + room_id);
      }
    });
  },

  "click .btn_logout":function(){
    Meteor.logout()
    FlowRouter.go('/signIn')
  },

  // 방에 들어가는 상황
  "click .room_row": function(){
    const room_id = this._id  // 데이터 컨텍스트를 this가 포함(?)함
    Meteor.call('joinerUpdate',room_id)
    FlowRouter.go('/chatRoom/'+ room_id)
  }

})

function createRoomMessageSend(room_id){
  const message = Meteor.user().profile.nickName + '님이 방을 생성했습니다.'
  const user_id = Meteor.userId()
  const nickname = Meteor.user().profile.nickName
  const avatar_img = Meteor.user().profile.avatarImg

  return Meteor.call('messageInsertIn',message, user_id, nickname, avatar_img, room_id)
}
