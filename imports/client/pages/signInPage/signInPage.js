import {Template} from "meteor/templating";

Template.signInPage.events({
  "click .login-btn": function (evt, ins) {
    login_info(evt, ins)
  },
  'keyup .login-info': function (evt, ins) {
    if (evt.keyCode === 13) {
      login_info(evt, ins);
    }
  }
})

function login_info(evt, ins) {
  const userId = ins.find('input[name=userId]').value;
  const password = ins.find('input[name=password]').value;
  let text = ins.find('.login-info').value

  Meteor.loginWithPassword(userId, password, function (error) {
    if (!error) {
      Meteor.logoutOtherClients();
      alert("로그인 성공")
    } else if (text === "") {
      alert("빠짐없이 입력해주세요")
    } else {
      alert("아이디, 패스워드 확인해주세요")
    }
  })
}