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
							<input style="margin-right:10px; margin-left:370px; float:right" type="text" v-model="search" v-on:keyup="searchUser(search)" placeholder="Search" name="search"/>
						</b-nav-form>
						</form>
					</th>
					<th>
						<b-btn style="margin-right:10px; float:right"  type="submit" size="sm" v-b-modal.addUserModal @click="clear()" variant="success">ADD USER</b-btn>
					</th>
				</tr>
			</thead>
		</table>
    <div>
    <b-alert :show="loading"  variant="warning">Loading...</b-alert>
    <div style="width:500px float:left">
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
					<tr v-for="user  in  users"  :key="user.id">
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
							<b-btn style="width:60px" size="sm" text-align="center" variant="primary" v-b-modal.modal2 @click.prevent="getUser(user)">View</b-btn>
							<b-btn style="width:60px" size="sm" text-align="center" variant="warning" v-b-modal.modal1 @click.prevent="populateUserToEdit(user)">Edit</b-btn>
							<template v-if="user.user_isdel == 1">
								<b-btn style="width:90px" size="sm" text-align="center" variant="success"  v-b-modal.deleteUserModal @click="deleteUser(user)">Activate</b-btn>
							</template>
							<template v-else>
								<b-btn style="width:90px" size="sm" text-align="center" variant="danger"  v-b-modal.deleteUserModal @click="deleteUser(user)">Deactivate</b-btn>
							</template>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
    <!--<b-pagination align="center" size="sm" total-rows: v-model="currentPage" :per-page="5">
    </b-pagination>-->
		</div>

	<!-- STAAAAART -->
	<!-- add user modal -->
	<b-modal id ="addUserModal" ref="ShowDisplayModal" :hide-footer=true>
      <div align="left">
      <b-card  :title="(model.user_id ?  'Edit user ID #'  +  model.user_id  :  'New user')">
        <form @submit.prevent="saveUser">
        <b-form-group  label="First Name">
            <b-form-input  type="text"  v-model="model.user_fname"></b-form-input>
        </b-form-group>

        <b-form-group  label="Last Name">
            <b-form-input  type="text"  v-model="model.user_lname"></b-form-input>
        </b-form-group>

        <b-form-group  label="Email">
            <b-form-input  type="text"  v-model="model.user_email"></b-form-input>
        </b-form-group>

        <b-form-group  label="Role">
            <b-form-input  type="text"  v-model="model.user_role"></b-form-input>
        </b-form-group>
        <div>
            <b-btn style="float:right; width:90px" type="submit"  variant="success">Save</b-btn>
            <b-btn style="width:80px" text-align="center" v-if="model.user_id  ?  true  :  false"  variant="default"  @click.prevent="clear()">Cancel</b-btn>
        </div>
        </form>
      </b-card>
      </div>
	</b-modal>

	<!-- edit user modal -->
	<b-modal id="modal1" :hide-footer=true>
		<div>
		<b-card  :title="(model.user_id  ?  'Edit user ID #'  +  model.user_id  :  'New user')">
			<form  @submit.prevent="saveUser">
			<b-form-group  label="First Name">
				<b-form-input  type="text"  v-model="model.user_fname"></b-form-input>
			</b-form-group>
			<b-form-group  label="Last Name">
				<b-form-input  type="text"  v-model="model.user_lname"></b-form-input>
			</b-form-group>
			<b-form-group  label="Email">
				<b-form-input  type="text"  v-model="model.user_email"></b-form-input>
			</b-form-group>
			<b-form-group  label="Role">
					<b-form-input  type="text"  v-model="model.user_role"></b-form-input>
			</b-form-group>
			<div>
				<b-btn style="width:80px" text-align="center" type="submit"   variant="success"> Save </b-btn>
				<b-btn  style="width:80px" text-align="center" v-if="model.user_id  ?  true  :  false"  variant="dark"  @click.prevent="clear()">Cancel</b-btn>
			</div>
			</form>
		</b-card>
		</div>
	</b-modal>

	<!-- search modal -->
	<b-modal id="searchUserModal" :hide-footer=true>
		<form @submit.prevent="searchUser">
		<b-nav-form align="center">
			<b-form-input style="width: 250px" size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
			<b-button style="float:right" size="sm" class="my-2 my-sm-0" type="submit">GO</b-button>
			<div>
			<table style="width:70px" table-layout: fixed class="table table-striped table-hover" hover>
				<thead>
				<tr >
				<th>ID</th>
				<th>First Name</th>
				<th>Last Name</th>
				<th>Status</th>
					<th>Action</th>
					<th>&nbsp;</th>
				</tr>
				</thead>
				<tbody>
				<tr  v-for="user  in  users"  :key="user.id">
					<td>{{ user.user_id }}</td>
					<td>{{ user.user_fname }}</td>
					<td>{{ user.user_lname }}</td>
					<td>{{ user.user_status}}</td>
					<td  class="text-right">
					<b-btn style="width:80px" text-align="center" variant="primary" v-b-modal.modal2 @click.prevent="populateToEdit(user)">View</b-btn>
					<b-btn style="width:80px" text-align="center" variant="warning" v-b-modal.modal1 @click.prevent="populateUserToEdit(user)">Edit</b-btn>
					<b-btn style="width:80px" text-align="center" variant="danger" @click.prevent="deleteUser(user.user_id)">Delete</b-btn>
					</td>
				</tr>
				</tbody>
			</table>
			</div>
		</b-nav-form>
		</form>
	</b-modal>

	<!-- delete modal -->
	<b-modal id="deleteUserModal" :hide-footer=true>
		<form @submit.prevent="deleteUser(modal.user_id)" >
			<b-nav-form variant="danger" align="center" @submit.prevent="confirmDelete">
			<b-card  :title="'Are you sure you want to delete user ' + displayModel.user_fname + '?'" style="width:500px">
				<b-btn style="width:80px" text-align="center" type="submit" variant="success"> Confirm </b-btn>
				<b-btn style="width:80px" text-align="center" v-if="model.user_id  ?  true  :  false"  variant="dark"  @click.prevent="clear()">Cancel</b-btn>
			</b-card>
			</b-nav-form>
		</form>
	</b-modal>

  <!-- view modal -->
  <b-modal id="modal2" :hide-footer=true>
		<div>
		<b-card  :title="('User Information:')">
			<form  @submit.prevent="getUser">
			<b-form-group  label="First Name">
				<b-form-input  type="text"  v-model="displayModel.user_fname"></b-form-input>
			</b-form-group>
			<b-form-group  label="Last Name">
				<b-form-input  type="text"  v-model="displayModel.user_lname"></b-form-input>
			</b-form-group>
			<b-form-group  label="Email">
				<b-form-input  type="text"  v-model="displayModel.user_email"></b-form-input>
			</b-form-group>
			<b-form-group  label="Role">
					<b-form-input  type="text"  v-model="displayModel.user_role"></b-form-input>
			</b-form-group>
      </form>
		</b-card>
		</div>
	</b-modal>

	</div>
