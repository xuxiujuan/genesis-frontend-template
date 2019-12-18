<template>
  <div class="page-back" @click="handleClick">
    <df-icon icon-class="icon-arrow-left" />
    <div class="title">{{ title }}</div>
  </div>
</template>
<script>
export default {
  computed: {
    title() {
      return this.$route.name
    }
  },
  methods: {
    handleClick() {
      this.$router.go(-1)
    }
  }
}
</script>

