import Mock from 'mockjs'

import user from './user'

const mocks = [
  ...user
]

Mock.setup({
  timeout: 500
})

mocks.forEach(route => {
  Mock.mock(route.url, route.type, route.response)
})