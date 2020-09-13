<!--
Template Name: 数据分析
Create author: qinglong
Create Time  : 2020-09-13
-->
<template>
  <el-scrollbar>
    <div class="content">
      <mixSearch v-model="searchData" :fields="searchFields" />
      <el-tabs v-model="searchData.type" @tab-click="handleClick">
        <el-tab-pane label="总成交额" name="1" />
        <el-tab-pane label="总转入量" name="2" />
        <el-tab-pane label="总成交数" name="3" />
      </el-tabs>
      <div style="height:300px">
        <ve-line :data="echartData.data" height="100%" :loading="loading" :settings="echartData.settings" />
      </div>
      <div style="height:350px">
        <mixTable v-model="echartData.interval" :fields="tableFields" />
      </div>
    </div>
  </el-scrollbar>

</template>
<script>
export default {
  name: "Dataindex",
  data() {
    return {
      echartData: {
        settings: {
          area: true
        },
        data: null,
        interval: null
      },
      loading: false,
      tableFields: [],
      searchData: {
        type: "1"
      },
      searchFields: [
        { span: 6, label: "选择", type: "daterange", prop: "date" },
        // { span: 3, label: "选择部门", type: "cascader", prop: "dept" },
        { span: 3, label: "查看数据", type: "button", click: this.getData }
      ],
      mockData: [
        {
          date_time: "2020-08-01",
          总销售额: 42968,
          总转入量: 831,
          总成交数: 31,
          总转化率: "3.73"
        },
        {
          date_time: "2020-08-02",
          总销售额: 52715,
          总转入量: 1096,
          总成交数: 34,
          总转化率: "3.10"
        },
        {
          date_time: "2020-08-03",
          总销售额: 64414,
          总转入量: 1618,
          总成交数: 34,
          总转化率: "2.10"
        },
        {
          date_time: "2020-08-04",
          总销售额: 54090,
          总转入量: 1527,
          总成交数: 47,
          总转化率: "3.08"
        },
        {
          date_time: "2020-08-05",
          总销售额: 82151.5,
          总转入量: 1917,
          总成交数: 67,
          总转化率: "3.50"
        },
        {
          date_time: "2020-08-06",
          总销售额: 83451,
          总转入量: 1332,
          总成交数: 52,
          总转化率: "3.90"
        },
        {
          date_time: "2020-08-07",
          总销售额: 68039,
          总转入量: 1898,
          总成交数: 56,
          总转化率: "2.95"
        },
        {
          date_time: "2020-08-08",
          总销售额: 69771,
          总转入量: 1155,
          总成交数: 54,
          总转化率: "4.68"
        },
        {
          date_time: "2020-08-09",
          总销售额: 53838,
          总转入量: 918,
          总成交数: 31,
          总转化率: "3.38"
        },
        {
          date_time: "2020-08-10",
          总销售额: 82476.8,
          总转入量: 1628,
          总成交数: 52,
          总转化率: "3.19"
        },
        {
          date_time: "2020-08-11",
          总销售额: 63781,
          总转入量: 1470,
          总成交数: 43,
          总转化率: "2.93"
        },
        {
          date_time: "2020-08-12",
          总销售额: 55446,
          总转入量: 1469,
          总成交数: 36,
          总转化率: "2.45"
        },
        {
          date_time: "2020-08-13",
          总销售额: 51352,
          总转入量: 1112,
          总成交数: 35,
          总转化率: "3.15"
        },
        {
          date_time: "2020-08-14",
          总销售额: 69274,
          总转入量: 1277,
          总成交数: 47,
          总转化率: "3.68"
        },
        {
          date_time: "2020-08-15",
          总销售额: 69350,
          总转入量: 950,
          总成交数: 28,
          总转化率: "2.95"
        },
        {
          date_time: "2020-08-16",
          总销售额: 68566,
          总转入量: 1213,
          总成交数: 30,
          总转化率: "2.47"
        },
        {
          date_time: "2020-08-17",
          总销售额: 49937,
          总转入量: 1321,
          总成交数: 38,
          总转化率: "2.88"
        },
        {
          date_time: "2020-08-18",
          总销售额: 64932,
          总转入量: 1130,
          总成交数: 34,
          总转化率: "3.01"
        },
        {
          date_time: "2020-08-19",
          总销售额: 60757,
          总转入量: 1431,
          总成交数: 41,
          总转化率: "2.87"
        },
        {
          date_time: "2020-08-20",
          总销售额: 54682.2,
          总转入量: 560,
          总成交数: 31,
          总转化率: "5.54"
        },
        {
          date_time: "2020-08-21",
          总销售额: 55056,
          总转入量: 647,
          总成交数: 33,
          总转化率: "5.10"
        },
        {
          date_time: "2020-08-22",
          总销售额: 50778,
          总转入量: 1076,
          总成交数: 34,
          总转化率: "3.16"
        },
        {
          date_time: "2020-08-23",
          总销售额: 60970,
          总转入量: 981,
          总成交数: 35,
          总转化率: "3.57"
        },
        {
          date_time: "2020-08-24",
          总销售额: 67756,
          总转入量: 1243,
          总成交数: 42,
          总转化率: "3.38"
        },
        {
          date_time: "2020-08-25",
          总销售额: 75533,
          总转入量: 1295,
          总成交数: 55,
          总转化率: "4.25"
        },
        {
          date_time: "2020-08-26",
          总销售额: 85578,
          总转入量: 1485,
          总成交数: 55,
          总转化率: "3.70"
        },
        {
          date_time: "2020-08-27",
          总销售额: 76579.9,
          总转入量: 1559,
          总成交数: 53,
          总转化率: "3.40"
        },
        {
          date_time: "2020-08-28",
          总销售额: 87837.3,
          总转入量: 1591,
          总成交数: 63,
          总转化率: "3.96"
        },
        {
          date_time: "2020-08-29",
          总销售额: 73446,
          总转入量: 984,
          总成交数: 40,
          总转化率: "4.07"
        },
        {
          date_time: "2020-08-30",
          总销售额: 20508,
          总转入量: 353,
          总成交数: 11,
          总转化率: "3.12"
        },
        {
          date_time: "2020-08-31",
          总销售额: 0,
          总转入量: 1,
          总成交数: 0,
          总转化率: "0.00"
        }
      ]
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      this.loading = true;
      let { data } = await this.axios("/adminapi/Analysis/list", {
        data: this.searchData
      });
      if (data.code) {
        this.$set(this.echartData, "data", {
          columns: Object.keys(data.data.day[0]),
          rows: data.data.day
        });
        this.$set(this.echartData, "interval", data.data.interval);
        this.tableFields = Object.keys(data.data.interval[0]).map(e => {
          return {
            label: e,
            prop: e
          };
        });
      }
      this.loading = false;
    },
    handleClick() {
      this.getData();
    }
  }
};
</script>
<style lang='less' scoped>
</style>