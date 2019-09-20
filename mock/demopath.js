// 模拟获取路由的数据
export default [{
    component: 'views/dashboard/index',
    route: 'dashboard',
    name: '首页',
    sequence: 1,
    id: '1'
  },
  {
    component: 'views/abstract/index',
    sequence: 2,
    route: 'my-research',
    name: '我的投研',
    id: '2',
    redirect: '/my-research/research-portal'
  },
  {
    component: 'views/my-research/research-portal/index',
    sequence: 3,
    route: 'research-portal',
    name: '投研门户',
    id: '3',
    parentId: '2'
  },
  {
    component: 'views/my-research/policy-mgr/index',
    sequence: 4,
    route: 'policy-mgr',
    name: '策略管理',
    id: '4',
    parentId: '2'
  },
  {
    component: 'views/abstract/index',
    sequence: 5,
    route: 'fund-supermarket',
    name: '基金超市',
    id: '5',
    redirect: '/fund-supermarket/fund-evaluation/product-details'
  },
  {
    component: 'views/abstract/index',
    sequence: 6,
    route: 'fund-evaluation',
    name: '基金评价',
    id: '6',
    parentId: '5'
  },
  {
    component: 'views/fund-supermarket/product-details/index',
    sequence: 7,
    route: 'product-details',
    name: '产品详情',
    id: '7',
    parentId: '6'
  }
]