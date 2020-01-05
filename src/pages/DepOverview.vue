<template>
  <div class="overview-wrapper">
    <!-- toolbar with breadcrumbs -->
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

    </q-toolbar>

    <div class="horizontal-center">
      <!-- filter options -->
      <!-- name, type of next action, vegan -->
      <q-card class="filters">filters</q-card>

      <!-- q-list with items -->
      <q-card class="rooms">rooms</q-card>
    </div>

  </div>
</template>

<script>

export default {
  name: 'PageDepartmentOverview',
  components: {
  }
};
</script>

<style lang="scss" scoped>
</style>>
