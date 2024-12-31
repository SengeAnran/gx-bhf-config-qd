<template>
  <el-container>
    <el-header>
      <Header></Header>
    </el-header>
    <el-container style="height:calc(100% - 90px)">
      <el-aside style="width:250px">
        <!-- background-color="#545c64" -->
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          @select="handleSelect"
          background-color="rgb(15,46,77)"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
          collapse-transition
          unique-opened
        >
          <template v-if="isManager">
            <el-menu-item index="/layout/home">
              <i class="el-icon-s-home"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="/layout/user-management">
              <i class="el-icon-user"></i>
              <span slot="title">用户管理</span>
            </el-menu-item>
            <!--<el-menu-item index="/layout/ai-card-management">
              <i class="el-icon-postcard"></i>
              <span slot="title">AI板卡管理</span>
            </el-menu-item>-->
            <el-menu-item index="/layout/data-source-management">
              <i class="el-icon-postcard"></i>
              <span slot="title">数据源分组管理</span>
            </el-menu-item>
            <el-menu-item index="/layout/model-management">
              <i class="el-icon-set-up"></i>
              <span slot="title">模型库管理</span>
            </el-menu-item>
            <!--<el-menu-item index="/layout/scene-management">
              <i class="el-icon-office-building"></i>
              <span slot="title">场景管理</span>
            </el-menu-item>-->
            <el-submenu index="massage-push" >
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span >消息推送</span>
              </template>
              <el-menu-item index="/layout/mqtt-config">
                <i class="el-icon-setting"></i>
                <span slot="title">MQTT配置</span>
              </el-menu-item>
              <el-menu-item index="/layout/http-config">
                <i class="el-icon-setting"></i>
                <span slot="title">HTTP配置</span>
              </el-menu-item>
              <el-menu-item index="/layout/kafka-config">
                <i class="el-icon-setting"></i>
                <span slot="title">KAFKA配置</span>
              </el-menu-item>
            </el-submenu>

            <el-menu-item index="/layout/alarm-log">
              <i class="el-icon-document"></i>
              <span slot="title">告警日志</span>
            </el-menu-item>
            <el-menu-item index="/layout/video-capture">
              <i class="el-icon-camera"></i>
              <span slot="title">视频采集卡</span>
            </el-menu-item>
            <el-menu-item index="/layout/video-storage">
              <i class="el-icon-files"></i>
              <span slot="title">NVR视频存储</span>
            </el-menu-item>
            <el-menu-item index="/layout/video-splicing">
              <i class="el-icon-video-camera"></i>
              <span slot="title">RMG300视频拼接</span>
            </el-menu-item>
            <el-menu-item index="/layout/import-point">
              <i class="el-icon-video-camera"></i>
              <span slot="title">导入监控点</span>
            </el-menu-item>
            <el-menu-item index="/layout/decode-card-management">
              <i class="el-icon-postcard"></i>
              <span slot="title">解码卡管理</span>
            </el-menu-item>
            <el-menu-item index="/layout/network-set">
              <i class="el-icon-postcard"></i>
              <span slot="title">网络设置</span>
            </el-menu-item>
<!--            <el-menu-item index="/layout/video-dispatch">-->
<!--              <i class="el-icon-files"></i>-->
<!--              <span slot="title">视频信息系统调度</span>-->
<!--            </el-menu-item>-->
<!--            <el-menu-item index="/layout/video-forwarding">-->
<!--              <i class="el-icon-video-camera"></i>-->
<!--              <span slot="title">视频合成转发功能</span>-->
<!--            </el-menu-item>-->
          </template>
          <template v-if="isCommon">
            <!--<el-menu-item index="/layout/ai-card-management">
              <i class="el-icon-postcard"></i>
              <span slot="title">AI板卡管理</span>
            </el-menu-item>-->
            <el-menu-item index="/layout/data-source-management">
              <i class="el-icon-postcard"></i>
              <span slot="title">数据源分组管理</span>
            </el-menu-item>
            <el-menu-item index="/layout/model-management">
              <i class="el-icon-set-up"></i>
              <span slot="title">模型库管理</span>
            </el-menu-item>
            <!--<el-menu-item index="/layout/scene-management">
              <i class="el-icon-office-building"></i>
              <span slot="title">场景管理</span>
            </el-menu-item>-->
            <el-submenu >
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span >消息推送</span>
              </template>
              <el-menu-item index="/layout/mqtt-config">
                <i class="el-icon-setting"></i>
                <span slot="title">MQTT配置</span>
              </el-menu-item>
              <el-menu-item index="/layout/http-config">
                <i class="el-icon-setting"></i>
                <span slot="title">HTTP配置</span>
              </el-menu-item>
            </el-submenu>

            <el-menu-item index="/layout/alarm-log">
              <i class="el-icon-document"></i>
              <span slot="title">告警日志</span>
            </el-menu-item>
            <el-menu-item index="/layout/video-capture">
              <i class="el-icon-camera"></i>
              <span slot="title">视频采集卡</span>
            </el-menu-item>
            <el-menu-item index="/layout/video-storage">
              <i class="el-icon-files"></i>
              <span slot="title">NVR视频存储</span>
            </el-menu-item>
            <el-menu-item index="/layout/video-splicing">
              <i class="el-icon-video-camera"></i>
              <span slot="title">RMG300视频拼接</span>
            </el-menu-item>
            <!--<el-menu-item index="/layout/video-dispatch">
              <i class="el-icon-files"></i>
              <span slot="title">视频信息系统调度</span>
            </el-menu-item>
            <el-menu-item index="/layout/video-forwarding">
              <i class="el-icon-video-camera"></i>
              <span slot="title">视频合成转发功能</span>
            </el-menu-item>-->
          </template>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Header from "./components/Header";
import { mapGetters } from 'vuex';
export default {
  components: {
    Header
  },
  data() {
    return {
      pathList: []
    };
  },
  computed: {
    ...mapGetters(['isManager', 'isCommon']),
  },
  methods: {
    handleSelect(key, keyPath) {
      // console.log(11, key, keyPath);
      this.pathList.push(key);
      //    this.$BConfirm({
      //   message: `是否退出登录？`
      // })
    },
    handleOpen(key, keyPath) {
      // console.log(22, key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(33, key, keyPath);
    }
  }
};
</script>

<style lang="scss" scoped>
.el-container {
  height: 100%;
  .el-header {
    height: 90px !important;
    padding: 0;
  }
  .el-aside {
    height: 100%;
    background: #fff;
    padding: 0;
    .el-menu {
      height: 100%;
      .is-active {
        background: none !important;
      }
      .el-menu-item {
        font-size: 15px;

        &:hover {
          background-color: rgba(14, 27, 44) !important;
        }
      }
    }
  }
  .el-main {
    height: 100%;
  }
}
</style>

