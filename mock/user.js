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

  // user menu
  {
    url: 'api/authorized_menu',
    type: 'get',
    response: _ => {
      const menus = paths
      return {
        data: menus
      }
    }
  },
  {
    url: 'api/authorized_button',
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