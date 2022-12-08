<template>
  <div class="main">
    <div v-show="loading" class="loading" ref="loadingEle">
      <img src="../assets/images/loading-21.gif" alt="loading" srcset="" />
    </div>
    <div id="screen" class="map">
      <div class="m-header">
        <div class="h-left">
          <img
            class="h-l-img"
            src="../assets/images/h-t-bg2.png"
            alt=""
            srcset=""
          />
          <img src="../assets/images/h-t-bg.png" alt="" srcset="" />
          <img
            class="city-icon"
            src="../assets/images/city-icon.png"
            alt=""
            srcset=""
          />
          <img
            class="h-txt"
            src="../assets/images/h-txt.png"
            alt=""
            srcset=""
          />
        </div>
        <div class="h-right">{{ serverTime }}</div>
      </div>
      <div class="m-body">
        <div class="b-left">
          <div class="drug">
            <div class="left-item drug-item drug-1">
              <div class="title">
                <div class="t-icon"></div>
                <div class="t-txt">实时业务数据跟进</div>
              </div>
              <div class="content">
                <div class="con-item">
                  <div class="con-label">预约总量(单)</div>
                  <div ref="orderDrugNumEle" class="con-value">{{ orderData?.totalAppointments }}</div>
                </div>
                <div class="con-item">
                  <div class="con-label">取药总量(单)</div>
                  <div ref="getDrugNumEle" class="con-value">{{ orderData.totalTakeMedicine }}</div>
                </div>
                <div class="con-item">
                  <div class="con-label">待取总量(单)</div>
                  <div ref="readyGetDrugNumEle" class="con-value">{{ orderData.totalToBeTaken }}</div>
                </div>
              </div>
            </div>
            <div class="drug-item drug-2">
              <div class="title">
                <div class="t-icon"></div>
                <div class="t-txt">取药规律比例</div>
              </div>
              <div class="content">
                <div
                  class="drug-regular-echarts"
                  ref="drugRegularEchart"
                  v-chart-resize
                ></div>
              </div>
            </div>
          </div>
          <div class="year">
            <div class="title">
              <div class="t-icon"></div>
              <div class="t-txt">年度趋势</div>
              <div class="t-right"></div>
            </div>
            <div class="content">
              <div
                class="year-tread-chart"
                ref="yearTreadChart"
                v-chart-resize
              ></div>
            </div>
          </div>
          <div class="area">
            <!-- 辖区 -->
            <div class="title">
              <div class="t-icon"></div>
              <div class="t-txt">辖区情况</div>
              <div class="t-right"></div>
            </div>
            <div class="content">
              <div class="area-chart" ref="areaChart" v-chart-resize></div>
            </div>
          </div>
          <div class="disease">
            <div class="disease-item disease-1">
              <div class="title">
                <div class="t-icon"></div>
                <div class="t-txt">疾病排行</div>
                <div class="t-right"></div>
              </div>
              <div class="content">
                <div class="con" v-for="(item,index) in orderData.value.diseaseRanking" :key="index">
                  <div class="eq eq1">{{( index+1 )}}</div>
                  <div class="icon icon1"></div>
                  <div class="txt">{{ item.name }}</div>
                  <div class="value">{{ item.quantity }}</div>
                </div>
              </div>
            </div>
            <div class="disease-item disease-2">
              <div class="title">
                <div class="t-icon"></div>
                <div class="t-txt">供应情况</div>
                <div class="t-right"></div>
              </div>
              <div class="content">
                <div class="row row1">
                  <div class="r-item">
                    <div class="r-i-num">256</div>
                    <div class="r-i-txt">药瓶品种(种)</div>
                  </div>
                  <div class="r-item">
                    <div class="r-i-num">29</div>
                    <div class="r-i-txt">覆盖病种(种)</div>
                  </div>
                </div>
                <div class="row row2">
                  <div class="r-item">
                    <div class="r-i-num">0</div>
                    <div class="r-i-txt">缺货品种(种)</div>
                  </div>
                  <div class="r-item">
                    <div class="r-i-num">12.12</div>
                    <div class="r-i-txt">已售品种(万盒)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="b-center">
          <div class="b-center-bg"></div>
          <div class="city-list">
            <div class="c-selected">
              <div class="c-s-icon"></div>
              <div class="c-s-txt">成都市</div>
              <div class="arrow"></div>
            </div>
            <div class="c-options">
              <div class="c-item">呼和浩特</div>
              <div class="c-item">内蒙古</div>
            </div>
          </div>

          <div class="echart" ref="echartEle" v-chart-resize></div>
          <div class="get-drug-status">
            <div class="title">
              <div class="t-icon"></div>
              <div class="t-txt">取药状态</div>
              <div class="t-right"></div>
            </div>
            <div class="content">
              <div class="con-item">
                <div>张先生</div>
                <div>12盒</div>
                <div>￥123单.1</div>
                <div>11-12 12:10</div>
              </div>
              <div class="con-item">
                <div>张先生</div>
                <div>12盒</div>
                <div>￥123单.1</div>
                <div>11-12 12:10</div>
              </div>
              <div class="con-item">
                <div>张先生</div>
                <div>12盒</div>
                <div>￥123单.1</div>
                <div>11-12 12:10</div>
              </div>
            </div>
          </div>
        </div>
        <div class="b-right">
          <div class="content">
            <div class="con-item">
              <div class="num">2`384`901</div>
              <div class="txt txt1">规律管理(人)</div>
            </div>
            <div class="con-item">
              <div class="num">2`384`901</div>
              <div class="txt txt2">履约取药(次)</div>
            </div>
            <div class="con-item">
              <div class="num">2`384`901</div>
              <div class="txt txt3">交易金额(元)</div>
            </div>
            <div class="con-item">
              <div class="num">2`384`901</div>
              <div class="txt txt4">大病保障(人)</div>
            </div>
            <div class="con-item">
              <div class="num">2`384`901</div>
              <div class="txt txt5">保障总额(元)</div>
            </div>
          </div>
        </div>
        <div class="order">
          <div class="title">
            <div class="t-icon"></div>
            <div class="t-txt">预约轮盘</div>
            <div class="t-right"></div>
          </div>
          <div class="content">
            <div class="canlendar">
              <div class="week">
                <div class="can-item">周一</div>
                <div class="can-item">周二</div>
                <div class="can-item">周三</div>
                <div class="can-item">周四</div>
                <div class="can-item">周五</div>
                <div class="can-item">周六</div>
                <div class="can-item">周日</div>
              </div>
              <div class="day-panel">
                <div class="can-item">
                  <div class="ci-days">1</div>
                  <div class="ci-num">123单</div>
                </div>
                <div class="can-item">
                  <div class="ci-days">2</div>
                  <div class="ci-num">123单</div>
                </div>
                <div class="can-item">
                  <div class="ci-days">3</div>
                  <div class="ci-num">123单</div>
                </div>
                <div class="can-item">
                  <div class="ci-days">4</div>
                  <div class="ci-num">123单</div>
                </div>
                <div class="can-item">
                  <div class="ci-days">5</div>
                  <div class="ci-num">123单</div>
                </div>
                <div class="can-item">
                  <div class="ci-days">1</div>
                  <div class="ci-num">123单</div>
                </div>
                <div class="can-item">
                  <div class="ci-days">2</div>
                  <div class="ci-num">123单</div>
                </div>
                <div class="can-item">
                  <div class="ci-days">3</div>
                  <div class="ci-num">123单</div>
                </div>
                <div class="can-item">
                  <div class="ci-days">4</div>
                  <div class="ci-num">123单</div>
                </div>
                <div class="can-item">
                  <div class="ci-days">5</div>
                  <div class="ci-num">123单</div>
                </div>
                <div class="can-item">
                  <div class="ci-days">1</div>
                  <div class="ci-num">123单</div>
                </div>
                <div class="can-item">
                  <div class="ci-days">2</div>
                  <div class="ci-num">123单</div>
                </div>
                <div class="can-item">
                  <div class="ci-days">3</div>
                  <div class="ci-num">123单</div>
                </div>
                <div class="can-item">
                  <div class="ci-days">4</div>
                  <div class="ci-num">123单</div>
                </div>
                <div class="can-item">
                  <div class="ci-days">5</div>
                  <div class="ci-num">123单</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- <canvas id="myCanvas" :width="canvasSize" :height="canvasSize" ref="myCanvas"></canvas> -->
    </div>
  </div>
