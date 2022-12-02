<template>
  <div id="screen" class="map">
    <div class="m-header">
      <div class="h-left">
        <img class="h-l-img" src="../assets/images/h-t-bg2.png" alt="" srcset="">
        <img src="../assets/images/h-t-bg.png" alt="" srcset="">
        <img class="h-txt" src="../assets/images/h-txt.png" alt="" srcset="">
      </div>
      <div class="h-right">
        2022-01-12 12:23:12
      </div>
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
                <div class="con-value">23347813</div>
              </div>
              <div class="con-item">
                <div class="con-label">取药总量(单)</div>
                <div class="con-value">23347813</div>
              </div>
              <div class="con-item">
                <div class="con-label">待取总量(单)</div>
                <div class="con-value">23347</div>
              </div>
            </div>
          </div>
          <div class="drug-item drug-2">
            <div class="title">
              <div class="t-icon"></div>
              <div class="t-txt">取药规律比例</div>
            </div>
            <div class="content">
              <div class="drug-regular-echarts" ref="drugRegularEchart" v-chart-resize></div>
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
            <div class="year-tread-chart" ref="yearTreadChart" v-chart-resize></div>
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
              <div class="con">
                <div class="eq eq1">1</div>
                <div class="icon icon1"></div>
                <div class="txt">高血压</div>
                <div class="value">378498</div>
              </div>
              <div class="con">
                <div class="eq eq2">2</div>
                <div class="icon icon2"></div>
                <div class="txt">糖尿病</div>
                <div class="value">378498</div>
              </div>
              <div class="con">
                <div class="eq eq3">3</div>
                <div class="icon icon3"></div>
                <div class="txt">糖尿病</div>
                <div class="value">378498</div>
              </div>
              <div class="con">
                <div class="eq">4</div>
                <div class="icon icon4"></div>
                <div class="txt">糖尿病</div>
                <div class="value">378498</div>
              </div>
              <div class="con">
                <div class="eq">5</div>
                <div class="icon icon5"></div>
                <div class="txt">糖尿病</div>
                <div class="value">378498</div>
              </div>
              <div class="con">
                <div class="eq">6</div>
                <div class="icon icon6"></div>
                <div class="txt">糖尿病</div>
                <div class="value">378498</div>
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
        <div class="echart" ref="echartEle" v-chart-resize></div>
      </div>
      <div class="b-right"></div>
    </div>

    
    <!-- <canvas id="myCanvas" :width="canvasSize" :height="canvasSize" ref="myCanvas"></canvas> -->
  </div>
</template>
<script lang="ts" setup>
import 'echarts-gl'
import * as echarts from 'echarts'
import { ref,onMounted,onUnmounted ,getCurrentInstance } from 'vue'
import { http } from '@/api/index'


const internalInstance = getCurrentInstance()
let fitChartSize = internalInstance?.appContext.config.globalProperties.$fitChartSize

let echartEle = ref<any>(null)

// 取药规律echarts
let drugRegularEchart = ref<any>(null)
async function initdrugRegularEchart(chartDom:any) {
  let myChart = echarts.init(chartDom.value)
  let option = {
    series:[
      {
        name:'drugRegular',
        type:'pie',
        color:[
          '#EE3831',
          {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
                offset: 0, color: '#328EE4' // 0% 处的颜色
            }, {
                offset: 1, color: '#52B1F3' // 100% 处的颜色
            }],
            global: false // 缺省为 false
          }
        ],
        startAngle:'0',
        avoidLabelOverlap:false,
        radius:['40%','70%'],
        label: {
          show: true,
          position:'outside',
          color:'#178CE8',
          fontFamily:'DIN Condensed-Bold',
          formatter:'{d}%\n{b}',
          distanceToLabelLine:12,
        },
        labelLayout:{
          
          moveOverlap:'shiftY',
          fontSize:fitChartSize(20),
          align:'center'
        },
        labelLine: {
          show: true,
          length:10,
          length2:10
        },
        
        data:[
          {
            value:"20",name:'延期'
          },
          {
            value:"80",name:'规律'
          }
        ]
      }
    ]
  }

  myChart.setOption(option)
}
// 年度趋势

let yearTreadChart = ref<any>(null)

