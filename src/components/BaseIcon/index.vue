<template>
  <i
    v-if="icon.includes('el-icon')"
    :class="[icon, l ? 'l' : '', className]"
    :style="{color: color, '--size': size}"
  />
  <img
    v-else-if="icon.includes('data:image')"
    :class="className"
    :style="{'--size':size}"
    :src="icon"
    alt
  >
  <svg-icon
    v-else
    @click="event"
    :icon-class="icon"
    :class-name="`${l ? 'l' : ''} ${r ? 'r' : ''} ${className}`"
    :style="{fill: color, '--size': size, stroke: strokeColor }"
  />
</template>
<script>
export default {
  name: "BaseIcon",
  props: {
    icon: {
      type: String,
      default: ""
    },
    className: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: ""
    },
    strokeColor : {
      type: String,
      default: ""
    },
    l: {
      type: Boolean,
      default: false
    },
    r: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: "14px"
    }
  },
  data() {
    return {};
  },
  methods: {
    event() {
      this.$emit("click");
    }
  }
};
</script>

<style lang="scss" scoped>
i {
  font-size: var(--size);
  width: var(--size);
  height: var(--size);
}
svg {
  width: var(--size);
  height: var(--size);
}
img {
  width: var(--size);
  height: var(--size);
}
.l {
  margin-right: 5px;
}
.r {
  margin-left: 5px;
}
</style>