</template>
<script lang="ts" setup>
import 'echarts-gl'
import * as echarts from 'echarts'
import {
  ref,
  onMounted,
  onUnmounted,
  getCurrentInstance,
  onBeforeMount
} from 'vue'

import { getServerTime,getOrderStats } from '@/api/screen'
import { CountUp } from 'countup.js'
import dayjs from 'dayjs'


let loading = ref<boolean>(true)

const internalInstance = getCurrentInstance()
let fitChartSize =
  internalInstance?.appContext.config.globalProperties.$fitChartSize

let echartEle = ref<any>(null)

// 取药规律echarts
let drugRegularEchart = ref<any>(null)
async function initdrugRegularEchart(chartDom: any) {
  let myChart = echarts.init(chartDom.value)
  let option = {
    series: [
      {
        name: 'drugRegular',
        type: 'pie',
        color: [
          '#EE3831',
          {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#338FE5' // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#58B8F6' // 100% 处的颜色
              }
            ],
            global: false // 缺省为 false
          }
        ],
        startAngle: '0',
        avoidLabelOverlap: false,
        radius: ['50%', '70%'],
        label: {
          show: true,
          position: 'outside',
          color: '#178CE8',
          fontFamily: 'DIN Condensed-Bold',
          formatter: '{d}%\n{b}',
          distanceToLabelLine: 12
        },
        labelLayout: {
          moveOverlap: 'shiftY',
          fontSize: fitChartSize(20),
          align: 'center'
        },
        labelLine: {
          show: true,
          length: 10,
          length2: 10
        },

        data: [
          {
            value: (orderData.value.totalToBeTaken / orderData.value.totalTakeMedicine * 100).toFixed(0),
            name: '延期'
          },
          {
            value: (orderData.value.regularMedication / orderData.value.totalTakeMedicine * 100).toFixed(0),
            name: '规律'
          }
        ]
      }
    ]
  }

  myChart.setOption(option)
}
// 年度趋势