async function initYearTreadChart(chartDom:any) {
  let myChart = echarts.init(chartDom.value)
  let gridSizeX = '5%'
  let gridSizeY = '20%'
  let axisStyle = {
    color:'#BACFF8',
    fontFamily:'PingFang SC-Regular',
    fontSize:fitChartSize(14)
  }
  let option:any =  {
    grid:{
      x:gridSizeX,
      y:gridSizeY,
      x2:gridSizeX,
      y2:gridSizeY,
      left:40
    },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月','8月','9月','10月','11月','12月'],
      axisLabel:{
        show:true,
        ...axisStyle
      },
    },
    yAxis: {
      type: 'value',
      show:true,
      axisLabel:{
        show:true,
        ...axisStyle
      },
    },
    legend:{
      show:true,
      data:['预约','取药'],
      textStyle:{
        fontFamily:'PingFang SC-Regular',
        fontSize:fitChartSize(14),
        color:'#fff'
      },
      right:'5%'
    },
    
    slient:true,
    series: [
      {
        name:'预约',
        data: [135, 230, 224, 218, 135, 147, 260,150, 230, 224, 218, 135],
        type: 'line'
      },
      {
        name:'取药',
        data: [50, 30, 124, 118, 35, 47, 60,50, 30, 24, 18, 35],
        type: 'line'
      }
    ]
  };
  myChart.setOption(option)
}

let areaChart = ref<any>(null)
async function initAreaChart(chartDom:any) {
  let myChart = echarts.init(chartDom.value)
  let gridSizeX = '5%'
  let gridSizeY = '20%'
  let axisStyle = {
    color:'#BACFF8',
    fontFamily:'PingFang SC-Regular',
    fontSize:fitChartSize(14)
  }
  let option:any = {
    grid:{
      x:gridSizeX,
      y:gridSizeY,
      x2:gridSizeX,
      y2:gridSizeY,
      left:40
    },
    slient:true,
    color:[
      {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
            offset: 0, color: '#FC655E' // 0% 处的颜色
        }, {
            offset: 1, color: '#FDA49F' // 100% 处的颜色
        }],
        global: false // 缺省为 false
      },
      {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
            offset: 0, color: '#136CDA' // 0% 处的颜色
        }, {
            offset: 1, color: '#62C7FC' // 100% 处的颜色
        }],
        global: false // 缺省为 false
      }
    ],
    xAxis: {
      type: 'category',
      data: ['朝阳区', '东城区', '西城区', '平谷区', '密云区', '海淀区'],
      axisLabel:{
      show:true,
        ...axisStyle
      },
    },
    yAxis: {
      type: 'value',
      axisLabel:{
      show:true,
        ...axisStyle
      },
    },
    legend:{
      show:true,
      data:['预约','取药'],
      textStyle:{
        fontFamily:'PingFang SC-Regular',
        fontSize:fitChartSize(14),
        color:'#fff'
      },
      right:'5%'
    },
    series: [
      {
        name:'预约',
        data: [120, 200, 150, 80, 70, 110],
        type: 'bar'
      },
      {
        name:'取药',
        data: [100, 210, 120, 150, 20, 100],
        type: 'bar'
      }
    ]
  };

  myChart.setOption(option);
}

