<template>
  <div class="center">
    <div class="floorplan">
      <img
        src="/statics/floorplan.svg"
        alt="floor plan"
        class="plan"
      >
      <!-- <room-card
        class="room"
        room="932f0c93-9281-43b5-a8b9-48e1b22d7471"
        :number="210"
        :facilities="['toilet']"
        compact
      /> -->

      <room-card
        v-for="r in rooms"
        class="room"
        :key="r.id"
        :room="r.id"
        :number="r.number"
        :facilities="r.facilities"
        compact
        :style="{top: r.y + 'px', left: r.x + 'px'}"
      />
    </div>
  </div>
</template>

<script>
import RoomCard from 'components/room-card.vue';
import helper from '../api/helper';
export default {
  name: 'floorplan-viewer',
  components: {
    RoomCard
  },
  props: ['department'],
  data: function () {
    return {
      rooms: []
    };
  },
  methods: {
    async fetchRooms () {
      const rooms = await helper({
        resource: `departments/${this.department}/rooms`
      });

      this.rooms = rooms;
    }
  },
  mounted () {
    this.fetchRooms();
  }
};
</script>

<style lang="scss" scoped>
.floorplan {
  position: relative;
}
.room {
  position: absolute;
}
img.plan {
  width: 1500px;
  height: auto;
}
</style>
