<script setup lang='ts'>
  import { ref, onBeforeMount } from 'vue';
  import { useRouter } from 'vue-router';
  import { useUserinfoStore } from '@/stores/user';
  import { showFailToast } from 'vant'
  import 'vant/es/toast/style'

  const router = useRouter()
  const userinfoStore = useUserinfoStore()

  onBeforeMount(() => {
    userLogin.username.value = ''
    userLogin.password.value = ''
    userReguser.username.value = ''
    userReguser.password.value = ''
    userReguser.confirmPassword.value = ''
  })

  const onClickLeft = () => {
    router.go(-1)
  }
  const title = ref('登录')

  // 提交的表单
  const userLogin = {
    username: ref('user1'),
    password: ref('123456'),
  }
  const userReguser = {
    username: ref(''),
    password: ref(''),
    confirmPassword: ref(''),
  }

  // 表单验证规则
  const username_validator = (val:string) =>  /^[a-zA-Z0-9]{4,8}$/.test(val)
  const password_validator = (val:string) =>  /^[a-zA-Z0-9]{6,12}$/.test(val)
  const username_validatorMessage = (val:string) => {
    if(!val) return `用户名不能为空!`
    if(val.length<4 || val.length>8) return `用户名在4~8位数!`
    if(!username_validator(val)) return `用户名由字母和数字组成!`
  }
  const password_validatorMessage = (val:string) => {
    if(!val) return `密码不能为空!`
    if(val.length<6 || val.length>12) return `密码在6~12位数!`
    if(!username_validator(val)) return `密码由字母和数字组成!`
  }
  const confirmPassword_validatorMessage = (val:string) => {
    if(!val) return `密码不能为空!`
    if(val.length<6 || val.length>12) return `密码在6~12位数!`
    if(!username_validator(val)) return `密码由字母和数字组成!`
    if(userReguser.password.value!==userReguser.confirmPassword.value) return `两个密码不一致!`
  }

  type From = {
    username:string,
    password:string,
    confirmPassword?:string,
  }

  const LeftX = ref(0)
  // 登录/注册切换函数
  const updateLore = () => {
    title.value === '登录'? title.value = '注册': title.value = '登录'
    LeftX.value === 0? LeftX.value = -100: LeftX.value = 0
  }
  // 登录函数
  const loginHandler = async (e:From) => {
    await userinfoStore.getLogin(e)
  }
  // 注册函数
  const reguserHandler = async (e:From) => {
    const res = await userinfoStore.getReguser(e)
    if(res===200) {
      updateLore()
      showFailToast('注册成功！')
    }
  }
</script>

<template>
  <van-nav-bar
    left-arrow
    :title="title"
    fixed
    @click-left="onClickLeft"
  />

  <div class="bgi">

    <div class="login-logo">mall商城</div>

    <div class="box">
      <!-- 登录 -->
      <van-form @submit="loginHandler" method="post" class="van_from" :style="{ left:`${LeftX}vw` }" ref="loginRef">
        <van-cell-group inset>
          <!-- 通过 validator 进行函数校验 -->
          <van-field
            v-model.trim="userLogin.username.value"
            name="username"
            placeholder="用户名"
            :rules="[{ username_validator, validator: username_validatorMessage }]"
          />
          <van-field
            v-model.trim="userLogin.password.value"
            name="password"
            placeholder="密码"
            type="password"
            :rules="[{ password_validator, validator: password_validatorMessage }]"
          />
        </van-cell-group>
        <div style="margin: 16px;">
          <van-button round block type="success" native-type="submit">
            登录
          </van-button>
        </div>
        <div class="update-lore">没有账号？<p @click.stop.self="updateLore">点击注册</p></div>
      </van-form>

      <!-- 注册 -->
      <van-form @submit="reguserHandler" method="post" class="van_from" :style="{ left:`${LeftX+100}vw` }">
        <van-cell-group inset>
          <!-- 通过 validator 进行函数校验 -->
          <van-field
            v-model.trim="userReguser.username.value"
            name="username"
            placeholder="用户名"
            :rules="[{ username_validator, validator: username_validatorMessage }]"
          />
          <van-field
            v-model.trim="userReguser.password.value"
            name="password"
            placeholder="密码"
            type="password"
            :rules="[{ password_validator, validator: password_validatorMessage }]"
          />
          <van-field
            v-model.trim="userReguser.confirmPassword.value"
            name="confirmPassword"
            placeholder="确认密码"
            type="password"
            :rules="[{ password_validator, validator: confirmPassword_validatorMessage }]"
          />
        </van-cell-group>
        <div style="margin: 16px;">
          <van-button round block type="success" native-type="submit">
            注册
          </van-button>
        </div>
        <div class="update-lore">已有账号,<p @click.stop.self="updateLore">点击登录</p></div>
      </van-form>
    </div>
  </div>
  
</template>

<style lang='less' scoped>
  .bgi {
    width: 100vw;
    height: 621px;
    padding-top: 46px;
    background: url('../assets/images//login.jpg');
    background-size: cover;
    text-align: center;
    overflow: hidden;

    .login-logo {
      transform: translateY(100px);
      font-size: 30px;
      font-weight: 700;
    }
    .box {
      position: relative;
      top: 150px;
      width: 100vw;
      height: 621px;
      overflow: hidden;
      .van_from {
        position: absolute;
        width: 100vw;
        transition: .5s;
      }
      .update-lore {
        display: flex;
        justify-content: center;

        p {
          color: blue;
          text-decoration: underline;
        }
      }
    }
  }
  
  :deep(.van-icon) {
    color: #000;
  }
  :deep(.van-field) {
    background-color: rgba(255, 255, 255, .5);
  }
</style>