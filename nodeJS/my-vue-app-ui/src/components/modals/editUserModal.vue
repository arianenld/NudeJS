<template lang="pug">
	section
		b-modal#modal1(hide-footer=true, ref="editUserRef",:active.sync="showEditModal")
			.card
				form(@submit.prevent="saveUser")
					.modal-card.is-dark
						header.modal-card-head
							p.modal-card-title(v-if="userInfo.user_id") Edit user ID # {{userInfo.user_id}}
							p.modal-card-title(v-else) Add new user

						.modal-card-body
							b-field(label="First Name")
								b-input(type="text", v-model="userInfo.user_fname")
							div(v-if="$v.userInfo.user_fname.$dirty")
								p#error(v-if="!$v.userInfo.user_fname.required") *Please fill out missing fields.
								p#error(v-else-if="!$v.userInfo.user_fname.min") *Minimum of three (3) characters.
								p#error(v-else-if="!$v.userInfo.user_fname.alpha") *Numeric and special characters are not allowed.
								p#error(v-else-if="!$v.userInfo.user_fname.whiteSpaces") *Double spacing is not allowed.

							b-field(label="Last Name")
								b-input(type="text", v-model="userInfo.user_lname")
							div(v-if="$v.userInfo.user_lname.$dirty")
								p#error(v-if="!$v.userInfo.user_lname.required") *Please fill out missing fields.
								p#error(v-else-if="!$v.userInfo.user_lname.min") *Minimum of three (3) characters.
								p#error(v-else-if="!$v.userInfo.user_lname.alpha") *Numeric and special characters are not allowed.
								p#error(v-else-if="!$v.userInfo.user_lname.whiteSpaces") *Double spacing is not allowed.

							b-field(label="Email")
								b-input(type="text", v-model="userInfo.user_email")
							div(v-if="$v.userInfo.user_email.$dirty")
								p#error(v-if="!$v.userInfo.user_email.required") *Please fill out missing fields.
								p#error(v-else-if="!$v.userInfo.user_email.email") *Please enter valid email.
							template(slot-scope="user")
								p#error(v-if="!v.user.user_email == userInfo.user_email") *Email address already taken.

							b-field(label="Role")
								b-input(type="text", v-model="userInfo.user_role")
							div(v-if="$v.userInfo.user_role.$dirty")
								p#error(v-if="!$v.userInfo.user_role.required") *Please fill out missing fields.
								p#error(v-if="!$v.userInfo.user_role.min") *Minimum of three (2) characters.
								p#error(v-else-if="!$v.userInfo.user_role.whiteSpaces") *Double spacing is not allowed.

							div
								button.button.is-dark(@click.prevent="hideModal") Cancel
								button.button.is-success(type="submit") Save


</template>
<script>
import {required, minLength, email, alpha} from "vuelidate/lib/validators"
const nameSyntax = value => {
    if (typeof value === 'undefined' || value === null || value === '') {
        return true
    }
    //return /^[a-zA-Z\s!\s*/]*$/.test(value)
    //return /^.*\s{2,}.*$/.text(value) whitespaces
    ///^(\w+\s)*\w+$/
     return /^[a-z\d\-_\s]+$/i.test(value)
}

const whiteSpaces = value => {
  if (typeof value === 'undefined' || value === null || value === '') {
        return true
    }
  return /^(\w+\s)*\w+$/i.test(value)
}


export default {
  props: ['userInfo'],
  validations: {
    userInfo: {
      user_fname: {required, min: minLength(3), alpha, whiteSpaces},
      user_lname: {required, min: minLength(3), alpha, whiteSpaces},
      user_email: {required, email},
      user_role: {required, min: minLength(2), whiteSpaces}
	}
  },
  data(){
	  return{
		  showEditModal: false
	  }
  },
  methods: {
    saveUser() {
      this.$v.userInfo.$touch()
        if(this.$v.userInfo.$error) return

      this.$emit('saveUser')
      this.hideModal()
      this.$toast.open('Action success!')
    },
    showModal () {
	  //this.$refs.editUserRef.show()
	  this.showEditModal = true
    },

    hideModal () {
      this.$v.userInfo.$reset()
      this.showEditModal = false
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

#error{
	color: red;
}

</style>
