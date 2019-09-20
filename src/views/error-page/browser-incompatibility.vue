<template>
  <div class="df-comp-browser-incompatibility">
    <div class="df-comp-browser-incompatibility__wraper">
      <div class="df-comp-browser-incompatibility__left">
        <img src="@/assets/browser-incompatibility.png" alt="">
      </div>
      <div class="df-comp-browser-incompatibility__right">
        <div class="title">浏览器不兼容</div>
        <p class="tip">请您使用最新版本浏览器或点击下方按钮下载推荐的浏览器，非常感谢您的配合！</p>
        <df-button class="link-btn" icon="icon-download" @click="handleClick">下载Chrome浏览器</df-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    handleClick() {
      console.log('click')
    }
  }
}
</script>

<style scoped lang="scss">
  @import '@/styles/browser-incompatibility.scss';
</style>
