<template>
  <div class="grid">
    <div class="grid-item">
      <room-card></room-card>
    </div>
    <div class="grid-item">
      <room-card></room-card>
    </div>
    <div class="grid-item">
      <room-card></room-card>
    </div>
    <div class="grid-item">
      <room-card></room-card>
    </div>
    <div class="grid-item">
      <room-card></room-card>
    </div>
    <div class="grid-item">
      <room-card></room-card>
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
