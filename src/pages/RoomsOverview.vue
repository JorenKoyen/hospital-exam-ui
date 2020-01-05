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
          @alarm="onAlarm"
          @alarmEnd="onAlarmEnd"
        />
      </div>
    </div>

    <!-- floorplan view -->
    <floorplan-viewer
      v-if="!detail"
      :department="$route.params.id"
      @alarm="onAlarm"
      @alarmEnd="onAlarmEnd"
    />

    <audio
      v-if="soundAlarm"
      src="/statics/alarm.mp3"
      autoplay
      loop
    />
  </div>
</template>

<script>
import RoomCard from 'components/room-card.vue';
import FloorplanViewer from 'components/floorplan-viewer.vue';
import helper from '../api/helper';
import { error } from '../util/notify';
import { getSettings } from '../util/settings';
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
      hasFloorplan: false,
      alarmingRooms: []
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
    },
    onAlarm (room) {
      this.alarmingRooms.push(room);
    },
    onAlarmEnd (room) {
      this.alarmingRooms.splice(this.alarmingRooms.indexOf(room), 1);
    }
  },
  computed: {
    soundAlarm () {
      const settings = getSettings();
      const alarm = this.alarmingRooms.length > 0;

      return settings.soundAlarm && alarm;
    }
  }
};
</script>

<style>
</style>
