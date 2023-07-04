<!-- 我的页面 -->

<script setup lang='ts'>
  import { onBeforeMount } from 'vue';
  import { useRouter } from 'vue-router';
  import { useUserinfoStore } from '@/stores/user';
  import { useOrderStore } from '@/stores/order';
  import { showImagePreview } from 'vant'

  const router = useRouter()
  const userinfoStore = useUserinfoStore()
  const orderStore = useOrderStore()

  onBeforeMount(() => {
    orderStore.getTypeCount()
  })
  const toLogin = () => {
    router.push({ name: 'login' })
  }
  const toAddress = () => {
    router.push({name: 'addresslist'})
  }
  const toStar = () => {
    router.push({name: 'star'})
  }
  const toSetup = () => {
    router.push({name: 'setup'})
  }
  // 预览头像
  const preview = (img:string) => {
    showImagePreview({
      images: [img],
      showIndex:false,
    })
  }
  const toOrderlist = (title:string, status:number) => {
    router.push({
      name: 'orderlist',
      query: {
        title: title,
        status: status,
      }
    })
  }
</script>

<template>
  <div class="my-container">
    <div v-if="userinfoStore.token===''||undefined">
      <van-nav-bar
        title="我的"
        fixed
      />
      <div style="font-size: 15px; color: #606266; text-align: center; margin-top: 96px; margin-bottom: 20px;">暂未登录，请点击登录</div>
      <van-button @click.stop="toLogin" round block style="width: 90%; margin: 0 auto;" type="primary">点击登录</van-button>
    </div>

    <div v-else>
      <div class="my-login">
        <div class="my-title">
          <img :src="userinfoStore.userinfo.img" @click.stop="preview(userinfoStore.userinfo.img)">
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
            <van-badge style="width: 12.8vw;">
              <div class="box2-item" @click="toOrderlist('全部订单', -1)">
                <van-icon name="bill-o" class="box2-icon" />
                <p>全部订单</p>
              </div>
            </van-badge>
            <van-badge style="width: 12.8vw;" :content="orderStore.type_count['0']===0? undefined: orderStore.type_count['0']" max="99">
              <div class="box2-item" @click="toOrderlist('待付款', 1)">
                  <van-icon name="balance-list-o" class="box2-icon" />
                  <p>待付款</p>
              </div>
            </van-badge>
            <van-badge style="width: 12.8vw;" :content="orderStore.type_count['1']===0? undefined: orderStore.type_count['1']" max="99">
              <div class="box2-item" @click="toOrderlist('待收货', 3)">
                <van-icon name="sign" class="box2-icon" />
                <p>待收货</p>
              </div>
            </van-badge>
            <van-badge style="width: 12.8vw;">
              <div class="box2-item" @click="toOrderlist('售后', 4)">
                <van-icon name="after-sale" class="box2-icon" />
                <p>售后</p>
              </div>
            </van-badge>
          </div>
          <div class="box3">
            <div class="box3-item" @click.stop="toAddress">
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
            <div class="box3-item" @click="toStar">
              <van-icon name="star" class="box3-item-icon" />
              <div class="box3-item-right">
                <p>我的收藏</p>
                <van-icon name="arrow" class="box3-item-right-icon" />
              </div>
            </div>
            <div class="box3-item" @click="toSetup">
              <van-icon name="setting" class="box3-item-icon" />
              <div class="box3-item-right">
                <p>设置</p>
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
            width: 48px;
            margin-top: 0;

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