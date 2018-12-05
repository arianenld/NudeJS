<template lang="pug">
  div#app
    header
      span Vue.js PWA
    main
      img(src="./assets/logo.png" alt="Vue.js PWA")
    router-view
</template>

<template lang="pug">
  div.container-fluid#app(style="width:1200px")
    b-navbar(toggleable="md", type="dark", variant="dark")
      b-navbar-toggle(target="nav_collapse")
      b-navbar-brand(to="/") USER MANAGEMENT
      b-navbar-nav
        b-nav-item(to="/") HOME
        b-nav-item(to="user-manager") USER MANAGER
    b-navbar(toggleable="md" type="light" variant="success" style="height:5px")



</template>

<script>
export default {
  name: 'app',
  data: {
  backgroundImage: 'https://conceptdraw.com/a3044c3/p45/preview/640/pict--operations-management-management-pictograms---vector-stencils-library.png--diagram-flowchart-example.png',
}
}
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 1500px;
}

main {
  text-align: center;
  margin-top: 40px;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #35495E;
  color: #ffffff;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}
