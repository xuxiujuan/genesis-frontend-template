import request from '@/utils/request'

export function getMenus() {
  return request({
    url: 'api/authorized_menu',
    method: 'get'
  })
}

export function getAuthorizedButton() {
  return request({
    url: 'api/authorized_button',
    method: 'get'
  })
}
