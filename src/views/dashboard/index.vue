<template>
  <div>
    <df-button v-has="['btn-test']">button权限</df-button>
    <df-button v-has="['btn-test1']">button权限1</df-button>
    <df-button v-has="['btn-test2']">button权限2</df-button>
    <df-button v-has="['btn-test3']">button权限3</df-button>
    <div class="demo-image">
      <ImageCard :id="id" :name="name" :url="url" @remove="handleRemove" />
    </div>
  </div>
</template>
<script>
import ImageCard from '@/components/image-card/index.vue'
export default {
  components: {
    ImageCard
  },
  data() {
    return {
      id: '10001',
      name: '附件一',
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    }
  },
  methods: {
    handleRemove(val) {
      console.log(val)
    }
  }
}
</script>

<style lang="scss">
.demo-image {
  .image-card {
    margin: 20px;
  }
}
</style>
