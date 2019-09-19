export function loadComp(path, packageName) {
  return r => require.ensure([], () => r(require(`@/${path}.vue`)), 'views')
}

// 菜单数据组织
export const buildMenu = function(array, ckey) {
  const menuData = []
  const indexKeys = Array.isArray(array) ? array.map((e) => {
    return e.id
  }) : []

  ckey = ckey || 'parent'
  array.forEach(node => {
    // 一级菜单
    // node[ckey]存在时，需检测node[ckey]有效性
    if (!node[ckey] || (node[ckey] === node.id) || indexKeys.indexOf(node[ckey]) === -1) {
      delete node[ckey]
      node.path = node.route
      node.component = loadComp(node.component, node.route)
      menuData.push(node)
    }
  })

  const findChildren = function(parentArr) {
    if (Array.isArray(parentArr) && parentArr.length) {
      parentArr.forEach(parentNode => {
        array.forEach(node => {
          if (parentNode.id === node[ckey]) {
            node.component = loadComp(node.component, node.route)
            node.path = node.route
            if (parentNode.children) {
              parentNode.children.push(node)
            } else {
              parentNode.children = [node]
            }
          }
        })
        if (parentNode.children) {
          findChildren(parentNode.children)
        }
      })
    }
  }
  findChildren(menuData)
  return menuData
}

// 对象数组 根据 object 的 key 排序
export const depSortBy = function depSortBy(array, children, key) {
  array.sort((a, b) => {
    return a[key] - b[key]
  })
  for (let i = 0; i < array.length; i++) {
    if (array[i][children] && Array.isArray(array[i][children])) {
      depSortBy(array[i][children], children, key)
    }
  }
}
