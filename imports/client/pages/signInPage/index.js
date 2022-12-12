import './signInPage.html'
import './signInPage.css'
import { Template } from 'meteor/templating'
import { FlowRouter } from "meteor/ostrio:flow-router-extra";

Template.signInPage.onCreated(function() {
})

Template.signInPage.onRendered(function() {
})

Template.signInPage.onDestroyed(function() {
})

Template.signInPage.helpers({
  type_change(){
    return (Session.get('password_type') === 'password')?  'text' : 'password'
  }

})

Template.signInPage.events({
  "change #password_check": function() {
    const checkbox = document.getElementById('password_check')
    const is_checked = checkbox.checked;

    return (is_checked === true) ? Session.set('password_type', 'password') : Session.set('password_type', 'text')
  },

  "click #button_sign": function(evt, tmpl) {
    const id = tmpl.find('input[name=username]').value;
    const pw = tmpl.find('input[name=password]').value;

    Meteor.loginWithPassword(id, pw, function(error) {
      (!error) ? Meteor.logoutOtherClients() : alert(error.reason)
    })
  },

  "change #id_remember": function(evt,tmpl) {
    const checkbox = document.getElementById('id_remember')
    const is_checked = checkbox.checked;

    if(is_checked === true){
      const id = tmpl.find('input[name=username]').value;
      setCookie('userIdCookie', id)
    }
  }
})

function setCookie(){

}

