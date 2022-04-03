// hooks封装逻辑  提供响应式数据

import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue'
export const useLazyData = (apiFn) => {
  // 需要
  // 1.被观察的对象
  // 2.不通的API函数
  const target = ref(null)
  const result = ref(null)
  const { stop } = useIntersectionObserver(
    target,
    ([{ isIntersecting }]) => {
      if (isIntersecting) {
        stop()
        apiFn().then(data => {
          result.value = data.result
        })
      }
    },
    // 产品区域需要盾冬比较多才能去加载数据，在此加第三个参数，交互面积比率0.01就可以触发
    {
      threshold: 0.01
    }
  )
  // 返回数据(dom数据和后台数据)
  return { target, result }
}
