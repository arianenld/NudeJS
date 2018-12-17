<template lang="pug">
  div#app
    header
      span Vue.js PWA
    main
    router-view
</template>

<template lang="pug">

section
  nav.navbar.is-dark(role="navigation", aria-label="main navigation")
    div.navbar-brand
      a.navbar-item
        router-link#linkColor(to="/") USER MANAGEMENT
      div.navbar-brand


      div.navbar-menu
        div.navbar-start
          a.navbar-item
            router-link#linkColor(to="/") Home
          a.navbar-item
            router-link#linkColor(to='/user-manager') User Manager
  router-view


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

#linkColor{
    color: white;
  }
</style>
