<template>
  <df-dialog
    custom-class="image-card-preview-dialog"
    :visible.sync="dialogVisible"
  >
    <img
      :src="dialogImageUrl"
      alt=""
    >
  </df-dialog>
</template>
<script>

export default {
  props: {
    dialogImageUrl: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    show() {
      this.dialogVisible = true
    }
  }
}
</script>
