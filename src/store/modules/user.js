// 管理用户信息的模块

export default {
  namespaced: true,
  state: () => {
    return {
      // 用户信息
      profile: {
        id: '',
        account: '',
        nickname: '',
        avatar: '',
        mobile: '',
        token: ''
      },
      // 回跳地址
      redirectUrl: ''
    }
  },
  mutations: {
    // 将来登录成功，传人用户信息对象
    setUser (state, profile) {
      state.profile = profile
    },
    // 设置回跳地址
    setRedirectUrl (state, url) {
      state.redirectUrl = url
    }
  }
}