let yearTreadChart = ref<any>(null)

async function initYearTreadChart(chartDom: any) {

  let monthData:string[] = []
  let totalData:number[] = []
  let completedData:number[] = []
  orderData.value.annualTrends.forEach((item:any)=>{
    monthData.push(item.month+'月')
    totalData.push(item.total)
    completedData.push(item.completed)
  })

  let myChart = echarts.init(chartDom.value)
  let gridSizeX = '5%'
  let gridSizeY = '20%'
  let option: any = {
    grid: {
      x: gridSizeX,
      y: gridSizeY,
      x2: gridSizeX,
      y2: gridSizeY,
      left: 40
    },
    xAxis: {
      type: 'category',
      data: [
        '1月',
        '2月',
        '3月',
        '4月',
        '5月',
        '6月',
        '7月',
        '8月',
        '9月',
        '10月',
        '11月',
        '12月'
      ],
      axisLabel: {
        show: true,
        color: '#BACFF8',
        fontFamily: 'PingFang SC-Regular',
        fontSize: fitChartSize(14)
      }
    },
    yAxis: {
      type: 'value',
      show: true,
      axisLabel: {
        show: true,
        color: '#BACFF8',
        fontFamily: 'PingFang SC-Regular',
        fontSize: fitChartSize(14)
      }
    },
    legend: {
      show: true,
      data: ['预约', '取药'],
      textStyle: {
        fontFamily: 'PingFang SC-Regular',
        fontSize: fitChartSize(14),
        color: '#fff'
      },
      right: '5%'
    },

    slient: true,
    series: [
      {
        name: '预约',
        data: [135, 230, 224, 218, 135, 147, 260, 150, 230, 224, 218, 135],
        type: 'line'
      },
      {
        name: '取药',
        data: [50, 30, 124, 118, 35, 47, 60, 50, 30, 24, 18, 35],
        type: 'line'
      }
    ]
  }
  myChart.setOption(option)
}

