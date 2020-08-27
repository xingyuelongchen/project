<!--
Template Name: 步骤
Create author: qinglong
Create Time  : 2020-08-26
-->
<template>
  <div class="content-wrap">
    <el-card>
      <div slot="header">
        <el-page-header @back="$emit('input',false)" content="服务进度">
        </el-page-header>
      </div>
      <div class="step">
        <el-scrollbar>
          <div class="init">
            <el-steps :space="200" :active="stepData.progress-1" finish-status="success" class="steps" align-center>
              <template v-for="(item,index) in stepList">
                <el-step :title="item.label" :key="index" @click.native="stepClick(item,index)"></el-step>
                <!-- <el-step :title="item.label" :key="index"></el-step> -->
              </template>
            </el-steps>
            <mixForm v-model="stepData" :fields="stepFields" />
          </div>
          <el-timeline>
            <template v-for="(item,index) in label_list">
              <el-timeline-item :key="index" :timestamp="item.create_time" placement="top">
                <el-card>
                  <h4>
                    <span v-if="item.label_2">
                      进度更新为
                      <el-tag type="parmary"> {{ item.label_2}} </el-tag>
                    </span>
                    <span v-if="item.label_3">
                      ，正在 <el-tag type="danger">{{item.label_3}}</el-tag> 状态
                    </span>
                  </h4>
                  <p>
                    <el-tag>{{item.uid}}</el-tag>
                    提交于 {{item.create_time}}
                  </p>
                </el-card>
              </el-timeline-item>
            </template>
          </el-timeline>
        </el-scrollbar>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "step",
  props: {
    item: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      stepList: [],
      stepData: { label_1: 0 },
      stepFields: [],
      label_list: [],
      progress: []
    };
  },
  async created() {
    this.stepData = this.item;
    this.init();
  },
  watch: {
    stepShow(a) {
      a && this.getData();
    }
  },
  methods: {
    async init() {
      let { data } = await this.axios("/adminapi/Salecustomer/customer_label", {
        data: this.stepData
      });
      if (data.code) {
        this.label_list = data.data.label_list;
        this.stepList = data.data.label[0].children;
        this.stepData = { ...this.stepData, ...data.data.label_log };
        if (data.data.label_log && data.data.label_log.progress) {
          this.stepData.progress = data.data.label_log.progress;
        } else {
          this.stepData.progress = 1;
        }
        let item = this.stepList.filter(
          e => e.progress == this.stepData.progress
        );
        this.stepClick(item[0]);
      }
    },
    async changeStep() {
      delete this.stepData.id;
      delete this.stepData.create_time;
      await this.axios("/adminapi/Salecustomer/label_add", {
        data: this.stepData
      });
      this.$emit("input", false);
    },
    stepClick(item) {
      this.stepData.progress = item.progress;
      this.stepData.label_1 = item.id;
      this.stepFields = [
        {
          label: "服务进度：",
          prop: "label_2",
          span: 24,
          type: "radio",
          options: item.children,
          change: this.changeServe
        },
        {
          label: "备注",
          prop: "remak",
          type: "textarea",
          span: 8,
          wrap: true
        },
        {
          label: "确定",
          type: "button",
          style: "primary",
          click: this.changeStep,
          span: 8,
          wrap: true
        }
      ];
    },
    changeServe(item) {
      let obj = item.options.filter(e => e.id == this.stepData["label_2"]);
      if (obj && obj[0] && obj[0].children && obj[0].children.length) {
        this.stepFields.splice(1, 0, {
          label: "当前状态",
          options: obj[0].children,
          type: "radio",
          prop: "label_3",
          span: 24,
          wrap: true
        });
      } else {
        this.stepFields = this.stepFields.filter(e => e.prop !== "label_3");
      }
    }
  }
};
</script>
<style lang='less' scoped>
.content-wrap {
  .el-card {
    height: 100%;
    .step {
      height: 100%;
      overflow: hidden;
      /deep/ .el-step {
        cursor: pointer;
      }
    }
    .init {
      border: 1px solid #e1e1e1;
      overflow: hidden;
      margin-bottom: 20px;
      .mix-form {
        background: rgba(0, 0, 0, 0.03);
        margin-bottom: 0;
        min-height: 82px;
      }
      .steps {
        display: flex;
        justify-content: center;
        margin: 20px 0;
      }
    }
    .el-timeline {
      border: 1px solid #eee;
      padding: 20px;
    }
  }
}
</style>