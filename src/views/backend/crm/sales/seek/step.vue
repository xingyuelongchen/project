<!--
Template Name: 步骤
Create author: qinglong
Create Time  : 2020-08-26
-->
<template>
  <div class="content-wrap">
    <el-card>
      <div slot="header">
        <el-button style="padding:6px ;float:right" type="success" @click="deal" v-if="!isDeal">已成交</el-button>
        <el-page-header @back="$emit('input',false)" content="服务进度">
        </el-page-header>
      </div>
      <div class="step-box">
        <div v-if="isDeal" class="deal step-top"> 已完结 </div>
        <div v-else class="init step-top">
          <el-steps :space="200" :active="stepData.progress-1" finish-status="success" class="steps" align-center>
            <template v-for="(item,index) in stepList">
              <!-- <el-step :title="item.label" :key="index" @click.native="stepClick(item,index)"></el-step> -->
              <el-step :title="item.label" :key="index"></el-step>
            </template>
          </el-steps>
          <mixForm v-model="stepData" :fields="stepFields" />
        </div>
        <div class="step-bottom" v-if="label_list.length">
          <el-scrollbar>
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

                    <div class="remak">
                      <span>备注信息：</span>
                      {{item.remak}}
                    </div>
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
      progress: [],
      isDeal: false
    };
  },
  async created() {
    this.stepData = this.item;
    this.init();
  },

  methods: {
    async init() {
      let { data } = await this.axios("/adminapi/Salecustomer/customer_label", {
        data: this.stepData
      });
      if (data.code) {
        this.label_list = data.data.label_list;
        this.stepList = data.data.label[0].children;
        this.isDeal = data.data.end;
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
      if (item.children) this.stepData.label_2 = item.children[0].id;
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
      if (obj && obj[0]) this.stepData.pro = obj[0].label;
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
    },
    async deal() {
      let { data } = await this.axios("/adminapi/", {
        data: { ...this.stepData, ...this.item }
      });
      if (data.code) this.isDeal = true;
      this.getData();
    }
  }
};
</script>
<style lang='less' scoped>
.content-wrap {
  height: 100%;
  .el-card {
    height: 100%;
    .step-box {
      height: 100%;
      overflow: hidden;
      display: flex;
      justify-content: flex-start;
      flex-direction: column;
      /deep/ .el-step {
        cursor: pointer;
      }
      .step-top {
        border: 1px solid #e1e1e1;
        overflow: hidden;
        margin-bottom: 20px;
      }
      .init {
        height: 320px;
        min-height: 320px;
        max-height: 320px;
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
      .deal {
        height: 60px;
        min-height: 60px;
        max-height: 60px;
        border: 1px dashed #bbb;
        margin-bottom: 20px;
        line-height: 60px;
        text-align: center;
        font-size: 22px;
        font-weight: bold;
      }
      .step-bottom {
        border: 1px solid #eee;
        flex: auto;
        overflow: hidden;
        .el-timeline {
          padding: 20px;
          .remak {
            padding: 20px 15px;
            border: 1px dashed #ccc;
            border-radius: 10px;
            margin: 0 -15px;
            transition: all 0.2s;
            &:hover {
              border-color: #999;
              transition: all 0.2s;
            }
            span {
              font-size: 14px;
              font-weight: bold;
              padding-bottom: 20px;
            }
          }
        }
      }
    }
  }
}
</style>