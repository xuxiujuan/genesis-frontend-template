<template>
  <df-breadcrumb>
    <df-breadcrumb-item v-for="(item,index) in breadcrumbs" :key="index" :to="{path: item.redirect}">
      {{ item.meta.name || item.name }}
    </df-breadcrumb-item>
  </df-breadcrumb>
</template>

<script>
export default {
  computed: {
    breadcrumbs: function() {
      return (this.$route && this.$route.matched) || []
    }
  }
}
</script>