let areaChart = ref<any>(null)
async function initAreaChart(chartDom: any) {
  // 辖区data
  let areaData:string[] = []
  let totalData:number[] = []
  let completedData:number[] = []
  orderData.value.jurisdiction.forEach((item:any)=>{
    areaData.push(item.area)
    totalData.push(item.total)
    completedData.push(item.completed)
  })
  
  let myChart = echarts.init(chartDom.value)
  let gridSizeX = '5%'
  let gridSizeY = '20%'
  let axisStyle = {
    color: '#BACFF8',
    fontFamily: 'PingFang SC-Regular',
    fontSize: fitChartSize(14)
  }
  let option: any = {
    grid: {
      x: gridSizeX,
      y: gridSizeY,
      x2: gridSizeX,
      y2: gridSizeY,
      left: 40
    },
    slient: true,
    color: [
      {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: '#FC655E' // 0% 处的颜色
          },
          {
            offset: 1,
            color: '#FDA49F' // 100% 处的颜色
          }
        ],
        global: false // 缺省为 false
      },
      {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: '#136CDA' // 0% 处的颜色
          },
          {
            offset: 1,
            color: '#62C7FC' // 100% 处的颜色
          }
        ],
        global: false // 缺省为 false
      }
    ],
    xAxis: {
      type: 'category',
      data: areaData,
      axisLabel: {
        show: true,
        ...axisStyle
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        show: true,
        ...axisStyle
      }
    },
    legend: {
      show: true,
      data: ['预约', '取药'],
      textStyle: {
        fontFamily: 'PingFang SC-Regular',
        fontSize: fitChartSize(14),
        color: '#fff'
      },
      right: '5%'
    },
    series: [
      {
        name: '预约',
        data: totalData,
        type: 'bar'
      },
      {
        name: '取药',
        data: completedData,
        type: 'bar'
      }
    ]
  }

  myChart.setOption(option)
}

async function initMapEchart(echartEle: any): Promise<void> {
  // 基于准备好的dom，初始化echarts实例
  let myChart = echarts.init(echartEle.value)
  myChart.showLoading()

  // 获取json数据
  const wh_jsonData: any = await fetch('https://geo.datav.aliyun.com/areas_v3/bound/340200_full.json').then(res=>{
    return res.json()
  })
    



  

  echarts.registerMap('areaMap', wh_jsonData as any)

  var regions = wh_jsonData.features.map(function (feature: any) {
    return {
      name: feature.properties.name,
      itemStyle: {
        color: Math.random() > 0.5 ? '#6AD2FF' : '#00fcfc'
      }
    }
  })

  let options = {
   
    series: [
      {
        type: 'map3D',
        show: true,
        silent: true,
        map: 'areaMap',
        z: 10,
        viewControl: {
          //用于鼠标的旋转，缩放等视角控制
          autoRotate: false,
          distance: 110,
          alpha: 40,
          zoomSensitivity: 0,
          panSensitivity: 0
        },

        regionHeight: 5.1,
        groundPlane: {
          show: false,
          realisticMaterial: {
            textureOffset: 0,
            detailTexture: '/web-bg.png'
          },
          color: '#fff'
          //
        },

        label: {
          show: true,
          color: 'white',
          fontSize: 14,
          fontWeight: 'bold',
          lineHeight: 20
        },
        itemStyle: {
          // color: '',
          borderWidth: 1,
          borderColor: 'rgb(0, 252, 252)'
        },
        regions: regions,
        shading: 'realistic',
        realisticMaterial: {
          detailTexture: '/map-wl11.jpg',
          roughness: 0.2,
          textureOffset: 0
        },
        light: {
          main: {
            color: '#fff',
            shadow: true,
            alpha: 30,
            beta: 40
          }
        },
        ambient: {
          color: '#000',
          intensity: 0.5
        }
      }
    ]
  }

  myChart.setOption(options as any)
  myChart.hideLoading()

  // 监听浏览器窗口的变化
  window.onresize = function () {
    myChart.resize()
  }
}




