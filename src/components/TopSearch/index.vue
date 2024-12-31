<template>
  <div class="head">
    <el-row>
      <el-col :span="24" class="col">
        <div>
          <el-button type="primary" icon="el-icon-plus" @click="add" v-if="show">{{addText}}</el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            @click="del"
            v-if="show"
            :disabled="delShow"
          >删除</el-button>
          <slot name="action"></slot>
        </div>
        <div>
          <el-input
            v-model="inputModel"
            style="width:300px;margin-right:10px"
            :placeholder="placeholder"
            clearable
          ></el-input>
          <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
          <el-button type="info" icon="el-icon-refresh" @click="reset">重置</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: true
    },
    //删除按钮禁用
    delShow: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: "请输入"
    },
    addText: {
      type: String,
      default: "新增"
    }
  },
  data() {
    return {
      inputModel: ""
    };
  },

  methods: {
    add() {
      this.$emit("add");
    },
    del() {
      this.$emit("del");
    },
    search() {
      this.$emit("search", this.inputModel);
    },
    reset() {
      this.inputModel = "";
      this.$emit("reset");
    }
  }
};
</script>


<style lang="scss" scoped>
.col {
  display: flex;
  justify-content: space-between;
}
.head {
  margin: 25px 0;
}
</style>
