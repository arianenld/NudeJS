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
                    <b-btn style="width:60px" size="sm" text-align="center" variant="primary" @click="viewUser(user)">View</b-btn>
                    <b-btn style="width:60px" size="sm" text-align="center" variant="warning" @click="editUser(user)">Edit</b-btn>
                    <template v-if="user.user_isdel == 1">
                        <b-btn style="width:90px" size="sm" text-align="center" variant="success" @click="deleteUser(user)">Activate</b-btn>
                    </template>
                    <template v-else>
                        <b-btn style="width:90px" size="sm" text-align="center" variant="danger" @click="deleteUser(user)">Deactivate</b-btn>
                    </template>
                </td>
            </tr>
        </tbody>
        <br>
        <b-pagination size="md" base-url="#/user-manager" :per-page="pageCount()" :totalRows="users.length" v-model="pageNumber"></b-pagination>
    </table>
</template>

<script>
export default {
  props: ['users'],
	data (){
    return {
			userInfo: {},
            pageNumber: 1,
            size: 5
     }
  },

	methods: {
		viewUser (user) {
			this.$emit('viewUser', user)
		},

		editUser (user){
			this.$emit('editUser', user)
		},

		deleteUser(user){
			this.$emit('deleteUser', user)
    },

		pageCount(){
			let l = this.users.length,
			s = this.size;
			return Math.ceil(l/s)
		},

		paginatedData(){
			const start = (this.pageNumber -1) * this.size,
						end = start + this.size;
			return this.users.slice(start,end)
        }
    }
}
</script>

<style>

</style>
