<template>
  <q-card>
    <header>
      <q-icon name="fas fa-user-md" />
      Assigned Doctor
    </header>
    <section class="short-info">
      <q-avatar
        square
        size="5rem"
      >
        <img
          :src="avatar"
          alt="doctor avatar"
        />
      </q-avatar>
      <div class="short-info__text">
        <span class="name">{{name}}</span>
        <span class="yox">{{yox}}</span>
      </div>
    </section>
  </q-card>
</template>

<script>
import moment from 'moment';
export default {
  name: 'DoctorCard',
  props: {
    avatar: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    hiredOn: {
      type: Number,
      required: true
    }
  },
  computed: {
    yox () {
      return moment(this.hiredOn).fromNow(true);
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

.short-info {
  padding: 0.75rem;
  background-color: $detail_color;
  display: flex;
  align-items: center;

  .short-info__text {
    margin-left: 0.75rem;
    display: flex;
    flex-direction: column;

    .yox {
      color: $detail_text;

      &::after {
        content: " of experience";
      }
    }
  }
}
</style>
