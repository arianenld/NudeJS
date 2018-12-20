<template lang="pug">
	section
		b-modal#deleteUserModal(hide-footer=true, :active.async="showDeleteModal")
			.card
				form(@submit.prevent="deleteUser")
					.modal-card
						header.modal-card-head
						.modal-card-body
							p(v-if="userInfo.user_isdel == 0") Are you sure you want to change user {{userInfo.user_fname}} status from Active to Inactive?
							p(v-else) Are you sure you want to change user {{userInfo.user_fname}} status from Inactive to Active?
						footer.modal-card-foot(style="justify-content: flex-end")
								button.button.is-success(style="width:80px", text-align="center", type="submit") Confirm
								button.button.is-dark(style="width:80px", text-align="center", type="button",@click="hideModal") Cancel
</template>

<script>
export default {
  props: ['userInfo'],

  data (){
      return {
        showDeleteModal: false
    }
  },

  methods: {
    deleteUser (){
      console.log("bgtf")
      console.log(this.userInfo.user_isdel)
      if(this.userInfo.user_isdel == 0){
        console.log("")
        this.$toast.open('User deactivated.')
      }
      else{
        this.$toast.open('User activated.')
      }
      this.hideModal()
      this.$emit('deleteUser')
    },

    showModal() {
      this.showDeleteModal = true
    },

    hideModal(){
      this.showDeleteModal = false
    }
  }
}

</script>

<style>

</style>
