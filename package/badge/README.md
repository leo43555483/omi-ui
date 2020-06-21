# OmiBadge

## Install

```js
import { Badge } from 'omiui';
//or
import { Badge } from 'omiui';
Vue.use(Badge);
```

## Useage

```html
<badge :text="item.badgeText" :maxNumber="99">
  <span>99</span>
</badge>
```

## Props

| name      | type          | default | description                          |
| --------- | ------------- | ------- | ------------------------------------ |
| text      | String Number |         | 徽章中点值.                          |
| dot       | Boolean       | false   | 是否只显示为一个点.                  |
| maxNumber | Number        | 99      | 可显示的最大数值(超过该数值后显示+). |

## Slots

| name    | description   |
| ------- | ------------- |
| default | 徽章内容插槽. |
