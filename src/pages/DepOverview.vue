<template>
  <div>

    <!-- quick overview with stats about the department -->
    <section class="grid">
      <div class="grid-item">
        <simple-stat-card
          title="free"
          subTitle="Rooms without patients"
          data="25"
          subData="/300"
        />
      </div>
      <div class="grid-item">
        <simple-stat-card
          title="occupied"
          subTitle="Rooms occupied by a patient"
          data="150"
          subData="/300"
          type="positive"
        />
      </div>
      <div class="grid-item">
        <simple-stat-card
          title="actions required"
          subTitle="Rooms that have a pending action"
          data="10"
          subData="/300"
          type="warning"
        />
      </div>
      <div class="grid-item">
        <simple-stat-card
          title="aid required"
          subTitle="Rooms that require immediate aid"
          data="1"
          subData="/300"
          type="negative"
        />
      </div>

    </section>

    <!-- list all rooms from this department -->
    <room-card />
  </div>
</template>

<script>
import RoomCard from 'components/room-card.vue';
import SimpleStatCard from 'components/simple-stat-card.vue';
export default {
  name: 'PageDepartmentOverview',
  components: {
    RoomCard,
    SimpleStatCard
  }
};
</script>

<style lang="scss" scoped>
</style>>
