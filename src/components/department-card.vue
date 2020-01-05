<template>
  <q-card class="department-card">
    <section
      class="department-card__name"
      :style="{background: gradient, color: textColor}"
    >
      {{ name }}
    </section>
    <section class="department-card__rooms">
      <q-icon name="hotel" />
      <span class="department-card__rooms_text">
        {{ rooms }} rooms
      </span>
    </section>
    <section class="department-card__link">
      <a
        :href="`/departments/${name}`"
        @click="e => go(e, `/departments/${name}/rooms`)"
      >Explore rooms
      </a>
    </section>
  </q-card>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    rooms: {
      type: Number,
      required: true
    },
    color: {
      type: String,
      required: true
    }
  },
  methods: {
    getColorValues: function () {
      let colorsString = this.color.substring(4);
      colorsString = colorsString.substring(0, colorsString.length - 1);
      return colorsString.split(',').map(c => {
        if (!c.includes('%')) return c;
        return c.substring(0, c.length - 1);
      });
    },
    go: function (event, href) {
      event.preventDefault();
      this.$router.push({ path: href });
    }
  },
  computed: {
    textColor: function () {
      const colors = this.getColorValues();

      if ((colors[0] * 0.299 + colors[1] * 0.587 + colors[2] * 0.114) > 186) {
        return '#000';
      } else return '#FFF';
    },
    gradient: function () {
      const colors = this.getColorValues();
      const gradient = `hsl(${colors[0] * 0.9},${colors[1]}%,${colors[2]}%)`;
      return `linear-gradient(180deg, ${this.color} 0%, ${gradient} 100%)`;
    }
  }
};
</script>

<style lang="scss" scoped>
$detail_color: #ecf0f1;
$border_color: #bdc3c7;
$detail_text: darken($border_color, 25%);
.department-card__name {
  text-align: center;
  padding: 4rem;
  font-weight: 500;
  text-transform: uppercase;
}
.department-card__rooms {
  padding: 0.75rem;
  background-color: $detail_color;
  color: $detail_text;
  display: flex;
  justify-content: center;

  i {
    font-size: 1.3rem;
    margin-right: 0.5rem;
  }
}
.department-card__link {
  padding: 0.75rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  a {
    text-decoration: none;
    color: darken($color: $accent, $amount: 10%);
    transition: color 0.5s;

    &:hover {
      color: darken($accent, 25%);
    }
  }
}
</style>
