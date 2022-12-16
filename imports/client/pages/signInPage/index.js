import './signInPage.html'
import './signInPage.css'
import { Template } from 'meteor/templating'

Template.signInPage.onCreated(function() {
})

Template.signInPage.onRendered(function() {
})

Template.signInPage.onDestroyed(function() {
})

Template.signInPage.helpers({
  type_change(){
    return (Session.get('password_type') === 'password')?  'text' : 'password'
  },

  isChecked(){
    return localStorage.getItem('userid') ? true : false
  },

  rem_userid() {
    return localStorage.getItem('userid')
  }
})

Template.signInPage.events({
  "change #password_check": function() {
    const checkbox = document.getElementById('password_check')
    const is_checked = checkbox.checked;

    return (is_checked === true) ? Session.set('password_type', 'password') : Session.set('password_type', 'text')
  },

  "click #button_sign": function(evt, tmpl) {
    logIn(evt,tmpl)
  },

  'keyup input': function (evt, tmpl) {
    if (evt.which === 13) {
      logIn(evt,tmpl)
    }
  }

})

function logIn(evt, tmpl){
  const id = tmpl.find('input[name=username]').value;
  const pw = tmpl.find('input[name=password]').value;
  const checkbox = document.getElementById('id_remember')
  const is_checked = checkbox.checked;

  Meteor.loginWithPassword(id, pw, function(error) {
    if (!error){
      if (is_checked === true){
        console.log('id저장')
        localStorage.setItem('userid', id)
      }
      Meteor.logoutOtherClients()
    }
    else{
      localStorage.removeItem('userid')
      alert(error.reason)
    }

  })

}

