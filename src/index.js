import {reactive} from './reactive/reactive'
import {effect} from './reactive/effect'

const observed =(window.observed = reactive({
  count:0
}))

effect(()=>{
  console.log('onserved.count is',observed.count)
})