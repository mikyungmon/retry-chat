import './chatRoomPage.html'
import './chatRoomPage.css'
import { Template } from 'meteor/templating'
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { Messages, Read, Rooms } from '/imports/collections'



Template.chatRoomPage.onCreated(function() {
  this.subscribe('messageList')
})

Template.chatRoomPage.onRendered(function() {
  const room_id = FlowRouter.getParam("roomId")
  this.autorun(function(){
    Messages.find().count()
    Meteor.call('readUpsert', room_id)
  })

})

Template.chatRoomPage.onDestroyed(function() {
})

Template.chatRoomPage.helpers({
  message_list(){
    const room_id = window.location.pathname.split("/").pop()

    return Messages.find({roomId:room_id})
  },

  getDate(time){
    return time.toLocaleTimeString()
  },

  isMe(user_id){
    return (Meteor.userId() === user_id) ? true : false
  }
})

Template.chatRoomPage.events({
  // 뒤로가기
  "click .btn_back": function(){
    FlowRouter.go('/roomList')
  },

  //방에서 나가기
  "click .btn_room_out": function(){
    const room_id = window.location.pathname.split("/").pop()
    Meteor.call('joinerRemove', room_id)
    FlowRouter.go('/roomList')
  },

  "click .btn_send": function(evt, tmpl){
    messageSend(evt,tmpl)
    const room_id = window.location.pathname.split("/").pop()
    Meteor.call('lastUpdate', room_id)
  },

  'keyup input': function (evt, tmpl) {
    if (evt.which === 13) {
      messageSend(evt, tmpl)
      const room_id = window.location.pathname.split("/").pop()
      Meteor.call('lastUpdate', room_id)
    }
  }
})

function messageSend(evt,tmpl) {
  const message = tmpl.find("input[name=messageText]").value
  const user_id = Meteor.userId()
  const nickname = Meteor.user().profile.nickName
  const room_id = window.location.pathname.split("/").pop()
  const avatar_img = Meteor.user().profile.avatarImg

  tmpl.find("input[name=messageText]").value = ""
  return message != '' ? Meteor.call('messageInsert', message, user_id, nickname, avatar_img, room_id) : false
  // return message!=''? Meteor.call('messageUpdate', room_id, message) : false
}
