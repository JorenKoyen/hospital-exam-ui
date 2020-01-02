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
        <div class="grid-spacer"></div>
        <patient-meta-card :patient="patient.id" />
      </div>
      <!-- hospitalization info (department, room, date, reason, ...) -->
      <div class="grid-item">
        <hospitalization-card
          :department="hospitalization.department"
          :room="hospitalization.room.number"
          :hospitalizedOn="hospitalization.hospitalizedOn"
          :reason="hospitalization.reason"
        />
      </div>

      <!-- meta information (vegan, comments, ...) -->
      <div class="grid-item"></div>
      <!-- assigned doctor (name, avatar, ...) -->
      <div class="grid-item"></div>
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
import PatientMetaCard from 'components/patient-meta-card.vue';
import { multiFetch } from '../api/helper';
export default {
  name: 'PatientDetailPage',
  components: {
    PatientInfoCard,
    HospitalizationCard,
    PatientMetaCard
  },
  data: function () {
    return {
      loading: true,
      patient: {},
      hospitalization: {}
    };
  },
  methods: {
    async fetchData () {
      this.loading = true;
      this.$refs.bar.start(0);

      // fetch patient info
      const id = this.$router.currentRoute.params.id;
      const values = await multiFetch([
        { url: `patients/${id}`, single: true },
        { url: `patients/${id}/hospitalizations?_expand=room&_expand=doctor`, single: true }
      ], this.updateBar);

      // update state
      this.patient = values[0];
      this.hospitalization = values[1];
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