</template>

<script>
import userService from "./userServices";
export default {
	data() {
		return {
			loading: false,
			users: [],
			model: {},
			displayModel: {},
			updateModel: {},
      deleteModel: {},
      search: ''
		};
	},
	async created() {
		this.refreshUsers();
	},
	methods: {
		async refreshUsers() {
			this.loading = true;
			this.users = (await userService.getUsers()).data.allUser;
			this.loading = false;
		},
		async populateUserToEdit(user) {
			this.model = Object.assign({}, user);
			//model may laman
		},
	async saveUser() {
		if (this.model.user_id) {
			console.log(this.model.user_id)
			alert("hahahha")
			this.updateModel = {
				user_fname: this.model.user_fname,
				user_lname: this.model.user_lname,
				user_email: this.model.user_email,
				user_role: this.model.user_role
			};
			await userService.updateUser(this.model.user_id, this.updateModel);
		} else {
			await userService.createUser(this.model);
		}
		this.model = {}; // reset form
		await this.refreshUsers();
		console.log(this.model.user_id)
    },
	async deleteUser(user) {
      if(user.user_isdel == 1){
          this.deleteModel = {
              hehe: 1,
              user_isdel: 0
          }
          alert("is del ay 1 kaya gawin 0")
      }
      else{
          this.deleteModel = {
              user_isdel: 1
          }
          alert("is del ay 0 kaya gawin 1")

      }

      this.displayModel = {
          id: user.user_id,
          user_fname: user.user_fname
      }
// if we are editing a user we deleted, remove it from the form
  	},

    async confirmDelete() {
      alert(this.deleteModel.user_isdel)
        await userService.deleteUser(this.displayModel.id, this.deleteModel);
				await this.refreshUsers();
    },
	async getUser(user) {
		this.displayModel={
      user_fname: user.user_fname,
      user_lname: user.user_lname,
      user_email: user.user_email,
      user_role: user.user_role
    }
		{
			await userService.getUser(user_id, this.displayModel);
			await this.refreshUsers();
		}
		this.model = {}; // reset form
	},

	async clear() {
		this.model = {};
	},

	async searchUser(str) {
      this.search = str
      str = str.toLowerCase()

      var userFound = []

      if(str != '' && str != null && str != undefined){
        this.users.forEach(user => {
          if(user.user_fname.toLowerCase().includes(str)
            || user.user_lname.toLowerCase().includes(str)
            || user.user_email.toLowerCase().includes(str)
            || user.user_role.toLowerCase().includes(str)){

              userFound.push(user)
            }
        });

        this.users = userFound
      }

      else{
        this.refreshUsers()
        this.search = ''
      }

    },

	showDisplayModal() {
		this.$refs.displayModal.show();
	},

	hideDisplayModal() {
		this.$refs.displayModal.hide();
	}
	}
};
</script>
