<template>
  <q-card>
    <header>
      <q-icon name="fas fa-hospital" />
      Hospitalization Record
    </header>
    <section class="department-info">
      <div class="department-name">
        <span class="name__sub">Department</span>
        <h1 class="name">{{department}}</h1>
      </div>
      <q-space />
      <div class="room-number">
        <span class="name__sub">Room number</span>
        <h1 class="name text-right">{{room}}</h1>
      </div>
    </section>
    <section class="hospitalization-details">
      <div class="record">
        <span class="name">Date of Hospitalization</span>
        <span class="value">{{ date }} ({{time}})</span>
      </div>
      <div class="record">
        <span class="name">Reason</span>
        <span class="value">{{reason}}</span>
      </div>
    </section>
  </q-card>
</template>

<script>
import moment from 'moment';
export default {
  name: 'HospitalizationCard',
  props: {
    department: {
      type: String,
      required: true
    },
    room: {
      type: Number,
      required: true
    },
    hospitalizedOn: {
      type: Number,
      required: true
    },
    reason: {
      type: String,
      required: true
    }
  },
  computed: {
    time () {
      return moment(this.hospitalizedOn).fromNow(false);
    },
    date () {
      return moment(this.hospitalizedOn).format('ll');
    }
  }
};
</script>

<style lang="scss" scoped>
header {
  padding: 0.75rem;
  font-size: 1.2rem;
  font-weight: 300;
  display: flex;
  align-items: center;

  .q-icon {
    color: $detail_text;
    margin-right: 0.75rem;
  }
}
.department-info {
  display: flex;
  padding: 0.75rem;
  background-color: $detail_color;
  border-top: 1px solid $border_color;
  border-bottom: 1px solid $border_color;

  .name {
    margin: 0;
    font-size: 1.2rem;
    line-height: 1rem;
  }
  .name__sub {
    color: $detail_text;
    font-size: 0.7rem;
  }
}

.hospitalization-details {
  padding: 0.75rem;
  box-sizing: border-box;

  .record {
    margin-bottom: 0.5rem;
    display: flex;
    justify-content: space-between;

    .value {
      color: $detail_text;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
