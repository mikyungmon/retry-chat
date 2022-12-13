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

  isRead(room_id){  // 내일와서 수정
    const room = Read.find({roomId: room_id}).fetch()
    // console.log(123123, room)
  }
})


Template.roomListPage.events({
  "click .btn_create_room":function(){
    Meteor.call('roomInsert', (err, room_id)=>{
      err ? alert(err) : FlowRouter.go('/chatRoom/'+ room_id);
    });
  },

  "click .btn_logout":function(){
    Meteor.logout()
    FlowRouter.go('/signIn')
  },

  // 방에 들어가는 상황
  "click .room_row": function(){
    const click_time = new Date()
    const room_id = this._id  // 데이터 컨텍스트를 this가 포함(?)함
    Meteor.call('joinerUpdate',room_id)
    Meteor.call('readUpdate', room_id , click_time)
    FlowRouter.go('/chatRoom/'+ room_id)

  }

})
