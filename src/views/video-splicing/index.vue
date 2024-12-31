<template>
  <div class="container">
    <BaseBlock title="RMG300视频拼接" :verticalLine="true"/>

    <div class="card-box">
      <span>RMG300视频拼接01</span>
      <i class="el-icon-link"></i>
      <a href="http://10.0.1.20" target="video-splicing">点击跳转</a>
    </div>
    <div class="card-box">
      <span>RMG300视频拼接02</span>
      <i class="el-icon-link"></i>
      <a href="http://10.0.1.22" target="video-splicing">点击跳转</a>
    </div>
    <div class="card-box">
      <span>RMG300视频拼接03</span>
      <i class="el-icon-link"></i>
      <a href="http://10.0.1.24" target="video-splicing">点击跳转</a>
    </div>
    <div class="card-box">
      <span>RMG300视频拼接04</span>
      <i class="el-icon-link"></i>
      <a href="http://10.0.1.26" target="video-splicing">点击跳转</a>
    </div>
    <div class="card-box">
      <span>RMG300视频拼接05</span>
      <i class="el-icon-link"></i>
      <a href="http://10.0.1.28" target="video-splicing">点击跳转</a>
    </div>
  </div>
</template>

<script>
  export default {
    mounted() {
      // window.open('http://192.168.1.199/')
    }
  }
</script>



<style lang="scss" scoped>
.center {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    font-size: 18px;
    font-weight: bolder;
    margin-right: 8px;
  }
  a,
  i {
    color: #409eff;
  }
}
</style>

