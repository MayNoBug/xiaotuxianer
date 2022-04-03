import request from '@/utils/request'

/**
 * 帐号登录
 * @param {String} account - 用户名
 * @param {String} password - 密码
 * @returns Promise
 */
export const userAccountLogin = ({ account, password }) => {
  return request('/login', 'post', { account, password })
}

/**
 * 短信登录
 * @param {String} mobile - 手机号
 * @param {String} code - 验证码
 * @returns Promise
 */
export const userMobileLogin = ({ mobile, code }) => {
  return request('/login/code', 'post', { mobile, code })
}

/**
 * 获取短信登录验证码
 * @param {String} mobile - 手机号
 * @returns Promise
 */
export const userMobileLoginCode = (mobile) => {
  return request('/login/code', 'get', { mobile })
}

/**
 * 第三方登录
 * @param {String} unionId - 第三方登录唯一标识
 * @param {Integer} source - 来源 1为pc，2为webapp，3为微信小程序，4为Android，5为ios,6为qq,7为微信
 * @returns Promise
 */
export const userQQLogin = (unionId, source = 6) => {
  return request('/login/social', 'post', { unionId, source })
}

/**
 * QQ绑定帐号
 * @param  {String} unionId - 第三方登录唯一标识
 * @param  {String} code - 短信验证码
 * @param  {String} mobile - 手机号
 * @returns Promise
 */
export const userQQBind = ({ unionId, code, mobile }) => {
  return request('/login/social/bind', 'post', { unionId, code, mobile })
}

/**
 * 获取短信绑定帐号验证码
 * @param {String} mobile - 手机号
 * @returns Promise
 */
export const userQQBindCode = (mobile) => {
  return request('/login/social/code', 'get', { mobile })
}

/**
 * 校验帐号是否存在
 * @param {String} account - 帐号
 * @returns Promise
 */
export const userCheckAccount = (account) => {
  return request('/register/check', 'get', { account })
}

/**
 * 获取短信完善信息验证码
 * @param {String} mobile - 手机号
 * @returns Promise
 */
export const userQQPatchCode = (mobile) => {
  return request('/register/code', 'get', { mobile })
}

/**
 * QQ完善信息
 * @param  {String} unionId - 第三方登录唯一标识
 * @param  {String} code - 短信验证码
 * @param  {String} mobile - 手机号
 * @param  {String} password - 密码
 * @param  {String} account - 帐号
 * @returns Promise
 */
export const userQQPatch = ({ unionId, code, mobile, password, account }) => {
  return request(`/login/social/${unionId}/complement`, 'post', { code, mobile, password, account })
}
