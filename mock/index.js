import Mock from 'mockjs'

import user from './user'

const mocks = [
  ...user
]

mocks.forEach(route => {
  Mock.mock(route.url, route.type, route.response)
})
