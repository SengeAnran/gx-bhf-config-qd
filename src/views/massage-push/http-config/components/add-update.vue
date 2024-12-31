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
        <el-form-item label="http地址：" prop="url">
          <el-input v-model="formData.url" placeholder="请输入" clearable></el-input>
        </el-form-item>
<!--        <el-form-item label="端口：" prop="gatewayPort">-->
<!--          <el-input v-model="formData.gatewayPort" placeholder="请输入" clearable></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="订阅主题：">-->
<!--          <el-input v-model="formData.subscribeTopic" placeholder="请输入" clearable></el-input>-->
<!--        </el-form-item>-->

        <el-form-item label="方法：" prop="method">
          <el-select v-model="formData.method" placeholder="请选择" style="width:100%">
            <el-option label="POST" value="post"></el-option>
            <el-option label="GET" value="get"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="参数名：">
          <el-input v-model="formData.param" placeholder="请输入" clearable></el-input>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input type="textarea" v-model="formData.remark" placeholder="请输入" clearable></el-input>
        </el-form-item>

      </el-form>
    </template>
    <template #footer>
      <el-button type="info" icon="el-icon-circle-close" @click="visible=false">取消</el-button>
      <el-button type="primary" icon="el-icon-circle-check" @click="onSure">确定</el-button>
    </template>
  </BaseDialog>
</template>

<script>
import { addHttpApi, detailsApi, updateHttpApi } from "@/api/system/http";
export default {
  data() {
    return {
      visible: false,
      title: "新增推送配置信息",
      formData: {},
      rules: {
        url: [
          { required: true, message: "请输入", trigger: "blur" }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        method: [{ required: true, message: "请选择", trigger: "blur" }]
      }
    };
  },
  methods: {
    init(row) {
      this.visible = true;
      if (row instanceof Object) {
        this.formData = row;
        this.title = "修改推送配置信息";
      } else {
        this.formData = {};
      }
      if (this.$refs.formRule) {
        this.$refs.formRule.resetFields();
      }
    },

    onSure() {
      this.$refs.formRule.validate(valid => {
        if (valid) {
          if (this.formData.id) {
            updateHttpApi(this.formData).then(res => {
              if (res.code == 200) {
                this.$message.success("操作成功!");
                this.visible = false;
                this.$emit("getData");
              }
            });
          } else {
            addHttpApi(this.formData).then(res => {
              if (res.code == 200) {
                this.$message.success("操作成功!");
                this.visible = false;
                this.$emit("getData");
              }
            });
          }
        } else {
          return false;
        }
      });
    }
  }
};
</script>

