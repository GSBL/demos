<template>
  <div class="intro">
    <h3 class="intro-title">
        <slot name="intro-title">
            <span>规则说明</span>
        </slot>
    </h3>
    <p class="rule-detail">
      规则说明规则说明规则说明规则说明规则说明规则说明规则说明规则说明
    </p>
  
</div> 
</template>

<script type="text/javascript">
  export default {
    data(){
      return {}
    }
  }
</script>

<style type="text/css" lang="less">
@import "../assets/style/utils-rem.less";
.intro{
  .px2rem(margin-top,40);
  .intro-title {
    .px2rem(font-size, 30);
    color: #8e2424;
    font-weight: bold; 
    text-align: center;
    span {
      &:before, &:after {
          content: '';
          position: absolute;
          border-top:1px solid #8e2424;
          .px2rem(width, 160);
          transform: scaleY(.5);
          .px2rem(margin-top,20);
        }
      &:before {
        .px2rem(margin-left, -180);
      }
      &:after {
        .px2rem(margin-left, 20);
      }
    }
  }
  .rule-detail {
        .px2rem(font-size, 24);
        .px2rem(margin,20,40,0,40);
        overflow-wrap: break-word;
        color:#912525;
      }
}
</style>