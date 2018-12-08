<template lang="pug">
	div
		.table.table-striped.table-hover.striped-hover(hover)
			thead
			tr
				th ID
				th First Name
				th Last Name
				th Email
				th Role
				th Status
				th(style="text-align:center") Action
			tbody
			tr(v-for="user in paginatedData()", :key="user.id")
				td {{user.user_id}}
				td {{user.user_fname}}
				td {{user.user_lname}}
				td {{user.user_email}}
				td {{user.user_role}}
				template(v-if="user.user_isdel==1")
					td Inactive
				template(v-else-if="user.user_isdel == 0")
					td Active
				template(v-else)
					td {{ user.user_isdel }}
				td(style="text-align:center")
					b-btn#buttonVE.btn-warning(@click="editUser(user)") Edit
					template(v-if="user.user_isdel == 1")
						b-btn#buttonAD.btn-success(@click="deleteUser(user)") Activate
					template(v-else)
						b-btn#buttonAD.btn-danger(@click="deleteUser(user)") Deactivate
			div
				b-pagination(size="md" base-url="#/user-manager" :per-page="pageCount()" :totalRows="users.length" v-model="pageNumber")

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

#buttonVE {
  float: right;
  width: 80px;
  text-align: center;
  display: inline-block;
  size: small;
  margin-inline-start: 5px
}

#buttonAD {
  width: 100px;
  size: small;
  text-align: center;
  display: inline-block;
}

</style>
