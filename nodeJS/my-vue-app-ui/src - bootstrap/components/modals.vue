<template>
  <div class="container">
    <!-- add user modal -->
	<b-modal id ="addUserModal" ref="ShowDisplayModal" :hide-footer=true>
      <div align="left" >
      <b-card  :title="(model.user_id ?  'Edit user ID #'  +  model.user_id  :  'New user')">
        <form @submit.prevent="saveUser"  @submit="checkForm" action="/something" novalidate="true">
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
        </b-form-group><br>
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
export default {
  props: ['users']
}
</script>
