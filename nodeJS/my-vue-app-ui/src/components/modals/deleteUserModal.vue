<template lang="pug">
  b-modal#deleteUserModal(hide-footer=true, ref="deleteUserModalRef")
    div
      form(@submit.prevent="deleteUser()")
        b-nav-form.btn-danger(@submit.prevent="deleteUser")
        b-card(:title="'Are you sure you want to delete user ' + userInfo.user_fname + '?'", align="center")
          b-btn.btn-success(style="width:80px", text-align="center", type="submit") Confirm
          b-btn.btn-dark(style="width:80px", text-alin="center", v-if="userInfo.user_id  ?  true  :  false", @click="hideModal") Cancel
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
