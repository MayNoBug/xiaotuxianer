<template>
  <Form
    class="xtx-form"
    ref="target"
    autocomplete="off"
    v-slot="{ errors }"
    :validation-schema="mySchema"
  >
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-user"></i>
        <Field
          :class="{ err: errors.account }"
          name="account"
          v-model="form.account"
          class="input"
          type="text"
          placeholder="请输入用户名"
        />
      </div>
      <div class="error">{{ errors.account }}</div>
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
          placeholder="请输入手机号"
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
          placeholder="请输入验证码"
        />
        <span @click="send()" class="code">
          {{ time === 0 ? "发送验证码" : `${time}秒后发送` }}
        </span>
      </div>
      <div class="error">{{ errors.code }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-lock"></i>
        <Field
          :class="{ err: errors.password }"
          name="password"
          v-model="form.password"
          class="input"
          type="password"
          placeholder="请输入密码"
        />
      </div>
      <div class="error">{{ errors.password }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-lock"></i>
        <Field
          :class="{ err: errors.rePassword }"
          name="rePassword"
          v-model="form.rePassword"
          class="input"
          type="password"
          placeholder="请确认密码"
        />
      </div>
      <div class="error">{{ errors.rePassword }}</div>
    </div>
    <a @click="submit()" href="javascript:;" class="submit">立即提交</a>
  </Form>
</template>

<script>
import { Form, Field } from 'vee-validate'
import schema from '@/utils/vee-validate-schema'
import { reactive, ref } from 'vue'
import { userQQPatch, userQQPatchCode } from '@/api/user'
import Message from '@/components/library/Message'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  name: 'CallbackPatch',
  components: { Form, Field },
  props: ['unionId'],
  setup (props) {
    // 校验规则
    const { accountApi: account, mobile, code, password, rePassword } = schema
    const mySchema = { account, mobile, code, password, rePassword }
    // 数据对象
    const form = reactive({
      account: null,
      mobile: null,
      code: null,
      password: null,
      rePassword: null
    })
    // ======================发送短信验证码======================
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
          userQQPatchCode(form.mobile).then(() => {
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
    // ======================提交完善的信息======================
    // 使用store
    const store = useStore()
    // 使用router
    const router = useRouter()
    // 绑定操作
    const submit = async () => {
      const valid = await target.value.validate()
      if (valid) {
        form.unionId = props.unionId
        // 进行完善请求
        userQQPatch(form).then(data => {
          // 成功
          // 1. 存储信息
          const { id, account, nickname, avatar, token, mobile } = data.result
          store.commit('user/setUser', { id, account, nickname, avatar, token, mobile })
          // 2. 提示
          Message({ type: 'success', text: '完善信息成功' })
          // 3. 跳转
          router.push(store.state.user.redirectUrl || '/')
        }).catch(e => {
          Message({ type: 'error', text: e.response.data.message || '完善信息失败' })
        })
      }
    }

    return { mySchema, form, target, time, send, submit }
  }
}
</script>

<style scoped lang='less'>
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