async function initMapEchart(echartEle: any): Promise<void> {
  // 基于准备好的dom，初始化echarts实例
  let myChart = echarts.init(echartEle.value)
  myChart.showLoading()

  // 获取json数据
  const wh_jsonData: any = await http.request(
    'get',
    'https://geo.datav.aliyun.com/areas_v3/bound/340200_full.json'
  )

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
    // backgroundColor:'#f00',
    backgroundImage:'/map-bg2.png',
    series: [
      
      {
        type: 'map3D',
        show: true,
        silent: true,
        map: 'areaMap',
        viewControl: {
          //用于鼠标的旋转，缩放等视角控制
          autoRotate: false,
          distance: 110,
          alpha:40,
          zoomSensitivity: 0,
          panSensitivity: 0
        },
        regionHeight: 5.1,
        groundPlane: {
          show: false,
          realisticMaterial: {
            textureOffset: 0,
            detailTexture: '/map-bg2.png'
            // normalTexture:'/map_bg.png'
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
          borderColor: 'rgb(0, 252, 252)',
          // normal: {
          //     color: new echarts.graphic.LinearGradient(
          //         1, 0, 0, 1,
          //         [{offset: 0, color: '#f00'},
          //         {offset: 0.5, color: '#0f8'},
          //         {offset: 1, color: '#ddd'}]
          //     )
          // }
          // borderColor: {
          //           "type": "linear",
          //           "x": 0,
          //           "y": 0,
          //           "x2": 0,
          //           "y2": 1,
          //           "colorStops": [
          //               {
          //                   "offset": 0,
          //                   "color": "#00fff2"
          //               },
          //               {
          //                   "offset": 1,
          //                   "color": "#194874"
          //               }
          //           ],
          //           "globalCoord": false
          //       }

        },
        // regions:[
        //   {
        //     name:'繁昌区',
        //     itemStyle:{
        //       color:'#f00',
        //     }
            
        //     // normal: {
        //     //     areaColor: { //地图色
        //     //         type: 'linear',
        //     //         x: 0,
        //     //         y: 1,
        //     //         x2: 0,
        //     //         y2: 0,
        //     //         colorStops: [{
        //     //             offset: 0, color: '#003ddf' // 0% 处的颜色
        //     //         }, {
        //     //             offset: 1, color: '#0069e6' // 100% 处的颜色
        //     //         }],
        //     //         global: false // 缺省为 false
        //     //     },
        //     // },

        //   }
        // ],
        regions: regions,
        shading: 'realistic',
        realisticMaterial: {
          detailTexture: '/map-wl11.jpg',
          
          roughness: 0.2,
          textureOffset: 0
        },
        // postEffect: {
        //   enable: true,
        //   bloom: {
        //     enable: false
        //   },
        //   SSAO: {
        //     enable: true,
        //     quality: 'medium',
        //     radius: 10,
        //     intensity: 1.2
        //   },
        //   depthOfField: {
        //     enable: false,
        //     focalRange: 5,
        //     fstop: 1,
        //     blurRadius: 6
        //   }
        // },
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
        },
        
      },
      // {
      //   type: 'map3D',
      //   show: false,
      //   silent: true,
      //   map: 'areaMap',
      //   left:1,
      //   top:1,
        
      //   regionHeight: 5,
      //   shading: 'realistic',
      //   realisticMaterial: {
      //     detailTexture: myCanvas.value.toDataURL(),
      //     roughness: 0.2,
      //     textureOffset: 0
      //   },
      //   viewControl: {
      //     autoRotate: false,
      //     distance: 110,
      //     alpha:80,
      //     zoomSensitivity: 0,
      //     panSensitivity: 0
      //   },
      //   itemStyle: {
      //     color: '#6AD2FF',
      //     borderWidth: '2',
      //     borderColor: '#00fcfc'
      //   },
       
      //   light: {
      //     main: {
      //       color: '#fff',
      //       shadow: true,
      //       alpha: 30,
      //       beta: 40
      //     }
      //   },
      //   ambient: {
      //     color: '#fff',
      //     intensity: 0.5
      //   }
      // },
    ]
  }

  myChart.setOption(options as any)
  myChart.hideLoading()

  // 监听浏览器窗口的变化
  window.onresize = function () {
    myChart.resize()
  }
}


