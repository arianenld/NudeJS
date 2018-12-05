
<template>
  	<b-modal id="modal1" :hide-footer=true ref="editUserRef" header-bg-variant="dark">
    <div>
		<b-card  :title="(userInfo.user_id  ?  'Edit user ID #'  +  userInfo.user_id  :  'New user')">
          <form  @submit.prevent="saveUser">
          <b-form-group  label="First Name">
               <b-form-input  type="text"  v-model="userInfo.user_fname"></b-form-input>
          </b-form-group>
          <div v-if="$v.userInfo.user_fname.$dirty">
               <p v-if="!$v.userInfo.user_fname.required">*Please fill out missing fields.</p>
               <p v-else-if="!$v.userInfo.user_fname.min">*Minimum of three (3) characters.</p>
               <p v-else-if="!$v.userInfo.user_fname.alpha">*Numeric characters are not allowed.</p>
          </div>
          <b-form-group  label="Last Name">
               <b-form-input  type="text"  v-model="userInfo.user_lname"></b-form-input>
          </b-form-group>
          <div v-if="$v.userInfo.user_lname.$dirty">
               <p v-if="!$v.userInfo.user_lname.required">*Please fill out missing fields.</p>
               <p v-if="!$v.userInfo.user_lname.min">*Minimum of three (3) characters.</p>
               <p v-if="!$v.userInfo.user_lname.alpha">*Numeric characters are not allowed.</p>
          </div>
          <b-form-group  label="Email">
               <b-form-input  type="text"  v-model="userInfo.user_email"></b-form-input>
          </b-form-group>
          <div v-if="$v.userInfo.user_email.$dirty">
               <p v-if="!$v.userInfo.user_email.required">*Please fill out missing fields.</p>
               <p v-if="!$v.userInfo.user_email.email">*Please enter valid email.</p>
          </div>
          <b-form-group  label="Role">
                    <b-form-input type="text"  v-model="userInfo.user_role"></b-form-input>
          </b-form-group>
          <div v-if="$v.userInfo.user_role.$dirty">
               <p v-if="!$v.userInfo.user_role.required">*Please fill out missing fields.</p>
               <p v-if="!$v.userInfo.user_role.min">*Minimum of three (2) characters.</p>
          </div>

          <div>
            <b-btn  type="submit" variant="success"> Save </b-btn>
            <b-btn  v-if="userInfo.user_id  ?  true  :  false"  variant="dark"  @click.prevent="clear()">Cancel</b-btn>
          </div>
		</form>
		</b-card>
	</div>
	</b-modal>
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
