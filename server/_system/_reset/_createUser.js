import { Accounts } from 'meteor/accounts-base'
import userData from './_userData'

export default async function() {
  console.log('=== 유저 생성 시작!')

  const users = Object.keys(userData)
  users.forEach((nickName, idx) => {
    const profile = {
      nickName: nickName,
      avatarImg: userData[nickName],
    }
    const doc = {
      username: `${idx}`,
      password: `${idx}`,
      profile,
    }

    Accounts.createUser(doc)
  })

  console.log('유저 생성 완료! ===')
}