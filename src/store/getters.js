const getters = {
  username: state => state.user.username,
  menus: state => state.permission.menus,
  sideMenus: state => state.permission.sideMenus,
  btnsPerm: state => state.permission.btnsPerm
}
export default getters
