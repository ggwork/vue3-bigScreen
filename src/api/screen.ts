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

export function getDrugTakingStatus(cityId:number){
  return http.request<any>('get','/uwc/drugTakingDynamics?cityId='+cityId)
}

export function getUserStats(cityId:number){
  return http.request<any>('get','/uwc/userStats?cityId='+cityId)
}

export function getAppointments(cityId:number){
  return http.request<any>('get','/uwc/appointments?cityId='+cityId)
}

export function getMapOrders(cityId:number){
  return http.request<any>('get','/uwc/mapOrders?cityId='+cityId)
}
