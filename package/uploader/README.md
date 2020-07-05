# OmiUploader

## 安装

```js
import { Uploader } from 'omiui';
//or
import { Uploader } from 'omiui';
Vue.use(Uploader);
```

## 使用

### 基础用法

```html
<omi-uploader v-model="fileList" :afterAdd="afterAdd" multiple></omi-uploader>
<script>
  export default {
    name: 'DemoUploader',
    data() {
      return {
        fileList: [],
      };
    },
    methods: {
      afterAdd(files) {
        files.forEach(file => {
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
```

### 限制上传数量

```html
<omi-uploader
  v-model="fileList"
  :afterAdd="afterAdd"
  :onExceed="onExceed"
  multiple
  :max="3"
></omi-uploader>
<script>
  export default {
    name: 'DemoUploader',
    data() {
      return {
        fileList: [],
      };
    },
    methods: {
      onExceed() {
        this.$toast('最多上传3张照片');
      },
      afterAdd(files) {
        files.forEach(file => {
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
```

### 限制上传文件尺寸

```html
<omi-uploader
  v-model="fileList"
  :afterAdd="afterAdd"
  :beforeAdd="beforeAdd"
  multiple
></omi-uploader>
<script>
  export default {
    name: 'DemoUploader',
    data() {
      return {
        fileList: [],
      };
    },
    methods: {
      beforeAdd(files) {
        const isLg2M = files.some(file => {
          return file.size / (1024 * 1024 * 2) > 1;
        });
        if (isLg2M) {
          this.$toast('上传图片不能超过2M');
          return false;
        }
        return true;
      },
      afterAdd(files) {
        files.forEach(file => {
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
```

### 自定义上传按钮与预览内容

```html
<omi-uploader v-model="fileList4" :afterAdd="afterAdd" accept=".text,.doc" multiple>
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
<script>
  export default {
    name: 'DemoUploader',
    data() {
      return {
        fileList: [],
      };
    },
    methods: {
      afterAdd(files) {
        files.forEach(file => {
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
```

## Props

| name           | type          | default                 | description                                                                                                                                                                                                                                                                                                                                                      |
| -------------- | ------------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| showProgress   | Boolean       | true                    | 是否显示上传进度.                                                                                                                                                                                                                                                                                                                                                |
| accept         | String        | image/\*                | 同 < input/> accept 属性.                                                                                                                                                                                                                                                                                                                                        |
| fileList       | Array         |                         | 当前文件列表.                                                                                                                                                                                                                                                                                                                                                    |
| disabled       | Boolean       | false                   | 是否禁用上传.                                                                                                                                                                                                                                                                                                                                                    |
| readType       | String        | dataUrl                 | 以何种方式读取，可选值有*['dataUrl','text', 'file']*，当值为'dataUrl'和'text'时会分别调用 _[FileReader.readAsDataURL()](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/readAsDataURL)_ 和 _[FileReader.readAsText()](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/readAsText)_ 方法. 出于上传性能考虑上传大型文件建议使用'file'类型. |
| max            | Number        | 1.7976931348623157e+308 | 文件上传的最大数量.                                                                                                                                                                                                                                                                                                                                              |
| deleteAble     | Boolean       | true                    | 是否可删除预览                                                                                                                                                                                                                                                                                                                                                   |
| afterAdd       | Function      |                         | 文件被解析后调用，参数为 _fileList_.                                                                                                                                                                                                                                                                                                                             |
| beforeAdd      | Function      |                         | 文件被解析前调用，参数为 _fileList_. 如果返回 falsy 则不会继续上传，如果返回*Promise*则会在*resolve()*后解析文件.                                                                                                                                                                                                                                                |
| statusIconSize | Number        | 42                      | 状态提示 icon 大小.                                                                                                                                                                                                                                                                                                                                              |
| onExceed       | Function      | -                       | 超过*max*（文件上传的最大数量）时调用.                                                                                                                                                                                                                                                                                                                           |
| multiple       | Boolean       | false                   | 是否多文件上传.                                                                                                                                                                                                                                                                                                                                                  |
| circleRadius   | Number        | 25                      |                                                                                                                                                                                                                                                                                                                                                                  |
| circleColor    | String Object | -                       |                                                                                                                                                                                                                                                                                                                                                                  |

## Events

| name         | params   | description         |
| ------------ | -------- | ------------------- |
| readError    | file     | 读取失败时调用.     |
| input        | fileList | -                   |
| closePreview | -        | 关闭预览时触发.     |
| preview      | file     | 点击预览时触发.     |
| delete       | file     | 点击删除按钮时触发. |

## Slots

| name     | props | description         |
| -------- | ----- | ------------------- |
| uploader |       |                     |
| mask     | file  | 图片预览遮罩层插槽. |
| preview  |       |                     |
