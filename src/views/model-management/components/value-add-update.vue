<template>
  <div>
    <BaseDialog
      append-to-body
      :title="title"
      custom-class="export-dialog"
      :close-on-click-modal="false"
      :visible.sync="visible"
      width="600px"
    >
      <template #default>
        <el-form label-width="120px" :model="formData" ref="formRule">
          <el-row>
            <el-col :span="24">
              <el-form-item label="阈值配置：">
                <div>
                  <el-button
                    icon="el-icon-plus"
                    circle
                    size="mini"
                    type="primary"
                    @click="addGroup"
                  ></el-button>
<!--                  <span>（最多只能配置5个）</span>-->
                </div>
                <div style="max-height:330px;overflow:auto">
                  <div class="flex" v-for="(item,index) in formData.valueArr">
                    <div style="margin:36px 10px 0 0">
                      <el-button
                        icon="el-icon-minus"
                        circle
                        size="mini"
                        type="danger"
                        @click="minusCard(index)"
                      ></el-button>
                    </div>
                    <div>
                      <div>配置{{index+1}}</div>
                      <div class="gap group">
                        <div class="flex">
                          <div style="margin-right:10px;">阈值名称</div>
                          <div>
                            <div style="margin-bottom:10px">
                              <el-input
                                v-model="item.name"
                                placeholder="请输入阈值名称"
                                clearable
                                style="width:300px"
                              ></el-input>
                            </div>
                          </div>
                        </div>
                        <div class="flex" style="margin-top:5px;">
                          <div style="margin-right:10px">阈值的值</div>
                          <el-input
                            v-model="item.value"
                            placeholder="请输入阈值的值"
                            clearable
                            style="width:300px"
                          ></el-input>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>
      </template>
      <template #footer>
        <el-button type="info" icon="el-icon-circle-close" @click="visible=false">取消</el-button>
        <el-button type="primary" icon="el-icon-circle-check" @click="onSure">确定</el-button>
      </template>
    </BaseDialog>
  </div>
</template>

<script>
export default {
  // model: {
  //   prop: 'value',
  //   event: 'update'
  // },
  props: {
    value:String,
  },
  data() {
    return {
      modelData: [], //模型数据
      temp: {}, //模型选中项
      visible: false,
      title: "阈值配置",
      formData: {
        valueArr: [{}], //板卡配置
      },
    };
  },
  watch: {
    value: {
      handler:function (val) {
        if (val) {
          this.formData.valueArr = JSON.parse(val);
        } else {
          this.formData.valueArr = [
            {
              name: '',
              value: '',
            }
          ]
        }
      },
      immediate: true,
    }
  },
  methods: {
    init() {
      this.visible = true;
    },
    addGroup() {
      if (
        !this.formData.valueArr[this.formData.valueArr.length - 1]
          .name ||
        !this.formData.valueArr[this.formData.valueArr.length - 1]
          .value
      ) {
        return this.$message.warning(`请先补全阈值的相关配置，再添加！`);
      } else if (this.formData.valueArr.length > 4) {
        return this.$message.warning(`最多设置5个阈值信息！`);
      }
      this.formData.valueArr.push({
        name: "",
        value: "",
      });
    },

    //板卡
    minusCard(index) {
      if (this.formData.valueArr.length == 1) {
        return this.$message.warning("至少保留一项阈值配置！");
      }
      this.formData.valueArr.splice(index, 1);
    },

    minusModel(index) {
      if (this.formData.models.length == 1) {
        return this.$message.warning("至少选择一项关联模型！");
      }
      this.formData.models.splice(index, 1);
    },
    onSure() {
      this.visible = false;
      if (this.formData.valueArr[0].name && this.formData.valueArr[0].value) {
        const strValue = JSON.stringify(this.formData.valueArr);
        this.$emit('update:value', strValue)
      }

    }
  }
};
</script>

<style lang="scss" scoped>
.gap {
  //   margin: 15px 0;
}
.group {
  padding: 12px;
  margin-bottom: 10px;
  border: 2px dashed rgb(223, 227, 238);
}
.btn {
  margin-left: 10px;
}
.line {
  margin-bottom: 10px;
  height: 135px;
  overflow: auto;
}
::v-deep .el-dialog__body {
  padding: 30px 20px 0 20px;
}
</style>
