<template>
  <div class="page-back" @click="handleClick">
    <df-icon icon-class="icon-arrow-left" />
    <div class="title">页面标题名称</div>
  </div>
</template>
<script>
export default {
  methods: {
    handleClick() {
      this.$router.go(-1)
    }
  }
}
</script>

