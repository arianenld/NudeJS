import Api from './Api'

export default {
  getUsers() {
    //this will make a get request in
    //http://localhost:8081/api/user
    return Api().get('user')
  },
  createUser(user) {
    //this will make a post request in
    //http://localhost:8081/api/user
    return Api().post('user', user)
  },
  getUser(id) {
    //this will make a get request in
    //http://localhost:8081/api/user/:id
    return Api().get(`user/${id}`, user)
  },
  updateUser(id, user) {
    //this will make a put request in
    //http://localhost:8081/api/user/:id
    return Api().put(`user/${id}`, user) //param, req
  },
  deleteUser(id, user) {
    //this will make a put request in
    //http://localhost:8081/api/user/:id
    return Api().put(`user/${id}`, user)
  },
  searchUser(user) {
    return Api().put(`user/${user}`, user)
  }
}
