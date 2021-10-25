<template>
  <div>
    <button @click.prevent="getCourses()">Get Courses</button>
  </div>
</template>
<script>

import axios from 'axios';

export default {
  name: "GoogleClassroom",
  props: {
  },
  data(){
    return {
        url: 'https://classroom.googleapis.com/v1/courses'
    }
  },
  mounted(){
  },
  methods: {
      async getCourses(){

          const gauth = JSON.parse(localStorage.getItem('gauth'));

          console.log('authToken', gauth)

          const response = (await axios.get(this.url, 
          {
            headers: {
                        Authorization: 'Bearer ' + gauth.access_token
            }}));
          console.log('response', response)
      }

  },
  setup() {
  }
};
</script>
