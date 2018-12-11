<template lang="pug">
	section
		b-modal#modal2(hide-footer=true, ref="viewUserRef", :active.sync="showViewModal")
			.card
				.modal-card
					header.modal-card-head
						p.modal-card-title(v-if="userInfo.user_isdel == 0") User Information
						p.modal-card-title(v-else) Notice

			.modal-card-body(v-if="userInfo.user_isdel == 0")
				form
				b-field(label="First Name")
					b-input(type="text", v-model="userInfo.user_fname")
				b-field(label="Last Name")
					b-input(type="text", v-model="userInfo.user_lname")
				b-field(label="Email")
					b-input(type="text", v-model="userInfo.user_email")
				b-field(label="Role")
					b-input(type="text", v-model="userInfo.user_email")

			.modal-card-body(v-else)
				form
				p USER INFORMATION NOT AVAILABLE AT THE MOMENT. PLEASE ACTIVATE USER TO VIEW INFORMATION.
</template>

<script>
export default {
  props: ['userInfo'],

  data(){
    return{
      showViewModal: false
    }
  },

  methods:{
    showModal() {
      this.showViewModal = true
    },

    hideModal(){
      this.showViewModal = false
    }
  }

}
</script>

<style>

</style>
