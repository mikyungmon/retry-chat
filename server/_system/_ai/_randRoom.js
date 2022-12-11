import { Rooms } from '/imports/collections'

class GetRandRoom {
  constructor() {
    this.rooms = []
  }

  get randIdx() {
    return Math.floor(Math.random() * this.rooms.length)
  }

  get room() {
    this.init()

    return this.rooms[this.randIdx]
  }

  init() {
    const query = {
      'joiner.0': { $exists: true }
    }
    const options = {
      fields: {
        joiner: true
      }
    }
    this.rooms = Rooms.find(query, options).fetch()
  }
}

const getRandRoom = new GetRandRoom()

export default function() {
  return getRandRoom.room
}