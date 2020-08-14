<!--
Template Name: 权限组
Create author: qinglong
Create Time  : 2020-07-28
-->
<template>
  <div>
    <div class="content-wrap">
      <el-card class="left">
        <div slot="header"> 权限组 </div>
        <el-scrollbar style="height:100%">
          <div class="el-list">
            <div v-for="item in list" :key="item.id" @click="nodeClick(item)" :class="{active:group && item.id == group.id ,'el-item':true}">
              <span user="role">{{item.title}}</span>
              <span>
                <el-tooltip class="icon" effect="dark" content="添加成员" placement="top">
                  <i class="el-icon-plus"></i>
                </el-tooltip>
              </span>
            </div>
          </div>
        </el-scrollbar>
      </el-card>
      <el-card class="right">
        <div slot="header"> 成员列表 </div>
        <mixSearch v-model="search" :fields="searchFields" />
        <div class="right-content">
          <div>
            <mixTable v-model="roleLeft" :fields="roleLeftFields" />
            <el-pagination background layout="prev, pager, next" :page-size="page.left.limit" :total="page.left.total" :current-page.sync="page.left.page" />
          </div>
          <div>
            <mixTable v-model="roleRight" :fields="roleRightFields" />
            <el-pagination background layout="prev, pager, next" :page-size="page.left.limit" :total="page.left.total" :current-page.sync="page.left.page" />
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  name: "Adminroles",
  data() {
    return {
      list: [],
      key: "",
      group: null,
      roleLeft: [],
      roleRight: [],
      roleLeftFields: [
        { label: "花名", prop: "nickname" },
        { label: "部门", prop: "dept" },
        {
          label: "操作",
          type: "button",
          width: 125,
          options: [
            {
              style: "success",
              label: "加入当前组",
              click: this.move,
              role: 106
            }
          ]
        }
      ],
      roleRightFields: [
        { label: "花名", prop: "nickname" },
        { label: "部门", prop: "dept" },
        {
          label: "操作",
          type: "button",
          width: 125,
          options: [
            {
              style: "danger",
              label: "移除组",
              click: this.remove,
              role: 107
            }
          ]
        }
      ],
      search: {},
      searchFields: [
        {
          label: "花名",
          prop: "nickname",
          type: "text",
          span: 5
        },
        // {
        //   label: "手机号",
        //   prop: "mobile",
        //   type: "number",
        //   span: 5
        // },
        {
          type: "button",
          label: "搜索",
          span: 5,
          click: this.search
        }
      ],
      page: {
        left: { page: 1, limit: 10, total: 0 },
        right: { page: 1, limit: 10, total: 0 }
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async nodeClick(val) {
      this.left(val);
      this.right(val);
      this.group = val;
    },
    async left(val) {
      //  获取未分配用户
      let { data } = await this.axios("/adminapi/Authgroupaccess/not", {
        params: this.page.left,
        data: { id: val.id }
      });
      if (data.code) {
        this.roleLeft = data.data;
        this.page.right.total = data.count;
      }
    },
    async right(val) {
      // 点击角色组，获取当前组用户
      let { data } = await this.axios("/adminapi/Authgroupaccess/already", {
        params: this.page.right,
        data: { id: val.id }
      });
      if (data.code) {
        this.roleRight = data.data;
        this.page.right.total = data.count;
      }
    },
    async move(item) {
      await this.axios("/adminapi/Authgroupaccess/move", {
        data: { uid: item.id, group_id: this.group.id }
      });
      this.nodeClick(this.group);
    },
    async remove(item) {
      await this.axios("/adminapi/Authgroupaccess/remove", {
        data: { uid: item.id, group_id: this.group.id }
      });
      this.nodeClick(this.group);
    },
    async getData() {
      // 获取权限组
      let { data } = await this.axios("/adminapi/Authgroupaccess/list");
      if (data.code) {
        this.list = data.data;
      }
    }
  }
};
</script>
<style lang='less' scoped>
.content-wrap {
  display: grid;
  grid-template-columns: minmax(300px, 21%) auto;
  grid-gap: 1%;
  .el-list {
    .el-item {
      line-height: 40px;
      height: 40px;
      display: flex;
      justify-content: space-between;

      .icon {
        margin: 0 10px;
        cursor: pointer;
      }
    }
  }
  .right-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: calc(100% - 80px);
    > div {
      flex: 1 1 50%;
      height: 100%;
      overflow: hidden;
    }
  }
  .el-pagination {
    position: absolute;
  }
}
</style>