import { http } from './index'

type typeServerTime = {
  dateTime:string
}
export function getServerTime(){
  return http.request<typeServerTime>('get','/uwc/time')
}


export function getOrderStats(cityId:number){
  return http.request<any>('get','/uwc/orderStats?cityId='+cityId)
}