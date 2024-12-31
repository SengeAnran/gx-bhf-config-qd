<template>
  <div class="container">
    <div class="left">
      <img src alt>
      <h1 class="left-plat">BHF配置管理平台</h1>
    </div>
    <div class="right">
      <nav-time></nav-time>
      <div class="right-setting el-icon-setting">账户设置</div>
      <div class="right-logout">
        <img src="@/assets/images/logout.png" alt @click="logout">
        <span>退出登录</span>
      </div>
    </div>
  </div>
</template>
<script>
import NavTime from "../NavTime";
export default {
  components: {
    NavTime
  },

  methods: {
    logout() {
      this.$BConfirm({
        message: `是否确认退出登录？`
      }).then(async bool => {
        if (bool) {
          await this.$store.dispatch("LogOut");
          this.$router.push(`/login?redirect=${this.$route.fullPath}`);
        }
      });
    }
  }
};
</script>



<style lang="scss" scoped>
.container {
  padding: 10px 20px;
  background: url("~@/assets/images/top_bg.png") no-repeat;
  background-size: 100% 100%;
  color: white;
  display: flex;
  justify-content: space-between;
  // align-items: center;

  .left {
    &-plat {
      // font-size: 22px;
      // font-weight: bold;
    }
  }
  .right {
    display: flex;
    align-items: center;
    &-setting {
      margin-right: 20px;
      cursor: pointer;
    }
    &-logout {
      display: inline-block;
      vertical-align: middle;
      img {
        vertical-align: middle;
        margin-right: 10px;
        cursor: pointer;
      }
      span {
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
}
</style>
