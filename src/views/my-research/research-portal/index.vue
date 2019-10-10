<template>
  <div class="data-table-view-wraper">
    <PageBack />
    <data-table
      ref="dataTable"
      :offset-height="47"
      :action-cols="actionCols"
      :header-url="headerUrl"
      :data-url="dataUrl"
    >
      <df-function-bar slot="tool-bar" @expand-click="handleExpandClick">
        <df-form ref="demoForm" :model="form" inline>
          <df-form-item label="产品代码" prop="productCode">
            <df-select v-model="form.productCode" placeholder="请选择">
              <df-option label="600373.SH" value="600373.SH" />
              <df-option label="601881.SH" value="601881.SH" />
            </df-select>
          </df-form-item>
          <df-form-item label="起止日期">
            <df-date-picker v-model="form.date" value-format="timestamp" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" />
          </df-form-item>
          <df-form-item>
            <df-button type="primary" @click="handleQuery">查询</df-button>
            <df-button @click="resetForm">重置</df-button>
          </df-form-item>
        </df-form>
      </df-function-bar>
    </data-table>
  </div>
</template>
<script>
import PageBack from '@/components/page-back'

export default {
  components: {
    PageBack
  },
  data() {
    return {
      headerUrl: 'api/table/columns',
      dataUrl: 'api/table/data',
      actionCols: [{
        fixed: 'right',
        minWidth: '220',
        label: '操作',
        actions: [{
          handler: row => {
            this.$message('delete clicked')
            // 删除数据
            // reload 表格数据
            this.$refs.dataTable.reloadTableData()
          },
          label: '删除'
        }, {
          handler: row => {
            this.$message('Copy clicked')
          },
          label: '复制'
        }, {
          handler: row => {
            this.$message('New clicked')
          },
          label: '新建条目'
        }]
      }],
      form: {
        productCode: '',
        date: ''
      }
    }
  },
  methods: {
    handleExpandClick() {
      this.$nextTick(() => this.$refs.dataTable.resize())
    },
    handleQuery() {
      console.log(this.form)
      // this.$refs.dataTable.filterData(url, this.form)
    },
    resetForm() {
      for (const key in this.form) {
        this.form[key] = ''
      }
    }
  }
}
</script>
