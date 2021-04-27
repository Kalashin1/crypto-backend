import * as jwt from 'jsonwebtoken'

const maxAge = 3 * 24 * 60 *60

const createToken = (id: String|Number) => {
  return jwt.sign({id}, 'my secrete key', {
    expiresIn: 3 * 24* 60 * 60
  })
}

export { maxAge, createToken }