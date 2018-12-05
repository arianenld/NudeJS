<template>
  	<b-modal id ="addUserModal" ref="ShowDisplayModal" :hide-footer=true>
      <div align="left">
      <b-card  :title="(userInfo.user_id ?  'Edit user ID #'  +  userInfo.user_id  :  'New user')">
        <form @submit.prevent="saveUser">
        <b-form-group  label="First Name">
            <b-form-input  type="text"  v-model="userInfo.user_fname"></b-form-input>
            <!-- VALIDATION -->
        </b-form-group>
        <div v-if="$v.userInfo.user_fname.$dirty">
              <p class="error" v-if="!v.userInfo.user_fname.required">*Please fill out required field</p>
              <p class="error" v-if="!v.userInfo.user_fname.min">*Please enter 3 minimum characters</p>
              <p class="error" v-if="!v.userInfo.user_fname.required">*Numeric characters are not allowed</p>
        </div>

        <b-form-group  label="Last Name">
            <b-form-input  type="text"  v-model="userInfo.user_lname"></b-form-input>
        </b-form-group>

        <b-form-group  label="Email">
            <b-form-input  type="text"  v-model="userInfo.user_email"></b-form-input>
        </b-form-group>

        <b-form-group  label="Role">
            <b-form-input  type="text"  v-model="userInfo.user_role"></b-form-input>
        </b-form-group>
        <div>
            <b-btn style="float:right; width:90px" type="submit"  variant="outline-success">Save</b-btn>
            <b-btn style="width:80px" text-align="center" v-if="users.user_id  ?  true  :  false"  variant="default"  @click.prevent="clear()">Cancel</b-btn>
        </div>
        </form>
      </b-card>
      </div>
	</b-modal>
</template>

<script>
import { required, minLength, alpha } from 'vuelidate/lib/validators'
export default {
  props: ['userInfo'],
  validations: {
    userInfo: {
      user_fname: {required, min: minLength(3), alpha},
      user_lname: {required, min: minLength(3), alpha},
      email: {required, email},
      role: {required}
    }
  }
}
</script>

<style>

</style>
