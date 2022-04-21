let activeEffect

export function effect(fn){
  const effectFn = ()=>{
    try{
      activeEffect = effectFn
      return fn()
    } finally {
      
    }
  }
  effectFn()
  return effectFn
}

const targetMap = new WeakMap()
export function track(target,key){
  if(!activeEffect) return

  let depsMap = targetMap.get(target)
  if(!depsMap){
    targetMap.set(target,(depsMap = new Map()))
  }
  let deps = depsMap.get(key)
  if(!deps){
    depsMap.set(key,(deps = new Set()))
  }
  console.log(targetMap)
  deps.add(activeEffect)
}

export function trigger(target,key){
  const depsMap = targetMap.get(target)
  if(!depsMap){
    return
  }

  const deps = depsMap.get(key)
  if(!deps){
    return
  }

  deps.forEach(effect=>{
    effect()
  })
}