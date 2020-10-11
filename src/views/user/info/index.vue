<!--
Template Name: 个人中心
Create author: qinglong
Create Time  : 2020-08-12
-->
<template>
  <div class="content">
    <el-scrollbar>
      <el-card header="头像修改" v-if="!isShow||isShow.type =='avatar'">
        <div style="text-align:center;cursor: pointer" @click="$refs.file.click()" title="点击修改">
          <el-avatar :size="300" :src="formData.pic"></el-avatar>
        </div>
        <div>
          <div style="text-align:center">
            <input type="file" :key="formData.pic" v-show="false" ref="file" @change="upload">
          </div>
          <!-- <div style="border-top:1px solid #ccc;margin-top:20px;padding-top:20px">
            <div class="item">
              <span style="display:inline-block;width:60px">花名： </span>
              {{$store.state.userinfo.nickname}}
            </div>
            <div class="item">
              <span style="display:inline-block;width:60px">部门：</span>
              {{$store.state.userinfo.dept}} - {{$store.state.userinfo.dept_id}}
            </div>
          </div> -->
          <el-dialog :visible.sync="show">
            <div style="display:flex;justify-content:space-between">
              <div style="width:400px;height:400px;border:1px solid #eee">
                <mixCover v-model="coverImg" :img="img" ref="cover" />
              </div>
              <div style="width:400px;height:400px;border:1px solid #eee;display:flex;justify-content:center;align-items:center" v-html="coverImg.html">

              </div>
            </div>
            <div style="text-align:center;padding-top:40px">
              <el-button @click="$refs.cover.sacle(true)" type="warning">顺时针</el-button>
              <el-button @click="$refs.cover.sacle(false)" type="warning">逆时针</el-button>
              <el-button @click="saveImage" type="danger">保存头像</el-button>
            </div>
          </el-dialog>
        </div>
      </el-card>
      <el-card header="资料修改" v-if="!isShow||isShow.type =='info'">

        <div style="height:100%">
          <el-scrollbar>
            <mixForm v-model="formData" :fields="formFields" />
          </el-scrollbar>
        </div>
      </el-card>
      <el-card header="修改密码" v-if="!isShow||isShow.type =='password'">
        <div style="height:100%">
          <el-scrollbar>
            <mixForm v-model="passwordData" :fields="passwordFields" />
          </el-scrollbar>
        </div>
      </el-card>
    </el-scrollbar>
  </div>
</template>
<script>
export default {
  name: "Userinfo",
  props: {
    isShow: null
  },
  data() {
    return {
      formFields: [
        {
          labelWidth: 90,
          label: "真实姓名",
          type: "text",
          prop: "real",
          readonly: true
        },
        {
          labelWidth: 90,
          label: "身份证号码",
          type: "text",
          prop: "card",
          readonly: true
        },
        { labelWidth: 90, label: "微信", type: "text", prop: "weixin" },
        { labelWidth: 90, label: "QQ号", type: "number", prop: "qq" },
        { labelWidth: 90, label: "生日", type: "date", prop: "birthday" },
        {
          labelWidth: 90,
          label: "情感状态",
          type: "select",
          prop: "feeling",
          options: [
            { label: "已婚", value: "已婚" },
            { label: "单身", value: "单身" },
            { label: "热恋中", value: "热恋中" }
          ]
        },
        { labelWidth: 90, label: "现住址", type: "text", prop: "address" },
        {
          span: 12,
          label: "保存资料",
          type: "button",
          click: this.onSave
        }
      ],
      formData: this.$store.state.userinfo,
      passwordFields: [
        {
          label: "旧密码",
          type: "password",
          prop: "oldPassword",
          rule: {
            required: true,
            message: "请填写旧密码"
          }
        },

        {
          label: "新密码",
          type: "password",
          prop: "password",
          rule: {
            required: true,
            message: "请填写新密码"
          }
        },
        {
          label: "确认密码",
          type: "password",
          prop: "repassword",
          rule: {
            required: true,
            message: "请再次输入新密码"
          }
        },
        {
          span: 12,
          label: "确认修改",
          type: "button",
          click: this.changePassword
        }
      ],
      passwordData: {},
      img: null,
      show: false,
      coverImg: ""
    };
  },
  methods: {
    upload(e) {
      this.img = e.target.files[0];
      this.show = true;
    },
    async saveImage() {
      var arr = this.coverImg.base64.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      let file = new File([u8arr], "filename.png", { type: mime });
      let obj = new FormData();
      obj.append("files", file);
      let { data } = await this.axios("/adminapi/Publics/uploadsImage", {
        data: obj
      });
      if (data.code) {
        let { data: res } = await this.axios("/adminapi/User/portrait", {
          data: { pic: data.data, id: this.$store.state.userinfo.id }
        });
        if (res.code) {
          this.$store.state.userinfo.pic = data.data;
          this.formData.pic = data.data;
          this.$store.commit("setUserinfo", this.$store.state.userinfo);
          this.show = false;
        }
      }
    },

    async onSave() {
      let data = {};
      for (let k of this.formFields) {
        data[k.prop] = this.formData[k.prop];
      }
      await this.axios("/adminapi/user/information_edit", {
        data
      });
    },

    async changePassword() {
      await this.axios("/adminapi/user/password_edit", {
        data: { ...this.passwordData, uid: this.$store.state.userinfo.id }
      });
      this.passwordData = {};
    }
  }
};
</script>
<style lang='less' scoped>
.el-card {
  margin-bottom: 20px;
}
</style>