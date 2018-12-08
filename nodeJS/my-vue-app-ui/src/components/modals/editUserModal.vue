<template lang="pug">
  b-modal#modal1(hide-footer=true, ref="editUserRef", header-bg-variant="dark")
    b-card(:title="(userInfo.user_id  ?  'Edit user ID #'  +  userInfo.user_id  :  'New user')")
      form(@submit.prevent="saveUser")
        b-form-group(label="First Name")
          b-form-input(type="text", v-model="userInfo.user_fname")
        div(v-if="$v.userInfo.user_fname.$dirty")
          p(v-if="!$v.userInfo.user_fname.required") *Please fill out missing fields.
          p(v-else-if="!$v.userInfo.user_fname.min") *Minimum of three (3) characters.
          p(v-else-if="!$v.userInfo.user_fname.alpha") *Numeric characters are not allowed.

        b-form-group(label="Last Name")
          b-form-input(type="text", v-model="userInfo.user_lname")
        div(v-if="$v.userInfo.user_lname.$dirty")
          p(v-if="!$v.userInfo.user_lname.required") *Please fill out missing fields.
          p(v-else-if="!$v.userInfo.user_lname.min") *Minimum of three (3) characters.
          p(v-else-if="!$v.userInfo.user_lname.alpha") *Numeric characters are not allowed.

        b-form-group(label="Email")
          b-form-input(type="text", v-model="userInfo.user_email")
        div(v-if="$v.userInfo.user_email.$dirty")
          p(v-if="!$v.userInfo.user_email.required") *Please fill out missing fields.
          p(v-else-if="!$v.userInfo.user_email.email") *Please enter valid email.

        b-form-group(label="Role")
          b-form-input(type="text", v-model="userInfo.user_role")
        div(v-if="$v.userInfo.user_role.$dirty")
          p(v-if="!$v.userInfo.user_role.required") *Please fill out missing fields.
          p(v-if="!$v.userInfo.user_role.min") *Minimum of three (2) characters.

        div
          b-btn.btn-success(type="submit") Save
          b-btn.btn-dark(v-if="userInfo.user_id  ?  true  :  false", @click.prevent="clear()") Cancel


</template>

<script>
import {required, minLength, email, alpha} from "vuelidate/lib/validators"
export default {
  props: ['userInfo'],
  validations: {
    userInfo: {
      user_fname: {required, min: minLength(3), alpha},
      user_lname: {required, min: minLength(3), alpha},
      user_email: {required, email},
      user_role: {required, min: minLength(2)}
    }
  },
  methods: {
    saveUser() {
      this.$v.userInfo.$touch()
        if(this.$v.userInfo.$error) return

      this.$emit('saveUser')
      this.hideModal()
    },
    showModal () {
      this.$refs.editUserRef.show()
    },

    hideModal () {
      this.$refs.editUserRef.hide()
    }
  }
}
</script>

<style>
button {
  float: right;
  width: 80px;
  text-align: center;
  display: inline-block;
  margin-inline-start: 4px;
}

</style>
