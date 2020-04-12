<template>
  <div>
    <div class="demo-button">
      <omi-button type="primary">primary</omi-button>
      <omi-button type="default">defualt</omi-button>
      <omi-button type="danger">danger</omi-button>
    </div>
    <div class="demo-button">
      <omi-button round type="success">success</omi-button>
      <omi-button round type="info">info</omi-button>
      <omi-button round type="warning">warning</omi-button>
    </div>
    <div>size</div>
    <div class="demo-button">
      <omi-button size="normal" round type="primary">primary</omi-button>
      <omi-button size="small"  round type="default">defualt</omi-button>
      <omi-button size="mini" round type="danger">danger</omi-button>
    </div>
    <div class="demo-button">
     <omi-button block round type="danger">large danger</omi-button>
    </div>
    <div class="demo-button">
      <omi-button size="mini" round type="primary">primary</omi-button>
      <omi-button size="mini"  round type="default">defualt</omi-button>
      <omi-button size="mini" round type="danger">danger</omi-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ButtonDemo',
};
</script>

<style lang="scss">
.demo-button{
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;
}
</style>
