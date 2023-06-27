<!-- 修改密码 -->

<script setup lang='ts'>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useUserinfoStore } from '@/stores/user';

  const router = useRouter()
  const userinfoStore = useUserinfoStore()

  const onClickLeft = () => {
    router.go(-1)
  }
  const oldpwd = ref('')
  const newpwd = ref('')
  type params = {
    oldpwd: string,
    newpwd: string,
  }
  const onSubmit = async (values:params) => {
    await userinfoStore.updatePwd(values)
  }
  // 表单验证规则
  const pwd_validator = (val:string) =>  /^[a-zA-Z0-9]{6,12}$/.test(val)
  const oldpwd_validatorMessage = (val:string) => {
    if(!val) return `密码不能为空!`
    if(val.length<6 || val.length>12) return `密码在6~12位数!`
    if(!pwd_validator(val)) return `密码由字母和数字组成!`
  }
  const newpwd_validatorMessage = (val:string) => {
    if(!val) return `密码不能为空!`
    if(val.length<6 || val.length>12) return `密码在6~12位数!`
    if(!pwd_validator(val)) return `密码由字母和数字组成!`
    if(oldpwd.value===newpwd.value) return `两个密码不能一致!`
  }
</script>

<template>
  <van-nav-bar
    left-arrow
    title="修改密码"
    fixed
    @click-left="onClickLeft"
  />
  <div class="updatepwd-container">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="oldpwd"
          type="password"
          name="oldpwd"
          label="旧密码"
          placeholder="旧密码"
          :rules="[{ pwd_validator, validator: oldpwd_validatorMessage }]"
        />
        <van-field
          v-model="newpwd"
          type="password"
          name="newpwd"
          label="新密码"
          placeholder="新密码"
          :rules="[{ pwd_validator, validator: newpwd_validatorMessage }]"
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          修改密码
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<style lang='less' scoped>
  .updatepwd-container {
    padding-top: 66px;
  }
</style>
