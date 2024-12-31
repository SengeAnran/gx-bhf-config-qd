<template>
  <el-tooltip
    :disabled="!circleBool"
    :content="contentStr"
    :enterable="false"
    placement="top"
    effect="light"
  >
    <!-- 这里需要加一层span包裹住button，否则button禁用后，tooltip无效 -->
    <span @click="click" class="tip"> 
      <el-button
        v-if="file"
        class="base-btn"
        :type="typeStr"
        :size="btnSize"
        :round="roundBool"
        :circle="circleBool"
        :disabled="disabled"
        :loading="loading"
        :class="classNameStr"
      >
        <template #default>
          <slot>
            <BaseIcon
              v-if="iconStr"
              :l="!circleBool"
              :icon="iconStr"
              :size="btnSize ? '22px' : '16px'"
            />
            <span v-if="!circleBool">{{ contentStr }}</span>
            <input
              v-show="false"
              ref="inputFile"
              class="file-input"
              type="file"
              :accept="accept"
              @change="chooseFile"
            >
            <BaseIcon
              v-if="!circleBool && iconRightStr"
              :icon="iconRightStr"
              :size="btnSize ? '22px' : '16px'"
            />
          </slot>
        </template>
      </el-button>

      <el-button
        v-else
        class="base-btn"
        :type="typeStr"
        :size="btnSize"
        :loading="loading"
        :round="roundBool"
        :circle="circleBool"
        :disabled="disabled"
        :class="classNameStr"
      >
        <template #default>
          <slot>
            <BaseIcon
              v-if="iconStr"
              :l="!circleBool"
              :icon="iconStr"
              :size="btnSize ? '22px' : '16px'"
            />
            <span v-if="!circleBool">{{ contentStr }}</span> 
            <BaseIcon
              v-if="!circleBool && iconRightStr"
              r
              :icon="iconRightStr"
              :size="btnSize ? '22px' : '16px'"
            />
            <el-tooltip v-if="btnToolTip" effect="light" :content="btnToolTip" placement="bottom">
              <BaseIcon
                style="margin-left:5px"
                r
                icon="el-icon-info"
                :size="btnSize ? '22px' : '16px'"
              />
            </el-tooltip>
          </slot>
        </template>
      </el-button>
    </span> 
  </el-tooltip>
</template>
<script>
// mixins
import propsMixins from "./props-mixins";
// vuex
import { mapGetters } from "vuex";
// config
import { BTN_CONFIG } from "./config";
/** utils **/
import { formatDataBySize } from "@/utils/index";

export default {
  name: "BaseButton",
  mixins: [propsMixins],
  computed: {
    contentStr() {
      return (
        this.content ||
        (BTN_CONFIG[this.code] && BTN_CONFIG[this.code].content) ||
        ""
      );
    },
    iconStr() {
      return (
        this.icon || (BTN_CONFIG[this.code] && BTN_CONFIG[this.code].icon) || ""
      );
    },
    classNameStr() {
      return (
        this.className ||
        (BTN_CONFIG[this.code] && BTN_CONFIG[this.code].className) ||
        ""
      );
    },
    iconRightStr() {
      return (
        this.iconRight ||
        (BTN_CONFIG[this.code] && BTN_CONFIG[this.code].iconRight) ||
        ""
      );
    },
    typeStr() {
      return (
        this.type ||
        (BTN_CONFIG[this.code] && BTN_CONFIG[this.code].type) ||
        "primary"
      );
    },
    roundBool() {
      return (
        this.round ||
        (BTN_CONFIG[this.code] && BTN_CONFIG[this.code].round) ||
        false
      );
    },
    btnSize() {
      return (BTN_CONFIG[this.code] && BTN_CONFIG[this.code].size) || this.size;
    },
    circleBool() {
      return (
        this.circle ||
        (BTN_CONFIG[this.code] && BTN_CONFIG[this.code].circle) ||
        false
      );
    },
    accept() {
      return this.fileTypes.map(item => `.${item}`).join(",");
    }
  },
  methods: {
    click($event) {
      $event.stopPropagation();
      $event.preventDefault();

      if (this.disabled) {
        return;
      }

      if (!this.file) {
        this.$emit("click", null);
      } else {
        const fn = () => {
          this.$refs.inputFile.dispatchEvent(new MouseEvent("click"));
        };
        if (typeof this.beforeImport === "function") {
          this.beforeImport(fn);
        } else {
          fn();
        }
      }
    },
    chooseFile(e) {
      const files = [...e.target.files];
      const acceptArr = [...this.fileTypes];
      const params = files.filter(file => {
        // 验证大小
        const sizeBool = file.size <= this.fileSize;

        // 验证格式
        let acceptBool = true;
        if (acceptArr.length) {
          const arr = file.name.split(".");
          const currentAccept = arr.pop();

          acceptBool = acceptArr.includes(currentAccept);
        }
        return sizeBool && acceptBool;
      });
      if (params.length < files.length) {
        return this.$message.warning(
          `文件不能超过 ${formatDataBySize(this.fileSize)}` +
            (this.fileTypes.length
              ? `，且文件格式为 ${this.fileTypes.join(",")}。`
              : "")
        );
      }
      this.$emit("click", params);
      this.$refs.inputFile.value = "";
    }
  },
  mounted() {
    if (typeof this.show == "function") {
      this.show(this.row);
    }
  }
};
</script>

<style lang="scss" scoped>
.base-btn {
  &.is-disabled {
    background: #133a56 !important;
    border-color: #133a56 !important;
  }

  .file-input {
    position: absolute;
    visibility: hidden;
  }
  i,
  svg,
  img {
    position: relative;
  }
  &:not(.is-circle) {
    padding: 8px 16px;
  }

  &.green {
    background: #38b87d;
    border-color: #38b87d;
  }

  &.cancel {
    background: #638aaf;
    border-color: #638aaf;
  }

  &.issue {
    background: #2da8cb;
    border-color: #2da8cb;
  }
}
.tip {
  display: inline-block;
  & + .tip {
    margin-left: 10px;
  }
}
</style>
