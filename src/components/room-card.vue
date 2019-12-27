<template>
  <q-card class="room-card">
    test
  </q-card>
</template>

<script>
export default {
  name: 'RoomCard',
  data: () => ({
    number: 0,
    facilities: [
      'sanitair',
      'salon'
    ],
    patient: 'Jos Jansen',
    bloodPressure: 0,
    heartbeat: 60,
    status: 'occupied' // clear, occupied, upcoming, missed, request, alarm
  })
};
</script>

<style lang="scss" scoped>
</style>
