 <template lang="pug">
  div.container-fluid.mt-4
    table
      thead
        tr
          th
            h1(align="left") CHOOSE ACTION
          th
            form(@submit.prevent="searchUser")
            b-nav-form(align="center")
              input(style="margin-right: 10px; margin-left:500px; float:right", type="text"
                    v-model="search", v-on:keyup="searchUser(search)", placeholder="Search", name="search")
          th
            b-btn(style="margin-right:10px; float:right", type="submit", size="sm", @click="addUser").success ADD USER
    table
        b-alert(:show="loading").warning Loading...
          div(style="width: 500px; float:left")
            user-table(
              :users="users"
              :userInfo="displayModel"
              v-on:viewUser="viewUser"
              v-on:deleteUser="deleteUser"
              v-on:editUser="editUser")

    edit-user-modal(
      :userInfo="model"
      v-on:saveUser="saveUser"
      ref="editUserModalRef"
    )

    delete-user-modal(
      :userInfo="displayModel"
      v-on:deleteUser="confirmDelete"
      ref="deleteUserRef"
    )

    view-user-modal(
      :userInfo="displayModel"
      ref="viewUserRef"
    )
</template>

<script>
import userService from "./userServices"
import userTable from "./userTable"
import deleteUserModal from "./modals/deleteUserModal"
import editUserModal from './modals/editUserModal'
import viewUserModal from './modals/viewUserModal'

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

  components: {
    userTable,
    deleteUserModal,
    editUserModal,
    viewUserModal
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
    },
	async deleteUser(user) {
      if(user.user_isdel == 1){
          this.deleteModel = {
              hehe: 1,
              user_isdel: 0
          }
      }
      else{
          this.deleteModel = {
              user_isdel: 1
          }
      }
      this.displayModel = {
          id: user.user_id,
          user_fname: user.user_fname
      }
      this.$refs.deleteUserRef.showModal()
      // if we are editing a user we deleted, remove it from the form
  	},

    async confirmDelete() {
        await userService.deleteUser(this.displayModel.id, this.deleteModel);
				await this.refreshUsers();
    },

    async getUser(user) {
      alert(user.user_isdel)

      this.displayModel={
        user_fname: user.user_fname,
        user_lname: user.user_lname,
        user_isdel: user.user_isdel,
        user_email: user.user_email,
        user_role: user.user_role
      }
  },

  viewUser(user) {
    this.displayModel = Object.assign({}, user)
    this.$refs.viewUserRef.showModal()
  },

  editUser(user){
    this.model = Object.assign({}, user)
    this.$refs.editUserModalRef.showModal()
  },

  addUser() {
    this.model = {}
    this.$refs.editUserModalRef.showModal()
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
