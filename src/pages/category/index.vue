<template>
    <div class="category">
      <header class="g-header-container">
        <category-header/>
      </header>
      <div class="g-content-container">
        <div class="sidebar">
          <category-tab @switch-tab="getCurrentId"/>
        </div>
        <div class="main">
          <category-content :curId="curId"/>
        </div>
      </div>
    </div>
</template>

<script>
  import CategoryHeader from './header';
  import CategoryTab from './tab';
  import  CategoryContent from './content';
  export default {
    name: 'Category',
    components: {
      CategoryHeader,
      CategoryTab,
      CategoryContent
    },
    data() {
      return {
        curId: ''
      };
    },
    methods: {
      getCurrentId(id) {
        this.curId = id;
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";

  .category {
    overflow: hidden;
    widows: 100%;
    height: 100%;
    background-color: $bgc-theme;
  }
  .g-content-container {
    height: 100%;
    padding-top: 50px;
    display: flex;
  }
  .sidebar {
    width: 86px;
    height: 100%;
  }
  .main {
    /*占据剩余宽度*/
    flex: 1;
    height: 100%;
    background-color: #fff;
  }
</style>
