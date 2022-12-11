class GetRandUser {
  constructor() {
    this.users = []
  }

  get randUsers() {
    const query = {
      _id: {
        $ne : Meteor.userId()
      }
    }
    const options = {
      fields: {
        profile: true
      }
    }

    return Meteor.users
      .find(query, options)
      .fetch()
      .map(user => ({
        _id: user._id,
        nickName: user.profile.nickName,
        avatarImg: user.profile.avatarImg,
      }))
  }

  get randIdx() {
    return Math.floor(Math.random() * this.users.length)
  }

  get user() {
    this.init()

    return this.randUsers[this.randIdx]
  }

  init() {
    this.users = this.randUsers
  }
}

const getRandUser = new GetRandUser()

export default function() {
  return getRandUser.user
}