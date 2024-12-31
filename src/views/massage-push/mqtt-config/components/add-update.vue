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
        <el-form-item label="网关IP：" prop="gatewayIp">
          <el-input v-model="formData.gatewayIp" placeholder="请输入" clearable></el-input>
        </el-form-item>
        <el-form-item label="端口：" prop="gatewayPort">
          <el-input-number v-model="formData.gatewayPort" placeholder="请输入" clearable></el-input-number>
        </el-form-item>
        <el-form-item label="订阅主题：" prop = "subscribeTopic">
          <el-input v-model="formData.subscribeTopic" placeholder="请输入" clearable></el-input>
        </el-form-item>

        <el-form-item label="备注：" prop="remark">
          <el-input type="textarea" v-model="formData.remark" placeholder="请输入" clearable></el-input>
        </el-form-item>
        <el-form-item label="消息示例：">
          <el-input type="textarea" v-model="formData.messageExample" placeholder="请输入" clearable></el-input>
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
import { addMqttApi, detailsApi, updateMqttApi } from "@/api/system/mqtt";
export default {
  data() {
    return {
      visible: false,
      title: "新增推送配置信息",
      formData: {},
      rules: {
        gatewayIp: [
          { required: true, message: "请输入", trigger: "blur" },
          { pattern: /^((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))$/, message: "请输入正确的IP地址", trigger: "blur" },
          { min: 7, max: 15, message: '长度在 7 到 15 个字符', trigger: 'blur' }
        ],
        subscribeTopic: [{ min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }],
        remark: [{ min: 1, max: 200, message: '长度在 1 到 200 个字符', trigger: 'blur' }],
        gatewayPort: [
          { required: true, message: "请输入", trigger: "blur" },
          { pattern: /\b(?:[1-9]\d{1,4}|99999)\b/, message: "请输入正确的端口", trigger: "blur" }
        ]
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
        this.title = "新增推送配置信息";
      }
      if (this.$refs.formRule) {
        this.$refs.formRule.resetFields();
      }
    },

    onSure() {
      this.$refs.formRule.validate(valid => {
        if (valid) {
          if (this.formData.id) {
            updateMqttApi(this.formData).then(res => {
              if (res.code == 200) {
                this.$message.success("操作成功!");
                this.visible = false;
                this.$emit("getData");
              }
            });
          } else {
            addMqttApi(this.formData).then(res => {
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

