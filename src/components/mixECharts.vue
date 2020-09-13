<!--
Template Name: 数据管理
Create author: qinglong
Create Time  : 2020-07-28
-->
<template>
  <div class="content"> 
    <div ref="echarts"></div>
  </div>
</template>
<script>
import ECharts from "echarts";
export default {
  name: "Dataindex",
  data() {
    return {};
  },
  props: {
    value: Object
  },
  mounted() {
    this.echart = ECharts.init(this.$refs["echarts"]);
    if (this.value.data) this.init();
  },
  methods: {
    init() {
      console.log(this.value.data);
      this.echart.setOption({
        legend: {},
        tooltip: {},
        dataset: {
          source: this.value.data
        },
        xAxis: { type: "category" },
        yAxis: {},
        series: [{ type: "line" }]
      });
    }
  }
};
</script>
 