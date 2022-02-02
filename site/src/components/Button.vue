<template>
  <div>
    <div class="demo-button">
      <omi-button :loading="true" type="primary">primary</omi-button>
      <omi-button type="default">defualt</omi-button>
      <omi-button type="danger">danger</omi-button>
    </div>
    <div class="demo-button">
      <omi-button :loading="true" round type="success">success1</omi-button>
      <omi-button :loading="true" round type="info">info1</omi-button>
      <omi-button :loading="true" round type="warning">warning</omi-button>
    </div>
    <div class="demo-button">
      <omi-button size="normal" round type="primary">primary1</omi-button>
      <omi-button size="small"  round type="default">defualt1</omi-button>
      <omi-button size="mini" round type="danger">danger1</omi-button>
    </div>
    <div class="demo-button">
     <omi-button block round type="danger" loading loading-text="loading">large danger</omi-button>
    </div>
    <div class="demo-button">
     <omi-button block round type="danger" disabled>large danger</omi-button>
    </div>
    <div class="demo-button">
      <omi-button size="mini" round type="primary">primary</omi-button>
      <omi-button size="mini"  round type="default">defualt</omi-button>
      <omi-button size="mini" round type="danger">danger</omi-button>
    </div>
  </div>
</template>

<script>
import { Button } from 'omi'
export default {
  name: 'ButtonDemo',
  components: {
    [Button.name]: Button
  }
}
</script>

<style lang="scss">
.demo-button{
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;
}
</style>
