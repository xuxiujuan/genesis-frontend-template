<template>
  <div class="cus-container">
    <div class="cus-aside">
      <div
        class="cus-collapse-btn"
        @click="toggleCollapse"
      >
        <df-icon :icon-class=" collapse ? 'icon-arrow-left' : 'icon-arrow-right'" />
      </div>
      <collapse-transition>
        <div v-show="collapse" class="cus-aside">

          <div
            :class="{
              'cus-aside__content-wraper': true,
              'is-collapse': collapse

            }"
          >
            <div class="cus-aside-main">
              <slot name="aside" />
            </div>
          </div>
        </div>
      </collapse-transition>
      <collapse-transition>
        <div v-show="!collapse" class="palcehoder" style="width: 20px" />
      </collapse-transition>
    </div>
    <div class="cus-main">
      <div class="cus-main__content">
        <slot name="main" />
      </div>
    </div>
  </div>
</template>
<script>
import CollapseTransition from './collapse-transition.js'

export default {
  components: {
    CollapseTransition
  },
  data() {
    return {
      collapse: true
    }
  },
  methods: {
    toggleCollapse() {
      this.collapse = !this.collapse
    }
  }
}
</script>
<style lang="scss">
.cus-container {
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
  background-color: #F2F2F2;
}
.cus-aside {
  position: relative;
  height: 100%;
  width: auto;
  background: #3a3f52;
  box-sizing: border-box;
  .cus-collapse-btn {
    position: absolute;
    top: 6px;
    right: 0;
    z-index: 5;
    background-color: #f2f2f2;
    width: 20px;
    height: 24px;
    border-radius: 73px 0 0 73px;
    .df-icon {
      height: 10px;
      width: 6px;
      color: #222;
      position: absolute;
      top: 7px;
      right: 5px;
      transition: none;
    }
  }
  .palcehoder {
    width: 20px!important;
  }
  .cus-aside__content-wraper {
    width: 200px;
    height: 100%;
    color: #fff;
    background: #3a3f52;
    .cus-aside-main {
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      padding: 45px 15px 0;
    }
  }
}
.cus-main {
  height: 100%;
  flex: 1;
  box-sizing: border-box;
  padding: 10px;
  .cus-main__content {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
  }
}
</style>
