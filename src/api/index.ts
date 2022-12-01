import Axios, { AxiosInstance, AxiosRequestConfig, CustomParamsSerializer } from "axios";
import { PureHttpError, RequestMethods, PureHttpResponse, PureHttpRequestConfig } from "./types.d";
import NProgress from "../utils/progress";

// 加载环境变量 VITE_PROXY_DOMAIN（开发环境）  VITE_PROXY_DOMAIN_REAL（打包后的线上环境）

// 相关配置请参考：www.axios-js.com/zh-cn/docs/#axios-request-config-1
const defaultConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_AXIOS_BASE || '',
  // 当前使用mock模拟请求，将baseURL制空，如果你的环境用到了http请求，请删除下面的baseURL启用上面的baseURL，并将第14行、19行代码注释取消
  // baseURL: "",
  timeout: 10000,
  headers: {
    Accept: "application/json, text/plain, */*",
    // "Content-Type": "application/form-data"
    // "Content-Type": "application/x-www-form-urlencoded"
    // "X-Requested-With": "XMLHttpRequest"
  },
};

// console.log("defaultConfig:", defaultConfig);

class PureHttp {
  constructor() {
    this.httpInterceptorsRequest();
    this.httpInterceptorsResponse();
  }
  /** 初始化配置对象 */
  private static initConfig: PureHttpRequestConfig = {};

  /** 保存当前Axios实例对象 */
  private static axiosInstance: AxiosInstance = Axios.create(defaultConfig);

  /** 请求拦截 */
  private httpInterceptorsRequest(): void {
    PureHttp.axiosInstance.interceptors.request.use(
      async (config: PureHttpRequestConfig) => {
        const $config = config;

        // 开启进度条动画
        NProgress.start();
        // 优先判断post/get等方法是否传入回掉，否则执行初始化设置等回掉
        if (typeof config.beforeRequestCallback === "function") {
          config.beforeRequestCallback($config);
          return $config;
        }
        if (PureHttp.initConfig.beforeRequestCallback) {
          PureHttp.initConfig.beforeRequestCallback($config);
          return $config;
        }
        return $config
      },
      error => {
        return Promise.reject(error);
      }
    );
  }

  /** 响应拦截 */
  private httpInterceptorsResponse(): void {
    const instance = PureHttp.axiosInstance;
    instance.interceptors.response.use(
      (response: PureHttpResponse) => {
        const $config = response.config;

        // 关闭进度条动画
        NProgress.done();
        // 优先判断post/get等方法是否传入回掉，否则执行初始化设置等回掉
        if (typeof $config.beforeResponseCallback === "function") {
          $config.beforeResponseCallback(response);
          return response.data;
        }
        if (PureHttp.initConfig.beforeResponseCallback) {
          PureHttp.initConfig.beforeResponseCallback(response);
          return response.data;
        }
        // console.log("response:", response);
        const code = response.data.code;
        if (code === 200) {
          // 删掉code，code是php接口添加的，原先的strapi接口饼没有code字段
          const tempData = Object.assign({}, response.data);
          delete tempData.code;
          return tempData;
        } else if (code === 401) {
          /** 请求白名单，放置一些不需要token的接口（通过设置请求白名单，防止token过期后再请求造成的死循环问题） */
          console.log(401)
        } else {
          return response.data;
        }
      },
      (error: PureHttpError) => {
        try {
          console.log('参数错误')
        } catch (error) { }
        const $error = error;
        $error.isCancelRequest = Axios.isCancel($error);
        // 关闭进度条动画
        NProgress.done();
        // 所有的响应异常 区分来源为取消请求/非取消请求
        return Promise.reject($error);
      }
    );
  }
  /** 通用请求工具函数 */
  public request<T>(method: RequestMethods, url: string, param?: AxiosRequestConfig, axiosConfig?: PureHttpRequestConfig): Promise<T> {
    const config = {
      method,
      url,
      ...param,
      ...axiosConfig
    } as PureHttpRequestConfig;

    // 单独处理自定义请求/响应回掉
    return new Promise((resolve, reject) => {
      PureHttp.axiosInstance
        .request(config)
        .then((response) => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  /** 单独抽离的post工具函数 */
  public post<T, P>(url: string, params?: T, config?: PureHttpRequestConfig): Promise<P> {
    return this.request<P>("post", url, params, config);
  }

  /** 单独抽离的get工具函数 */
  public get<T, P>(url: string, params?: T, config?: PureHttpRequestConfig): Promise<P> {
    return this.request<P>("get", url, params, config);
  }
}

export const http = new PureHttp();