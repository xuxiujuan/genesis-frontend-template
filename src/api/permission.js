import request from '@/utils/request'

export function getMenus() {
  return request({
    url: 'api/admin/menu/authorized',
    method: 'get'
  })
}

export function getAuthorizedButton() {
  return request({
    url: 'api/admin/authorizedButton',
    method: 'get'
  })
}
