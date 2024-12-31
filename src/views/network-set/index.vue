<template>
  <div class="container">
    <BaseBlock title="网络设置" :verticalLine="true"/>
    <form-info ref="formInfo"></form-info>
  </div>
</template>
<script>
import FormInfo from "./components/form-info";

export default {
  name: "AlarmLog",
  components: {
    FormInfo
  },
  data() {
    return {

    };
  },

};
</script>


<style lang="scss" scoped>

</style>
