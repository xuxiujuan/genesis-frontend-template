import paths from './demopath'

export default [
  // get user info
  {
    url: 'api/whoami',
    type: 'get',
    response: config => {
      const info = {
        chineseName: '许可'
      }

      return {
        code: 200,
        data: info
      }
    }
  },

  // user logout
  {
    url: 'api/logout',
    type: 'get',
    response: _ => {
      return {
        code: 200,
        data: 'success'
      }
    }
  },

  // user menus
  {
    url: 'api/admin/myperm',
    type: 'get',
    response: _ => {
      const resources = [{
        name: 'perm',
        method: 'GET',
        pattern: '/api/adimn/perm'
      }]
      return {
        code: 200,
        data: resources
      }
    }
  },

  // user logout
  {
    url: 'api/admin/menu/authorized',
    type: 'get',
    response: _ => {
      const menus = paths
      return {
        data: menus
      }
    }
  },
  {
    url: 'api/admin/authorizedButton',
    type: 'get',
    response: _ => {
      const btns = [{
        id: '1',
        name: 'btn-test1'
      },{
        id: '2',
        name: 'btn-test2'
      }]
      return {
        data: btns
      }
    }
  }
]
