<template>
  <div class="container">
    <BaseBlock title="告警日志" :verticalLine="true"/>
    <div class="head">
      <el-row>
        <el-col :span="24" class="col">
          <div>
            <el-button type="danger" icon="el-icon-delete">删除</el-button>
          </div>
          <div>
            <el-form ref="form" :model="formData" label-width="100px" :inline="true">
              <el-form-item label="时间：">
                <el-date-picker
                  style="width:370px"
                  v-model="formData.timeDate"
                  type="datetimerange"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="告警等级：">
                <el-select v-model="formData.region" placeholder="请选择" style="width:150px">
                  <el-option label="等级一" value="shanghai"></el-option>
                  <el-option label="等级二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="场景：">
                <el-select v-model="formData.region" placeholder="请选择" style="width:150px">
                  <el-option label="场景一" value="shanghai"></el-option>
                  <el-option label="场景二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="板卡：">
                <el-select v-model="formData.region" placeholder="请选择" style="width:150px">
                  <el-option label="板卡一" value="shanghai"></el-option>
                  <el-option label="板卡二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-button type="primary" icon="el-icon-search">搜索</el-button>
              <el-button type="info" icon="el-icon-refresh">重置</el-button>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </div>

    <BaseTable
      style="height: calc(100% - 140px);"
      v-loading="loading"
      :tableDate="tableData"
      rowKeyId="id"
      :pagination="pagination"
      :columns="columns"
      :boder="false"
      @getData="getData"
    >
      <el-table-column slot="action" label="操作" align="center" width="200px">
        <template slot-scope="scope">
          <el-tooltip content="详情" placement="top">
            <img
              src="@/assets/button/threshold.png"
              @click="details(scope.row,scope.$index)"
              class="myButton"
            >
          </el-tooltip>
        </template>
      </el-table-column>
    </BaseTable>
    <add-update ref="addupdate"></add-update>
  </div>
</template>
<script>
import AddUpdate from "./components/add-update";
export default {
  name: "AlarmLog",
  components: {
    AddUpdate
  },
  data() {
    return {
      formData: {},
      loading: false,
      tableData: [],
      dictList: {},
      pagination: {
        current: 1,
        size: 10,
        total: 0
      },
      columns: [
        { selection: true, align: "center" },
        { prop: "name", label: "告警时间", width: "", align: "center" },
        { prop: "img", label: "内容", width: "", align: "center" },
        { prop: "major", label: "等级", width: "", align: "center" },
        { prop: "major", label: "场景", width: "", align: "center" },
        { prop: "major", label: "关联设备", width: "", align: "center" },
        { slot: "action" } //操作
      ]
    };
  },
  methods: {
    //表格数据
    getData() {},
    //详情
    details() {
      this.$refs.addupdate.init();
    }
  }
};
</script>


<style lang="scss" scoped>
.col {
  display: flex;
  justify-content: space-between;
}
.head {
  margin: 25px 0 3px 0;
}
</style>
