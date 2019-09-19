import request from '@/utils/request'

export function getInfo() {
  return request({
    url: 'api/whoami',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: 'api/logout',
    method: 'get'
  })
}
