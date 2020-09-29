<!--
Template Name: 虾皮数据
Create author: qinglong
Create Time  : 2020-09-28
-->
<template>
  <div class="xipi" @click.stop.self="show=true">
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
          <div class="item">商品</div>
          <div class="item">銷售額</div>
          <div class="item">行銷活動</div>
          <div class="item">聊聊 </div>
          <div class="item">我的直播
            <span class="new-badge">新功能</span>
          </div>
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
            <span>今日此刻：今天直到 {{formData.time}}:00（GMT+8）</span>
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
          <template v-for="(item,i ) in rows">
            <div class="item active" v-if="item.prop!=='date'" :key="i" @click="selectItem(item)">
              <span class="border" :style="{background:item.check?colors[i]:''}"></span>
              <div class="a">{{item.label}}</div>
              <div class="b">{{item.type}}
                <span class="price">{{item.total}}</span>
                {{item.last}}
              </div>
              <div class="c flex">
                <span>vs昨天 00:00-{{formData.time}}</span>
                <span>{{(Math.random()*(10+i*i)).toFixed(2)}}%
                  <i data-v-2c1fda86="" class="inline-svg-container icon" style="/* display: none; */"><svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                      <title>growth</title>
                      <desc>Created with Sketch.</desc>
                      <defs></defs>
                      <g id="growth" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <path d="M9.63538732,8.63974174 L9.63538732,12.749984 C9.63538732,13.0261264 9.4115297,13.249984 9.13538732,13.249984 L7.13538732,13.249984 C6.85924495,13.249984 6.63538732,13.0261264 6.63538732,12.749984 L6.63538732,8.65030508 L3.50176055,8.66133893 C3.36871984,8.66180739 3.24097818,8.60923459 3.14680765,8.51525609 C2.95134631,8.32019334 2.95102319,8.00361102 3.14608594,7.80814968 L7.79792255,3.14680765 C7.79811289,3.14661692 7.79830338,3.14642634 7.79849403,3.14623592 C7.99387253,2.95109021 8.31045497,2.95127892 8.50560069,3.14665742 L13.1287695,7.77534111 C13.2219777,7.86866056 13.2745379,7.99502891 13.2750023,8.12692314 C13.2759746,8.4030638 13.0529066,8.62770826 12.7767659,8.62868059 L9.63538732,8.63974174 Z" fill="#40D0BD"></path>
                      </g>
                    </svg></i>
                </span>
              </div>
            </div>
          </template>
        </div>
        <div class="charts">
          <div class="top">
            <div class="title">指標趨勢圖</div>
            <div>
              <template v-for="(item,index) in rows">
                <span v-if="item.check && item.prop !='date'" :key="index">
                  <i :style="{background:colors[index]}"></i>
                  {{item.label}}</span>
              </template>
              <span>已選擇指標 {{charts.columns.length-1}} /4</span>
            </div>
          </div>
          <ve-line :data="charts" height="300px" :colors="colors" :legend-visible="false" :judge-width="true" :settings="setting" :extend="setting" />
        </div>
      </div>
      <div class="sort">
        <div class="card left">
          <div class="title flex">
            <span>商品排名 (依付款時間計算)</span>
            <span class="i">更多 <i class="el-icon-arrow-right"></i></span>
          </div>
          <div class="boxlist">
            <div class="item active">銷售額 <i data-v-18e24846="" class="shopee-icon" style="cursor: pointer;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M8,1 C11.8659932,1 15,4.13400675 15,8 C15,11.8659932 11.8659932,15 8,15 C4.13400675,15 1,11.8659932 1,8 C1,4.13400675 4.13400675,1 8,1 Z M8,2 C4.6862915,2 2,4.6862915 2,8 C2,11.3137085 4.6862915,14 8,14 C11.3137085,14 14,11.3137085 14,8 C14,4.6862915 11.3137085,2 8,2 Z M7.98750749,10.2375075 C8.40172105,10.2375075 8.73750749,10.5732939 8.73750749,10.9875075 C8.73750749,11.401721 8.40172105,11.7375075 7.98750749,11.7375075 C7.57329392,11.7375075 7.23750749,11.401721 7.23750749,10.9875075 C7.23750749,10.5732939 7.57329392,10.2375075 7.98750749,10.2375075 Z M8.11700238,4.60513307 C9.97011776,4.60513307 10.7745841,6.50497267 9.94298079,7.72186504 C9.76926425,7.97606597 9.56587088,8.14546785 9.27050506,8.31454843 L9.11486938,8.39945305 L8.95824852,8.47993747 C8.56296349,8.68261431 8.49390831,8.75808648 8.49390831,9.0209925 C8.49390831,9.29713488 8.27005069,9.5209925 7.99390831,9.5209925 C7.71776594,9.5209925 7.49390831,9.29713488 7.49390831,9.0209925 C7.49390831,8.34166619 7.7650409,7.99681515 8.35913594,7.6662627 L8.76655168,7.45066498 C8.9424056,7.3502536 9.04307851,7.26633638 9.11735517,7.1576467 C9.52116165,6.56675314 9.11397414,5.60513307 8.11700238,5.60513307 C7.41791504,5.60513307 6.82814953,6.01272878 6.75715965,6.55275918 L6.75,6.66244953 L6.74194433,6.75232516 C6.69960837,6.98557437 6.49545989,7.16244953 6.25,7.16244953 C5.97385763,7.16244953 5.75,6.9385919 5.75,6.66244953 C5.75,5.44256682 6.87194406,4.60513307 8.11700238,4.60513307 Z"></path>
                </svg></i> </div>
            <div class="item">售出件數<i data-v-18e24846="" class="shopee-icon" style="cursor: pointer;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M8,1 C11.8659932,1 15,4.13400675 15,8 C15,11.8659932 11.8659932,15 8,15 C4.13400675,15 1,11.8659932 1,8 C1,4.13400675 4.13400675,1 8,1 Z M8,2 C4.6862915,2 2,4.6862915 2,8 C2,11.3137085 4.6862915,14 8,14 C11.3137085,14 14,11.3137085 14,8 C14,4.6862915 11.3137085,2 8,2 Z M7.98750749,10.2375075 C8.40172105,10.2375075 8.73750749,10.5732939 8.73750749,10.9875075 C8.73750749,11.401721 8.40172105,11.7375075 7.98750749,11.7375075 C7.57329392,11.7375075 7.23750749,11.401721 7.23750749,10.9875075 C7.23750749,10.5732939 7.57329392,10.2375075 7.98750749,10.2375075 Z M8.11700238,4.60513307 C9.97011776,4.60513307 10.7745841,6.50497267 9.94298079,7.72186504 C9.76926425,7.97606597 9.56587088,8.14546785 9.27050506,8.31454843 L9.11486938,8.39945305 L8.95824852,8.47993747 C8.56296349,8.68261431 8.49390831,8.75808648 8.49390831,9.0209925 C8.49390831,9.29713488 8.27005069,9.5209925 7.99390831,9.5209925 C7.71776594,9.5209925 7.49390831,9.29713488 7.49390831,9.0209925 C7.49390831,8.34166619 7.7650409,7.99681515 8.35913594,7.6662627 L8.76655168,7.45066498 C8.9424056,7.3502536 9.04307851,7.26633638 9.11735517,7.1576467 C9.52116165,6.56675314 9.11397414,5.60513307 8.11700238,5.60513307 C7.41791504,5.60513307 6.82814953,6.01272878 6.75715965,6.55275918 L6.75,6.66244953 L6.74194433,6.75232516 C6.69960837,6.98557437 6.49545989,7.16244953 6.25,7.16244953 C5.97385763,7.16244953 5.75,6.9385919 5.75,6.66244953 C5.75,5.44256682 6.87194406,4.60513307 8.11700238,4.60513307 Z"></path>
                </svg></i> </div>
            <div class="item">頁面瀏覽數<i data-v-18e24846="" class="shopee-icon" style="cursor: pointer;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M8,1 C11.8659932,1 15,4.13400675 15,8 C15,11.8659932 11.8659932,15 8,15 C4.13400675,15 1,11.8659932 1,8 C1,4.13400675 4.13400675,1 8,1 Z M8,2 C4.6862915,2 2,4.6862915 2,8 C2,11.3137085 4.6862915,14 8,14 C11.3137085,14 14,11.3137085 14,8 C14,4.6862915 11.3137085,2 8,2 Z M7.98750749,10.2375075 C8.40172105,10.2375075 8.73750749,10.5732939 8.73750749,10.9875075 C8.73750749,11.401721 8.40172105,11.7375075 7.98750749,11.7375075 C7.57329392,11.7375075 7.23750749,11.401721 7.23750749,10.9875075 C7.23750749,10.5732939 7.57329392,10.2375075 7.98750749,10.2375075 Z M8.11700238,4.60513307 C9.97011776,4.60513307 10.7745841,6.50497267 9.94298079,7.72186504 C9.76926425,7.97606597 9.56587088,8.14546785 9.27050506,8.31454843 L9.11486938,8.39945305 L8.95824852,8.47993747 C8.56296349,8.68261431 8.49390831,8.75808648 8.49390831,9.0209925 C8.49390831,9.29713488 8.27005069,9.5209925 7.99390831,9.5209925 C7.71776594,9.5209925 7.49390831,9.29713488 7.49390831,9.0209925 C7.49390831,8.34166619 7.7650409,7.99681515 8.35913594,7.6662627 L8.76655168,7.45066498 C8.9424056,7.3502536 9.04307851,7.26633638 9.11735517,7.1576467 C9.52116165,6.56675314 9.11397414,5.60513307 8.11700238,5.60513307 C7.41791504,5.60513307 6.82814953,6.01272878 6.75715965,6.55275918 L6.75,6.66244953 L6.74194433,6.75232516 C6.69960837,6.98557437 6.49545989,7.16244953 6.25,7.16244953 C5.97385763,7.16244953 5.75,6.9385919 5.75,6.66244953 C5.75,5.44256682 6.87194406,4.60513307 8.11700238,4.60513307 Z"></path>
                </svg></i> </div>
            <div class="item">付款訂單轉換率<i data-v-18e24846="" class="shopee-icon" style="cursor: pointer;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M8,1 C11.8659932,1 15,4.13400675 15,8 C15,11.8659932 11.8659932,15 8,15 C4.13400675,15 1,11.8659932 1,8 C1,4.13400675 4.13400675,1 8,1 Z M8,2 C4.6862915,2 2,4.6862915 2,8 C2,11.3137085 4.6862915,14 8,14 C11.3137085,14 14,11.3137085 14,8 C14,4.6862915 11.3137085,2 8,2 Z M7.98750749,10.2375075 C8.40172105,10.2375075 8.73750749,10.5732939 8.73750749,10.9875075 C8.73750749,11.401721 8.40172105,11.7375075 7.98750749,11.7375075 C7.57329392,11.7375075 7.23750749,11.401721 7.23750749,10.9875075 C7.23750749,10.5732939 7.57329392,10.2375075 7.98750749,10.2375075 Z M8.11700238,4.60513307 C9.97011776,4.60513307 10.7745841,6.50497267 9.94298079,7.72186504 C9.76926425,7.97606597 9.56587088,8.14546785 9.27050506,8.31454843 L9.11486938,8.39945305 L8.95824852,8.47993747 C8.56296349,8.68261431 8.49390831,8.75808648 8.49390831,9.0209925 C8.49390831,9.29713488 8.27005069,9.5209925 7.99390831,9.5209925 C7.71776594,9.5209925 7.49390831,9.29713488 7.49390831,9.0209925 C7.49390831,8.34166619 7.7650409,7.99681515 8.35913594,7.6662627 L8.76655168,7.45066498 C8.9424056,7.3502536 9.04307851,7.26633638 9.11735517,7.1576467 C9.52116165,6.56675314 9.11397414,5.60513307 8.11700238,5.60513307 C7.41791504,5.60513307 6.82814953,6.01272878 6.75715965,6.55275918 L6.75,6.66244953 L6.74194433,6.75232516 C6.69960837,6.98557437 6.49545989,7.16244953 6.25,7.16244953 C5.97385763,7.16244953 5.75,6.9385919 5.75,6.66244953 C5.75,5.44256682 6.87194406,4.60513307 8.11700238,4.60513307 Z"></path>
                </svg></i> </div>
          </div>
          <ul class="theader">
            <li class="rank">排名</li>
            <li class="info">商品</li>
            <li class="sales">銷售額</li>
          </ul>
        </div>
        <div class="card right">
          <div class="title flex">
            <span>分類排名 (依付款時間計算)</span>
            <span class="i">更多 <i class="el-icon-arrow-right"></i></span>
          </div>
          <div class="boxlist">
            <div class="item active">銷售額 <i data-v-18e24846="" class="shopee-icon" style="cursor: pointer;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M8,1 C11.8659932,1 15,4.13400675 15,8 C15,11.8659932 11.8659932,15 8,15 C4.13400675,15 1,11.8659932 1,8 C1,4.13400675 4.13400675,1 8,1 Z M8,2 C4.6862915,2 2,4.6862915 2,8 C2,11.3137085 4.6862915,14 8,14 C11.3137085,14 14,11.3137085 14,8 C14,4.6862915 11.3137085,2 8,2 Z M7.98750749,10.2375075 C8.40172105,10.2375075 8.73750749,10.5732939 8.73750749,10.9875075 C8.73750749,11.401721 8.40172105,11.7375075 7.98750749,11.7375075 C7.57329392,11.7375075 7.23750749,11.401721 7.23750749,10.9875075 C7.23750749,10.5732939 7.57329392,10.2375075 7.98750749,10.2375075 Z M8.11700238,4.60513307 C9.97011776,4.60513307 10.7745841,6.50497267 9.94298079,7.72186504 C9.76926425,7.97606597 9.56587088,8.14546785 9.27050506,8.31454843 L9.11486938,8.39945305 L8.95824852,8.47993747 C8.56296349,8.68261431 8.49390831,8.75808648 8.49390831,9.0209925 C8.49390831,9.29713488 8.27005069,9.5209925 7.99390831,9.5209925 C7.71776594,9.5209925 7.49390831,9.29713488 7.49390831,9.0209925 C7.49390831,8.34166619 7.7650409,7.99681515 8.35913594,7.6662627 L8.76655168,7.45066498 C8.9424056,7.3502536 9.04307851,7.26633638 9.11735517,7.1576467 C9.52116165,6.56675314 9.11397414,5.60513307 8.11700238,5.60513307 C7.41791504,5.60513307 6.82814953,6.01272878 6.75715965,6.55275918 L6.75,6.66244953 L6.74194433,6.75232516 C6.69960837,6.98557437 6.49545989,7.16244953 6.25,7.16244953 C5.97385763,7.16244953 5.75,6.9385919 5.75,6.66244953 C5.75,5.44256682 6.87194406,4.60513307 8.11700238,4.60513307 Z"></path>
                </svg></i>
            </div>
          </div>
          <ul class="theader">
            <li class="rank">排名</li>
            <li class="info">分類</li>
            <li class="sales">銷售額</li>
          </ul>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="show" title="数据设置">
      <div style="height:500px">
        <el-scrollbar>
          <mixForm v-model="formData" :fields="formFields" />
          <div style="height:300px">
            <mixTable v-model="charts.rows" :fields="tableFields" />
          </div>
        </el-scrollbar>
      </div>
      <el-button type="primary" @click="show=false">确定</el-button>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "Xipi",
  data() {
    return {
      show: false,
      formData: {
        username: "",
        time: "",
        type: "全部訂單",
        maxSacle: 0,
        maxOrder: 0,
        maxNoRepeatVisitors: 0,
        maxPageViews: 0
      },
      formFields: [
        { labelWidth: 120, label: "用户名", prop: "username", type: "text" },
        //labelWidth:120, { label: "截止时间", prop: "time", type: "text" },
        // { labelWidth:120,label: "订单类型", prop: "type", type: "text" },
        {
          labelWidth: 120,
          label: "每小时金额上限",
          prop: "maxSacle",
          type: "text"
        },
        {
          labelWidth: 120,
          label: "每小时订单上限",
          prop: "maxOrder",
          type: "text"
        },
        {
          labelWidth: 120,
          label: "不重复访客上限",
          prop: "maxNoRepeatVisitors",
          type: "text"
        },
        {
          labelWidth: 120,
          label: "每小时浏览上限",
          prop: "maxPageViews",
          type: "text"
        },
        {
          labelWidth: 120,
          label: "增加一小时数据",
          type: "button",
          click: this.addRows
        }
      ],
      tableFields: [
        {
          type: "input",
          change: this.tableChange,
          label: "时间",
          prop: "date"
        },
        {
          type: "input",
          change: this.tableChange,
          label: "销售额",
          prop: "sacle"
        },
        {
          type: "input",
          change: this.tableChange,
          label: "訂單",
          prop: "order"
        },
        {
          type: "input",
          change: this.tableChange,
          label: "不重複訪客數",
          prop: "noRepeatVisitors"
        },
        {
          type: "input",
          change: this.tableChange,
          label: "商品頁面瀏覽數",
          prop: "pageViews"
        }
      ],
      chartExtend: {},
      colors: [
        "#c23531",
        "rgb(54, 127, 227)",
        "rgb(246, 189, 22)",
        "rgb(35, 170, 171)",
        "rgb(88, 183, 241)",
        "rgb(251, 115, 75)",
        "rgb(148, 95, 185)",
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
          },
          axisTick: {
            //决定是否显示坐标刻度
            axisTick: {
              lineStyle: { type: "solid" }
            }
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
        },
        grid: {
          top: 0,
          right: "30px",
          bottom: "3%",
          containLabel: true
        },
        series: {
          smooth: false
        }
      },
      rows: [
        { type: "", check: true, total: 0, prop: "date", label: "时间" },
        { type: "$", check: true, total: 0, prop: "sacle", label: "銷售額" },
        { type: "", check: false, total: 0, prop: "order", label: "訂單" },
        {
          last: "%",
          check: false,
          total: 0,
          prop: "transform",
          label: "下單轉換率"
        },
        {
          type: "$",
          check: false,
          total: 0,
          prop: "average",
          label: "平均訂單金額"
        },
        {
          type: "",
          check: false,
          total: 0,
          prop: "noRepeatVisitors",
          label: "不重複訪客數"
        },
        {
          type: "",
          check: false,
          total: 0,
          prop: "pageViews",
          label: "商品頁面瀏覽數"
        }
      ],
      charts: {
        columns: ["date", "sacle"],
        rows: []
      }
    };
  },
  methods: {
    tableChange() {
      let sacle = 0,
        order = 0,
        transform = 0,
        average = 0,
        noRepeatVisitors = 0,
        pageViews = 0;

      this.charts.rows.map(e => {
        sacle += e.sacle * 1;
        return e;
      });
      this.charts.rows.map(e => {
        order += e.order * 1;
        return e;
      });
      this.charts.rows.map(e => {
        let num = (e.order / e.noRepeatVisitors) * 100;
        transform += num;
        e.transform = num;
        return e;
      });
      this.charts.rows.map(e => {
        let num = (e.sacle * 1) / e.order;
        average = num;
        e.average = num;
        return e;
      });
      this.charts.rows.map(e => {
        noRepeatVisitors += e.noRepeatVisitors * 1;
        return e;
      });
      this.charts.rows.map(e => {
        pageViews += e.pageViews * 1;
        return e;
      });

      transform = (transform / this.charts.rows.length).toFixed(2);
      average = (sacle / order).toFixed(2);

      this.rows[1].total = sacle;
      this.rows[2].total = order;
      this.rows[3].total = transform;
      this.rows[4].total = average;
      this.rows[5].total = noRepeatVisitors;
      this.rows[6].total = pageViews;
    },
    selectItem(item) {
      let arr = item.prop;
      if (this.charts.columns.includes(arr)) {
        if (this.charts.columns.length == 2) return;
        this.charts.columns = this.charts.columns.filter(e => e != arr);
      } else {
        if (this.charts.columns.length >= 5) return;
        this.charts.columns.push(arr);
      }
      item.check = !item.check;
    },
    addRows() {
      if (this.charts.rows.length == 25) return;
      let time = this.charts.rows.length;
      time = time < 10 ? "0" + time : time;
      this.formData.time = time == 24 ? "23:59" : time + ":00";
      let rows = {
        date: `2020-09-28 ${this.formData.time}`,
        sacle: parseInt(Math.random() * (this.formData.maxSacle * 1)),
        order: parseInt(Math.random() * (this.formData.maxOrder * 1)),
        transform: 0,
        average: 0,
        noRepeatVisitors: parseInt(
          Math.random() * (this.formData.maxNoRepeatVisitors * 1)
        ),
        pageViews: parseInt(Math.random() * (this.formData.maxPageViews * 1))
      };
      this.charts.rows.push(rows);
      this.tableChange();
    }
  }
};
</script>
<style lang='less' scoped>
.xipi {
  color: #333;
  position: relative;
  background: #f6f6f6;

  .head {
    height: 58px;

    overflow: hidden;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    background: #fff;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1);
    &.top {
      position: relative;
      z-index: 999;
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
          font-size: 14px;
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
          &:last-child {
            border-left: 1px solid #ccc;
            margin-left: 10px;
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
    .card {
      margin: 20px 0;
      padding: 20px;
      box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1);
      box-shadow: 10px;
      background: #fff;
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
        margin-bottom: 20px;
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
          padding: 15px 15px;
          flex: 1;
          margin: 0 5px;
          font-size: 14px;
          position: relative;
          overflow: hidden;
          .b {
            height: 50px;
            line-height: 50px;
            .price {
              font-size: 22px;
            }
          }
          .c {
            > * {
              font-size: 12px !important ;
              color: #999;
            }
            span:last-child {
              color: #444;
            }
            i {
              width: 12px;
              height: 12px;
              display: inline-block;
              vertical-align: sub;
            }
          }
        }
      }
      .charts {
        height: 350px;
        .top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
          span {
            padding: 0 10px;
          }
          span:last-child {
            color: #999;
          }
          i {
            display: inline-block;
            vertical-align: middle;
            width: 10px;
            height: 10px;
            border-radius: 50%;
          }
        }
      }
    }
    .border {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: transparent;
    }
  }
  .sort {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .card {
      * {
        font-size: 18px;
        .i {
          font-size: 14px;
          color: #2673dd;
        }
      }
      flex: 1;
      &.left {
        margin-right: 10px;
      }
      &.right {
        margin-left: 10px;
      }
    }
    .boxlist {
      border-bottom: 1px solid #ccc;
      .item {
        display: inline-block;
        font-size: 14px;
        text-align: center;
        padding: 0 15px;
        height: 45px;
        vertical-align: top;
        border-bottom: 2px solid transparent;
        i {
          display: inline-block;
          width: 15px;
          vertical-align: middle;
          color: #ccc;
          margin-left: 5px;
        }
        &:hover,
        &.active {
          border-color: #ee4d2d;
          color: #ee4d2d;
        }
      }
    }
  }
  .position-sticky {
    position: sticky;
    background: #fff;
    z-index: 99;
    top: 0px;
  }
  .theader {
    line-height: 40px;
    height: 40px;
    font-size: 14px;
    color: #666;
    border-color: #eee;
    background: #f6f6f6;
    border-radius: 4px 4px 0 0;
    border-top: none;
    display: flex;
    border-bottom: 1px solid #eee;
    margin-top: 15px;
    list-style-type: disc;
    list-style: none;
    & > * {
      font-size: 14px !important;
    }
    .rank {
      width: 84px;
      text-align: center;
      flex-shrink: 0;
      padding: 0 16px;
      box-sizing: border-box;
    }
    .info {
      flex: 1;
      padding: 0 8px;
    }
    .sales {
      padding: 0 16px;
      flex-shrink: 0;
      text-align: right;
    }
  }
}
</style>