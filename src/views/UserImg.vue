<!-- 更改用户信息及头像 -->

<script setup lang='ts'>
  import { ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { useUserinfoStore } from '@/stores/user';
  import { showImagePreview } from 'vant'
  import { VueCropper }  from 'vue-cropper' // 图片裁剪
  import 'vue-cropper/dist/index.css'
  import { showFailToast } from 'vant';
  import 'vant/es/toast/style'

  const router = useRouter()
  const userinfoStore = useUserinfoStore()

  const onClickLeft = () => {
    router.go(-1)
  }
  // 预览头像
  const preview = (img:string) => {
    showImagePreview({
      images: [img],
      showIndex:false,
    })
  }

  const sex = computed(() => {
    let sex
    if(userinfoStore.userinfo.gender === 1) sex='男'
    if(userinfoStore.userinfo.gender === 2) sex='女'
    if(userinfoStore.userinfo.gender === 3) sex='未知'
    return sex
  })

  // 修改用户信息弹出层
  const showBottom = ref(false)
  const showPopup = () => {
    showBottom.value = true;
  }
  // 表单信息
  const userFrom = {
    nickname: ref(userinfoStore.userinfo.nickname),
    gender: ref(userinfoStore.userinfo.gender)
  }
  type userinfo = {
    nickname: string,
    gender: number,
  }
  // 提交表单
  const onSubmit = async (values:userinfo) => {
    await userinfoStore.updateinfo(values)
    showBottom.value = false
  }
  // 取消表单
  const notUserinfo = () => {
    showBottom.value = false
    userFrom.nickname.value = userinfoStore.userinfo.nickname
    userFrom.gender.value = userinfoStore.userinfo.gender
  }

  // 上传头像的弹出层
  const imgshow = ref(false)
  const imgshowPopup = () => {
    imgshow.value = true;
  }
  const lookimg = ref('')
  // 显示上传头像弹出层
  const afterRead = (file:any) => {
    const type = ['jpg', 'png', 'webp']
    const imgType = file.file.name.split('.')
    if(type.indexOf(imgType[imgType.length-1]) === -1) {
      showFailToast('上传的文件仅限jpg、png、webp格式!')
    }
    if(type.indexOf(imgType[imgType.length-1]) !== -1) {
      imgshowPopup()
      lookimg.value = file.content    
    } 
  }
  // 上传头像
  const onSubmitImg = () => {
    // cropper.value.getCropBlob(async (data:Blob) => {      
    cropper.value.getCropData(async (data:string) => {      
      await userinfoStore.updateimg(data)
      userinfoStore.getUserinfo()
      imgshow.value = false
      cropper.value.clearCrop()
    })  
  }
  // 取消上传头像
  const notimgShow = () => {
    imgshow.value = false
    lookimg.value = ''
  }
  // 图片裁剪
  const option = {
    img: ref(lookimg),             //裁剪图片的地址
    outputSize: 1,       //裁剪生成图片的质量(可选0.1 - 1)
    outputType: 'png',  //裁剪生成图片的格式（jpeg || png || webp）
  }
  const cropper = ref()
</script>

<template>
  <van-nav-bar
    left-arrow
    title="用户信息"
    fixed
    @click-left="onClickLeft"
  />
  <div class="userimg-container">
    <div class="my-title">
      <img :src="userinfoStore.userinfo.img" @click.stop="preview(userinfoStore.userinfo.img)">
      <div>
        <p>{{ userinfoStore.userinfo.nickname }}</p>
        <van-uploader :after-read="afterRead" multiple :max-size="5 * 1024 * 1024" :max-count="1">
          <van-button round class="imgbtn">更改头像</van-button>
        </van-uploader>
      </div>
    </div>
  </div>

  <div class="userinfo-main">
    <div class="userinfo-item">
      名称： {{ userinfoStore.userinfo.nickname }}
    </div>
    <div class="userinfo-item">
      性别： {{ sex }}
    </div>
  </div>
  
  <van-button round block type="primary" class="userinfo-footerbtn" @click="showPopup">点击编辑</van-button>

  <!-- 修改用户信息弹出层 -->
  <van-popup
    v-model:show="showBottom"
    position="bottom"
    :style="{ height: '50%', backgroundColor: '#eee', paddingTop: '30px' }"
  >
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <!-- 名称输入框 -->
        <van-field
          v-model="userFrom.nickname.value"
          name="nickname"
          label="名称"
          placeholder="名称"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <!-- 单选框 -->
        <van-field name="gender" label="性别">
          <template #input>
            <van-radio-group v-model="userFrom.gender.value" direction="horizontal">
              <van-radio :name="1">男</van-radio>
              <van-radio :name="2">女</van-radio>
              <van-radio :name="3">未知</van-radio>
            </van-radio-group>
          </template>
        </van-field>
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit" style="margin-bottom: 10px;">保存</van-button>
        <van-button round block @click="notUserinfo">取消</van-button>
      </div>
    </van-form>
  </van-popup>

  <!-- 更改头像弹出层 -->
  <van-popup
    v-model:show="imgshow"
    :style="{ backgroundColor: '#eee', padding: '10px', overflow: 'hidden' }"
  >
    <van-form @submit="onSubmitImg">
      <!-- 图片裁剪 -->
      <div class="sql-img">
        <vue-cropper
          ref="cropper"
          :img="option.img.value"
          :outputSize="option.outputSize"
          :outputType="option.outputType"
          autoCrop
          fixed
          centerBox
          style="width: 100%; height: 100%;"
        ></vue-cropper>
      </div>
      <!-- 上传按钮 -->
      <div style="margin: 16px 16px 0; display: flex; justify-content: space-between;">
        <van-button round block type="primary" native-type="submit" style="margin-bottom: 10px; margin-right: 10px;">上传</van-button>
        <van-button round block @click="notimgShow">取消</van-button>
      </div>
    </van-form>
  </van-popup>

</template>

<style lang='less' scoped>
  .userimg-container {
    padding-top: 46px;

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

        p {
          margin-left: 12px;
          margin-bottom: 10px;
          font-size: 19px;
          color: #303133;
        }
        .imgbtn {
          height: 35px;
        }
      }
    }
  }
  .userinfo-main {
    margin-top: 10px;
    .userinfo-item {
      line-height: 20px;
      padding: 10px 15px;
      border-bottom: 1px solid #eee;
      background-color: #fff;
    }
  }
  .userinfo-footerbtn {
    position: fixed;
    left: 5%;
    bottom: 15px;
    width: 90%;
  }

  .sql-img {
    width: 300px;
    height: 300px;
  }
</style>
