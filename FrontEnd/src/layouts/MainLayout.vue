<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="header">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Classroom Helper
        </q-toolbar-title>

        <div></div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Courses',
    caption: 'View, add and edit courses',
    icon: 'school',
    routeName: 'Classroom'
  },
  {
    title: 'Topics',
    caption: 'View, add and edit topics',
    icon: 'code',
    routeName: 'Topics'
  },
  {
    title: 'Assignments',
    caption: 'View, add and edit assignments',
    icon: 'chat',
    routeName: 'Assignments'
  },
  {
    title: 'Students',
    caption: 'View, add and edit students',
    icon: 'record_voice_over',
    routeName: 'Students'
  }
];

import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
<style lang="css" scoped>
.header{
  backdrop-filter: blur(7px);
}
</style>
