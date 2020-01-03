<template>
  <q-slide-item
    @left="onDelete"
    @right="onEdit"
    left-color="negative"
  >
    <template
      v-if="isSimpleType"
      v-slot:left
    >
      <q-icon name="delete" />
    </template>
    <template
      v-if="isSimpleType"
      v-slot:right
    >
      <q-icon name="edit" />
    </template>

    <q-item
      v-ripple
      clickable
    >

      <!-- action icon -->
      <q-item-section
        avatar
        top
      >
        <q-avatar
          :icon="action.type.icon"
          text-color="white"
          :style="{backgroundColor: action.type.color}"
        />
      </q-item-section>

      <!-- action information -->
      <q-item-section>
        <q-item-label lines="1">{{ displayedDescription }}</q-item-label>
        <q-item-label caption>{{ time }}</q-item-label>
      </q-item-section>

      <!-- action finished toggle -->
      <q-item-section side>
        <q-toggle
          checked-icon="check"
          color="accent"
          unchecked-icon="clear"
          :value="action.completed"
          @input="completedChanged"
        />
      </q-item-section>

    </q-item>

    <!-- prompt dialog -->
    <q-dialog v-model="prompt">
      <q-card style="min-width:25rem">
        <q-card-section>
          <div class="text-h6">Edit action description</div>
        </q-card-section>

        <q-card-section>
          <q-input
            dense
            v-model="description"
            autofocus
            @keyup.enter="handleDescriptionUpdate"
            label="Description"
          />
        </q-card-section>

        <q-card-actions
          align="right"
          class="text-primary"
        >
          <q-btn
            flat
            label="Cancel"
            v-close-popup
          />
          <q-btn
            flat
            label="Update"
            @click="handleDescriptionUpdate"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-slide-item>
</template>

<script>
import moment from 'moment';
export default {
  name: 'ActionItem',
  data: function () {
    return {
      prompt: false,
      timer: undefined,
      description: this.action.description
    };
  },
  props: {
    action: {
      type: Object,
      required: true
    }
  },
  model: {
    prop: 'action',
    event: 'updated'
  },
  computed: {
    displayedDescription () {
      if (this.action.description) return this.action.description;
      if (this.action.type.id === 'meal') return 'Bring food to patient';
      if (this.action.type.id === 'wash') return 'Cleanse the patient';
      if (this.action.type.id === 'bedsore') return 'Turn patient around to prevent bedsores';
      return 'Unrecognized action, contact administrator';
    },
    time () {
      return moment(this.action.timestamp).fromNow();
    },
    isSimpleType () {
      const simpleTypes = ['meal', 'wash', 'bedsore'];
      return simpleTypes.includes(this.action.type.id);
    }
  },
  methods: {
    completedChanged (val) {
      const newAction = { ...this.action, completed: val };
      this.$emit('updated', newAction);
    },
    onDelete ({ reset }) {
      this.$emit('delete', this.action.id);
      this.finalizeSlide(reset);
    },
    onEdit ({ reset }) {
      this.prompt = true;
      this.finalizeSlide(reset);
    },
    finalizeSlide (reset) {
      this.timer = setTimeout(() => {
        reset();
      }, 1000);
    },
    handleDescriptionUpdate () {
      this.prompt = false;
      this.$emit('updated', { ...this.action, description: this.description });
    }
  },
  beforeDestroy () {
    clearTimeout(this.timer);
  }
};
</script>

<style>
</style>
