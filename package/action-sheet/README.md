# OmiActionSheet

## Install

```js
import { ActionSheet } from 'omiui';
//or
Vue.use(ActionSheet);
```

## Useage

### Basic Useage

```html
<omi-action-sheet
  v-model="open"
  title="Action Sheet"
  :data="data"
></omi-action-sheet>
```

### Show Cancel Button

```html
<omi-action-sheet
  v-model="open"
  title="Action Sheet"
  :data="data"
  close-text="Cancel"
></omi-action-sheet>
```

### Show Loading Status

```html
<omi-action-sheet
  v-model="open"
  title="Action Sheet"
  :data="data"
  :loading="loading"
></omi-action-sheet>
```

### Show Disabled Status

```html
<omi-action-sheet
  v-model="open"
  title="Action Sheet"
  :data="[{disable: true}]"
  :loading="loading"
></omi-action-sheet>
```

### Round Style

```html
<omi-action-sheet round v-model="open" title="Action Sheet"></omi-action-sheet>
```

### Custom Content

```html
<omi-action-sheet v-model="open" title="Action Sheet" :data="data">
  <div class="demo-action-sheet__custom">custom content</div>
</omi-action-sheet>
```

## Props

| name                | type     | default | description                                                                                                              |
| ------------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------ |
| className           | String   | -       | Class name.                                                                                                              |
| subtitle            | String   |         | Subtitle.                                                                                                                |
| safeAreaInsetBottom | Boolean  | true    | Whether to enable bottom safe area adaptation.                                                                           |
| round               | Boolean  | false   | Whether to show round corner.                                                                                            |
| title               | String   |         | title.                                                                                                                   |
| closeIcon           | Boolean  | false   | Whether to show closeIcon.                                                                                               |
| data                | Array    |         | Action data.                                                                                                             |
| closeText           | String   |         | Text of close button.                                                                                                    |
| onCancel            | Function | -       | Callback when click cancel button.                                                                                       |
| loading             | Boolean  | false   | Whether to show loading.                                                                                                 |
| spinner             | Boolean  | false   | Loading type.                                                                                                            |
| titleAlign          | String   | -       | tile align type.                                                                                                         |
| contentAlign        | String   | -       | content align type.                                                                                                      |
| popClose            | Boolean  | true    | Close when window triggers popstate event.                                                                               |
| value               | Boolean  | false   | Whether to show action sheet.                                                                                            |
| clickClose          | Boolean  | true    | Whether to close after click on the cover layer。                                                                        |
| lockScroll          | Boolean  | true    | Whether to lock the scroll when the popup layer scrolls to the border, If it is false, it may cause rolling. penetration |
| overlayClassName    | String   |         | OverLay className.                                                                                                       |

## Data structure

```js
//row
{
	content: String,
	disable: Boolean,
	className: String,
}
```

## Events

| name   | params         | description                  |
| ------ | -------------- | ---------------------------- |
| input  | -              | -                            |
| select | option payload | Triggered when click option. |
| open   | -              | Triggered when opened.       |
| close  | -              | Triggered when closed.       |

## Slots

| slot name | props | description               |
| --------- | ----- | ------------------------- |
| header    | -     | Header slot.              |
| left-icon | -     | Left icon slot in header. |
| default   | -     | Content slot.             |
