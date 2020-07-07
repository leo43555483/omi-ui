<template>
  <div class="demo-uploader">
    <div class="demo-item">
      <omi-uploader v-model="fileList" :afterAdd="afterAdd" multiple></omi-uploader>
    </div>
    <div class="demo-item">
      <p>限制上传文件尺寸</p>
      <omi-uploader v-model="fileList5" :afterAdd="afterAdd" :beforeAdd="beforeAdd" multiple></omi-uploader>
    </div>
    <div class="demo-item">
      <p>限制上传数量</p>
      <omi-uploader v-model="fileList2" :afterAdd="afterAdd" multiple :max="3" :onExceed="onExceed"></omi-uploader>
    </div>
    <div class="demo-item">
      <p>自定义上传按钮</p>
      <omi-uploader v-model="fileList3" :afterAdd="afterAdd">
        <template #uploader>
          <div class="demo-uploader__upload">
            <omi-button>点击上传</omi-button>
          </div>
        </template>
      </omi-uploader>
    </div>
    <div class="demo-item">
      <p>自定义预览内容</p>
      <omi-uploader v-model="fileList4" :afterAdd="afterAdd" accept=".text, .doc" multiple>
        <template #uploader>
          <div class="demo-uploader__upload">
            <omi-button>点击上传</omi-button>
          </div>
        </template>
        <template #preview="{file, progress}">
          <div class="demo-uploader__preview">
            <div class="demo-upload__preview--file">
              <omi-icon type="document" :size="14"></omi-icon>
              <div class="demo-file__name">{{file.name}}</div>
            </div>
            <div class="demo-file__progress">{{progress}}%</div>
          </div>
        </template>
      </omi-uploader>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DemoUploader',
  data() {
    return {
      fileList: [],
      fileList2: [],
      fileList3: [],
      fileList4: [],
      fileList5: [],
    };
  },
  methods: {
    beforeAdd(files) {
      const isLg2M = files.some((file) => file.size / (1024 * 1024 * 2) > 1);
      if (isLg2M) {
        this.$toast('上传图片不能超过2M');
        return false;
      }
      return true;
    },
    onExceed() {
      this.$toast('最多上传3张照片');
    },
    afterAdd(files) {
      files.forEach((file) => {
        const timer = setInterval(() => {
          if (file.progress === null) file.progress = 0;
          file.progress += 5;
          if (file.progress >= 100) {
            clearInterval(timer);
            file.status = 'success';
          }
        }, 300);
      });
    },
  },
};
</script>

<style lang="scss">
.omi-uploader__upload--custom {
  position: relative;
  display: flex;
  margin-top: 10px;
  align-items: center;
  justify-content: center;
}
.omi-upload__preview--custom {
  display: flex;
  flex-direction: column;
  width: 100%;
  .demo-uploader__preview {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
  }
}
.demo-upload__preview--file {
  display: flex;
  align-items: center;
}
.demo-file__name,
.demo-file__progress {
  font-size: 12px;
}
</style>
