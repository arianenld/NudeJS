//Hello world js
var app = new Vue({
    el: '#firstMessage', //id ng code same sa id sa index html
    data: {
      message: 'Hello Vue!'
    }
  })

// hover function to view message
// can be updated via console in inspect element
var app2 = new Vue({
    el: '#app-2',
    data: {
      message: 'You loaded this page on ' + new Date().toLocaleString()
    }
  })

//  true of false control
var app3 = new Vue({
  el: '#app-3',
  data: {
    seen: true
  }
})

// array list passing to html 
var app4 = new Vue({
  el: '#app-4',
  data: {
    
    todos: [
      { text: 'Learn JavaScript',},
      { text: 'Learn Vue'},
      { text: 'Build something awesome'}
    ],
    
      message: 'YAY'}
})

// message reversing
var app5 = new Vue({
  el: '#app-5',
  data: {
    message: ''
  },
  methods: {
    reverseMessage: function () {
      this.message = this.message.split('').reverse().join('')
    }
  }
})

//defining a new component called todo-item
Vue.component('todo-item', {
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
})

var app7 = new Vue({
  el: '#app-7',
  data: {
    groceryList: [
      { id: 0, text: 'Vegetables' },
      { id: 1, text: 'Cheese' },
      { id: 2, text: 'Whatever else humans are supposed to eat' }
    ]
  }
})