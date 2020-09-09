<!--
Template Name: home
Create author: qinglong
Create Time  : 2020-06-14
-->
<template>
  <div :class="[isPc?'bg':'bga']" v-if="key.a">
    <!-- <div class="head">
      <div class="left">{{date}}</div>
      <div class="right">
        <van-notice-bar scrollable background="transparent" left-icon="volume-o" :key="key.b">
          <template v-if="message.list && message.list.length">
            <span v-for="(item,index) in message.list" :key="index">{{item}}</span>
          </template>
        </van-notice-bar>
      </div>
    </div> -->
    <div class="list">
      <div class="box qiu">
        <div class="item">
          <img src="~@/assets/image/d1.svg" class="sub" />
          <img src="~@/assets/image/d2.svg" class="main" />
          <img src="~@/assets/image/d3.svg" class="border" />
          <div class="dialog" v-show="active">
            <div>
              恭喜{{message.dialog.name}}出单成功
              <br />
              今日共出{{message.dialog.num}}单,请再接再厉哦！
            </div>
          </div>
        </div>
      </div>
      <div class="box day">
        <div class="title">个人业绩日排名TOP 5</div>
        <div class="item">
          <v-chart :options="day" theme="zidingyi" class="chart" />
        </div>
      </div>
      <div class="box week">
        <div class="title">个人业绩周排名TOP 10</div>
        <div class="item">
          <v-chart :options="week" theme="zidingyi" class="chart" />
        </div>
      </div>
      <div class="box mount">
        <div class="title">个人业绩月排名TOP 10</div>
        <div class="item">
          <v-chart :options="mount" theme="zidingyi" class="chart" />
        </div>
      </div>
      <div class="box time">
        <div class="title">团队实时业绩排名</div>
        <div class="item">
          <v-chart :options="time" theme="zidingyi" class="chart" />
        </div>
      </div>
      <div class="box top">
        <div class="title">新人龙虎榜</div>
        <div class="item">
          <v-chart :options="ranking" theme="zidingyi" class="chart" />
        </div>
      </div>
    </div>
    <audio ref="audio" src="~@/assets/mp3/a.mp3"></audio>
    <!-- <van-overlay :show="show">
      <div style="display: flex; align-items: center; justify-content: center; height: 100%;color:#fff">
        <van-loading size="0.24rem" vertical>加载中...</van-loading>
      </div>
    </van-overlay> -->
  </div>
