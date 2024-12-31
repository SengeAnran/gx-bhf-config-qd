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
        <el-form-item label="用户ID：" prop="nickName">
          <el-input v-model="formData.nickName" placeholder="请输入" clearable></el-input>
        </el-form-item>
        <el-form-item label="用户名：" prop="userName">
          <el-input v-model="formData.userName" placeholder="请输入" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码：" :prop="formData.userId?'':'password'">
          <el-input
            v-model="formData.password"
            :placeholder="formData.userId?'************':'请输入'"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="角色：" prop="remark">
          <el-select v-model="formData.remark" placeholder="请选择" style="width:100%">
            <el-option label="管理员" value="管理员"></el-option>
            <el-option label="普通用户" value="普通用户"></el-option>
          </el-select>
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
import { addUserApi, updateUserApi } from "@/api/system/user";
export default {
  data() {
    return {
      visible: false,
      title: "新增用户信息",
      formData: {},
      rules: {
        nickName: [
          { required: true, message: "请输入", trigger: "blur" },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        userName: [{ required: true, message: "请输入", trigger: "blur" },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }],
        password: [{ required: true, message: "请输入", trigger: "blur" },
          { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }],
        remark: [{ required: true, message: "请选择", trigger: "change" }]
      }
    };
  },
  methods: {
    init(row) {
      this.visible = true;
      if (row) {
        this.formData = { ...row };
      } else {
        this.formData = {};
      }
      if (this.$refs.formRule) {
        this.$refs.formRule.resetFields();
      }
    },
    //确认
    onSure() {
      this.$refs.formRule.validate(valid => {
        if (valid) {
          if (this.formData.userId) {
            updateUserApi(this.formData).then(res => {
              if (res.code == 200) {
                this.$message.success("操作成功!");
                this.visible = false;
                this.$emit("getData");
              }
            });
          } else {
            addUserApi(this.formData).then(res => {
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

