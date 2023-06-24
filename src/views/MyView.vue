<!-- 我的页面 -->

<script setup lang='ts'>
  import { useRouter } from 'vue-router';
  import { useUserinfoStore } from '@/stores/user';
  import Cookies from 'js-cookie';
  import { showSuccessToast } from 'vant';

  const router = useRouter()
  const userinfoStore = useUserinfoStore()

  const toLogin = () => {
    router.push({ name: 'login' })
  }
  // 退出登录
  const signout = () => {
    Cookies.set('token', '')
    userinfoStore.userinfo = {}
    showSuccessToast('退出登录成功！')
  }
  const toAddress = () => {
    router.push({name: 'addresslist'})
  }
</script>

<template>
  <div class="my-container">
    <div v-if="!Cookies.get('token')">
      <button @click.stop="toLogin">点击登录</button>
    </div>

    <div v-else>
      <div class="my-login">
        <div class="my-title">
          <img src="">
          <div>{{ userinfoStore.userinfo.nickname }}</div>
        </div>
        <main>
          <div class="box1">
            <div class="box1-item">
              <p>暂无</p>
              <p>积分</p>
            </div>
            <div class="box1-item">
              <p>暂无</p>
              <p>成长值</p>
            </div>
            <div class="box1-item">
              <p>暂无</p>
              <p>优惠券</p>
            </div>
          </div>
          <div class="box2">
            <div class="box2-item">
              <van-icon name="bill-o" class="box2-icon" />
              <p>全部订单</p>
            </div>
            <div class="box2-item">
              <van-icon name="balance-list-o" class="box2-icon" />
              <p>待付款</p>
            </div>
            <div class="box2-item">
              <van-icon name="sign" class="box2-icon" />
              <p>待收货</p>
            </div>
            <div class="box2-item">
              <van-icon name="after-sale" class="box2-icon" />
              <p>售后</p>
            </div>
          </div>
          <div class="box3">
            <div class="box3-item" @click="toAddress">
              <van-icon name="location" class="box3-item-icon" />
              <div class="box3-item-right">
                <p>地址管理</p>
                <van-icon name="arrow" class="box3-item-right-icon" />
              </div>
            </div>
            <div class="box3-item">
              <van-icon name="clock" class="box3-item-icon" />
              <div class="box3-item-right">
                <p>我的足迹</p>
                <van-icon name="arrow" class="box3-item-right-icon" />
              </div>
            </div>
            <div class="box3-item">
              <van-icon name="star" class="box3-item-icon" />
              <div class="box3-item-right">
                <p>我的收藏</p>
                <van-icon name="arrow" class="box3-item-right-icon" />
              </div>
            </div>
            <div class="box3-item">
              <van-icon name="setting" class="box3-item-icon" />
              <div class="box3-item-right">
                <p>设置</p>
                <van-icon name="arrow" class="box3-item-right-icon" />
              </div>
            </div>
            <div class="box3-item" @click="signout">
              <van-icon name="down" class="box3-item-icon" />
              <div class="box3-item-right">
                <p>退出登录</p>
                <van-icon name="arrow" class="box3-item-right-icon" />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>

  <tabbar-view />
</template>

<style lang='less' scoped>
  .my-container {
    padding-bottom: 50px;

    .my-login {
      .my-title{
        box-sizing: border-box;
        display: flex;
        align-items: center;
        height: 180px;
        padding: 50px 15px 0;
        background: url('../assets/images/my_bg.jpg') no-repeat center center;
        background-size: cover;
        background-color: transparent;

        img {
          width: 62px;
          height: 62px;
          border: 1px solid red;
          border-radius: 50%;
          background-color: #fff;
        }
        div {
          margin-left: 10px;
          font-size: 19px;
          color: #303133;
        }
      }
      main {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;

        div {
          width: 345px;
          border-radius: 7px;
          background-color: #fff;
          margin-top: 10px;
        }

        .box1 {
          display: flex;
          justify-content: space-around;
          align-items: center;
          height: 70px;

          .box1-item {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            p:nth-child(1) {
              margin-bottom: 5px;
              font-size: 16px;
              color: #303133;
            }
            p:nth-child(2) {
              font-size: 12px;
              color: #75787d;
            }
          }
        }

        .box2 {
          display: flex;
          justify-content: space-around;
          align-items: center;
          height: 88px;
          .box2-item {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            .box2-icon {
              margin-bottom: 10px;
              font-size: 24px;
              color: #fa436a;
            }
            p {
              font-size: 12px;
              color: #303133;
            }
          }
        }

        .box3 {
          padding-top: 15px;
          margin-bottom: 10px;

          .box3-item {
            display: flex;
            align-items: center;
            width: 315px;
            height: 30px;
            padding: 10px 15px;
            margin-top: 0;

            &:nth-child(1) .box3-item-icon {
              color: rgb(95, 205, 162);
            }
            &:nth-child(2) .box3-item-icon {
              color: rgb(224, 116, 114);
            }
            &:nth-child(3) .box3-item-icon {
              color: rgb(84, 180, 239);
            }
            &:nth-child(4) .box3-item-icon {
              color: rgb(224, 116, 114);
            }

            .box3-item-icon {
              margin-right: 10px;
              font-size: 20px;
            }
            .box3-item-right {
              width: 285;
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
      }
    }
  }
</style>