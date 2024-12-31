<template>
  <div class="form-info">
    <el-form label-width="140px" :model="formData" ref="formRule" :rules="rules">
      <el-row>
        <el-col :span="12">
          <el-form-item label="rtsp融合地址：" prop="path">
            <el-input v-model="formData.path" placeholder="请输入" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-button type="primary" icon="el-icon-circle-check" @click="onSure">确定</el-button>
    <video-view ref="VideoView"></video-view>
  </div>
</template>

<script>
  import { addApi } from "@/api/system/bizLog";
  import {formatDate} from "@/utils/index.js"
import VideoView from  './video-view'
export default {
  components: {
    VideoView,
  },
  data() {
    return {
      visible: false,
      title: "告警详情",
      formData: {
        path: 'rtsp://192.168.1.199:554/huh'
      },
      rules: {
        path: [
          { required: true, message: "请输入", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    onSure() {
      this.$refs.formRule.validate(valid => {
        if (valid) {
          const data = {
            actionTime: formatDate(new Date()),
            content: this.formData.path,
            type: '调度',
          };
          addApi(data);
          this.$refs.VideoView.init(this.formData.path);
        } else {
          return false;
        }
      })

    }
  }
};
</script>

<style lang="scss" scoped>
</style>


