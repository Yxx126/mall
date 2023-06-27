<!-- 设置页面 -->

<script setup lang='ts'>
  import { useRouter } from 'vue-router';
  import { useUserinfoStore } from '@/stores/user';
  import { useShopStore } from '@/stores/shop';
  import { useStarStore } from '@/stores/star';
  import Cookies from 'js-cookie';

  import { showSuccessToast } from 'vant';

  const router = useRouter()
  const userinfoStore = useUserinfoStore()
  const shopStore = useShopStore()
  const starStore = useStarStore()

  const onClickLeft = () => {
    router.go(-1)
  }
  // 修改密码
  const updatePwd = () => {
    router.push({name: 'updatepwd'})
  }
  const userImg = () => {
    router.push({name: 'userimg'})
  }
  // 退出登录
  const signout = () => {
    Cookies.set('token', '')
    userinfoStore.userinfo = {}
    shopStore.shopCart = []
    starStore.goodStar = []
    showSuccessToast('退出登录成功！')
    // 跳转到我的页面
    router.push({name: 'my'})
  }
</script>

<template>
  <van-nav-bar
    left-arrow
    title="设置"
    fixed
    @click-left="onClickLeft"
  />
  <div class="setup-container">
    <!-- 修改密码 -->
    <div class="box3-item" @click="updatePwd">
      <van-icon name="down" class="box3-item-icon" />
      <div class="box3-item-right">
        <p>修改密码</p>
        <van-icon name="arrow" class="box3-item-right-icon" />
      </div>
    </div>
    <!-- 更改用户信息 -->
    <div class="box3-item" @click="userImg">
      <van-icon name="down" class="box3-item-icon" />
      <div class="box3-item-right">
        <p>更改用户信息</p>
        <van-icon name="arrow" class="box3-item-right-icon" />
      </div>
    </div>
    <!-- 退出登录 -->
    <div class="box3-item" @click="signout">
      <van-icon name="down" class="box3-item-icon" />
      <div class="box3-item-right">
        <p>退出登录</p>
        <van-icon name="arrow" class="box3-item-right-icon" />
      </div>
    </div>
  </div>
</template>

<style lang='less' scoped>
  .setup-container {
    padding-top: 46px;

    .box3-item {
      display: flex;
      align-items: center;
      height: 30px;
      padding: 10px 15px;
      margin-top: 0;
      border-bottom: 1px solid #eee;
      background-color: #fff;

      .box3-item-icon {
        margin-right: 10px;
        font-size: 20px;
      }
      .box3-item-right {
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0;

        .box3-item-right-icon {
          font-size: 15px;
          color: #606266;
        }
      }
    }
  }
</style>
