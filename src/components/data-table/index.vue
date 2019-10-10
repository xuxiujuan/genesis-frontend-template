<template>
  <div class="data-table">
    <div
      v-if="$slots['tool-bar']"
      ref="toolBar"
      class="data-table-tool-bar"
    >
      <slot name="tool-bar" />
    </div>
    <div
      class="data-table-action-bar"
    >
      <slot name="action-bar" />
      <df-button @click="exportFilter('all', tableData)">导出所有</df-button>
      <df-button @click="exportFilter('filter', filteredData)">导出所选</df-button>
    </div>
    <df-table
      v-loading="isLoading"
      genesis-loading-text="数据加载中…"
      :data="tableData"
      :searchable="searchable"
      :stripe="stripe"
      :height="calcHeight"
      :show-pagination="showPagination"
      :row-class-name="tableRowClassName"
      style="width: 100%"
      @selection-change="selectionChange"
      @current-page-change="currentChange"
      @page-size-change="pageSizeChange"
    >
      <df-table-column
        align="center"
        type="selection"
        width="47"
      />
      <df-table-column
        type="index"
        :index="indexMethod"
      />
      <df-table-column
        v-for="(column, index) in columns"
        :key="column.prop + index + ''"
        :label="column.label"
        :prop="column.prop"
        :data-type="column.dataType"
        :min-width="column.width"
        :filterable="column.filterable"
        :show-status="column.showStatus"
        :sortable="column.sortable"
        :complex-search="column.complexSearch"
        :show-overflow-tooltip="true"
        :formatter="column.formatter || formatter"
      />
      <df-table-column
        v-for="(actionCol, index) in actionCols"
        :key="index"
        :min-width="actionCol.minWidth"
        :label="actionCol.label"
        :actions="actionCol.actions"
        :fixed="actionCol.fixed"
        type="action"
      />
    </df-table>
  </div>
</template>

<script>
import { getStyle } from '@/utils/dom.js'
import { parseTime, tirmZero } from '@/utils'

export default {
  props: {
    height: {
      type: Number,
      default: 300
    },
    offsetHeight: {
      type: Number,
      default: 0
    },
    searchable: {
      type: Boolean,
      default: true
    },
    stripe: {
      type: Boolean,
      default: true
    },
    showPagination: {
      type: Boolean,
      default: true
    },
    actionCols: {
      type: Array,
      default: () => {
        return []
      }
    },
    dataUrl: {
      type: String,
      default: ''
    },
    headerUrl: {
      type: String,
      default: ''
    },
    customRowClassName: {
      type: Function,
      default: () => {}
    },
    showExportBtn: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      calcHeight: 300,
      columns: [],
      tableData: [],
      isLoading: true,
      filteredData: [],
      currentPage: 1,
      pageSize: 15
    }
  },

  created() {
    this.loadAll()
  },
  mounted() {
    setTimeout(() => {
      this.resize()
    }, 0)
    window.addEventListener('resize', this.resize)
  },
  methods: {
    resize() {
      const parentNode = this.$el.parentNode
      const toolBar = this.$refs.toolBar
      let height = 0
      if (parentNode) {
        const padding = (parseInt(getStyle(parentNode, 'paddingTop'), 10) || 0) +
        (parseInt(getStyle(parentNode, 'paddingBottom'), 10) || 0)
        height = parentNode.offsetHeight - padding
      }
      if (toolBar) {
        height -= toolBar.offsetHeight
      }
      this.calcHeight = height - this.offsetHeight
    },
    loadAll() {
      if (!(this.headerUrl && this.dataUrl)) {
        return
      }
      this.$axios.all([this.$axios.get(this.headerUrl), this.$axios.get(this.dataUrl)])
        .then(this.$axios.spread((columns, tableData) => {
          this.columns = columns.data.data
          this.tableData = tableData.data.data
          this.isLoading = false
        }))
    },
    reloadTableData() {
      this.isLoading = true
      this.$axios.get(this.dataUrl).then(res => {
        this.tableData = res.data.data
        this.isLoading = false
      })
        .catch(err => {
          this.isLoading = false
          console.log('获取关数据失败', err)
        })
    },
    tableRowClassName({ row, rowIndex }) {
      return this.customRowClassName && this.customRowClassName({ row, rowIndex })
    },
    formatterDate(row, column, cellValue, index) {
      if (!cellValue) {
        return ''
      }
      const date = new Date(Number(cellValue))
      const year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      month = month < 10 ? '0' + month : month
      day = day < 10 ? '0' + day : day
      return '' + year + '-' + month + '-' + day
    },
    formatter(row, column, cellValue, index) {
      if (column.dataType === 'date') {
        return this.formatterDate(row, column, cellValue, index)
      } else {
        return cellValue
      }
    },
    exportFilter(type, data) {
      if (type === 'filter' && data.length === 0) {
        this.$message({
          message: '请选择数据！',
          type: 'warning'
        })
        return
      }
      const header = []
      const columns = this.columns.filter(col => {
        if (!col.hidden) {
          header.push(col.label)
          return col
        }
      })
      const filename = this.$route.name + (this.extraFileName ? `_${this.extraFileName}` : '')
      const dataTemp = this.formatJson(columns, data)
      import('@/vendor/Export2Excel').then(excel => {
        excel.export_json_to_excel({
          header,
          data: dataTemp,
          filename: filename
        })
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j.dataType === 'date' && !!v[j.prop]) {
          return j.format ? parseTime(v[j.prop], j.format) : parseTime(v[j.prop], '{y}/{m}/{d}')
        } else if (j.dataType === 'number' && !!v[j.prop]) {
          return tirmZero(v[j.prop])
        } else {
          return v[j.prop]
        }
      }))
    },
    indexMethod(rowIndex) { // 序号index
      const index = (this.currentPage - 1) * this.pageSize + rowIndex + 1
      return index
    },
    selectionChange(res) {
      this.filteredData = res
    },
    currentChange(page) {
      if (typeof page !== 'number') {
        return
      }
      this.currentPage = page
    },
    pageSizeChange(size) {
      this.pageSize = size
    },
    filterData(searchUrl, data) {
      this.isLoading = true
      this.axios.post(searchUrl, data)
        .then(res => {
          this.data = res.data
          this.isLoading = false
        })
        .catch(err => {
          this.isLoading = false
          console.log('获取关数据失败', err)
        })
    }
  }
}
</script>
