<template>
  <el-drawer title="查看全部报警记录" :visible.sync="drawer" :with-header="false" size="35%">
    <BaseTable
      style="height:calc(100% - 40px)"
      v-loading="loading"
      :tableDate="tableData"
      rowKeyId="id"
      :pagination="pagination"
      :columns="columns"
      :boder="false"
      @getData="getData"
    >
      <el-table-column slot="action" label="操作" align="center">
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
    <add-update ref="AddUpdate"></add-update>
  </el-drawer>
</template>

<script>
import AddUpdate from "@/views/alarm-log/components/add-update";

export default {
  components: {
    AddUpdate
  },
  data() {
    return {
      drawer: false,
      loading: false,
      tableData: [{ name: 1 }],
      dictList: {},
      pagination: {
        current: 1,
        size: 10,
        total: 20
      },
      columns: [
        { prop: "name", label: "报警时间", width: "", align: "center" },
        { prop: "img", label: "场景", width: "", align: "center" },
        { prop: "major", label: "内容", width: "", align: "center" },
        { slot: "action" } //操作
      ]
    };
  },
  methods: {
    init() {
      this.drawer = true;
    },
    //
    getData() {},
    details() {
      this.$refs.AddUpdate.init();
    }
  }
};
</script>

