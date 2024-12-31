<template>
  <div class="container">
    <BaseBlock title="导入监控点" :verticalLine="true"/>
    <top-search
      @add="add"
      @search="search"
      @reset="reset"
      @del="del"
      addText="搜索在线设备"
      placeholder="请输入"
      :delShow="!selectList.length>0"
    >
      <template v-slot:action>
        <el-button @click="showAddOtherEqui">添加其他设备</el-button>
      </template>
    </top-search>
    <BaseTable
      style="height:calc(100% - 140px)"
      v-loading="loading"
      :tableDate="tableData"
      rowKeyId="id"
      :pagination="pagination"
      :columns="columns"
      :boder="false"
      @getData="getData"
      @changeSelection="changeSelection"
    >
      <el-table-column slot="password" label="密码" align="center">
        <template slot-scope="scope">
          <el-select v-model="scope.row.value" @change="val => changeSelect(val, scope.row.id)" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
      </el-table-column>
<!--      <el-table-column slot="action" label="操作" align="center" width="200px">-->
<!--        <template slot-scope="scope">-->
<!--          <el-tooltip content="修改分辨率" placement="top">-->
<!--            <img-->
<!--              src="@/assets/button/edit.png"-->
<!--              @click="update(scope.row,scope.$index)"-->
<!--              class="myButton"-->
<!--            >-->
<!--          </el-tooltip>-->
<!--&lt;!&ndash;          <el-tooltip content="删除" placement="top">&ndash;&gt;-->
<!--&lt;!&ndash;            <img&ndash;&gt;-->
<!--&lt;!&ndash;              src="@/assets/button/del.png"&ndash;&gt;-->
<!--&lt;!&ndash;              @click="handelDelete(scope.row,scope.$index)"&ndash;&gt;-->
<!--&lt;!&ndash;              class="myButton"&ndash;&gt;-->
<!--&lt;!&ndash;            >&ndash;&gt;-->
<!--&lt;!&ndash;          </el-tooltip>&ndash;&gt;-->
<!--        </template>-->
<!--      </el-table-column>-->
    </BaseTable>
    <add-update ref="addupdate" @getData="getData"></add-update>
    <addOtherEqui  @getData="getData" ref="addOtherEqui"></addOtherEqui>
  </div>
</template>
<script>
import AddUpdate from "./components/add-update";
import addOtherEqui from "./components/addOtherEqui";
import { listApi, delListApi } from "@/api/system/importPoint";
export default {
  name: "UserManagement",
  components: {
    AddUpdate,
    addOtherEqui
  },
  data() {
    return {
      loading: false,
      tableData: [],
      dictList: {},
      queryParams: "",
      selectList: [],
      pagination: {
        current: 1,
        size: 10,
        total: 0
      },
      columns: [
        { selection: true, align: "center" },
        { prop: "id", label: "ID", width: "", align: "center" },
        { prop: "ipaddr", label: "IP", width: "", align: "center" },
        { prop: "name", label: "名称", width: "", align: "center" },
        { prop: "user", label: "用户名", width: "", align: "center" },
        { prop: "passwd", label: "密码", width: "", align: "center" },
        // {
        //   prop: "password",
        //   label: "分变率",
        //   width: "",
        //   align: "center",
        //   slot: "password"
        // },
        // { prop: "版本", label: "角色", width: "", align: "center" },
        // { slot: "action" } //操作
      ],
      options: [
        {
          value: '1',
          label: '1920x1920p 60Hz'
        },
      ]
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    //表格数据
    getData() {
      this.loading = true;
      let temp = {
        pageNum: this.pagination.current,
        pageSize: this.pagination.size,
        userName: this.queryParams
      };
      listApi(temp)
        .then(res => {
          if (res.code == 200) {
            this.tableData = res.rows;
            this.pagination.total = res.total;
            this.loading = false;
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
    // 修改分辨率
    changeSelect(val, id) {
      console.log(val, id);
    },
    //搜索
    search(data) {
      console.log("data", data);
      this.pagination.current = 1;
      this.queryParams = data;
      this.getData();
    },
    //公共删除
    publicDel(ids) {
      this.$BConfirm({
        message: `是否确认删除？`
      }).then(bool => {
        if (bool) {
          delListApi(ids).then(res => {
            if (res.code == 200) {
              this.$message.success("删除成功！");
              this.getData();
            }
          });
        }
      });
    },
    //删除
    handelDelete(row) {
      this.publicDel([row.userId]);
    },

    //checkbox选择
    changeSelection(data) {
      this.selectList = data;
    },

    del() {
      let ids = this.selectList.map(item => item.userId);
      this.publicDel(ids);
    },
    //重置
    reset() {
      this.queryParams = "";
      this.getData();
    },

    //修改
    update(row) {
      this.$refs.addupdate.init(row);
    },

    add() {
      this.$refs.addupdate.init();
    },
    showAddOtherEqui() {
      this.$refs.addOtherEqui.init();
    }
  }
};
</script>
