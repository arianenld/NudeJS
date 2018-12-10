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
<!-- VIEW USER MODAL -->
<template>
    <b-modal id="modal2" :hide-footer=true ref="viewUserRef">
		<div>
		<b-card  :title="('User Information:')">
			<form>
			<b-form-group  label="First Name">
				<b-form-input  type="text"  v-model="userInfo.user_fname"></b-form-input>
			</b-form-group>
      <b-form-group  label="Last Name">
				<b-form-input  type="text"  v-model="userInfo.user_lname"></b-form-input>
			</b-form-group>
      <b-form-group  label="Email">
				<b-form-input  type="text"  v-model="userInfo.user_email"></b-form-input>
			</b-form-group>
      <b-form-group  label="Role">
					<b-form-input  type="text"  v-model="userInfo.user_role"></b-form-input>
			</b-form-group>
      </form>
		</b-card>
		</div>
	</b-modal>
</template>

<!-- DELETE USER MODAL -->
<template>
  	<b-modal id="deleteUserModal" :hide-footer=true ref="deleteUserModalRef">
		<form @submit.prevent="deleteUser()" >
			<b-nav-form variant="danger" align="center" @submit.prevent="deleteUser">
			<b-card  :title="'Are you sure you want to delete user ' + userInfo.user_fname + '?'" style="width:500px">
				<b-btn style="width:80px" text-align="center" type="submit" variant="success"> Confirm </b-btn>
				<b-btn style="width:80px" text-align="center" v-if="userInfo.user_id  ?  true  :  false"  variant="dark"  @click="hideModal">Cancel</b-btn>
			</b-card>
			</b-nav-form>
		</form>
	</b-modal>
</template>

<!-- EDIT USER MODAL -->

<template>
  	<b-modal id="modal1" :hide-footer=true ref="editUserRef" header-bg-variant="dark">
    <div>
		<b-card  :title="(userInfo.user_id  ?  'Edit user ID #'  +  userInfo.user_id  :  'New user')">
          <form  @submit.prevent="saveUser">
          <b-form-group  label="First Name">
               <b-form-input  type="text"  v-model="userInfo.user_fname"></b-form-input>
          </b-form-group>
          <div v-if="$v.userInfo.user_fname.$dirty">
               <p v-if="!$v.userInfo.user_fname.required">*Please fill out missing fields.</p>
               <p v-else-if="!$v.userInfo.user_fname.min">*Minimum of three (3) characters.</p>
               <p v-else-if="!$v.userInfo.user_fname.alpha">*Numeric characters are not allowed.</p>
          </div>
          <b-form-group  label="Last Name">
               <b-form-input  type="text"  v-model="userInfo.user_lname"></b-form-input>
          </b-form-group>
          <div v-if="$v.userInfo.user_lname.$dirty">
               <p v-if="!$v.userInfo.user_lname.required">*Please fill out missing fields.</p>
               <p v-if="!$v.userInfo.user_lname.min">*Minimum of three (3) characters.</p>
               <p v-if="!$v.userInfo.user_lname.alpha">*Numeric characters are not allowed.</p>
          </div>
          <b-form-group  label="Email">
               <b-form-input  type="text"  v-model="userInfo.user_email"></b-form-input>
          </b-form-group>
          <div v-if="$v.userInfo.user_email.$dirty">
               <p v-if="!$v.userInfo.user_email.required">*Please fill out missing fields.</p>
               <p v-if="!$v.userInfo.user_email.email">*Please enter valid email.</p>
          </div>
          <b-form-group  label="Role">
                    <b-form-input type="text"  v-model="userInfo.user_role"></b-form-input>
          </b-form-group>
          <div v-if="$v.userInfo.user_role.$dirty">
               <p v-if="!$v.userInfo.user_role.required">*Please fill out missing fields.</p>
               <p v-if="!$v.userInfo.user_role.min">*Minimum of three (2) characters.</p>
          </div>

          <div>
            <b-btn  type="submit" variant="success"> Save </b-btn>
            <b-btn  v-if="userInfo.user_id  ?  true  :  false"  variant="dark"  @click.prevent="clear()">Cancel</b-btn>
          </div>
		</form>
		</b-card>
	</div>
	</b-modal>
</template>

























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

<template>
  button.btn.btn-primary.btn-xs(data-title='Edit',
  data-toggle='modal', data-target='#edit')
  span.glyphicon.glyphicon-pencil

</template>

<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="https://bulma.io">
      <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
    </a>

    <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
      <a class="navbar-item">
        Home
      </a>

      <a class="navbar-item">
        Documentation
      </a>

      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link">
          More
        </a>

        <div class="navbar-dropdown">
          <a class="navbar-item">
            About
          </a>
          <a class="navbar-item">
            Jobs
          </a>
          <a class="navbar-item">
            Contact
          </a>
          <hr class="navbar-divider">
          <a class="navbar-item">
            Report an issue
          </a>
        </div>
      </div>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <a class="button is-primary">
            <strong>Sign up</strong>
          </a>
          <a class="button is-light">
            Log in
          </a>
        </div>
      </div>
    </div>
  </div>
</nav>

 div.container-fluid#app(style="width:1200px")
    b-navbar(toggleable="md", type="dark", variant="dark")
      b-navbar-toggle(target="nav_collapse")
      b-navbar-brand(to="/") USER MANAGEMENT
      b-navbar-nav
        b-nav-item(to="/") HOME
        b-nav-item(to="user-manager") USER MANAGER
    b-navbar(toggleable="md" type="light" variant="success" style="height:5px")
    router-view
</template>

