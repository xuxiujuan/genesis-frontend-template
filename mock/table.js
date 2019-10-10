const tableData = []
const type = ['blue', 'yellow', 'red']
const status = ['success', 'error', 'info', 'warning']
const statusFormat = (row, column, cellValue, index) => {
  switch (cellValue) {
    case 'success': return '成功'
    case 'info': return '未完成'
    case 'error': return '失败'
    case 'warning': return '警告'
    default: return ''
  }
}
let tags = []
for (let i = 0; i < 50; i++) {
  tags = [{
    type: 'default',
    label: '标签'
  }]
  if (i % 2 === 0) {
    tags.push({
      type: type[parseInt(Math.random() * 3)],
      label: '标签'
    })
  }
  tableData.push({
    id: i,
    date: +new Date() + 86400000 * i,
    stockCode: '60095' + i,
    customerNum: '032XM00' + i,
    name: '王东方' + i,
    dept: '上海闵行区都市路营业部',
    summary: Math.random().toFixed(2),
    status: status[parseInt(Math.random() * 4)],
    handler: '李太白',
    authorizer: '张东方',
    tags: tags,
    money: parseInt(Math.random() * 5000)
  })
}

const columns = [{
  label: '日期',
  prop: 'date',
  filterable: true,
  sortable: true,
  dataType: 'date',
  width: '120px',
  complexSearch: true
}, {
  label: '日期',
  prop: 'date',
  filterable: true,
  sortable: true,
  dataType: 'date',
  width: '120px',
  complexSearch: false
}, {
  label: '证券代码',
  prop: 'stockCode',
  filterable: false,
  sortable: false,
  dataType: 'string',
  width: '120px'
}, {
  label: '客户姓名',
  prop: 'name',
  filterable: true,
  sortable: false,
  dataType: 'string',
  width: '120px',
  complexSearch: true
}, {
  label: '所属营业部',
  prop: 'dept',
  filterable: false,
  sortable: true,
  dataType: 'string',
  width: '190px'
}, {
  label: '经办人',
  prop: 'handler',
  filterable: false,
  sortable: false,
  dataType: 'string',
  width: '120px'
}, {
  label: '汇总状态（%）',
  prop: 'summary',
  filterable: false,
  sortable: true,
  dataType: 'number',
  width: '140px'
}, {
  label: '状态',
  prop: 'status',
  filterable: false,
  sortable: false,
  showStatus: true,
  dataType: 'string',
  width: '140px',
  formatter: statusFormat
}, {
  label: '核准人',
  prop: 'authorizer',
  filterable: false,
  sortable: false,
  dataType: 'string',
  width: '100px'
}, {
  label: '金额',
  prop: 'money',
  filterable: false,
  sortable: true,
  dataType: 'money',
  width: '120px',
  complexSearch: true
}]

export default [
  // table-columns
  {
    url: 'api/table/columns',
    type: 'get',
    response: _ => {
      return {
        data: columns
      }
    }
  },
  { // table-data
    url: 'api/table/data',
    type: 'get',
    response: _ => {
      return {
        data: tableData
      }
    }
  }
]