<template>
  <q-card
    class="room-card"
    :class="cardStyle"
  >
    <div
      class="room-content"
      v-show="!loading"
    >
      <!-- room number display -->
      <section
        v-if="!hasPatient"
        class="room-info"
      >
        room {{ number }}
      </section>

      <section
        v-if="!hasPatient"
        class="empty-notification"
      >
        No patient assigned to this room
      </section>

      <!-- patient info w/ basic room info -->
      <section
        v-if="hasPatient"
        class="patient-info"
      >
        <q-avatar
          square
          class="patient-info__avatar"
        >
          <img
            :src="patient.avatar"
            alt="patient picture"
            class="patient-info__img"
          >
        </q-avatar>
        <div class="patient-info__data">
          <span class="patient-info__data__name text-weight-medium">{{ patient.name }}</span>
          <span class="patient-info__data__rrnr text-grey">{{ patient.ssn }}</span>
        </div>
        <span class="patient-info__room">room {{ number }}</span>
      </section>

      <!-- monitoring info -->
      <section
        v-if="hasPatient"
        class="monitoring-info"
      >
        <div class="monitoring-info__item">
          <q-icon name="fas fa-heartbeat" />
          <span>{{ metrics.heartrate }}</span>
        </div>
        <div class="monitoring-info__item">
          <q-icon name="fas fa-tachometer-alt" />
          <span>{{ metrics.upperPressure }}/{{ metrics.lowerPressure }}</span>
        </div>
      </section>

      <!-- action info, show upcoming actions -->
      <section
        class="action-info"
        v-if="hasPatient"
      >
        <span
          v-if="!hasAction"
          class="action-info__no-action"
        >No upcoming action</span>
        <p
          v-if="hasAction"
          class="action-info__timer-text"
        >{{ actionDifference }}</p>
        <span
          v-if="hasAction"
          class="action-info__description"
        >{{ actionDescription }}</span>
      </section>

      <!-- facilities, show available facilities -->
      <section class="facilities">
        <q-icon
          v-for="fac in facilitiesList"
          :key="fac.name"
          class="facilities__option"
          :class="{available: fac.available}"
          :name="fac.icon"
        />
      </section>

      <!-- provide links to interesting pages in reference to room and patient -->
      <section
        v-if="hasPatient"
        class="nav-actions"
      >
        <q-btn
          icon="fas fa-file-medical-alt"
          label="Medical file"
          flat
          class="text-grey-8"
          @click="goToMedicalFile"
        />
      </section>
    </div>

    <template v-if="loading">
      <section class="loading-section">
        <q-spinner-tail
          size="1rem"
          color="primary"
        />
      </section>
    </template>

  </q-card>
</template>

<script>
import helper from '../api/helper';
import { error } from '../util/notify';
import { isBetween } from '../util/helpers';
import _ from 'lodash';
import moment from 'moment';
export default {
  name: 'RoomCard',
  data: () => ({
    patient: {},
    metrics: {},
    action: {},
    hospId: '',
    availableFacilities: [
      { name: 'toilet', icon: 'fas fa-toilet' },
      { name: 'shower', icon: 'fas fa-shower' },
      { name: 'tv', icon: 'fas fa-tv' },
      { name: 'childsupport', icon: 'fas fa-baby' }
    ],
    request: false,
    critical: false,
    metricInterval: undefined,
    actionInterval: undefined,
    loading: false
  }),
  props: {
    room: {
      type: String,
      required: true
    },
    facilities: {
      type: Array,
      default: () => []
    },
    number: {
      type: Number,
      required: true
    },
    compact: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    async loadRoomData () {
      // signal start of loading
      this.loading = true;

      // get basic room data
      await this.fetchPatientData();

      // if patient setup timer & get upcoming action
      if (this.hasPatient) {
        await this.setupActionTimer();
        await this.setupMetricsTimer();
      }

      // signal end of loading
      this.loading = false;
    },
    async fetchPatientData () {
      // get basic patient info from API
      const hosp = await helper({ resource: `hospitalizations?roomId=${this.room}&_expand=patient` })
        .catch(() => error(this.$q.notify, 'An unexpected error has occured', 'Unable to fetch patient from API'));

      // check if patient is checked in for this room
      if (hosp.length === 0) return;
      const { patient, id } = hosp[0];

      // update state
      this.patient = patient;
      this.hospId = id;
    },
    async setupMetricsTimer () {
      // clear previous interval if any
      if (this.metricInterval) {
        clearInterval(this.metricInterval);
      }

      // prefetch first round of metrics
      await this.updateMetrics();

      // start timer task
      this.metricInterval = setInterval(this.updateMetrics, 5000);
    },
    async setupActionTimer () {
      // clear previous interval if any
      if (this.actionInterval) {
        clearInterval(this.actionInterval);
      }

      // prefetch first action
      await this.fetchAction();

      // start timer task
      this.actionInterval = setInterval(this.fetchAction, 1000 * 35);
    },
    async fetchAction () {
      // get first action from API
      const results = await helper({ resource: `hospitalizations/${this.hospId}/actions?_sort=timestamp&_order=asc` });

      // filter only upcoming actions
      const upcoming = [...results.filter(a => !a.completed)];
      const next = upcoming.shift();

      if (next) {
        this.action = next;
      }
    },
    async updateMetrics () {
      const metrics = await helper({ resource: `metrics/${this.patient.id}` });
      this.metrics = metrics;
    },
    goToMedicalFile () {
      this.$router.push({ path: '/patient/' + this.patient.id });
    }
  },
  mounted () {
    this.loadRoomData();
  },
  beforeDestroy () {
    if (this.metricInterval) {
      clearInterval(this.metricInterval);
    }

    if (this.actionInterval) {
      clearInterval(this.actionInterval);
    }
  },
  computed: {
    facilitiesList () {
      return this.availableFacilities.map(f => {
        f.available = this.facilities.includes(f.name);
        return f;
      });
    },
    hasPatient () {
      return !_.isEmpty(this.patient);
    },
    hasAction () {
      return !_.isEmpty(this.action);
    },
    actionDifference () {
      return moment(this.action.timestamp).fromNow();
    },
    actionDescription () {
      if (this.action.description) return this.action.description;
      if (this.action.typeId === 'meal') return 'Bring food to patient';
      if (this.action.typeId === 'wash') return 'Cleanse the patient';
      if (this.action.typeId === 'bedsore') return 'Turn patient around to prevent bedsores';
      return 'Unrecognized action, contact administrator';
    },
    state () {
      if (this.loading) return '';
      if (this.critical) return 'alarm';
      if (this.request) return 'request';
      if (this.hasAction) {
        const missed = moment().isAfter(moment(this.action.timestamp));
        if (missed) return 'missed';
        if (this.hasUpcoming) return 'upcoming';
      }
      if (this.hasPatient) return 'occupied';

      return 'free';
    },
    hasUpcoming () {
      if (!this.hasAction) return false;

      return true;
    },
    cardStyle () {
      const styles = {};
      styles[this.state] = true;
      styles['compact'] = this.compact;

      return styles;
    }
  },
  watch: {
    room: function (val) {
      this.loadRoomData();
    },
    metrics: function (val) {
      const heartrate = [40, 170];
      const upperPressure = [90, 155];
      const lowerPressure = [50, 90];

      if (!isBetween(val.heartrate, heartrate[0], heartrate[1]) ||
        !isBetween(val.upperPressure, upperPressure[0], upperPressure[1]) ||
        !isBetween(val.lowerPressure, lowerPressure[0], lowerPressure[1])) {
        this.critical = true;
        return;
      }

      if (this.critical === true) this.critical = false;
    }
  }
};
</script>

