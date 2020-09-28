<!--
Template Name: 虾皮数据
Create author: qinglong
Create Time  : 2020-09-28
-->
<template>
  <div class="xipi">
    <div class="head top">
      <div class="left">
        <div class="logo">
          <svg viewBox="0 0 113 126" xmlns="http://www.w3.org/2000/svg">
            <path d="M76.968 94.081c-.741 6.073-4.447 10.939-10.187 13.374-3.194 1.356-7.476 2.086-10.871 1.856-5.279-.2-10.241-1.478-14.812-3.809-1.664-.848-4.104-2.525-5.943-4.058-.42-.348-.635-.66-.232-1.228.43-.645 2.13-3.102 2.398-3.507.362-.552.956-.58 1.5-.153.075.057.628.486.74.569 4.4 3.423 10.076 5.994 16.384 6.235 7.955-.108 13.726-3.65 14.757-9.136 1.135-6.046-3.69-11.231-12.98-14.124-2.953-.92-10.38-3.872-11.75-4.672-6.474-3.77-9.488-8.717-9.058-14.807.657-8.438 8.534-14.762 18.53-14.804 4.744-.01 9.194 1.036 13.159 2.695 1.459.61 4.176 2.066 5.145 2.785.677.494.625 1.046.358 1.474-.395.656-1.57 2.483-2.043 3.245-.345.523-.773.583-1.38.2-5.112-3.41-10.37-4.567-15.103-4.661-6.828.134-11.978 4.165-12.316 9.691-.09 4.992 3.729 8.613 11.833 11.378C71.83 77.964 78.17 84.24 76.968 94.08zM56.32 7.34c10.83 0 19.66 10.208 20.073 22.986H36.248C36.66 17.548 45.489 7.34 56.32 7.34zM97.44 125.687c5.72-.155 10.355-4.776 10.844-10.504l.037-.692 4.05-81.638v-.001a2.402 2.402 0 0 0-2.4-2.526H83.95C83.312 13.454 71.185 0 56.32 0 41.455 0 29.33 13.454 28.69 30.326H2.632a2.402 2.402 0 0 0-2.35 2.588H.28l3.696 81.319.055 1.02c.564 5.658 4.7 10.215 10.322 10.425h.002l82.669.013.414-.004z" fill-rule="evenodd"></path>
          </svg>
        </div>
        <span class="title">首页</span>
        <span class="el-icon-arrow-right"></span>
        <span class="path">賣家數據中心</span>
      </div>
      <div class="right">
        <div class="xipicart">
          <span class="icon">
            <img src="~@/assets/image/xipicart.jpg" alt="">
          </span>
          <span> {{formData.username}} </span>
        </div>
        <div class="info">
          <img src="~@/assets/image/xipiright.jpg" />
        </div>
      </div>
    </div>
    <div class="head bottom">
      <div class="body flex">
        <div class="left">
          <div class="item active">數據總覽</div>
          <div class="item">商品銷售額</div>
          <div class="item">行銷活動</div>
          <div class="item">聊聊 </div>
          <div class="item">我的直播</div>
          <div class="item">新功能 <span class="new-badge">新功能</span></div>
          <div class="item">常見問題</div>
        </div>
        <div class="right"> 即時看板
          <span class="el-icon-arrow-right"></span>
        </div>
      </div>
    </div>
    <div class="body">
      <div class="card flex position-sticky">
        <div class="header">
          <span>資料期間</span>
          <span class="time">
            <i>
              <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                <title>calender-alt</title>
                <path d="M26,2H23.5V1h-2V2h-11V1h-2V2H6A5,5,0,0,0,1,7V26a5,5,0,0,0,5,5H26a5,5,0,0,0,5-5V7A5,5,0,0,0,26,2ZM3,7A3,3,0,0,1,6,4H8.5V6h2V4h11V6h2V4H26a3,3,0,0,1,3,3V8H3ZM29,26a3,3,0,0,1-3,3H6a3,3,0,0,1-3-3V10H29ZM11,18H7V14h4Zm7,0H14V14h4Zm-7,7H7V21h4Zm14,0H21V21h4Zm0-7H21V14h4Zm-7,7H14V21h4Z"></path>
              </svg>
            </i>
            <span>今日此刻：今天直到 15:00（GMT+8）</span>
          </span>
          <span>訂單類型</span>
          <span>
            <el-select size="small" v-model="formData.type"></el-select>
          </span>
        </div>
        <div class="right">
          <i><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve">
              <path class="st0" d="M30.3,30.3h-28c-0.6,0-1-0.4-1-1v-8c0-0.6,0.4-1,1-1c0.6,0,1,0.4,1,1v7h26v-7c0-0.6,0.4-1,1-1c0.6,0,1,0.4,1,1 v8C31.3,29.8,30.9,30.3,30.3,30.3z M17.1,24C17,24,17,24,17.1,24c-0.2,0.2-0.4,0.3-0.7,0.3c0,0,0,0,0,0c-0.3,0-0.5-0.1-0.7-0.3l-6-7 c-0.4-0.4-0.4-1,0-1.4c0.4-0.4,1-0.4,1.4,0l4.3,5V5.3c0-0.6,0.4-1,1-1c0.6,0,1,0.4,1,1v15.3l4.3-5c0.4-0.4,1-0.4,1.4,0 c0.4,0.4,0.4,1,0,1.4L17.1,24z"></path>
            </svg></i>
          匯出數據
        </div>
      </div>
      <div class="card">
        <div class="title">關鍵指標</div>
        <div class="box">
          <div class="item active">
            <div class="a">销售额</div>
            <div class="b">$
              <span class="price">{{0}}</span>
            </div>
            <div class="c flex">
              <span>vs昨天 00:00-14:00</span>
              <span>0.00%</span>
            </div>
          </div>
          <div class="item">
            <div class="a">销售额</div>
            <div class="b">$
              <span class="price">{{0}}</span>
            </div>
            <div class="c flex">
              <span>vs昨天 00:00-14:00</span>
              <span>0.00%</span>
            </div>
          </div>
          <div class="item">
            <div class="a">销售额</div>
            <div class="b">$
              <span class="price">{{0}}</span>
            </div>
            <div class="c flex">
              <span>vs昨天 00:00-14:00</span>
              <span>0.00%</span>
            </div>
          </div>
          <div class="item">
            <div class="a">销售额</div>
            <div class="b">$
              <span class="price">{{0}}</span>
            </div>
            <div class="c flex">
              <span>vs昨天 00:00-14:00</span>
              <span>0.00%</span>
            </div>
          </div>
          <div class="item">
            <div class="a">销售额</div>
            <div class="b">$
              <span class="price">{{0}}</span>
            </div>
            <div class="c flex">
              <span>vs昨天 00:00-14:00</span>
              <span>0.00%</span>
            </div>
          </div>
        </div>
        <div class="charts">
          <ve-line :title="{text:'指標趨勢圖'}" :data="data" height="100%" :colors="colors" :legend-visible="false" :judge-width="true" :settings="setting" :extend="setting" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Xipi",
  data() {
    return {
      formData: { username: "xiaoshouyigou", type: "全部訂單" },
      chartExtend: {},
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
      setting: {
        xAxis: {
          type: "time",
          axisLabel: {
            show: true,
            formatter: function(val) {
              let hh = new Date(val).getHours();
              let mm = new Date(val).getMinutes();
              hh = hh < 10 ? "0" + hh : hh;
              mm = mm < 10 ? "0" + mm : mm;
              return hh + ":" + mm;
            }
          },
          splitLine: {
            show: false
          }
        },
        yAxis: {
          offset: 20,
          axisLabel: {
            show: true,
            formatter: function() {
              return "";
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed"
            }
          }
        },
        labelMap: {
          date: "时间",
          sacle: "銷售額",
          order: "訂單",
          transform: "下單轉換率",
          average: "平均訂單金額",
          noRepeatVisitors: "不重複訪客數",
          pageViews: "商品頁面瀏覽數"
        }
      },
      data: {
        columns: [
          "date",
          "sacle",
          "order",
          "transform",
          "average",
          "noRepeatVisitors",
          "pageViews"
        ],
        rows: [
          {
            date: "2020-09-28 00:00",
            sacle: 12,
            order: 12,
            transform: 12,
            average: 12,
            noRepeatVisitors: 12,
            pageViews: 12
          },
          {
            date: "2020-09-28 01:00",
            sacle: 12,
            order: 12,
            transform: 12,
            average: 12,
            noRepeatVisitors: 12,
            pageViews: 12
          }
        ]
      }
    };
  }
};
</script>
<style lang='less' scoped>
.xipi {
  color: #333;
  position: relative;
  .head {
    height: 60px;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1);
    overflow: hidden;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    &.top {
      .left {
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 16px;
        .logo {
          width: 25px;
          height: 28px;
          svg {
            fill: #ee4d2d;
          }
        }
        .title,
        .el-icon-arrow-right {
          font-size: 18px;
          color: #999;
          padding-left: 10px;
        }
        .path {
          font-size: 18px;
        }
      }
      .right {
        display: flex;
        align-items: center;
        .xipicart {
          display: flex;
          align-items: center;
          padding-right: 30px;
          border-right: 1px solid #ccc;
          .icon {
            width: 30px;
            height: 30px;
            img {
              width: 100%;
              height: 100%;
              display: flex;
            }
          }
        }
        .info {
          padding-left: 30px;
        }
      }
    }
    &.bottom {
      .left {
        display: flex;
        align-items: flex-end;
        justify-content: flex-start;
        .item {
          min-width: 85px;
          position: relative;
          text-align: center;
          &:hover,
          &.active {
            color: #ee4d2d;
            cursor: pointer;
            &::after {
              position: absolute;
              bottom: -20px;
              content: "";
              display: block;
              height: 3px;
              width: 100%;
              background: #ee4d2d;
            }
          }
          .new-badge {
            display: inline-block;
            margin-top: -4px;
            padding: 0 4px;
            height: 16px;
            line-height: 16px;
            color: #fff;
            font-size: 10px;
            background-image: linear-gradient(270deg, #fe9373 9%, #ee4d2d 91%);
            border-radius: 9px 2px 9px 9px;
          }
        }
      }
      .right {
        font-size: 14px;
        font-weight: var(--font-weight);
        color: #ee4d2d;
        line-height: 20px;
        font-weight: bold;
        span {
          font-weight: bold;
        }
      }
    }
  }
  .flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .body {
    width: 1268px;
    margin: 0 auto;
  }
  .card {
    margin: 20px 0;
    padding: 20px;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1);
    box-shadow: 10px;
    .header {
      display: inline-block;
      span {
        display: inline-block;
        margin: 0 5px;
      }
      .time {
        height: 30px;
        border: 1px solid #ccc;
        border-radius: 5px;
        display: inline-block;
        line-height: 30px;
        padding: 0 10px;
        i {
          width: 15px;
          height: 15px;
          display: inline-block;
        }
      }
      .el-select {
        /deep/ .el-input__inner {
          border-color: #ccc;
        }
      }
    }
    .right {
      border: 1px solid #ccc;
      height: 30px;
      padding: 5px 10px;
      border-radius: 5px;
      i {
        width: 15px;
        height: 15px;
        display: inline-block;
      }
    }
    .title {
      font-size: 18px;
      display: block;
      margin-bottom: 20px;
      font-weight: var(--font-weight);
      line-height: 20px;
      font-weight: bold;
    }
    .box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 40px;
      .item {
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 10px 20px;
        flex: 1;
        margin: 0 10px;
        font-size: 14px;
        .b {
          height: 50px;
          line-height: 50px;
          .price {
            font-size: 22px;
          }
        }
        .c > * {
          font-size: 12px !important ;
          color: #999;
        }
        &.active {
          border-top: 4px solid rgb(54, 127, 227);
        }
      }
    }
    .charts {
      height: 300px;
    }
  }
  .position-sticky {
    position: sticky;
    top: 0px;
    background: #fff;
  }
}
</style>