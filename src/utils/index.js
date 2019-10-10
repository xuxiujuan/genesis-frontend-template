export function loadComp(path, packageName) {
  return r => require.ensure([], () => r(require(`@/${path}.vue`)), 'views')
}

// 菜单数据组织
export const buildMenu = function(array, ckey) {
  const menuData = []
  const indexKeys = Array.isArray(array) ? array.map((e) => {
    return e.id
  }) : []

  ckey = ckey || 'parentId'
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

export const getCookie = function(name) {
  const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  const arr = document.cookie.match(reg)
  if (arr) {
    return unescape(arr[2])
  } else {
    return null
  }
}

export const delCookie = function(name) {
  const exp = new Date()
  exp.setTime(exp.getTime() - 1)
  const cval = getCookie(name)
  if (cval != null) {
    document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
  }
}

export const parseTime = function(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  if (!time) {
    return
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else if (typeof time === 'string') {
    if (cFormat && time.length === 8) {
      return time.substr(0, 4) + '/' + time.substr(4, 2) + '/' + time.substr(6, 2)
    }
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return timeStr
}

// 保留有效数字
export const tirmZero = function(value) {
  if (arguments.length === 0 || !value) {
    return null
  }
  const regexp = /(?:\.0*|(\.\d+?)0+)$/
  return value.toString().replace(regexp, '$1')
}

// 数字类型转成千分位逗号分隔格式，保留两位小数
export const numberformat = function(value, type = 'float') {
  if (!value && value !== 0) {
    return ''
  }
  if (!/^[-]?\d+(\.\d+)?$/.test(value)) {
    return value
  }
  value = value + ''
  let intPart = value.split('.')[0]
  const floatPart = value.split('.')[1]
  intPart = intPart.replace(/\d+?(?=(?:\d{3})+$)/g, function(s) {
    return s + ','
  })
  if (type === 'int') {
    return intPart
  }
  return floatPart ? (intPart + '.' + floatPart) : intPart
}

