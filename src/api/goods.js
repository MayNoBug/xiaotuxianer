// 商品相关接口
import request from '@/utils/request'

/**
 * 获取商品详情
 * @param {String} id - 商品ID
 */
export const findGoods = (id) => {
  return request('/goods', 'get', { id })
}

/**
 * 获取商品推荐或者猜你喜欢
 * @param {String} id - 商品ID
 * @param {Number} limit - 商品条数
 */
export const findRelevantOrLike = ({ id, limit = 16 }) => {
  return request('/goods/relevant', 'get', { id, limit })
}

/**
 * 获取热销商品
 * @param {String} id - 商品ID
 * @param {Integer} limit - 商品条数
 * @param {Integer} type - 类型  1为24小时，2为周榜，3为总榜，默认为1
 */
export const findHotGoods = ({ id, limit = 3, type = 1 }) => {
  return request('/goods/hot', 'get', { id, limit, type })
}

/**
 * 获取商品评价信息
 * @param {String} id - 商品ID
 */
export const findGoodsCommentInfo = (id) => {
  return request(`https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate`, 'get')
}

/**
 * 获取商品评价列表
 * @param {String} id - 商品ID
 * @param {Object} params - 查询参数
 */
export const findGoodsCommentList = (id, params) => {
  return request(`https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate/page`, 'get', params)
}
