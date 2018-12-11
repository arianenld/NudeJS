<template lang="pug">
section#tableSize
	b-table(:data="users",
			:paginated="isPaginated",
            :per-page="perPage"
            :current-page.sync="currentPage",
            pagination-simple,
            :default-sort-direction="defaultSortDirection", narrowed)

		template(slot-scope="user")
			b-table-column
				span
					i.fas.fa-eye(@click="viewUser(user.row)")
			b-table-column(label="ID", field="user_id", width="40px", sortable, numeric)
				span {{user.row.user_id}}
			b-table-column(label="First Name", field="user_fname", width="40px", sortable)
				span {{user.row.user_fname}}
			b-table-column(label="Last Name", field="user_lname", sortable)
				span {{user.row.user_lname}}
			b-table-column(label="Email", field="user_email", sortable)
				span {{user.row.user_email}}
			b-table-column(label="Role", field="user_role", sortable)
				span {{user.row.user_role}}
			b-table-column(label="Status")
				span(v-if="user.row.user_isdel==1") Inactive
				span(v-else) Active
			b-table-column(label="Action", centered)
				button.button.is-warning#buttonVE(@click="editUser(user.row)").fas.fa-edit Edit
				template(v-if="user.row.user_isdel==1")
					button#buttonAD.button.is-success(@click="deleteUser(user.row)").fas.fa-eye Activate
				template(v-else)
					button#buttonAD.button.is-danger(@click="deleteUser(user.row)").fas.fa-eye-slash Deactivate

</template>

<script>
export default {
	props: ['users'],
	data (){
		return {
			userInfo: {},
			isPaginated: true,
			isPaginationSimple: false,
			defaultSortDirection: 'asc',
			currentPage: 1,
			perPage: 5
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

#buttonVE {
	width: 80px;
	text-align: center;
	display: inline-block;
	size: small;
	margin-inline-start: 5px
}

#buttonAD {
	width: 110px;
	size: small;
	text-align: center;
	display: inline-block;
}

b-colum-table{
	text-align:center;
}

#tableSize{
  width: 80%;
  margin: auto;
}

</style>