<style lang="scss" scoped>
$room_border_size: 0.25rem;
@keyframes pulsate {
  0% {
    box-shadow: 0 0 0.2rem 1px $negative;
  }
  50% {
    box-shadow: 0 0 0.2rem 3px $negative;
  }
  100% {
    box-shadow: 0 0 0.2rem 1px $negative;
  }
}

.room-card {
  height: 100%;
  min-height: 15rem;

  &.occupied {
    box-shadow: 0 0 0.2rem 2px $positive;
  }

  &.upcoming {
    box-shadow: 0 0 0.2rem 2px $warning;
  }

  &.missed {
    box-shadow: 0 0 0.2rem 2px $warning_accent;
  }

  &.request {
    box-shadow: 0 0 0.4rem 3px $negative;
  }

  &.alarm {
    animation: pulsate 1s infinite;
    box-shadow: 0 0 0.2rem 1px $negative;
  }
}

.room-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

$detail_color: #ecf0f1;
$border_color: #bdc3c7;
$detail_text: darken($border_color, 25%);
$option_size: 2.8rem;

// room-info
.room-info {
  padding: 0.75rem;
  font-variant: small-caps;
  text-align: center;
  font-size: 1.5rem;
}

// loading section
.loading-section {
  display: flex;
  padding: 0.75rem;
  justify-content: center;
}

// empty-notification
.empty-notification {
  padding: 0.75rem;
  text-align: center;
  background-color: $detail_color;
  border-top: 1px solid $border_color;
  border-bottom: 1px solid $border_color;
  color: $detail_text;
}

// patient info
.patient-info {
  padding: 0.75rem;
  display: flex;
  align-items: center;

  .patient-info__data__name {
    text-transform: capitalize;
  }

  .patient-info__data {
    padding-left: 0.75rem;
    display: flex;
    flex-direction: column;
  }

  .patient-info__room {
    flex-grow: 1;
    align-self: flex-start;
    text-align: right;
    font-variant: small-caps;
  }
}

// monitoring info
.monitoring-info {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 0.75rem;
  background-color: $detail_color;
  border-top: 1px solid $border_color;
  border-bottom: 1px solid $border_color;
  color: $detail_text;

  .monitoring-info__item {
    width: 5rem;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: baseline;
  }
}

// action info
.action-info {
  padding: 0.75rem;

  .action-info__no-action {
    width: 100%;
    display: block;
    text-align: center;
    color: $detail_text;
  }

  .action-info__timer-text {
    margin: 0;
    text-align: center;
    color: $detail_text;
  }

  .action-info__description {
    display: block;
    width: 100%;
    text-align: center;
  }
}

// facilities
.facilities {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding: 0.75rem;
  background-color: $detail_color;
  border-top: 1px solid $border_color;
  border-bottom: 1px solid $border_color;

  .facilities__option {
    font-size: $option_size / 2.5;
    width: $option_size;
    height: $option_size;
    color: $detail_text;
    border-radius: 0.5rem;

    &.available {
      background-color: $detail_text;
      color: $detail_color;
    }
  }
}

// nav actions
.nav-actions {
  padding: 0.75rem;
  text-align: center;
}

// COMPACT STYLING
.room-card.compact {
  height: auto;
  width: $floor_width;
  height: $floor_height;
  font-size: 0.85rem;
  border-radius: unset;

  .action-info {
    padding: 0.75rem;
  }

  .facilities__option {
    font-size: 0.8rem;
    width: 2.25rem;
    height: 2.25rem;
  }

  section {
    padding: 0.5rem;
  }
}
</style>
