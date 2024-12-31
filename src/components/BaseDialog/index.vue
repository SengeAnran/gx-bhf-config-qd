<template>
  <el-dialog
    v-el-drag-dialog
    :visible.sync="dialogVisible"
    :modal="modal"
    :modal-append-to-body="modalAppendToBody"
    :append-to-body="appendToBody"
    :lock-scroll="lockScroll"
    :close-on-click-modal="closeOnClickModal"
    :close-on-press-escape="closeOnPressEscape"
    :show-close="showClose"
    :width="width"
    :custom-class="customClass"
    :top="top"
    :before-close="beforeClose"
    :center="center"
    :destroy-on-close="destroyOnClose"
    :fullscreen="fullscreen"
    @open="$emit('open')"
    @opened="$emit('opened')"
    @close="$emit('close')"
    @closed="$emit('closed')"
  >
    <template v-slot:title>
      <slot name="title">
        <b-icon v-if="titleIcon" l :icon="titleIcon"></b-icon>
        <span class="el-dialog__title">{{ title }}</span>
      </slot>
      <!-- <el-button
        v-if="showFull"
        class="el-dialog__headerbtn el-dialog__headerbtn__toggle"
        :icon="fullscreen ? 'el-icon-minus' : 'el-icon-full-screen'"
        circle
        @click="toggleFullscreen"
      />-->
    </template>
    <slot/>
    <!-- <template v-if="$slots.footer" v-slot:footer> -->
    <template #footer>
      <slot name="footer"/>
    </template>
  </el-dialog>
</template>

<script>
// mixins
import propsMixins from "./props-mixins";
// directives
import elDragDialog from "@/directive/el-drag-dialog"; // base on element-ui
export default {
  name: "BaseDialog",
  directives: { elDragDialog },
  mixins: [propsMixins],
  data() {
    return {
      fullscreen: false
    };
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", val);
      }
    }
  },
  methods: {
    toggleFullscreen() {
      this.fullscreen = !this.fullscreen;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
