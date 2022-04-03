<template>
  <Form
    ref="target"
    class="xtx-form"
    :validation-schema="mySchema"
    v-slot="{ errors }"
    autocomplete="off"
  >
    <div class="user-info">
      <img :src="avatar" alt="" />
      <p>Hi，{{ nickname }} 欢迎来小兔鲜，完成绑定后可以QQ账号一键登录哦~</p>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-phone"></i>
        <Field
          :class="{ err: errors.mobile }"
          name="mobile"
          v-model="form.mobile"
          class="input"
          type="text"
          placeholder="绑定的手机号"
        />
      </div>
      <div class="error">{{ errors.mobile }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-code"></i>
        <Field
          :class="{ err: errors.code }"
          name="code"
          v-model="form.code"
          class="input"
          type="text"
          placeholder="短信验证码"
        />
        <span @click="send()" class="code">
          {{ time === 0 ? "发送验证码" : `${time}秒后发送` }}
        </span>
      </div>
      <div class="error">{{ errors.code }}</div>
    </div>
    <a @click="submit()" href="javascript:;" class="submit">立即绑定</a>
  </Form>
</template>

<script>
import { Form, Field } from 'vee-validate'
import schema from '@/utils/vee-validate-schema'
import { reactive, ref } from 'vue'
import { userQQBind, userQQBindCode } from '@/api/user'
import Message from '@/components/library/Message'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  name: 'CallbackBind',
  components: { Form, Field },
  props: ['nickname', 'avatar', 'unionId'],
  setup (props) {
    // 表单校验规则
    const { mobile, code } = schema
    const mySchema = { mobile, code }
    // 表单信息对象
    const form = reactive({
      unionId: null,
      mobile: null,
      code: null
    })
    // 发送绑定帐号的短信验证码
    const target = ref(null)
    const time = ref(0)
    let timer = null
    const send = () => {
      // 1. 校验下手机号是否正确，不正确需要错误提示
      // 2. 验证下是否正在等待倒计时
      // 3. 调用短信接口
      // 4. 如果发送成功，开始倒计时  `60秒后发送`
      // 5. 显示倒计时时间
      // 6. 倒计时完毕，再次显示 `发送验证码`
      const valid = mySchema.mobile(form.mobile)
      if (valid === true) {
        if (time.value === 0) {
          userQQBindCode(form.mobile).then(() => {
            time.value = 60
            clearInterval(timer)
            timer = setInterval(() => {
              time.value--
              if (time.value <= 0) {
                clearInterval(timer)
              }
            }, 1000)
          }).catch(e => {
            Message({ type: 'error', text: e.response.data.message || '发送失败' })
          })
        }
      } else {
        // 不正确需要错误提示
        target.value.setFieldError('mobile', valid)
      }
    }
    // 使用store
    const store = useStore()
    // 使用router
    const router = useRouter()
    // 绑定操作
    const submit = async () => {
      const valid = await target.value.validate()
      if (valid) {
        form.unionId = props.unionId
        // 进行绑定请求
        userQQBind(form).then(data => {
          // 成功
          // 1. 存储信息
          const { id, account, nickname, avatar, token, mobile } = data.result
          store.commit('user/setUser', { id, account, nickname, avatar, token, mobile })
          // 2. 提示
          Message({ type: 'success', text: '绑定成功' })
          // 3. 跳转
          router.push(store.state.user.redirectUrl || '/')
        }).catch(e => {
          Message({ type: 'error', text: e.response.data.message || '绑定失败' })
        })
      }
    }
    return { mySchema, form, send, target, time, submit }
  }
}
</script>

<style scoped lang='less'>
.user-info {
  width: 320px;
  height: 70px;
  margin: 0 auto;
  display: flex;
  background: #f2f2f2;
  align-items: center;
  padding: 0 10px;
  margin-bottom: 25px;
  img {
    background: #f2f2f2;
    width: 50px;
    height: 50px;
  }
  p {
    padding-left: 10px;
  }
}
.code {
  position: absolute;
  right: 0;
  top: 0;
  line-height: 50px;
  width: 80px;
  color: #999;
  &:hover {
    cursor: pointer;
  }
}
</style>
