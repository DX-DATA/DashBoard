<template>
  <div id="class" class="wrapper">
    <div
      class="
        nav_wrapper
        d-flex
        flex-column flex-shrink-0
        p-3
        text-white
        bg-dark
      "
    >
      <Nav />
    </div>

    <!-- <div class="header">
      <Header />
    </div> -->

    <div class="content">
      <router-view />
    </div>

    <div class="footer"></div>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
//import Header from './layout/Header.vue'
import Nav from './layout/Nav.vue';

export default {
  name: 'DashBoard',
  components: {
    Nav,
    //Header
  },
  methods: {},
};
</script>

<style scoped>
* {
  padding: 0px;
  margin: 0px;
}

.wrapper {
  display: grid;
  background: rgb(236, 236, 236);
  height: 100vh;
  grid-template-columns: 240px 1fr;
  grid-template-rows: 60px 1fr 80px;
  grid-template-areas:
    'navbar content'
    'navbar content'
    'navbar content';
}

.header {
  grid-area: header;
  background: white;
  box-shadow: rgba(100, 100, 111, 0.2) 3px 3px 5px 1px;
}

.footer {
  grid-area: footer;
}

.content {
  overflow: auto;
  grid-area: content;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.content::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera*/
}

.nav_wrapper {
  grid-area: navbar;
  overflow-y: auto;
  padding: 20px;
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
  display: flex;
  flex-direction: column;
  box-shadow: rgba(100, 100, 111, 0.2) 3px 0px 5px 1px;
}

@media (max-width: 768px) {
  .wrapper {
    display: flex;
    flex-direction: column;
    height: inherit;
  }
}
</style>
