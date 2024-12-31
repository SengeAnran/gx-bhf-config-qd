<template>
  <div :class="['base-block', className]">
    <div
      :class="['title', toggleByTitle ? 'link' : '', verticalLine ? 'vertical-line' : 'line']"
      @click="toggleBodyByTitle"
    >
      <div>
        <div class="font">{{ title }}</div>
        <span class="subtext" v-if="subtext">{{ subtext }}</span>
      </div>

      <slot name="right-pannel">
        <div v-if="shrink" :class="['btn', showBody? 'rotate' : '']" @click.stop="toggleBody">
          <i class="el-icon-arrow-right"/>
        </div>
      </slot>
    </div>
    <el-collapse-transition>
      <div v-show="showBody" :class="['body', fullBody ? 'full' : '']">
        <slot/>
      </div>
    </el-collapse-transition>
  </div>
</template>
<script>
export default {
  name: "Index",
  props: {
    className: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    subtext: {
      type: String,
      default: ""
    },
    toggleByTitle: {
      type: Boolean,
      default: false
    },
    shrink: {
      type: Boolean,
      default: false
    },
    contract: {
      type: Boolean,
      default: false
    },
    verticalLine: {
      type: Boolean,
      default: false
    },
    fullBody: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showBody: !this.contract
    };
  },
  methods: {
    toggleBody() {
      this.showBody = !this.showBody;
    },
    toggleBodyByTitle() {
      if (this.toggleByTitle) {
        this.showBody = !this.showBody;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.base-block {
  .title {
    padding-bottom: 5px;
    margin-bottom: 10px;
    position: relative;
    border-bottom: 1px solid #054c71;
    display: flex;
    justify-content: space-between;
    &.link {
      cursor: pointer;
    }
    .font {
      display: inline-block;
      height: 28px;
      line-height: 28px;
      font-size: 16px;
      // color: #ffffff;
      position: relative;
    }
    &.line {
      .font {
        &:after {
          content: "";
          display: block;
          position: absolute;
          bottom: -7px;
          height: 3px;
          width: 100%;
          background-color: #5795e3;
        }
      }
    }
    &.vertical-line {
      display: flex;
      align-items: center;
      .font {
        padding-left: 16px;
        &:before {
          content: "";
          display: block;
          position: absolute;
          top: 50%;
          left: 4px;
          transform: translateY(-50%);
          height: 70%;
          width: 4px;
          background-color: #1473b9;
        }
      }
    }
  }

  .subtext {
    font-size: 12px;
    margin-left: 10px;
  }
  .body {
    &.full {
      height: calc(100% - 33px);
    }
  }
  .btn {
    cursor: pointer;
    transition: transform 0.3s;
    &.rotate {
      transform: rotate(90deg);
    }
  }
}
</style>
