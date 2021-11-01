<template>
  <q-page>
    <div class="q-pa-md">

      <q-inner-loading :showing="!courses || courses.length == 0">
        <q-spinner-gears size="75px" color="primary"></q-spinner-gears>
      </q-inner-loading>


      <q-markup-table v-if="courses.length > 0">
        <thead>
          <tr>
            <th class="text-left">Course Code</th>
            <th class="text-left">Course</th>
            <th class="text-left">Section</th>
            <th class="text-left">Status</th>
            <th class="text-left">Created</th>
          </tr>
        </thead>
        <tbody>
          <tr :key="course.id" v-for="course in courses">
            <td class="text-left">{{course.enrollmentCode}}</td>
            <td class="text-left">{{course.name}}</td>
            <td class="text-left">{{course.section}}</td>
            <td class="text-left"><span v-html="formatStatus(course.courseState)"></span></td>
            <td class="text-left">{{formatDateTime(course.creationTime)}}</td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Classes',
  data(){
    return {
      courses: []
    }
  },
  mounted(){
    this.getClasses();
  },
  methods: {
      async getClasses(){

            const response = (await this.$googleApi.get('courses'));

            if(response.status = 200)
              this.courses = response.data.courses;
        }
    }
})
</script>
