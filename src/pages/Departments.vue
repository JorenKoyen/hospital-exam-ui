<template>
  <div class="grid">
    <div
      class="grid-item"
      v-for="d in departments"
      :key="d.id"
    >
      <department-card
        :name="d.name"
        :rooms="d.numberOfRooms"
        :color="d.colorCode"
      />
    </div>
  </div>
</template>

<script>
import helper from '../api/helper';
import { error } from '../util/notify';
import DepartmentCard from 'components/department-card.vue';
export default {
  components: {
    DepartmentCard
  },
  data: function () {
    return {
      departments: []
    };
  },
  mounted: function () {
    this.loadDepartments();
  },
  methods: {
    async loadDepartments () {
      const deps = await helper({ resource: 'departments' })
        .catch(() => error(this.$q.notify, 'An unexpected error has occured', 'Unable to fetch departments from API'));

      this.departments = deps;
    }
  }
};
</script>

<style>
</style>
