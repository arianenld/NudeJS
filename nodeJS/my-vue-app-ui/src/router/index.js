import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import UserManager from '@/components/UserManager1'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'Hello',
			component: Hello
		},
		{
			path: '/user-manager',
			name: 'UserManager',
			component: UserManager,
		}
	]
})
