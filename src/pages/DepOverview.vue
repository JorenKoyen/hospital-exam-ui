<template>
  <div class="overview-wrapper">
    <!-- toolbar with breadcrumbs -->
    <q-toolbar class="bg-secondary text-white">
      <q-breadcrumbs active-color="blue-grey-5">
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
        flat
        icon="refresh"
      />
    </q-toolbar>

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

    <!-- navigate to interesting links for the current department -->
    <section class="navigation">
      <big-nav-card
        title="View Rooms"
        subTitle="See all rooms from this department"
        :link="`/departments/${$route.params.id}/rooms`"
      />
    </section>

  </div>
</template>

<script>
import SimpleStatCard from 'components/simple-stat-card.vue';
import BigNavCard from 'components/big-navigation-card.vue';
export default {
  name: 'PageDepartmentOverview',
  components: {
    SimpleStatCard,
    BigNavCard
  }
};
</script>

<style lang="scss" scoped>
.overview-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
}

section.navigation {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>>
