<!-- APP.VUE -->
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

<!-- HELLO.VUE -->
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="http://chat.vuejs.org/" target="_blank" rel="noopener">Vue Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank" rel="noopener">Docs for This Template</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank" rel="noopener">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank" rel="noopener">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
    </ul>
  </div>
</template>
<template>
	<div class="hero">
		<div>
			<h1 class="display-3">Hello Hoomans</h1>
			<p class="lead">This is the homepage of your vue app</p>
		</div>
	</div>
</template>

<!-- USER MANAGER 1 -->
<template>
  <div class="container-fluid mt-4">
		<table>
			<thead>
				<tr>
					<th>
						<h1 align="left" class="h1">CHOOSE ACTION</h1>
					</th>
					<th>
						<form @submit.prevent="searchUser">
						<b-nav-form align="center">
							<input style="margin-right:10px; margin-left:500px; float:right" type="text" v-model="search" v-on:keyup="searchUser(search)" placeholder="Search" name="search"/>
						</b-nav-form>
						</form>
					</th>
					<th>
						<b-btn style="margin-right:10px; float:right"  type="submit" size="sm" @click="addUser" variant="success">ADD USER</b-btn>
					</th>
				</tr>
			</thead>
		</table>
    <div>
      <b-alert :show="loading"  variant="warning">Loading...</b-alert>
      <div style="width:500px float:left">
          <user-table
            :users="users"
            :userInfo="displayModel"
            v-on:viewUser="viewUser"
            v-on:deleteUser="deleteUser"
            v-on:editUser="editUser"
          ></user-table>
      </div>
		</div>

	<!-- edit user modal -->
  <edit-user-modal
    :userInfo="model"
    v-on:saveUser="saveUser"
    ref="editUserModalRef">
  </edit-user-modal>

	<!-- delete modal -->
  <delete-user-modal
    :userInfo="displayModel"
    v-on:deleteUser="confirmDelete"
    ref="deleteUserRef">
  </delete-user-modal>

  <!-- view modal -->
  <view-user-modal
    :userInfo="displayModel"
    ref="viewUserRef">
  </view-user-modal>

	</div>
</template>

<!-- USER TABLE -->
<template>
  <table  class="table table-striped table-hover striped-hover" hover>
        <thead>
            <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th style="text-align:center">Action</th>
                </tr>
        </thead>
        <tbody>
            <tr v-for="user  in  paginatedData()"  :key="user.id" @click="viewUser(user)">
                <td>{{ user.user_id }}</td>
                <td>{{ user.user_fname }}</td>
                <td>{{ user.user_lname }}</td>
                <td>{{ user.user_email }}</td>
                <td>{{ user.user_role }}</td>
                    <template v-if="user.user_isdel == 1">
                            <td>Inactive</td>
                    </template>
                    <template v-else-if="user.user_isdel == 0">
                            <td>Active</td>
                    </template>
                    <template v-else>
                            <td>{{ user.user_isdel }}</td>
                    </template>
                    <td style="text-align:center">

                    <b-btn id="buttonVE" variant="warning" @click="editUser(user)">Edit</b-btn>
                    <template v-if="user.user_isdel == 1">
                        <b-btn id="buttonAD" variant="success" @click="deleteUser(user)">Activate</b-btn>
                    </template>
                    <template v-else>
                        <b-btn id="buttonAD" variant="danger" @click="deleteUser(user)">Deactivate</b-btn>
                    </template>
                </td>
            </tr>
        </tbody>
        <b-pagination size="md" base-url="#/user-manager" :per-page="pageCount()" :totalRows="users.length" v-model="pageNumber"></b-pagination>
    </table>
</template>
<script>
export default {

}
</script>

<style>

</style>

























<!--
  <div>
    <table  class="table table-striped table-hover striped-hover" hover v-sortable>
        <thead>
            <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th style="text-align:center">Action</th>
                </tr>
        </thead>
        <tbody>
            <tr v-for="user  in  paginatedData()"  :key="user.id">
                <td>{{ user.user_id }}</td>
                <td>{{ user.user_fname }}</td>
                <td>{{ user.user_lname }}</td>
                <td>{{ user.user_email }}</td>
                <td>{{ user.user_role }}</td>
                    <template v-if="user.user_isdel == 1">
                            <td>Inactive</td>
                    </template>
                    <template v-else-if="user.user_isdel == 0">
                            <td>Active</td>
                    </template>
                    <template v-else>
                            <td>{{ user.user_isdel }}</td>
                    </template>
                    <td style="text-align:center">
                    <b-btn id="buttonVE" variant="primary" @click="viewUser(user)">View</b-btn>
                    <b-btn id="buttonVE" variant="warning" @click="editUser(user)">Edit</b-btn>
                    <template v-if="user.user_isdel == 1">
                        <b-btn id="buttonAD" variant="success" @click="deleteUser(user)">Activate</b-btn>
                    </template>
                    <template v-else>
                        <b-btn id="buttonAD" variant="danger" @click="deleteUser(user)">Deactivate</b-btn>
                    </template>
                </td>
            </tr>
        </tbody>
  </table>
  	<div>
      <b-pagination size="md" base-url="#/user-manager" :per-page="pageCount()" :totalRows="users.length" v-model="pageNumber"></b-pagination>
    </div>
  </div>
-->

	<div class="container-fluid mt-4">
		<table>
			<thead>
				<tr>
					<th>
						<h1 align="left" class="h1">CHOOSE ACTION</h1>
					</th>
					<th>
						<form @submit.prevent="searchUser">
						<b-nav-form align="center">
							<input style="margin-right:10px; margin-left:500px; float:right" type="text" v-model="search" v-on:keyup="searchUser(search)" placeholder="Search" name="search"/>
						</b-nav-form>
						</form>
					</th>
					<th>
						<b-btn style="margin-right:10px; float:right"  type="submit" size="sm" @click="addUser" variant="success">ADD USER</b-btn>
					</th>
				</tr>
			</thead>
		</table>
    <div>
      <b-alert :show="loading"  variant="warning">Loading...</b-alert>
      <div style="width:500px float:left">
          <user-table
            :users="users"
            :userInfo="displayModel"
            v-on:viewUser="viewUser"
            v-on:deleteUser="deleteUser"
            v-on:editUser="editUser"
          ></user-table>
      </div>
		</div>

	<!-- edit user modal -->
  <edit-user-modal
    :userInfo="model"
    v-on:saveUser="saveUser"
    ref="editUserModalRef">
  </edit-user-modal>

	<!-- delete modal -->
  <delete-user-modal
    :userInfo="displayModel"
    v-on:deleteUser="confirmDelete"
    ref="deleteUserRef">
  </delete-user-modal>

  <!-- view modal -->
  <view-user-modal
    :userInfo="displayModel"
    ref="viewUserRef">
  </view-user-modal>

	</div>
