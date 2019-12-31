<template>
  <q-card>
    <section class="basic-info">
      <q-avatar square>
        <img
          :src="avatar"
          alt="patient avatar"
        >
      </q-avatar>
      <div class="basic-info__text">
        <span class="name">{{ name }}</span>
        <span class="ssn">{{ ssn }}</span>
      </div>
      <q-space />
      <div class="status">
        <q-chip
          :color="statusColor"
          text-color="white"
        >{{statusText}}</q-chip>
      </div>
    </section>
    <section class="contact-info grid">
      <div
        v-for="[key, value] in contactKeyValues"
        :key="key"
        class="grid-item contact-item"
      >
        <span class="title">{{key}}</span>
        <span class="value">{{value}}</span>
      </div>
    </section>
  </q-card>
</template>

<script>
export default {
  name: 'PatientInfoCard',
  props: {
    avatar: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    ssn: {
      type: String,
      required: true
    },
    hospitalized: {
      type: Boolean,
      required: true
    },
    contactInfo: {
      type: Object,
      required: true
    }
  },
  computed: {
    statusColor () {
      return this.hospitalized ? 'accent' : 'negative';
    },
    statusText () {
      return this.hospitalized ? 'currently hospitalized' : 'not hospitalized';
    },
    contactKeyValues () {
      return Object.entries(this.contactInfo);
    }
  }
};
</script>

<style lang="scss" scoped>
.basic-info {
  padding: 0.75rem;
  display: flex;
  align-items: center;

  .basic-info__text {
    margin-left: 0.75rem;
    display: flex;
    flex-direction: column;

    .ssn {
      color: $detail_text;
    }
  }
}

.contact-info {
  background-color: $detail_color;
  padding: 0.75rem;
  border-top: 1px solid $border_color;

  .contact-item {
    display: flex;
    flex-direction: column;
    font-size: 0.8rem;

    .title {
      color: $detail_text;
      text-transform: capitalize;
      font-weight: 600;

      &::after {
        content: ": ";
      }
    }

    .value {
      color: $info;
    }
  }
}
</style>
