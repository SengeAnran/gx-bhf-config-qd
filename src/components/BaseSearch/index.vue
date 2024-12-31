<template>
  <el-form
    :inline="true"
    :model="formModel"
    :size="size"
    class="base-search"
    @submit.prevent.native
  >
    <el-form-item label v-if="!$attrs.hideKeyWordSearch" class="search_input">
      <el-input
        v-model.trim="formModel[keywordProp]"
        :placeholder="keywordPlaceholder"
        clearable
        @change="formChange($event, keywordProp)"
        @keyup.enter.native="search"
        @clear="reset"
      />
    </el-form-item>
    <el-form-item>
      <BaseButton code="search" @click="search"/>
      <BaseButton code="reset" v-if="showReset" @click="handleReset"/>
    </el-form-item>
  </el-form>
</template>
<script>
// mixins
import propsMixins from "./props-mixins";
// vuex
import { mapGetters } from "vuex";
export default {
  name: "Index",
  mixins: [propsMixins],
  model: {
    prop: "formData",
    event: "change"
  },
  data() {
    return {
      formModel: {
        ...this.formData
      }
    };
  },
  watch: {
    formData: {
      deep: true,
      handler(val) {
        this.formModel = { ...val };
      }
    }
  },
  computed: {
    ...mapGetters(["size"])
  },
  methods: {
    formChange(val, prop) {
      this.formModel[prop] = val;
      this.$emit("change", this.formModel);
    },

    search() {
      this.$emit("search");
    },
    reset() {
      this.formModel[this.keywordProp] = "";
      this.$emit("change", this.formModel);
      this.$emit("search");
    },

    handleReset() {
      this.formModel[this.keywordProp] = "";
      this.$emit("change", this.formModel);
      this.$emit("reset");
    }
  }
};
</script>

<style lang="scss" scoped>
.el-form.base-search {
  .el-form-item {
    margin-bottom: 0;
    &:last-child {
      margin-right: 0;
    }
  }
  .el-form--inline .el-form-item {
    margin-right: 0;
  }
  .search_input {
    margin-right: 10px !important;
  }
}
</style>
