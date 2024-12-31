<template>
  <BaseDialog
    append-to-body
    :title="title"
    custom-class="export-dialog"
    :close-on-click-modal="false"
    :visible.sync="visible"
    width="800px"
  >
    <template #default>
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
      </BaseTable>
    </template>
    <template #footer>
      <el-button type="info" icon="el-icon-circle-close" @click="visible=false">取消</el-button>
      <el-button type="primary" icon="el-icon-circle-check" @click="onSure">确定</el-button>
    </template>
  </BaseDialog>
</template>

<script>
import { addApi, searchListApi } from '@/api/system/importPoint'
export default {
  data() {
    return {
      visible: false,
      title: "搜索在线设备",
      formData: {},
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
      searchListApi(temp)
        .then(res => {
          if (res.code === 200) {
            this.tableData = res.rows;
            this.pagination.total = res.total;
            this.loading = false;
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
    //checkbox选择
    changeSelection(data) {
      this.selectList = data;
    },

    init() {
      this.visible = true;
      this.getData();
    },
    //确认
    onSure() {
      this.$refs.formRule.validate(valid => {
        if (valid) {
          // const data = {
          //   dev_id: this.selectList.map(i => i.id),
          // }
          addApi(this.selectList).then(res => {
            if (res.code === 200) {
              this.$message.success("操作成功!");
              this.visible = false;
              this.$emit("getData");
            }
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

