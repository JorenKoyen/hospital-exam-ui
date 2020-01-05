<template>
  <div class="rooms-overview">

    <q-toolbar class="bg-grey-3 flexible-toolbar">
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
        <q-breadcrumbs-el
          :label="$route.params.id"
          :to="'/departments/' + $route.params.id"
        />
        <q-breadcrumbs-el label="rooms" />
      </q-breadcrumbs>

      <q-space />

      <div class="filters">
        <!-- name filter -->
        <q-input
          class="filter-input"
          label="Name"
          dense
          standout="bg-primary text-white"
          v-model="nameFilter"
          clearable
        />

        <!-- next type filter -->
        <q-select
          class="filter-input"
          label="Type"
          dense
          standout="bg-primary text-white"
          v-model="typeFilter"
          :options="types"
          clearable
        />
      </div>

      <div class="buttons">
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

      </div>
    </q-toolbar>

    <!-- detailed overview of rooms -->
    <div
      v-if="detail"
      class="grid"
    >
      <div
        v-for="r in filteredRooms"
        :key="r.id"
        class="grid-item"
        :class="{hidden: !r.visible}"
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
      :rooms="filteredRooms"
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
      alarmingRooms: [],
      nameFilter: '',
      typeFilter: '',
      types: []
    };
  },
  mounted: function () {
    this.loadRooms();
  },
  methods: {
    async loadRooms () {
      // get id from paramter
      const id = this.$router.currentRoute.params.id;

      // get department value
      const dep = await helper({ resource: 'departments?name=' + id });

      // get rooms
      const rooms = await helper({ resource: `departments/${id}/rooms` })
        .catch(() => error(this.$q.notify, 'An unexpected error has occured', 'Unable to fetch rooms from API'));

      // map patients name to rooms
      const hospitalizations = await helper({ resource: `hospitalizations?department=${id}&_expand=patient&_embed=actions` });
      rooms.forEach(r => {
        const hosp = hospitalizations.find(h => h.roomId === r.id);
        if (hosp) {
          // set patient name
          r.patientName = hosp.patient.name;

          // set upcoming action
          if (hosp.actions) {
            const actions = hosp.actions.sort((a, b) => a.timestamp - b.timestamp);
            r.upcomingType = actions[0].typeId;
          }
        }
      });

      // get all available types
      const types = await helper({ resource: 'types' });
      this.types = types.map(t => t.id);

      // update state
      this.hasFloorplan = dep[0].hasFloorPlan;
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
    },
    filteredRooms () {
      const modifiedRooms = [...this.rooms];

      modifiedRooms.forEach(room => {
        room.visible = true;

        // check patient name
        let visibleByName = true;
        if (this.nameFilter) {
          visibleByName = room.patientName ? room.patientName.toLowerCase().includes(this.nameFilter.toLowerCase()) : false;
        }

        // check type
        let visibleByType = true;
        if (this.typeFilter) {
          visibleByType = room.upcomingType ? room.upcomingType === this.typeFilter : false;
        }

        room.visible = visibleByName && visibleByType;
      });

      return modifiedRooms;
    }
  }
};
</script>

<style lang="scss" scoped>
.filters {
  display: flex;
  flex-direction: row;
  padding: 0 5rem;

  .filter-input {
    margin-right: 1rem;

    &:last-child {
      margin-right: unset;
      width: 15rem;
    }
  }
}

.flexible-toolbar {
  display: flex;
  flex-wrap: wrap;

  @media screen and (max-width: 1500px) {
    padding: 0.75rem;

    .filters {
      width: 100%;
      padding: 0.75rem 0;
    }
  }
}

.hidden {
  display: none;
}
</style>
