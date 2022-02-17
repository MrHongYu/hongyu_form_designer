<template>
  <div>
    <!-- 头部 -->
    <div class="_header">
		  <img class="_fc-t-logo" src="http://form-create.com/logo.png">
      <div class="_fc-t-name">form-create-designer</div>
	  </div>
    <!-- FcDesigner核心组件 -->
    <FcDesigner/>
    <!-- 底部 -->
	  <el-footer class="_footer" height="30px"> 
		   <span>hongyu实现</span>
	  </el-footer>
  </div>
</template>

<script>
	// import HelloWorld from './components/HelloWorld.vue'
  import FcDesigner from './components/FcDesigner';
	export default {
  components: { FcDesigner },
	  name: 'app',
	}
</script>

<style>
	/* 头部logo */
	._header {
        height: 60px;
        margin: 0 20px;
        position: relative;
        display: flex;
        align-items: center;
        cursor: default;
    }
	._fc-t-logo {
		height: 26px;
	}
	._fc-t-name {
        display: inline-block;
        color: rgba(0, 0, 0, 0.8);
        font-size: 20px;
        font-weight: 600;
        margin-left: 5px;
  }
  ._footer {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 0 20px;
      font-size: 16px;
      border-top: 1px solid #ECECEC;
      background-color: #fff;
      cursor: pointer;
  }
</style>
