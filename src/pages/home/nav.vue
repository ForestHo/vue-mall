<template>
  <nav class="nav">
    <ul class="nav-list">
      <li
        class="nav-item"
        v-for="(item, index) in navs"
        :key="index">
        <a :href="item.linkUrl" class="nav-link">
          <img :src="item.picUrl" class="nav-pic">
          <span>{{item.text}}</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
  import {navItems} from "./config";

  export default {
    name: 'HomeNav',
      /*navItems这样的数据不需要放在data里面，因为所有放在data里面的数据,
      * 都会为它们添加getter和setter，用来监听数据的变化，一旦数据发生变化，
      * 它就会立即响应到视图中，也就是只有那种需要 变化 然后响应的数据才放到data里面*/

    created() {
      /*this就是当前组件对象*/
      // console.log(this);
      this.navs = navItems ;
    }
  }
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";

  .nav {
    width: 100%;
    padding-top: 15px;
    background-color: #fff;

    &-list{
      display: flex;
      /*	规定灵活的项目在必要的时候拆行或拆列。*/
      flex-wrap: wrap;
    }
    &-item{
      width: 20%;
      margin-bottom: 15px;
    }
    &-link {
      @include flex-center(column);
    }
    &-pic {
      width: 60%;
      margin-bottom: 8px;
    }
  }
</style>
