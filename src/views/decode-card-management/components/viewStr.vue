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
      <el-form label-width="200px" :model="formData" ref="formRule" :rules="rules">
        <el-form-item label="日期时间：">
          {{formData.date}}
        </el-form-item>
        <el-form-item label="屏幕字符量：" prop="schnTextState">
          <el-radio-group v-model="formData.schnTextState">
            <el-radio :label="1">打开屏幕显示</el-radio>
            <el-radio :label="0">关闭屏幕显示</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="屏幕时间显示：" prop="stimeState">
          <el-radio-group v-model="formData.stimeState">
            <el-radio :label="1">打开时间显示</el-radio>
            <el-radio :label="0">关闭时间显示</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="通道显示：" prop="scharState">
          <el-radio-group v-model="formData.scharState">
            <el-radio :label="1">打开通道显示</el-radio>
            <el-radio :label="0">关闭通道显示</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="分割线显示：" prop="slineState">
          <el-radio-group v-model="formData.slineState">
            <el-radio :label="1">显示分割线</el-radio>
            <el-radio :label="0">不显示分割线</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="视频断线提醒：" prop="videoOffline">
          <el-radio-group v-model="formData.videoOffline">
            <el-radio :label="1">打开断线提醒</el-radio>
            <el-radio :label="0">关闭断线提醒</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="断线视频冻结：" prop="voChnBuffer">
          <el-radio-group v-model="formData.voChnBuffer">
            <el-radio :label="1">开启断线视频冻结</el-radio>
            <el-radio :label="0">关闭断线视频冻结</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <el-button type="info" icon="el-icon-circle-close" @click="visible=false">退出</el-button>
      <el-button type="primary" icon="el-icon-circle-check" @click="onSure">确定</el-button>
    </template>
  </BaseDialog>
</template>

<script>
import { updateScreenCharApi, getScreenChar } from "@/api/system/decodeCard";
export default {
  data() {
    return {
      visible: false,
      title: "屏幕字符",
      formData: {
      },
      rules: {
        // nickName: [
        //   { required: true, message: "请输入", trigger: "blur" },
        //   { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        // ],
        // userName: [{ required: true, message: "请输入", trigger: "blur" },
        //   { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }],
        // password: [{ required: true, message: "请输入", trigger: "blur" },
        //   { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }],
        schnTextState: [{ required: true, message: "请选择", trigger: "change" }],
        stimeState: [{ required: true, message: "请选择", trigger: "change" }],
        scharState: [{ required: true, message: "请选择", trigger: "change" }],
        slineState: [{ required: true, message: "请选择", trigger: "change" }],
        videoOffline: [{ required: true, message: "请选择", trigger: "change" }],
        voChnBuffer: [{ required: true, message: "请选择", trigger: "change" }],
      }
    };
  },
  methods: {
    init(row) {
      this.visible = true;
      getScreenChar().then(res => {
        this.formData = { ...res.data };
        if (this.$refs.formRule) {
          this.$refs.formRule.resetFields();
        }
      })

    },
    //确认
    onSure() {
      this.$refs.formRule.validate(valid => {
        if (valid) {
          updateScreenCharApi(this.formData).then(res => {
            if (res.code === 200) {
              this.$message.success("操作成功!");
              this.visible = false;
            }
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

