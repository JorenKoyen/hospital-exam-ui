<template>
  <div class="grid">
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
</template>

<script>
import RoomCard from 'components/room-card.vue';
import helper from '../api/helper';
import { error } from '../util/notify';
export default {
  name: 'PageRoomsOverview',
  components: {
    RoomCard
  },
  data: function () {
    return {
      rooms: []
    };
  },
  mounted: function () {
    this.loadRooms();
  },
  methods: {
    async loadRooms () {
      const dep = this.$router.currentRoute.params.id;
      const rooms = await helper({ resource: `departments/${dep}/rooms` })
        .catch(() => error(this.$q.notify, 'An unexpected error has occured', 'Unable to fetch rooms from API'));

      this.rooms = rooms;
    }
  }
};
</script>

<style>
</style>
