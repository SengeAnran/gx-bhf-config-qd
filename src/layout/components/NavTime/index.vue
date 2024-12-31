<template>
  <div class="nav-time">
    <div class="time mr-20">{{ time }}</div>
    <div class="day">
      <div>星期{{ day }}</div>
      <div>{{ date }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavTime",
  data() {
    return {
      date: "",
      time: "",
      day: "",
      diff: 500,
      timer: null
    };
  },
  mounted() {
    this.initTime();
  },
  beforeDestroy() {
    this.timer && clearTimeout(this.timer);
  },
  methods: {
    initTime() {
      this.date = this.moment().format("YYYY-MM-DD");
      this.time = this.moment().format("HH:mm:ss");
      this.day = ["日", "一", "二", "三", "四", "五", "六"][
        this.moment().format("d")
      ];

      this.timer = setTimeout(this.initTime, this.diff);
    }
  }
};
</script>

<style lang="scss" scoped>
.nav-time {
  height: 32px;
  border-left: 2px solid #8990a1;
  display: flex;
  align-items: center;
  padding-left: 20px;
  font-size: 24px;
  //   font-family: din;
  color: #f4c86a;
  letter-spacing: 2px;
  font-weight: 700;
  .day {
    color: #ffffff;
    font-size: 12px;
    margin: 0 10px;
  }
}
</style>
