import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index'; 
import * as ECharts from "echarts";
import elementResizeDetectorMaker from "element-resize-detector";
import { fitChartSize } from '@/utils/pxUtils'

const app = createApp(App)

// 自定义指令，检测元素宽度的变化
const HANDLER = "_vue_resize_handler";
app.directive('chart-resize', {
  mounted(el: any, binding: any) {
    el[HANDLER] = binding.value
      ? binding.value
      : () => {
        let chart = ECharts.getInstanceByDom(el);
        if (!chart) {
          return;
        }
        chart.resize();
      };
    // 监听绑定的div大小变化，更新 echarts 大小
    elementResizeDetectorMaker().listenTo(el, el[HANDLER]);
  },
  unmounted(el: any) {
    elementResizeDetectorMaker().removeListener(el, el[HANDLER]);
    delete el[HANDLER];
  }
})
// 挂载全局变量和方法
app.config.globalProperties.$fitChartSize = fitChartSize

app.use(router)
app.mount('#app')
