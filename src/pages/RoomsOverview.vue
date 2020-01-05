<template>
  <div class="rooms-overview">

    <q-toolbar class="bg-grey-3">
      <q-breadcrumbs active-color="primary">
        <q-breadcrumbs-el
          label="Dashboard"
          icon="dashboard"
          to="/"
        />
        <q-breadcrumbs-el
          label="Departments"
          icon="business"
          to="/departments"
        />
        <q-breadcrumbs-el :label="$route.params.id" />
      </q-breadcrumbs>

      <q-space />

      <q-btn
        :flat="!detail"
        round
        dense
        color="primary"
        icon="view_list"
        @click="detail = true"
      />
      <q-btn
        :flat="detail"
        round
        dense
        color="primary"
        icon="map"
        v-if="hasFloorplan"
        @click="detail = false"
      />
    </q-toolbar>

    <!-- detailed overview of rooms -->
    <div
      v-if="detail"
      class="grid"
    >
      <div
        v-for="r in rooms"
        :key="r.id"
        class="grid-item"
      >
        <room-card
          :room="r.id"
          :number="r.number"
          :facilities="r.facilities"
        />
      </div>
    </div>

    <floorplan-viewer
      v-if="!detail"
      :department="$route.params.id"
    />

  </div>
</template>

<script>
import RoomCard from 'components/room-card.vue';
import FloorplanViewer from 'components/floorplan-viewer.vue';
import helper from '../api/helper';
import { error } from '../util/notify';
export default {
  name: 'PageRoomsOverview',
  components: {
    RoomCard,
    FloorplanViewer
  },
  data: function () {
    return {
      detail: true,
      rooms: [],
      hasFloorplan: false
    };
  },
  mounted: function () {
    this.loadRooms();
  },
  methods: {
    async loadRooms () {
      const id = this.$router.currentRoute.params.id;
      const dep = await helper({ resource: 'departments?name=' + id });
      this.hasFloorplan = dep[0].hasFloorPlan;

      const rooms = await helper({ resource: `departments/${id}/rooms` })
        .catch(() => error(this.$q.notify, 'An unexpected error has occured', 'Unable to fetch rooms from API'));

      this.rooms = rooms.sort((a, b) => a.number - b.number);
    }
  }
};
</script>

<style>
</style>
