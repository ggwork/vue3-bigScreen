<template>
  <div class="map-wrap">
    <div class="header">
      <!-- <div class="h-left">
        <img src="../assets/images/h-t-bg.png" alt="" srcset="">
      </div>
      <div class="h-right"></div> -->
    </div>

    <div class="echart" ref="echartEle"></div>
    <canvas id="myCanvas" :width="canvasSize" :height="canvasSize" ref="myCanvas"></canvas>
  </div>
</template>
<script lang="ts" setup>
import 'echarts-gl'
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'
import { http } from '@/api/index'

let echartEle = ref<any>(null)
let myCanvas = ref<any>(null)

let canvasSize = ref<number>(256)

async function initEchart(echartEle: any): Promise<void> {
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
  // 初始化canvas颜色渐变
  if(myCanvas.value && myCanvas.value.getContext){
    let context = myCanvas.value.getContext('2d')
    let grad = context.createLinearGradient(0, 0, 0, canvasSize.value)
    grad.addColorStop(0,'#00fcfc')
    grad.addColorStop(1,'#00cfcf')
    context.fillStyle=grad
    context.fillRect(0,0,canvasSize.value,canvasSize.value)
    
  }
  initEchart(echartEle)
})
</script>
<style lang="scss" scoped>
.map-wrap {
  width: 100%;
  height: 100vh;
  margin: auto;
  background-color: #041229;
  padding:0px 30px;
  box-sizing: border-box;
  background-image: url('../assets/images/h-bar.png');
  background-repeat: no-repeat;
  background-size: contain;
  .header{
    width: 100%;
    height: 108px;
    background-repeat: no-repeat;
    background-size: contain;
    
    .h-left{
      width: 550px;
      height: 72px;
      background-repeat: no-repeat;
      background-size: contain;
      background-position: 0px 50px;
      background-image: url('../assets/images/h-t-bg2.png');
      img{
        width: 550px;
        height: 72px;
      }
    }
  }

  .echart {
    width: 100%;
    height: 100%;
  }
}
</style>
