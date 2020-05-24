<template>
  <div class="demo-uploader">
    <div class="demo-item">
      <omi-uploader
        v-model="fileList"
        :afterAdd="afterAdd"
        multiple
      ></omi-uploader>
    </div>
    <div class="demo-item">
      <p>限制上传数量</p>
      <omi-uploader
        v-model="fileList2"
        :afterAdd="afterAdd"
        multiple
        :max="3"
        :onExceed="onExceed"
      ></omi-uploader>
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
    };
  },
  methods: {
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

<style>

</style>
