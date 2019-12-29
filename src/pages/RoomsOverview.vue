<template>
  <div class="grid">
    <div class="grid-item">
      <room-card
        room="205A"
        :facilities="['toilet', 'shower', 'tv']"
        patient="anna kendrick"
      />
    </div>
    <div class="grid-item">
      <room-card
        room="205B"
        :facilities="['toilet', 'tv']"
        patient="henry cavill"
      />
    </div>
    <div class="grid-item">
      <room-card
        room="206A"
        :facilities="['toilet', 'shower', 'childsupport']"
        patient="freya allan"
      />
    </div>
    <div class="grid-item">
      <room-card
        room="206B"
        :facilities="['toilet', 'shower', 'tv']"
        patient="anya chalotra"
      />
    </div>
    <div class="grid-item">
      <room-card
        room="207A"
        :facilities="['toilet', 'shower', 'tv']"
        patient="mimi ndiweni"
      />
    </div>
  </div>
</template>

<script>
import RoomCard from 'components/room-card.vue';
export default {
  name: 'PageRoomsOverview',
  components: {
    RoomCard
  }
};
</script>

<style>
</style>
