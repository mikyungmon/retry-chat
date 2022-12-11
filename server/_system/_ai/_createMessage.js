import _textArr from './_lorem_ipsum_korean'

class RandomMessage {
  constructor() {
    this.textArr = []
    this.msgArr = []
    this.paragraph = ''
  }

  get length() {
    return this.textArr.length
  }

  get randIdx() {
    return Math.floor(Math.random() * this.length)
  }

  get randRange() {
    return Math.floor(Math.random() * 2) + 1
  }

  get message() {
    return this.textArr.splice(this.randIdx, 1)[0]
  }

  init() {
    this.textArr = _textArr.slice()
    this.msgArr = []
    this.paragraph = ''
  }

  genMessage() {
    let i = this.randRange
    while (i--) {
      this.msgArr.push(this.message)
    }
    this.paragraph = this.msgArr.join('\n')
  }

  result() {
    this.init()
    this.genMessage()
    return this.paragraph
  }
}

const randomMessage = new RandomMessage

export default function() {
  return randomMessage.result()
}