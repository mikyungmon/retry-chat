import './resetBtn.html'
import './resetBtn.css'
import { Template } from 'meteor/templating'
import { Meteor } from 'meteor/meteor'
import { ReactiveVar } from 'meteor/reactive-var'

const rvHidden = new ReactiveVar(true)
const rvRequesting = new ReactiveVar(false)

function toggleEvent(event) {
  const hidden = rvHidden.get()
  const toggle =
    event.shiftKey &&
    event.keyCode === 32

  toggle && rvHidden.set(!hidden)
}

async function resetDB() {
  rvRequesting.set(true)
  try {
    await Meteor.callAsync('_resetDB')
  }
  catch(error) {
    error = '=== DB 초기화가 감지되었습니다. ==='
    console.warn(error)
  }
  location.href = ''
}

window.addEventListener('keyup', toggleEvent)

Template.resetBtn.helpers({
  active: () => rvHidden.get() ? 'hide-reset-btn' : '',

  requesting: () => rvRequesting.get(),
})

Template.resetBtn.events({
  async 'click #reset-btn'() {
    confirm('정말 DB를 초기화 하시겠습니까?') &&
    await resetDB()
  },

  'focus #reset-btn'(event) {
    event.target.blur()
  },
})