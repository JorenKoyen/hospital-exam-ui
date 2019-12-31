<template>
  <q-card>
    <header>
      <q-icon name="fas fa-hospital" />
      Hospitalization Record
    </header>
    <section class="department-info">
      <div class="department-name">
        <span class="name__sub">Department</span>
        <h1 class="name">Emergency</h1>
      </div>
      <q-space />
      <div class="room-number">
        <span class="name__sub">Room number</span>
        <h1 class="name text-right">110</h1>
      </div>
    </section>
  </q-card>
</template>

<script>
export default {

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
</style>
