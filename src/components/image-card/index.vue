<template>
  <div class="image-card">
    <div class="image-card__img">
      <df-image
        :src="url"
        :fit="fit"
        @load="handleLoad"
        @error="handleError"
      />
      <span class="image-card__action">
        <df-icon
          icon-class="icon-zoom-in"
          @click.stop="handleClick"
        />
        <df-icon
          icon-class="icon-delete"
          @click.stop="handleRemove"
        />
      </span>
    </div>
    <div class="image-card__name">
      {{ name }}
    </div>
    <PreviewDialog
      ref="previewDialog"
      :dialog-image-url="url"
    />
  </div>
</template>

<script>
import PreviewDialog from './preview-dialog'
export default {
  components: {
    PreviewDialog
  },
  props: {
    url: {
      type: String,
      default: ''
    },
    id: {
      type: [String, Number],
      default() {
        return this._uid
      }
    },
    name: {
      type: String,
      default: ''
    },
    fit: {
      type: String,
      default: 'cover'
    }
  },
  data() {
    return {
      flag: false
    }
  },
  methods: {
    handleClick() {
      if (this.flag) {
        return
      }
      this.$refs.previewDialog.show()
    },
    handleRemove() {
      this.$emit('remove', this.id)
    },
    handleError() {
      this.flag = true
    },
    handleLoad() {
      this.flag = false
    }
  }
}
</script>
