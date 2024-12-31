<template>
  <div class="container">
    <BaseBlock title="NVR视频存储" :verticalLine="true"/>
    <div class="card-box">
      <span>NVR视频存储01</span>
      <i class="el-icon-link"></i>
      <a href="http://10.0.1.240" target="video-storage">点击跳转</a>
    </div>
    <div class="card-box">
      <span>NVR视频存储02</span>
      <i class="el-icon-link"></i>
      <a href="http://10.0.1.241" target="video-storage">点击跳转</a>
    </div>
    <div class="card-box">
      <span>NVR视频存储03</span>
      <i class="el-icon-link"></i>
      <a href="http://10.0.1.242" target="video-storage">点击跳转</a>
    </div>
  </div>
</template>
<script>
  export default {
    mounted() {
      // window.open('http://192.168.1.110/')
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
