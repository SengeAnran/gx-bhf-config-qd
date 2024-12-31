<template>
  <BaseDialog
    append-to-body
    :title="title"
    custom-class="export-dialog"
    :close-on-click-modal="false"
    :visible.sync="visible"
    width="600px"
  >
    <template #default>
      <el-form label-width="100px" :model="formData" ref="formRule" :rules="rules">
        <el-form-item label="模型文件：" prop="filePath">
          <FileUpload v-model="formData.filePath" :isUploadModel="true"/>
        </el-form-item>
<!--        <el-form-item label="文件名：" prop="name">-->
<!--          <el-input v-model="formData.name" placeholder="请输入" clearable></el-input>-->
<!--        </el-form-item>-->
        <!--<el-form-item label="推送板卡：" prop="boardCards">
          <el-select v-model="formData.boardCards" multiple  placeholder="请选择" style="width:100%">
            <el-option
              v-for="item in option"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>-->
      </el-form>
    </template>
    <template #footer>
      <el-button type="info" icon="el-icon-circle-close" @click="visible=false">取消</el-button>
      <el-button type="primary" icon="el-icon-circle-check" @click="onSure">确定</el-button>
    </template>
  </BaseDialog>
</template>

<script>
import { addModelApi, detailsApi, upgradeModelApi, getBoardIdByModel } from "@/api/system/model";
export default {
  data() {
    return {
      visible: false,
      title: "更新模板",
      formData: {},
      option: [],
      rules: {
        filePath: [{ required: true, message: "请输入", trigger: "blur" }],
        boardCards: [{ required: true, message: "请选择", trigger: "change" }]
      }
    };
  },
  methods: {
    init(row) {
      this.visible = true;
      if (row) {
        this.formData = {};
        const {id} = row;
        this.getOption(id);
      } else {
        this.formData = {};
      }
      if (this.$refs.formRule) {
        this.$refs.formRule.resetFields();
      }
    },
    getOption(modelId) {
      getBoardIdByModel(modelId).then(res => {
        this.option = res.data.map(i => {
          return　{
            label: i.name,
            value: i.id,
          }
        })
      })
    },
    //确认
    onSure() {
      this.$refs.formRule.validate(valid => {
        if (valid) {
          upgradeModelApi(this.formData).then(res => {
            if (res.code == 200) {
              // this.$message.success("操作成功!");
              this.$message.success(res.data,5000);
              this.visible = false;
              this.$emit("getData");
            }
          });
          // if (this.formData.id) {

          // } else {
          //   addModelApi(this.formData).then(res => {
          //     if (res.code == 200) {
          //       this.$message.success("操作成功!");
          //       this.visible = false;
          //       this.$emit("getData");
          //     }
          //   });
          // }
        } else {
          return false;
        }
      });
    }
  }
};
</script>

