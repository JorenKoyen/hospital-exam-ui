<template>
  <q-card
    class="nav-card big"
    @click="navigate"
  >
    <div class="nav-info">
      <h4 class="nav-card__title">{{ title }}</h4>
      <p class="nav-card__subtitle text-weight-light">{{ subTitle }}</p>
    </div>
    <q-icon
      class="nav-card__icon"
      name="navigate_next"
    />
  </q-card>
</template>

<script>
export default {
  name: 'BigNaviationCard',
  props: {
    title: {
      type: String,
      required: true
    },
    subTitle: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true
    }
  },
  methods: {
    navigate () {
      this.$router.push({ path: this.link });
    }
  }
};
</script>

<style lang="scss" scoped>
.nav-card {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  cursor: pointer;

  .nav-info {
    padding: 1.5rem;
    background: darken($color: $accent, $amount: 15%);
    color: white;
    flex-basis: 15vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    // gradient
    background: linear-gradient(180deg, darken($accent, 15%) 0%, $accent 100%);

    .nav-card__title {
      margin: 0;
    }

    .nav-card__subtitle {
      margin: 0;
    }
  }

  .nav-card__icon {
    color: white;
    font-weight: bold;
    font-size: 2rem;
    width: 100%;
    background-color: $accent;
    flex-grow: 1;
    transition: background-color 1s;
  }

  &:hover .nav-card__icon {
    background-color: darken($color: $accent, $amount: 15%);
  }
}
</style>