// 以下为动画函数
let orderDrugNumEle = ref<HTMLElement>()
function numberAnimate(refEle: HTMLElement,num:number) {
  console.log('refEle:',refEle)
  const countUp = new CountUp(refEle, num)
  if (!countUp.error) {
    countUp.start()
  } else {
    console.error(countUp.error)
  }
  return countUp
}



// 默认使用芜湖数据
let cityId = ref<number>(340200)
let serverTime= ref<string>()
let orderData = ref<any>({})


async function getOrderDataFn(){
  // 获取订单数据
  orderData.value = await getOrderStats(cityId.value)
}


onBeforeMount(async () => {

  console.log('onBeforeMount')
  // 以下是接口请函数
  // 开始本地计时,避免重复请求接口
  let timeHandler:any = null
  function startCountTime(timeStamp:number){
    
    timeHandler = setTimeout(()=>{
      timeStamp+= 1000
      serverTime.value = dayjs(timeStamp).format('YYYY-MM-DD HH:mm:ss')
      startCountTime(timeStamp)
    },1000)
    
  }

  // 获取系统时间
  async function getServerTimeFn() {
    let res = await getServerTime()
    serverTime.value = res.dateTime
    let timeStamp = (new Date(res.dateTime)).getTime()
    if(timeHandler){
      clearTimeout(timeHandler)
    }
    startCountTime(timeStamp)
  }
  getServerTimeFn()
  // 每一天从服务器请求下，更新下时间
  setInterval(getServerTimeFn,86400)

})
onMounted(() => {
  // console.log('orderData.value:',orderData.value)
  
  Promise.all([getOrderDataFn()]).then(()=>{
    setTimeout(()=>{
      initdrugRegularEchart(drugRegularEchart)
      initYearTreadChart(yearTreadChart)
      initAreaChart(areaChart)
      initMapEchart(echartEle)
      setTimeout(()=>{
        loading.value = false
      },1000)
      
      setTimeout(() => {
        numberAnimate(orderDrugNumEle.value as HTMLElement,23478)
      }, 2000)
    },0)
  })
  
  
  

})
onUnmounted(() => {
  window.onresize = null
})
</script>
<style lang="scss" scoped>
@keyframes rotate {
  0% {
    -webkit-transform: rotate(0deg);
  }
  25% {
    -webkit-transform: rotate(90deg);
  }
  50% {
    -webkit-transform: rotate(180deg);
  }
  75% {
    -webkit-transform: rotate(270deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
.main{
  width: 100%;
  height: vh(1080);
  background-color: #041229;
}
.loading{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #041229;
  z-index: 1000;
}

.map {
  width: 100%;
  height: vh(1080);
  margin: auto;
  background-color: #041229;
  padding: 0px vw(30);
  box-sizing: border-box;
  background-image: url('../assets/images/h-bar.png');
  background-repeat: no-repeat;
  background-size: vw(1920) vh(108);
  font-family: 'DIN Condensed-Bold';
  color: #bacff8;
  .title {
    width: 100%;
    padding-left: vw(12);
    padding-right: vw(12);
    display: flex;
    align-items: center;
    height: vh(44);
    border-bottom: 1px dashed #2a596d;
    box-sizing: border-box;
    .t-icon {
      width: vw(28);
      height: vw(28);
      background-size: 100% 100%;
    }
    .t-txt {
      margin-left: vw(10);
      font-size: vw(20);
      font-family: 'PingFang SC-Medium';
      font-weight: 500;
      color: #bacff8;
    }
  }
  .m-header {
    width: 100%;
    height: vh(108);
    padding-top: vh(24);
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    .h-left {
      position: relative;
      img {
        width: vw(550);
        height: vh(72);
      }
      .h-l-img {
        position: absolute;
        left: vw(50);
        top: 0;
      }
      .h-txt {
        position: absolute;
        width: vw(324);
        height: vh(42);
        left: vw(100);
        top: vh(10);
      }
      .city-icon {
        width: vw(48);
        height: vw(48);
        position: absolute;
        left: vw(40);
        top: vh(7);
      }
    }
    .h-right {
      font-size: vw(24);
      font-family: 'DIN Condensed-Bold';
      font-weight: bold;
      color: #a5b2ca;
      line-height: 0;
      margin-top: vh(12);
    }
  }
  .m-body {
    margin-top: vh(16);
    position: relative;
    width: 100%;
    height: 87vh;
    display: flex;
    align-items: center;
    // justify-content: space-between;
    .b-left {
      width: vw(550);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      height: inherit;
      // 多个块公用title格式

      .drug {
        width: inherit;
        height: vh(190);
        display: flex;
        align-items: center;
        justify-content: space-between;
        .drug-item {
          width: vw(270);
          height: inherit;
          background-image: url('../assets/images/b-l-1.png');
          background-repeat: no-repeat;
          background-size: 100% 100%;
          &.drug-1 {
            .t-icon {
              background-image: url('../assets/images/b-l-time.png');
            }
          }
          &.drug-2 {
            .t-icon {
              background-image: url('../assets/images/b-l-time.png');
            }
          }
        }
        .content {
          height: vh(146);
          padding: 0 vw(20);
          font-size: vw(14);
          font-family: 'PingFang SC-Regular', 'PingFang SC';
          font-weight: 400;
          color: #a1bbef;
          display: flex;
          // align-items: center;
          flex-direction: column;
          justify-content: space-evenly;
          .con-item {
            display: flex;
            align-items: center;
            .con-label {
            }
            .con-value {
              margin-left: vw(12);
              font-size: vw(30);
              font-family: 'DIN Condensed-Bold';
              font-weight: bold;
              color: #6ad2ff;
            }
          }
        }
        .drug-regular-echarts {
          width: 100%;
          height: vh(144);
          canvas{
            width: 100%;
            height: 100%;
          }
        }
      }
      .year {
        width: inherit;
        margin-top: vh(12);
        height: vh(228);
        background-size: 100% 100%;
        background-image: url('../assets/images/b-l-y-bg.png');
        box-sizing: border-box;
        .title {
          .t-icon {
            background-image: url('../assets/images/y-t-icon.png');
          }
          .t-right {
            width: vw(135);
            height: vh(22);
            background-size: 100%;
            background-image: url('../assets/images/y-right.png');
            order: 1;
            margin-left: auto;
          }
        }
        .content {
          height: vh(184);
          .year-tread-chart {
            width: 100%;
            height: vh(184);
          }
        }
      }
      .area {
        width: inherit;
        margin-top: vh(12);
        height: vh(240);
        background-size: 100% 100%;
        background-image: url('../assets/images/b-l-qu.png');
        box-sizing: border-box;
        .title {
          .t-icon {
            background-image: url('../assets/images/b-l-qu-icon.png');
          }
          .t-right {
            width: vw(135);
            height: vh(22);
            background-size: 100%;
            background-image: url('../assets/images/y-right.png');
            order: 1;
            margin-left: auto;
          }
        }
        .content {
          height: vh(196);
          .area-chart {
            width: 100%;
            height: inherit;
          }
        }
      }
      .disease {
        width: inherit;
        margin-top: vh(12);
        height: vh(233);
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .disease-item {
          width: vw(270);
          height: vh(233);
          background-size: 100% 100%;
          background-repeat: no-repeat;
        }
        .disease-1 {
          background-size: 100% 100%;
          background-image: url('../assets/images/b-l-disease-bg.png');
          .t-icon {
            background-image: url('../assets/images/b-l-disease-icon.png');
          }
          .content {
            width: 100%;
            height: vh(196);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-evenly;
            font-size: 14px;
            font-family: 'PingFang SC-Regular';
            font-weight: 400;
            color: #bacff8;
            .con {
              height: vh(30);
              width: 100%;
              display: flex;
              align-items: center;
              padding-left: vw(14);
              padding-right: vw(14);
              box-sizing: border-box;
              &:nth-of-type(even) {
                background-color: rgba(23, 140, 232, 0.1);
              }
              .eq {
                color: #178ce8;
                opacity: 0.4;
                &.eq1,
                &.eq2,
                &.eq3 {
                  color: #fd918b;
                }
              }
              .icon {
                width: vw(16);
                height: vw(16);
                background-size: 100% 100%;
                background-repeat: no-repeat;
                margin-left: vw(10);
                &.icon1 {
                  background-image: url('../assets/images/gxy.png');
                }
                &.icon2 {
                  background-image: url('../assets/images/tnb.png');
                }
                &.icon3 {
                  background-image: url('../assets/images/gxb.png');
                }
                &.icon4 {
                  background-image: url('../assets/images/fy.png');
                }
                &.icon5 {
                  background-image: url('../assets/images/nxg.png');
                }
                &.icon6 {
                  background-image: url('../assets/images/zl.png');
                }
              }
              .txt {
                margin-left: vw(10);
                word-break: keep-all;
                overflow: hidden;
                width: 6vw;
                text-overflow: ellipsis;
              }
              .value {
                color: #178ce8;
                opacity: 0.4;
                margin-left: auto;
                
              }
            }
          }
        }
        .disease-2 {
          background-size: 100% 100%;
          background-image: url('../assets/images/b-l-disease-bg.png');
          .t-icon {
            background-image: url('../assets/images/b-l-disease-gongyin.png');
          }
          .content {
            height: vh(196);
            .row {
              width: 100%;
              height: 50%;
              display: flex;
              align-items: center;

              .r-item {
                width: 50%;
                text-align: center;
                .r-i-num {
                  font-size: vw(30);
                  font-family: 'DIN Condensed-Bold';
                  font-weight: bold;
                  color: #6ad2ff;
                }
                .r-i-txt {
                  font-size: vw(14);
                  font-family: 'PingFang SC-Regular';
                  font-weight: 400;
                  color: #bacff8;
                }
              }
            }
          }
        }
      }
    }
    .b-center {
      width: 60vw;
      position: relative;
      height: inherit;
      margin-left: vw(12);
      overflow: hidden;
      .b-center-bg {
        position: absolute;
        top: -vh(20);
        left: vw(50);
        width: vw(1000);
        height: vw(1000);
        background-size: 100%;
        background-repeat: no-repeat;
        background-image: url('/web-bg.png');
        animation: rotate 120s linear infinite;
        // border:1px solid red;
      }
      .city-list {
        position: absolute;
        top: 0;
        left: 0;
        width: vw(190);

        .c-selected {
          width: inherit;
          height: vh(44);
          display: flex;
          align-items: center;
          border: 1px solid rgba(113, 161, 255, 1);
          padding-left: vw(12);
          padding-right: vw(12);
          box-sizing: border-box;
          .c-s-icon {
            width: vw(28);
            height: vw(28);
            background-size: 100%;
            background-image: url('../assets/images/address.png');
          }
          .c-s-txt {
            margin-left: vw(12);
            font-size: vw(28);
            font-family: 'PingFang SC-Semibold';
            font-weight: 600;
            color: #bacff8;
          }
          .arrow {
            margin-left: vw(20);
            width: vw(10);
            height: vw(8);
            background-image: url('../assets/images/arrow.png');
            background-size: 100% 100%;
          }
        }
        .c-options {
          width: inherit;
          margin-top: 9px;
          .c-item {
            width: inherit;
            height: vh(28);
            text-align: center;
            line-height: vh(28);
            background: rgba(113, 161, 255, 0.3);
            font-size: vw(14);
            font-family: 'PingFang SC-Regular';
            font-weight: 400;
            color: #bacff8;
            &:nth-child(even) {
              background: rgba(113, 161, 255, 0.4);
            }
          }
        }
      }
      .get-drug-status {
        position: absolute;
        left: 0px;
        bottom: 0px;
        width: vw(312);
        height: vh(150);
        background-image: url('../assets/images/b-c-drug-bg.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        .t-icon {
          background-image: url('../assets/images/b-c-drug-icon.png');
        }
        .content {
          width: inherit;
          font-size: vw(14);
          font-family: 'PingFang SC-Regular';
          font-weight: 400;
          color: rgba(186, 207, 248, 1);
          .con-item {
            width: inherit;
            height: vh(28);
            padding-left: vw(10);
            padding-right: vw(10);
            display: flex;
            line-height: vh(28);
            justify-content: space-between;
            box-sizing: border-box;
            &:nth-of-type(even) {
              background: rgba(113, 161, 255, 0.3);
            }
          }
        }
      }
      .echart {
        width: 100%;
        height: 100%;
      }
    }
    .b-right {
      position: absolute;
      height: inherit;
      width: vw(200);
      top: 0;
      right: 0;

      .content {
        text-align: right;
        .con-item {
          margin-bottom: vh(20);
          .num {
            font-size: vw(44);
            font-family: 'DIN Condensed-Bold';
            font-weight: bold;
            color: #70fdfd;
          }
          .txt {
            margin-top: vh(-5);
            font-size: vw(14);
            font-family: 'PingFang SC-Regular';
            font-weight: 400;
            color: #bacff8;

            &:before {
              content: '';
              display: inline-block;
              width: vw(14);
              height: vh(14);
              margin-right: vw(5);
              background-repeat: no-repeat;
              background-size: 100% 100%;
            }
            &.txt1 {
              &:before {
                background-image: url('../assets/images/person-icon.png');
              }
            }
            &.txt2 {
              &:before {
                background-image: url('../assets/images/drug.png');
              }
            }
            &.txt3 {
              &:before {
                background-image: url('../assets/images/money.png');
              }
            }
            &.txt4 {
              &:before {
                background-image: url('../assets/images/bz.png');
              }
            }
            &.txt5 {
              &:before {
                background-image: url('../assets/images/money2.png');
              }
            }
          }
        }
      }
    }
    .order {
      width: vw(360);
      height: vh(376);
      position: absolute;
      bottom: 0;
      right: 0;
      background-image: url('../assets/images/order-bg.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      .title {
        background: rgba(23, 140, 232, 0.3);
        .t-icon {
          background-image: url('../assets/images/b-c-drug-icon.png');
        }
        .t-right {
          width: vw(135);
          height: vh(22);
          background-size: 100%;
          background-image: url('../assets/images/y-right.png');
          order: 1;
          margin-left: auto;
        }
      }
      .content {
        width: 100%;
        height: vh(332);
        margin: auto;
        background: rgba(23, 140, 232, 0.3);
        .canlendar {
          .can-item {
            width: vw(44);
            height: vh(40);
            text-align: center;

            .ci-month {
              font-size: vw(11);
              font-family: 'PingFang SC-Regular';
              font-weight: 400;
              color: #fc7f79;
            }
            .ci-days {
              font-size: vw(14);
              font-family: 'PingFang SC-Medium';
              font-weight: 500;
              color: #ffffff;
            }
            .ci-num {
              font-size: vw(11);
              font-family: 'PingFang SC-Regular';
              font-weight: 400;
              color: #51b0f3;
            }
          }
          .week {
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            .can-item {
              text-align: center;
              line-height: vh(40);
            }
          }
          .day-panel {
            display: grid;
            grid-template-columns: repeat(7, vw(44));
            grid-template-rows: repeat(5, vh(60));
            justify-content: space-evenly;
          }
        }
      }
    }
  }
}
</style>
