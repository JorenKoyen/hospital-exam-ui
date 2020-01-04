<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title>
          {{ namePrettyPrint }}
        </q-toolbar-title>

        <div>v{{ version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item to='/departments'>
          <q-item-section avatar>
            <q-icon name="far fa-building" />
          </q-item-section>
          <q-item-section>Departments</q-item-section>
        </q-item>
        <q-item to='/floorplan'>
          <q-item-section avatar>
            <q-icon name="far fa-map" />
          </q-item-section>
          <q-item-section>Floorplan</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import appInfo from '../../package.json';
export default {
  name: 'MyLayout',

  data () {
    return {
      leftDrawerOpen: false,
      version: appInfo.version,
      name: appInfo.name
    };
  },
  computed: {
    namePrettyPrint () {
      return this.name.charAt(0).toUpperCase() + this.name.slice(1);
    }
  }
};
</script>
