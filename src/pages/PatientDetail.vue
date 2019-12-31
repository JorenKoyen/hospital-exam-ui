<template>
  <div
    v-if="!loading"
    class="patient-detail-page"
  >
    <div class="grid width-2">
      <!-- patient info card (name, avatar, ...) -->
      <div class="grid-item">
        <patient-info-card
          :avatar="patient.avatar"
          :name="patient.name"
          :ssn="patient.ssn"
          :hospitalized="patient.hospitalized"
          :contactInfo="patient.contact"
        />
      </div>
      <!-- hospitalization info (department, room, date, reason, ...) -->
      <div class="grid-item">
        <hospitalization-card />
      </div>
    </div>

    <div class="row">
      <!-- meta information (vegan, comments, ...) -->
      <div class="col"></div>
      <!-- assigned doctor (name, avatar, ...) -->
      <div class="col"></div>
    </div>

    <!-- actions list (type, description, date, ...) -->
  </div>
  <div v-else>
    <q-ajax-bar
      ref="bar"
      position="top"
      color="accent"
      size="5px"
      skip-hijack
    />
  </div>
</template>

<script>
import PatientInfoCard from 'components/patient-info-card.vue';
import HospitalizationCard from 'components/hospitalization-card.vue';
import { progressFetch } from '../api/helper';
export default {
  name: 'PatientDetailPage',
  components: {
    PatientInfoCard,
    HospitalizationCard
  },
  data: function () {
    return {
      loading: true,
      patient: {}
    };
  },
  methods: {
    async fetchData () {
      this.loading = true;
      this.$refs.bar.start(0);

      // fetch patient info
      const id = this.$router.currentRoute.params.id;
      const patient = await progressFetch({ resource: 'patients/' + id }, this.updateBar);

      // update state
      this.patient = patient;
    },
    updateBar (received, total) {
      if (!this.$refs.bar) return;

      // notify loading is done
      if (received === total) {
        this.$refs.bar.stop();
        // graceful state update
        setTimeout(() => {
          this.loading = false;
        }, 250);
      }

      // increment loading state
      this.$refs.bar.increment(Math.ceil((received / total) * 100));
    }
  },
  mounted () {
    this.fetchData();
  }
};
</script>

<style>
</style>