</template>
<script>
export default {
  name: "Home",
  data() {
    return {
      date: null,
      active: false,
      isPc: null,
      show: true,
      socketKey: null,
      key: { a: true, b: "0" },
      message: {
        dialog: {}, // 中间弹窗数据
        list: [] //右上角历史出单滚动列表
      },
      timer: { time: null, sk: null, active: null, init: null, count: 5 },
      day: {
        xAxis: {
          type: "category",
          data: [],
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "rgba(255,255,255,.2)"
            }
          }
        },
        yAxis: {
          type: "value",
          show: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          top: "20%",
          left: "0%",
          right: "0%",
          bottom: "10%",
          containLabel: false
        },
        series: [
          {
            type: "bar",
            smooth: true,
            data: [],
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  color: "#fff",
                  position: "top",
                  formatter: a => {
                    return a.data.num;
                  }
                },
                color: () => this.randomColor()
              }
            }
          }
        ]
      },
      week: {
        xAxis: {
          show: false,
          type: "value"
        },
        yAxis: {
          type: "category",
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        grid: {
          top: "1%",
          left: "10%",
          right: "20%",
          bottom: "1%",
          containLabel: false
        },
        legend: {},
        series: [
          {
            type: "bar",
            data: [],
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: "right",
                  textStyle: {
                    color: "#fff",
                    fontSize: 16
                  },
                  formatter: a => {
                    return a.data.num;
                  }
                },
                color: () => {
                  let obj = this.randomColor();
                  return obj;
                }
              }
            }
          }
        ]
      },
      mount: {
        xAxis: {
          type: "category",
          data: [],
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "rgba(255,255,255,.2)"
            }
          }
        },

        yAxis: {
          show: false,
          type: "value"
        },
        grid: {
          top: "20%",
          left: "0%",
          right: "0%",
          bottom: "10%",
          containLabel: false
        },
        series: [
          {
            type: "bar",
            data: [],
            itemStyle: {
              color: "rgba(0,0,0,0)",
              borderColor: "#01c0e7",
              borderWidth: 1,
              normal: {
                label: {
                  show: true,
                  position: "top",
                  textStyle: {
                    color: "#fff",
                    fontSize: 12
                  },
                  formatter: a => {
                    return a.data.num;
                  }
                },
                color: () => this.randomColor()
              }
            }
          }
        ]
      },
      time: {
        xAxis: {
          type: "category",
          data: [],
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "rgba(255,255,255,.2)"
            }
          }
        },
        yAxis: {
          type: "value",
          axisTick: {
            show: false
          },
          axisLine: {
            //轴线
            show: false
          },
          splitLine: {
            //网格线颜色
            lineStyle: {
              color: "rgba(255,255,255,.15)"
            }
          }
        },
        grid: {
          top: "20%",
          left: "1%",
          right: 0,
          bottom: "15%",
          containLabel: false
        },
        series: [
          {
            type: "bar",
            data: [],
            itemStyle: {
              color: "rgba(0,0,0,0)",
              borderColor: "#01c0e7",
              borderWidth: 1,
              normal: {
                label: {
                  show: true,
                  position: "top",
                  textStyle: {
                    color: "#eee",
                    fontSize: 9
                  },
                  formatter: a => {
                    return [
                      "第一名",
                      "第二名",
                      "第三名",
                      "第四名",
                      "第五名",
                      "第六名",
                      "第七名",
                      "第八名",
                      "第九名",
                      "第十名"
                    ][a.dataIndex];
                  }
                },
                color: () => this.randomColor()
              }
            }
          },
          {
            type: "bar",
            data: [],
            itemStyle: {
              color: "rgba(0,0,0,0)",
              borderColor: "#01c0e7",
              borderWidth: 1,
              normal: {
                label: {
                  show: true,
                  position: "top",
                  textStyle: {
                    color: "#eee",
                    fontSize: 9
                  },
                  formatter: a => a.data.num
                },
                color: () => this.randomColor()
              }
            }
          }
        ]
      },
      ranking: {
        xAxis: {
          type: "category",
          axisLine: {
            lineStyle: {
              color: "rgba(255,255,255,.2)"
            }
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: "value",
          show: false
        },
        grid: {
          top: "20%",
          left: 0,
          right: 0,
          bottom: "10%",
          containLabel: false
        },
        series: [
          {
            type: "bar",
            data: [],
            itemStyle: {
              color: "rgba(0,0,0,0)",
              borderColor: "#01c0e7",
              borderWidth: 1,
              normal: {
                label: {
                  show: true,
                  position: "top",
                  textStyle: {
                    color: "#eee",
                    fontSize: 16
                  },
                  formatter: a => {
                    return a.data.num;
                  }
                },
                color: () => this.randomColor()
              }
            }
          }
        ]
      }
    };
  },
  async created() {
    this.isMobile();
  },
  async mounted() {
    this.$alert("开启消息语音通知", "提示！", {
      type: "warning"
    });
    this.$store.state.socket.on("real_time_data", data => {
      console.log(11111);
      data = JSON.parse(data);
      this.handerData(data);
    });
    await this.axios("/statistics/statistics/list?id=1");
  },

  methods: {
    randomColor() {
      let rgb = `rgba(${Math.floor(Math.random() * 256)},${Math.floor(
        Math.random() * 256
      )},${Math.floor(Math.random() * 256)},1)`;
      return rgb;
    },
    isMobile() {
      if (window.navigator.appVersion.toLowerCase().includes("window")) {
        this.isPc = true;
      } else {
        if (
          document.documentElement.clientWidth / window.devicePixelRatio >=
            680 ||
          window.screen.orientation.angle == 90
        ) {
          this.isPc = true;
        } else {
          this.isPc = false;
        }
        window.onorientationchange = () => {
          window.location.reload();
        };
      }
      this.initRem();
      this.formatDate();
      this.show = false;
    },
    initRem() {
      let AutoRem = this.isPc ? 19.2 : 7.5;
      let rootEl = document.documentElement;
      let metaEl = document.querySelector('meta[name="viewport"]');
      let dpr = window.devicePixelRatio || 1;
      let rem = (rootEl.clientWidth * dpr) / AutoRem;
      let scale = (1 / dpr).toFixed(2);
      metaEl.setAttribute(
        "content",
        `width=${dpr *
          rootEl.clientWidth},initial-scale=${scale},maximum-scale=${scale},, minimum-scale=${scale},user-scalable=no`
      );
      rootEl.setAttribute("data-dpr", dpr);
      rootEl.setAttribute(
        "style",
        "font-size:" + rem.toFixed(2) + "px!important;"
      );
    },

    handerData(e) {
      // 处理服务端返回数据
      if (e.isTrusted && typeof e.data == "string") {
        e = JSON.parse(e.data);
        this.key.b = Math.random();
      }
      // 天
      this.day.xAxis.data = e.data.day.data.map(e => e.name);
      this.day.series[0].data = e.data.day.data.map(e => {
        return {
          ...e,
          value: parseInt(e.value),
          num: parseInt(e.value) + "元"
        };
      });

      // 周
      let week = e.data.week.data.reverse();
      // console.log(week);
      this.week.yAxis.data = week.map(e => e.name);
      this.week.series[0].data = week.map(e => {
        return {
          ...e,
          value: parseInt(e.value),
          num: parseInt(e.value) + "元"
        };
      });
      // 月

      this.mount.xAxis.data = e.data.mount.data.map(e => e.name);
      this.mount.series[0].data = e.data.mount.data.map(e => {
        return {
          ...e,
          value: parseInt(e.value),
          num: (e.value / 10000).toFixed(2) + "万"
        };
      });
      // console.log(this.mount.series[0].data);

      // 实时
      this.time.xAxis.data = e.data.time.data.map(e => e.name);
      this.time.series[1].data = e.data.time.data.map(e => {
        return {
          ...e,
          value: parseInt(e.value),
          num: e.rate.toFixed(2) + "%"
        };
      });
      this.time.series[0].data = e.data.time.data.map(e => {
        return {
          ...e,
          value: parseInt(e.value),
          num: (e.value / 10000).toFixed(1) + "万"
        };
      });

      // 新人榜
      this.ranking.xAxis.data = e.data.ranking.data.map(e => e.name);
      this.ranking.series[0].data = e.data.ranking.data.map(e => {
        return {
          ...e,
          value: parseInt(e.value),
          num: parseInt(e.value) + "元"
        };
      });
      // 消息列表
      this.message.list = e.data.message.list;
      if (e.data.message.dialog) {
        this.message.dialog = e.data.message.dialog;
        this.active = true;
        this.$refs.audio.play();
        clearTimeout(this.timer.active);
        this.timer.active = setTimeout(() => {
          this.active = false;
        }, 30 * 1000);
      }
    },
    formatDate(
      time = new Date(),
      format = "YYYY年MM月DD日 week  hh:mm",
      utc = null
    ) {
      clearTimeout(this.timer.time);
      try {
        time = new Date(time);
      } catch (error) {
        console.error("Wrong time type：", error);
        time = new Date();
      }
      if (utc === true)
        time = new Date(
          time.getTime() - new Date().getTimezoneOffset() * 60 * 1000
        );
      if (utc === false)
        time = new Date(
          time.getTime() + new Date().getTimezoneOffset() * 60 * 1000
        );
      [
        { test: /YYYY/g, text: time.getFullYear() },
        { test: /MM/g, text: time.getMonth() + 1 },
        { test: /DD/g, text: time.getDate() },
        { test: /hh/g, text: time.getHours() },
        { test: /mm/g, text: time.getMinutes() },
        { test: /ss/g, text: time.getSeconds() },
        { test: /ms/g, text: time.getMilliseconds() },
        {
          test: /week/g,
          text:
            "星期" + ["日", "一", "二", "三", "四", "五", "六"][time.getDay()]
        }
      ].forEach(e => {
        format = format.replace(e["test"], e.text < 10 ? "0" + e.text : e.text);
      });
      this.date = format;
      this.timer.time = setTimeout(() => this.formatDate(), 1000 * 60);
    }
  }
};
</script>
<style lang='less' scoped>
@keyframes turn {
  0% {
    transform: rotate(0deg);
  }

  50% {
    transform: rotate(180deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
@keyframes turna {
  0% {
    transform: rotate(360deg);
  }

  50% {
    transform: rotate(180deg);
  }

  100% {
    transform: rotate(0deg);
  }
}
@keyframes turnb {
  0% {
    opacity: 0.1;
  }

  50% {
    opacity: 0.6;
  }

  100% {
    opacity: 0;
  }
}
@keyframes scale {
  0% {
    opacity: 0;
    transform: rotate(0deg);
    font-size: 0.12rem;
    background: linear-gradient(to right, red, blue, green);
    -webkit-background-clip: text;
    color: transparent;
  }

  50% {
    transform: rotate(180deg);
  }

  100% {
    opacity: 1;
    font-size: 0.36rem;
    transform: rotate(360deg);
    background: linear-gradient(to right, #6f0, #f60, #6f0);
    -webkit-background-clip: text;
    color: transparent;
  }
}
img {
  outline: none;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
.bg {
  width: 100%;
  min-height: 100%;
  background: url("~@/assets/image/bg.svg") no-repeat top center / cover;
  .head {
    top: 0;
    left: 0;
    right: 0;
    margin: auto;
    display: flex;
    height: 0.5rem;
    overflow: hidden;
    padding: 0 0.4rem;
    align-items: center;
    justify-content: space-between;
    .left {
      color: #0ab7ff;
      font-size: 0.18rem;
      text-shadow: 0 0 0.05rem #0979ad;
    }
    .right {
      width: 6.5rem;
      span {
        margin: 0 0.2rem;
        font-size: 0.2rem;
      }
    }
  }

  .dialog {
    display: flex;
    justify-content: center;
    align-items: center;
    animation: scale 0.5s ease-out;
    animation-fill-mode: forwards;
    position: relative;
    z-index: 999;
    width: 100% !important;
    line-height: 2;
    div {
      width: 100%;
      white-space: nowrap;
      text-align: center;
    }
  }
  .list {
    padding: 0 0.2rem;
    display: grid;
    overflow: hidden;
    grid-template-columns: auto auto auto;

    .box {
      margin: 0 0.08rem;
      margin-top: 0.35rem;
      .title {
        width: 100%;
        height: 0.55rem;
        line-height: 0.55rem;
        font-size: 0.18rem;
        background: linear-gradient(
          90deg,
          rgba(16, 116, 214, 0.3),
          rgba(19, 50, 121, 0.01)
        );
        margin: 0.1rem 0;
        text-indent: 1em;
        position: relative;
        &::after {
          bottom: 0;
          left: 0;
        }
        &:before {
          top: 0;
          left: 0;
        }
        &:after,
        &:before {
          display: block;
          content: "";
          width: 0.02rem;
          height: 0.02rem;
          background: #00d7ff;
          position: absolute;
        }
      }
      .item {
        > div {
          width: 95%;
          height: 95%;
        }
        width: 6rem;
        height: 3rem;
        border: 1px solid #06324e;
        position: relative;
        background: linear-gradient(
          -45deg,
          rgba(16, 116, 214, 0.3),
          rgba(19, 50, 121, 0.01)
        );
        &::after {
          bottom: -0.02rem;
          left: 0;
        }
        &:before {
          top: -0.02px;
          left: 0;
        }
        &:after,
        &:before {
          display: block;
          content: "";
          width: 0.04rem;
          height: 0.04rem;
          background: #00d7ff;
          position: absolute;
        }
      }
      &.day {
        grid-area: ~"1/1/2/2";
      }
      &.week {
        grid-area: ~"1/3/2/4";
      }
      &.mount {
        grid-area: ~"2/1/3/2";
      }
      &.time {
        grid-area: ~"2/2/3/3";
        height: 3rem;
        align-content: end;
        align-self: end;
        .item {
          height: 2.2rem;
        }
      }
      &.top {
        grid-area: ~"2/3/3/4";
      }
      &.qiu {
        grid-area: ~"1/2/2/3";
        width: 5rem;
        height: 4rem;
        margin: auto;
        position: relative;
        .item {
          position: absolute;
          width: 5.3rem;
          height: 5.3rem;
          background: transparent;
          border: none;
          &::after,
          &::before {
            display: none;
          }
          img {
            height: 100%;
            object-fit: cover;
          }
          .main {
            height: 3.5rem;
            animation: turna 80s infinite linear;
          }
          .border {
            animation: turn 120s infinite linear;
            width: 100%;
            height: 100%;
          }
          .sub {
            animation: turnb 5s infinite ease-out;
          }
          .sub,
          .main {
            width: 100%;
            object-fit: contain;
          }
        }
      }
    }
  }
}
.bga {
  width: 7.5rem;
  height: 100%;
  background: url("~@/assets/image/bg-mobile.svg") no-repeat top center / cover;
  position: relative;
  .head {
    overflow: hidden;
    padding-top: 0.8rem;
    text-align: center;
    .left {
      color: #0ab7ff;
      font-size: 0.18rem;
      text-shadow: 0 0 0.05rem #0979ad;
    }
    .right {
      //   width: 6.5rem;
      span {
        margin: 0 0.2rem;
        font-size: 0.2rem;
      }
    }
  }
  .dialog {
    display: flex;
    justify-content: center;
    align-items: center;
    animation: scale 0.5s ease-out;
    animation-fill-mode: forwards;
    position: relative;
    z-index: 999;
    width: 100% !important;
    line-height: 2;
    div {
      width: 100%;
      white-space: nowrap;
      text-align: center;
    }
  }
  .list {
    padding: 0.2rem;
    position: relative;
    .box {
      margin-top: 0.4rem;
      .title {
        width: 4rem;
        height: 0.55rem;
        line-height: 0.55rem;
        font-size: 0.18rem;
        background: linear-gradient(
          90deg,
          rgba(16, 116, 214, 0.3),
          rgba(19, 50, 121, 0.01)
        );
        margin: 0.1rem 0;
        text-indent: 1em;
        position: relative;
        &::after {
          bottom: 0;
          left: 0;
        }
        &:before {
          top: 0;
          left: 0;
        }
        &:after,
        &:before {
          display: block;
          content: "";
          width: 0.02rem;
          height: 0.02rem;
          background: #00d7ff;
          position: absolute;
        }
      }
      .item {
        > div {
          width: 95%;
          height: 95%;
        }
        width: 7rem;
        height: 4rem;
        margin: 0 auto;
        border: 1px solid #06324e;
        position: relative;
        background: linear-gradient(
          -45deg,
          rgba(16, 116, 214, 0.3),
          rgba(19, 50, 121, 0.01)
        );
        &::after {
          bottom: -0.02rem;
          left: 0;
        }
        &:before {
          top: -0.02px;
          left: 0;
        }
        &:after,
        &:before {
          display: block;
          content: "";
          width: 0.04rem;
          height: 0.04rem;
          background: #00d7ff;
          position: absolute;
        }
      }

      &.qiu {
        width: 5rem;
        height: 4rem;
        margin: auto;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        margin: auto;
        .item {
          position: absolute;
          width: 5.3rem;
          height: 5.3rem;
          background: transparent;
          border: none;
          &::after,
          &::before {
            display: none;
          }
          img {
            height: 100%;
            object-fit: cover;
          }
          .main {
            height: 3.5rem;
            animation: turna 80s infinite linear;
          }
          .border {
            animation: turn 120s infinite linear;
            width: 100%;
            height: 100%;
          }
          .sub {
            animation: turnb 5s infinite ease-out;
          }
          .sub,
          .main {
            width: 100%;
            object-fit: contain;
          }
        }
      }
    }
  }
}
.chart {
  display: inline-block;
  border: 1px solid rgba(200, 200, 200, 0.15);
  box-shadow: 0 0 0.1rem rgba(200, 200, 200, 0.2);
  border-radius: 0.1rem;
  margin: 0.1rem;
}
</style>