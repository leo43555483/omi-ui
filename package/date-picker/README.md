# OmiDatePicker

## Props

| name        | type     | default                                       | description |
| ----------- | -------- | --------------------------------------------- | ----------- |
| type        | String   | date                                          | -           |
| currentDate | Date     | Wed Jun 17 2020 15:41:17 GMT+0800 (GMT+08:00) | -           |
| max         | Date     | Tue Dec 31 2030 23:59:00 GMT+0800 (GMT+08:00) | -           |
| min         | Date     | Fri Jan 01 2010 00:00:00 GMT+0800 (GMT+08:00) | -           |
| filter      | Function | function(t,e){return e}                       | -           |
| formatter   | Function | function(t,e){return e}                       | -           |

## Methods

| name      | params | return | description |
| --------- | ------ | ------ | ----------- |
| getValues |        | Array  |             |
| setValues |        | Array  |             |

## Event

| name   | params | description |
| ------ | ------ | ----------- |
| change | -      | -           |
