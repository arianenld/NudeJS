<template>
  <div id="app">
    <header>
      <span>Vue.js PWA</span>
    </header>
    <main>
      <img src="./assets/logo.png" alt="Vue.js PWA">
      <router-view></router-view>
    </main>
  </div>
</template>

<template>
	<div class="container-fluid mt-4" style="width:1200px" id="app">
		<b-navbar toggleable="md" type="dark" variant="dark">
			<b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
			<b-navbar-brand to="/">USER MANAGEMENT</b-navbar-brand>
			<b-collapse is-nav id="nav_collapse">
				<b-navbar-nav>
					<b-nav-item to="/">
						HOME
					</b-nav-item>

          <b-nav-item  to="/user-manager">
          USER MANAGER
          </b-nav-item>
				</b-navbar-nav>
			</b-collapse>
		</b-navbar>
    <b-navbar toggleable="md" type="light" variant="success" style="height:5px">
    </b-navbar>
		<!-- routes will be rendered here -->
		<router-view />
	</div>
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
