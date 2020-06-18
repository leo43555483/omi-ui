# OmiUploader

## Props

| name           | type          | default                 | description |
| -------------- | ------------- | ----------------------- | ----------- |
| showProgress   | Boolean       | true                    | -           |
| accept         | String        | image/\*                | -           |
| fileList       | Array         |                         | -           |
| disabled       | Boolean       | false                   | -           |
| readType       | String        | dataUrl                 | -           |
| max            | Number        | 1.7976931348623157e+308 | -           |
| deleteAble     | Boolean       | true                    | -           |
| afterAdd       | Function      | function(t){return t}   | -           |
| beforeAdd      | Function      | function(){return!0}    | -           |
| statusIconSize | Number        | 42                      | -           |
| onExceed       | Function      | -                       | -           |
| circleRadius   | Number        | 25                      | -           |
| circleColor    | String Object | -                       | -           |

## Event

| name         | params | description |
| ------------ | ------ | ----------- |
| readError    | -      | -           |
| input        | -      | -           |
| closePreview | -      | -           |
| preview      | -      | -           |
| input        | -      | -           |
| delete       | -      | -           |
