<template>
  <q-card>
    <header>
      <q-icon name="fas fa-user-injured" />
      Patient Information
      <q-space />
      <q-btn
        flat
        rounded
        :color="btnColor"
        :label="btnLabel"
        icon-right="fas fa-save"
        @click="save"
      />
    </header>
    <section class="data">
      <q-item v-ripple>
        <q-item-section avatar>
          <q-checkbox v-model="vegetarian" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Vegetarian</q-item-label>
          <q-item-label caption>The patient does not eat meat or fish,
            and/or other animal products.</q-item-label>
        </q-item-section>
      </q-item>
      <q-editor
        v-model="notes"
        min-height="10rem"
      />
    </section>
  </q-card>
</template>

<script>
import helper from '../api/helper';
export default {
  name: 'PatientMetaCard',
  data: function () {
    return {
      vegetarian: false,
      notes: '',
      notesSaved: '', // used to check 'notesChanged'
      vegetarianSaved: false, // used to check 'vegetarianSaved'
      vegetarianChanged: false,
      notesChanged: false
    };
  },
  props: {
    patient: {
      type: String,
      required: true
    }
  },
  computed: {
    btnLabel () {
      return this.dataChanged ? 'not saved' : 'saved';
    },
    btnColor () {
      return this.dataChanged ? 'negative' : 'positive';
    },
    dataChanged () {
      return this.vegetarianChanged || this.notesChanged;
    }
  },
  mounted () {
    this.fetchData();
  },
  methods: {
    async fetchData () {
      const { vegetarian, notes = '' } = await helper({ resource: 'patients/' + this.patient });

      // update state
      this.vegetarian = vegetarian;
      this.vegetarianSaved = vegetarian;
      this.notes = notes;
      this.notesSaved = notes;
    },
    async save () {
      const response = await helper({
        resource: 'patients/' + this.patient,
        method: 'PATCH',
        body: {
          notes: this.notes,
          vegetarian: this.vegetarian
        }
      });

      // update state
      this.vegetarianSaved = response.vegetarian;
      this.vegetarianChanged = false;
      this.notesSaved = response.notesSaved;
      this.notesChanged = false;
    }
  },
  watch: {
    vegetarian: function (val) {
      this.vegetarianChanged = val !== this.vegetarianSaved;
    },
    notes: function (val) {
      this.notesChanged = val !== this.notesSaved;
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

section.data {
  background-color: $detail_color;
  border-top: 1px solid $border_color;
  display: flex;
  flex-direction: column;

  .q-item {
    margin-top: 0.75rem;
  }
  .q-editor {
    margin: 0.75rem;
  }
}
</style>
