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

<script>
export default {
  props: ['userInfo'],

  data (){
      return {
        //deleteUser: {}
    }
  },

  methods: {
    deleteUser (){
      this.hideModal()
      this.$emit('deleteUser')
    },

    showModal() {
      this.$refs.deleteUserModalRef.show();
    },

    hideModal(){
      this.$refs.deleteUserModalRef.hide();
    }
  }
}

</script>

<style>

</style>
