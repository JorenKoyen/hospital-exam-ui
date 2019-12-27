<template>
  <q-card :class="cardClass">
    <h5 class="stat-card__title">{{ title }}</h5>
    <p class="stat-card__subtitle text-weight-light">{{ subTitle }} </p>
    <div class="data">
      {{ data }} <span>{{ subData }} </span>
    </div>
  </q-card>
</template>

<script>
export default {
  name: 'SimpleStatCard',
  props: {
    title: {
      type: String,
      required: true
    },
    subTitle: {
      type: String,
      required: true
    },
    data: {
      type: String,
      required: true
    },
    subData: {
      type: String,
      required: false
    },
    type: {
      type: String,
      required: false
    }
  },
  computed: {
    cardClass () {
      return `stat-card simple ${this.type || ''}`;
    }
  }
};
</script>

<style lang="scss" scoped>
// layout styling for simple cards
.stat-card.simple {
  padding: 0.5rem;

  .stat-card__title {
    margin: 0;
    text-transform: uppercase;
    font-size: 1rem;
  }
  .stat-card__subtitle {
    font-size: 0.8rem;
    margin: 0;
    margin-top: -5px;
  }

  .data {
    position: absolute;
    right: 0.5rem;
    top: 50%;
    margin-top: -1.5rem;
    font-weight: bold;
    font-size: 2rem;

    span {
      font-size: 0.8rem;
      font-weight: lighter;
    }
  }
}

// color styling for stat cards
.stat-card.positive {
  background: $positive; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    $positive_accent,
    $positive
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    $positive_accent,
    $positive
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.stat-card.warning {
  background: $warning; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to left,
    $warning_accent,
    $warning
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to left,
    $warning_accent,
    $warning
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.stat-card.negative {
  color: white;
  background: $negative; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    $negative_accent,
    $negative
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    $negative_accent,
    $negative
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
