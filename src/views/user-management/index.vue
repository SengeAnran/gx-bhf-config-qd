<template>
  <div class="container">
    <BaseBlock title="用户管理" :verticalLine="true"/>
    <top-search
      @add="add"
      @search="search"
      @reset="reset"
      @del="del"
      placeholder="请输入用户名"
      :delShow="!selectList.length>0"
    ></top-search>
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
          <span>************</span>
        </template>
      </el-table-column>
      <el-table-column slot="action" label="操作" align="center" width="200px">
        <template slot-scope="scope">
          <el-tooltip content="修改" placement="top">
            <img
              src="@/assets/button/edit.png"
              @click="update(scope.row,scope.$index)"
              class="myButton"
            >
          </el-tooltip>
          <el-tooltip content="删除" placement="top">
            <img
              src="@/assets/button/del.png"
              @click="handelDelete(scope.row,scope.$index)"
              class="myButton"
            >
          </el-tooltip>
        </template>
      </el-table-column>
    </BaseTable>
    <add-update ref="addupdate" @getData="getData"></add-update>
  </div>
</template>
<script>
import AddUpdate from "./components/add-update";
import { userListApi, delListApi } from "@/api/system/user";
export default {
  name: "UserManagement",
  components: {
    AddUpdate
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
        { prop: "nickName", label: "用户ID", width: "", align: "center" },
        { prop: "userName", label: "用户名", width: "", align: "center" },
        {
          prop: "password",
          label: "密码",
          width: "",
          align: "center",
          slot: "password"
        },
        { prop: "remark", label: "角色", width: "", align: "center" },
        { slot: "action" } //操作
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
      userListApi(temp)
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
    }
  }
};
</script>
