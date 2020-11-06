<!--
Template Name: home
Create author: qinglong
Create Time  : 2020-08-28
-->
<template>
  <el-scrollbar>
    <div class="content">
      <div class="list">
        <div class="item day">
          <ve-histogram :title="{text:'个人日排行'}" :loading="loading" :data="chartData['day'].data" height="100%" :colors="colors" :settings="chartData['day'].settings" :legend-visible="chartData['day'].legendVisible" :judge-width="true" />
        </div>
        <div class="item ranking">
          <ve-histogram :title="{text:'新人龙虎榜'}" :loading="loading" :data="chartData['ranking'].data" :colors="colors" height="100%" :settings="chartData['ranking'].settings" :legend-visible="chartData['ranking'].legendVisible" :judge-width="true" />
        </div>
        <div class="item week">
          <ve-bar :title="{text:'个人周排行'}" :loading="loading" :data="chartData['week'].data" height="100%" :colors="colors" :settings="chartData['week'].settings" :legend-visible="chartData['week'].legendVisible" :judge-width="true" />
        </div>
        <div class="item time">
          <ve-histogram :title="{text:'团队实时排行'}" :loading="loading" :options="{title:{text:'实时业绩'}}" :data="chartData['time'].data" height="100%" :colors="colors" :settings="chartData['time'].settings" :legend-visible="chartData['time'].legendVisible" :judge-width="true" />
        </div>
      </div>
    </div>
  </el-scrollbar>
</template>
<script>
export default {
  name: "Home",
  data() {
    return {
      loading: true,
      colors: [
        "#20a0ff",
        "#c23531",
        "#749f83",
        "#2f4554",
        "#61a0a8",
        "#d48265",
        "#91c7ae",
        "#ca8622",
        "#bda29a",
        "#6e7074",
        "#546570",
        "#c4ccd3"
      ],
      chartData: { day: {}, ranking: {}, week: {}, time: {} }
    };
  },
  async mounted() {
    this.socket.on("real_time_data", data => {
      data = JSON.parse(data);
      console.log(data);
      this.handerData(data);
    });
    this.axios.get("/statistics/statistics/list?id=1", {
      withCredentials: false
    });
  },
  methods: {
    handerData(data) {
      this.chartData.day = {
        legendVisible: false,
        settings: {
          labelMap: {
            value: "成交额"
          },
          yAxisName: ["成交额(元)"],
          yAxisType: ["$ 0.00"]
        },
        data: {
          columns: ["name", "value"],
          rows: data.day.data
        }
      };
      this.chartData.week = {
        legendVisible: false,
        settings: {
          legendName: "个人日数据",
          label: "个人数据",
          labelMap: {
            value: "成交额"
          },
          yAxisType: ["$ 0.00"]
        },
        data: {
          columns: ["name", "value"],
          rows: data.week.data
        }
      };
      this.chartData.ranking = {
        legendVisible: false,
        settings: {
          legendName: "个人日数据",
          label: "个人数据",
          labelMap: {
            value: "成交额"
          },
          yAxisName: ["成交额(元)"],
          yAxisType: ["$ 0.00"]
        },
        data: {
          columns: ["name", "value"],
          rows: data.ranking.data
        }
      };
      this.chartData.time = {
        legendVisible: false,
        settings: {
          legendName: "个人日数据",
          label: "个人数据",
          labelMap: {
            value: "成交额(万元)",
            rate: "转化率(%)"
          },
          // yAxisType: ["$ 0.00a", "%"],
          showLine: ["rate"],
          axisSite: { right: ["rate"] },
          yAxisName: ["成交额(万元)", "转化率"],
          yAxisType: ["0,0.00", "percent"]
        },
        data: {
          columns: ["name", "value", "rate"],
          rows: data.time.data.map(e => {
            e.rate = e.rate / 100;
            e.value = e.value / 10000;
            return e;
          })
        }
      };
      this.loading = false;
    }
  }
};
</script>
<style lang="less" scoped>
.list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  height: 100%;
  .item {
    height: 370px;
    overflow: hidden;
    box-sizing: border-box;
    border: 1px solid #ccc;
    margin: 0.5%;
  }
  .ranking,
  .day {
    width: 30%;
  }
  .week {
    width: 36%;
  }
  .time {
    width: 99%;
  }
  h4 {
    padding: 0;
    margin: 0;
    padding-top: 20px;
  }
}
</style>