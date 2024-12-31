<template>
  <div class="form-info">
    <el-form label-width="140px" :model="formData" ref="formRule" :rules="rules">
      <el-row>
        <el-col :span="12">
          <el-form-item label="用户名：" prop="userName">
            <el-input v-model="formData.userName" placeholder="请输入" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="密码：" prop="password">
            <el-input v-model="formData.password" type="password" placeholder="请输入" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="NVR设备IP地址：" prop="ip">
            <el-input v-model="formData.ip" placeholder="请输入" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="端口："  prop="code">
            <el-input v-model="formData.code" placeholder="请输入" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="通道号：" prop="channel">
            <el-input v-model="formData.channel" placeholder="请输入" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="主辅码流：" prop="subtype">
            <el-select v-model="formData.subtype" placeholder="请选择">
                  <el-option label="主码流" value="0"></el-option>
                  <el-option label="辅码流" value="1"></el-option>
                </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="时间范围：" prop="time">
<!--            yyyy-MM-dd HH:mm:ss-->
            <el-date-picker
              style="width:100%"
              v-model="formData.time"
              :picker-options="pickerOptions"
              type="datetimerange"
              range-separator="至"
              format="yyyy_MM_dd_HH_mm_ss"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy_MM_dd_HH_mm_ss"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
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
        // userName: '',
        // password: '',
        // ip: '',
        // code:'',
        // channel: '',
        // subtype: '',
        // time: [],
        userName: 'admin',
        password: 'Gx12345678',
        ip: '192.168.1.110',
        code:'554',
        channel: '4',
        subtype: '0',
        time: ['2024_05_07_09_25_00_00','2024_05_07_09_26_00_00'],
      },
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      rules: {
        userName: [
          { required: true, message: "请输入", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入", trigger: "blur" }
        ],
        ip: [
          { required: true, message: "请输入", trigger: "blur" }
        ],
        code: [
          { required: true, message: "请输入", trigger: "blur" }
        ],
        channel: [
          { required: true, message: "请输入", trigger: "blur" }
        ],
        subtype: [
          { required: true, message: "请输入", trigger: "blur" }
        ],
        time: [
          { required: true, message: "请选择", trigger: "blur" }
        ],
      }
    };
  },
  methods: {
    onSure() {
      this.$refs.formRule.validate(valid => {
        if (valid) {
          const {userName, password, ip, code, channel, subtype, time} = this.formData;
          const path = `rtsp://${userName}:${password}@${ip}:${code}/cam/playback%3Fchannel%3D${channel}%26subtype%3D${subtype}%26starttime%3D${time[0]}%26endtime%3D${time[1]}`;
          const data = {
            actionTime: formatDate(new Date()),
            content: path,
            type: '调度',
          };
          addApi(data);
          // 录视频用临时RTSP地址
          const tmpPath = "rtsp://192.168.1.221:554/pose";
          this.$refs.VideoView.init(path,tmpPath);
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


