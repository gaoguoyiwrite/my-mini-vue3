import { isObject } from "../utils";
import {track,trigger} from './effect'
export function reactive(target){
  if(!isObject(target)){
    return target;
  }

  if(isReactive(target)){
    return target
  }

  const proxy = new Proxy(target,{
    get(target,key,receiver){
      if(key == "__isReactive"){
        return true;
      }
      const res = Reflect.get(target,key,receiver)
      track(target,key)
      return res
    },
    set(target,key,value,receiver){
      const res = Reflect.set(target,key,value,receiver)
      trigger(target,key)
      return res
    },
  })
  return proxy
}

export function isReactive(target){
  return !!(target && target.__isReactive)
}