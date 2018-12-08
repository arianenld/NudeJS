<template lang="pug">
    b-modal#modal2(hide-footer=true, ref="viewUserRef")
      div
      b-card(title="User Information")
        form
          b-form-group(label="First Name")
            b-form-input(type="text", v-model="userInfo.user_fname")
          b-form-group(label="Last Name")
            b-form-input(type="text", v-model="userInfo.user_lname")
          b-form-group(label="Email")
            b-form-input(type="text", v-model="userInfo.user_email")
          b-form-group(label="Role")
            b-form-input(type="text", v-model="userInfo.user_email")
</template>

<script>
export default {
  props: ['userInfo'],

  data(){
    return{

    }
  },

  methods:{
    showModal() {
      this.$refs.viewUserRef.show();
    },

    hideModal(){
      this.$refs.viewUserRef.hide();
    }
  }

}
</script>

<style>

</style>