onMounted(() => {
  initdrugRegularEchart(drugRegularEchart)
  initYearTreadChart(yearTreadChart)
  initAreaChart(areaChart)
  initMapEchart(echartEle)
})
onUnmounted(()=>{
  window.onresize = null
})
</script>
<style lang="scss" scoped>
.map {
  width: 100%;
  height: vh(1080);
  margin: auto;
  background-color: #041229;
  padding:0px vw(30);
  box-sizing: border-box;
  background-image: url('../assets/images/h-bar.png');
  background-repeat: no-repeat;
  background-size: vw(1920) vh(108);
  font-family: "DIN Condensed-Bold";
  .m-header{
    width: 100%;
    height: vh(108);
    padding-top: vh(24);
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    .h-left{
      position: relative;
      img{
        width: vw(550);
        height: vh(72);
      }
      .h-l-img{
        position: absolute;
        left:vw(50);
        top:0;
      }
      .h-txt{
        position: absolute;
        width: vw(324);
        height: vh(42);
        left: vw(100);
        top: vh(10);

      }
    }
    .h-right{
      font-size: vw(24);
      font-family: "DIN Condensed-Bold";
      font-weight: bold;
      color: #A5B2CA;
      line-height: 0;
      margin-top:vh(12);
    }
  }
  .m-body{
    margin-top:vh(16);
    .b-left {
      width: vw(550);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      // 多个块公用title格式
      .title{
        width: 100%;
        padding-left:  vw(12);
        padding-right:  vw(12);
        display: flex;
        align-items: center;
        height: vh(44);
        border-bottom: 1px dashed #2A596D;
        box-sizing: border-box;
        .t-icon{
          width: vw(28);
          height: vw(28);
          background-size:100% 100%;
        }
        .t-txt{
          margin-left:vw(10);
          font-size: vw(20);
          font-family: "PingFang SC-Medium";
          font-weight: 500;
          color: #BACFF8;
        }
        
      }
      .drug{
        width: inherit;
        height: vh(190);
        display: flex;
        align-items: center;
        justify-content: space-between;
        .drug-item{
          width: vw(270);
          height: inherit;
          background-image:url("../assets/images/b-l-1.png");
          background-repeat: no-repeat;
          background-size: 100% 100%;
          &.drug-1{
            .t-icon{
              background-image:url("../assets/images/b-l-time.png");
            }
          }
          &.drug-2{
            .t-icon{
              background-image:url("../assets/images/b-l-time.png");
            }
          }
          
        }
        .content{
          height: vh(146);
          padding:0 vw(20);
          font-size: vw(14);
          font-family: "PingFang SC-Regular", "PingFang SC";
          font-weight: 400;
          color: #A1BBEF;
           display: flex;
          // align-items: center;
          flex-direction: column;
          justify-content: space-evenly;
          .con-item{
            display: flex;
            align-items: center;
            .con-label{

            }
            .con-value{
              margin-left: vw(12);
              font-size: vw(30);
              font-family: "DIN Condensed-Bold";
              font-weight: bold;
              color: #6AD2FF;
            }
          }
        }
        .drug-regular-echarts{
          width: 100%;
          height: vh(144);
        }

      }
      .year{
        width: inherit;
        margin-top:vh(12);
        height: vh(228);
        background-size: 100% 100%;
        background-image: url("../assets/images/b-l-y-bg.png"); 
        box-sizing: border-box;
        .title{
          .t-icon{
            background-image: url("../assets/images/y-t-icon.png"); 
          }
          .t-right{
            width: vw(135);
            height: vh(22);
            background-size: 100%;
            background-image: url("../assets/images/y-right.png"); 
            order: 1;
            margin-left: auto;
          }
        }
        .content{
          height: vh(184);
          .year-tread-chart{
            width: 100%;
            height: vh(184);
          }
        }
        
      }
      .area{
        width: inherit;
        margin-top:vh(12);
        height: vh(240);
        background-size: 100% 100%;
        background-image: url("../assets/images/b-l-qu.png"); 
        box-sizing: border-box;
        .title{
          .t-icon{
            background-image: url("../assets/images/b-l-qu-icon.png"); 
          }
          .t-right{
            width: vw(135);
            height: vh(22);
            background-size: 100%;
            background-image: url("../assets/images/y-right.png"); 
            order: 1;
            margin-left: auto;
          }
        }
        .content{
          height: vh(196);
          .area-chart{
            width: 100%;
            height: inherit;
          }
        }
       
      }
      .disease{
        width: inherit;
        margin-top:vh(12);
        height: vh(233);
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .disease-item{
          width: vw(270);
          height: vh(233);
          background-size: 100% 100%;
          background-repeat: no-repeat;
        }
        .disease-1{
          background-size: 100% 100%;
          background-image: url("../assets/images/b-l-disease-bg.png"); 
          .t-icon{
            background-image: url("../assets/images/b-l-disease-icon.png"); 
          }
          .content{
            
            width: 100%;
            height: vh(196);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-evenly;
            font-size: 14px;
            font-family: "PingFang SC-Regular";
            font-weight: 400;
            color: #BACFF8;
            .con{
              height:vh(30);
              width: 100%;
              display: flex;
              align-items: center;
              padding-left:vw(14);
              padding-right:vw(14);
              box-sizing: border-box;
              &:nth-of-type(even){
                background-color:rgba(23, 140, 232, 0.1);
              }
              .eq{
                color:#178CE8;
                opacity: 0.4;
                &.eq1,&.eq2,&.eq3{
                  color:#FD918B;
                }
              }
              .icon{
                width: vw(16);
                background-size: 100% 100%;
                background-repeat: no-repeat;
                margin-left:vw(10);
                &.icon1{
                  background-image: url("../assets/images/gxy.png"); 
                }
                &.icon2{
                  background-image: url("../assets/images/tnb.png"); 
                }
                &.icon3{
                  background-image: url("../assets/images/gxb.png"); 
                }
                &.icon4{
                  background-image: url("../assets/images/fy.png"); 
                }
                &.icon5{
                  background-image: url("../assets/images/nxg.png"); 
                }
                &.icon5{
                  background-image: url("../assets/images/zl.png"); 
                }
              }
              .txt{
                margin-left:vw(10);
              }
              .value{
                color:#178CE8;
                opacity: 0.4;
                margin-left: auto;
              }
            }
          }
        }
        .disease-2{
          background-size: 100% 100%;
          background-image: url("../assets/images/b-l-disease-bg.png"); 
          .t-icon{
            background-image: url("../assets/images/b-l-disease-gongyin.png"); 
          }
          .content{
            height: vh(196);
            .row{
              width: 100%;
              height: 50%;
              display: flex;
              align-items: center;

              .r-item{
                width: 50%;
                text-align: center; 
                .r-i-num{
                  font-size: vw(30);
                  font-family: "DIN Condensed-Bold";
                  font-weight: bold;
                  color: #6AD2FF;
                }
                .r-i-txt{
                  font-size: vw(14);
                  font-family: "PingFang SC-Regular";
                  font-weight: 400;
                  color: #BACFF8;
                  margin-top:vh(10)
                } 
              }
            }
            
          }
        }
      }
    }
  }

  // .echart {
  //   width: 100%;
  //   height: 100%;
  // }
}
</style>
