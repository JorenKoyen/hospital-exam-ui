<template>
  <q-card class="room-card alarm">

    <!-- patient info & basic room info -->
    <section class="patient-info">
      <q-avatar
        square
        class="patient-info__avatar"
      >
        <img
          src="/statics/images/anna.png"
          alt="patient picture"
          class="patient-info__img"
        >
      </q-avatar>
      <div class="patient-info__data">
        <span class="patient-info__data__name text-weight-medium">{{ patient }}</span>
        <span class="patient-info__data__rrnr text-grey">{{ nin }}</span>
      </div>
      <span class="patient-info__room">room {{ room }}</span>
    </section>

    <!-- monitoring info -->
    <section class="monitoring-info">
      <div class="monitoring-info__item">
        <q-icon name="fas fa-heartbeat" />
        <span>{{ heartbeat }}</span>
      </div>
      <div class="monitoring-info__item">
        <q-icon name="fas fa-tachometer-alt" />
        <span>{{ upperBloodPressure }}/{{ lowerBloodPressure }}</span>
      </div>
    </section>

    <!-- action info, show upcoming actions -->
    <section class="action-info">
      <!-- <span class="action-info__no-action">No upcoming action</span> -->
      <h4 class="action-info__notify-text">Upcoming action</h4>
      <p class="action-info__timer-text">in 35 minutes</p>
      <span class="action-info__description">Wash patient</span>
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
    <section class="nav-actions">
      <q-btn
        icon="fas fa-file-medical-alt"
        label="Medical file"
        flat
        class="text-grey-8"
      />
    </section>
  </q-card>
</template>

<script>
export default {
  name: 'RoomCard',
  data: () => ({
    nin: '',
    number: 0,
    upperBloodPressure: 0,
    lowerBloodPressure: 0,
    heartbeat: 0,
    availableFacilities: [
      { name: 'toilet', icon: 'fas fa-toilet' },
      { name: 'shower', icon: 'fas fa-shower' },
      { name: 'tv', icon: 'fas fa-tv' },
      { name: 'childsupport', icon: 'fas fa-baby' }
    ]
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
    patient: {
      type: String,
      required: true
    }
  },
  methods: {
    setupPatientTimer () {
      // TODO: fetch data from API
      this.nin = '99071200121';
      this.upperBloodPressure = 120;
      this.lowerBloodPressure = 80;
      this.heartbeat = 60;
    }
  },
  mounted () {
    this.setupPatientTimer();
  },
  computed: {
    facilitiesList () {
      return this.availableFacilities.map(f => {
        f.available = this.facilities.includes(f.name);
        return f;
      });
    }
  },
  watch: {
    patient: function (val) {
      this.setupPatientTimer();
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
  box-sizing: border-box;

  &.occupied {
    border: $room_border_size solid $positive;
  }

  &.upcoming {
    border: $room_border_size solid $warning;
  }

  &.missed {
    border: $room_border_size solid $warning_accent;
  }

  &.request {
    border: $room_border_size solid $negative;
  }

  &.alarm {
    animation: pulsate 1s infinite;
    box-shadow: 0 0 0.2rem 1px $negative;
  }
}

$detail_color: #ecf0f1;
$border_color: #bdc3c7;
$detail_text: darken($border_color, 25%);
$option_size: 2.8rem;

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

  .action-info__notify-text {
    margin: 0;
    font-size: 1.2rem;
    text-align: center;
    font-weight: 500;
    line-height: 1rem;
    text-transform: uppercase;
    color: $warning_accent;
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
</style>
