import Mock from 'mockjs'

import user from './user'
import table from './table'

const mocks = [
  ...user,
  ...table
]

Mock.setup({
  timeout: 500
})

mocks.forEach(route => {
  Mock.mock(route.url, route.type, route.response)
})
