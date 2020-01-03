<template>
  <q-card>
    <header>
      <q-icon name="fas fa-tasks" />
      Actions
      <q-space />
      <q-btn
        rounded
        flat
        icon="add"
        label="Add action"
        text-color="info"
        @click="createDialog = true"
      />
    </header>
    <section class="action-list">
      <q-list
        padding
        bordered
      >
        <!-- MISSED ACTIONS -->
        <q-item-label header>Missed</q-item-label>

        <!-- MISSED ACTION ITEM -->
        <action-item
          v-for="(item, i) in missedActions"
          :key="item.id"
          v-model="missedActions[i]"
          v-on:updated="updateAction"
          v-on:delete="deleteAction"
          v-show="hideCompleted ? item.completed !== true : true"
        />

        <q-item v-if="displayedMissedActions === 0">
          <q-item-section>
            <q-item-label class="nothing-found-label">No missed actions</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator spaced />

        <!-- UPCOMING ACTIONS -->
        <q-item-label header>Upcoming</q-item-label>

        <!-- UPCOMING ACTION ITEM -->
        <action-item
          v-for="(item, i) in upcomingActions"
          :key="item.id"
          v-model="upcomingActions[i]"
          v-on:updated="updateAction"
          v-on:delete="deleteAction"
          v-show="hideCompleted ? item.completed !== true : true"
        />

        <q-item v-if="displayedUpcomingActions === 0">
          <q-item-section>
            <q-item-label class="nothing-found-label">No upcomming actions</q-item-label>
          </q-item-section>
        </q-item>

      </q-list>
    </section>
    <section class="options">
      <q-space />
      <q-toggle
        v-model="hideCompleted"
        label="Hide Completed Actions"
        left-label
      />
    </section>

    <!-- action creation dialog -->
    <q-dialog v-model="createDialog">
      <q-card style="min-width: 25rem">
        <q-card-section>
          <div class="text-h6">Add new action</div>
          <div class="text-caption text-negative">{{error}}</div>
        </q-card-section>

        <q-card-section class="q-gutter-md">
          <q-select
            filled
            label="Type"
            :options="types"
            v-model="type"
          />
          <q-input
            filled
            label="Short description"
            v-model="description"
          />
          <q-input
            filled
            v-model="date"
          >
            <template v-slot:prepend>
              <q-icon
                name="event"
                class="cursor-pointer"
              >
                <q-popup-proxy
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="date"
                    mask="YYYY-MM-DD HH:mm"
                  />
                </q-popup-proxy>
              </q-icon>
            </template>

            <template v-slot:append>
              <q-icon
                name="access_time"
                class="cursor-pointer"
              >
                <q-popup-proxy
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-time
                    v-model="date"
                    mask="YYYY-MM-DD HH:mm"
                    format24h
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
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
            label="Add"
            @click="addAction"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-card>
</template>

<script>
import helper, { multiFetch } from '../api/helper';
import ActionItem from 'components/action-item.vue';
import moment from 'moment';
export default {
  name: 'ActionListCard',
  components: {
    ActionItem
  },
  data: function () {
    return {
      hideCompleted: true,
      upcomingActions: [],
      missedActions: [],
      createDialog: false,
      types: ['meal', 'wash', 'bedsore'],
      date: moment().format('YYYY-MM-DD HH:mm'),
      type: undefined,
      description: undefined,
      error: undefined
    };
  },
  props: {
    hospitalization: {
      type: String,
      required: true
    }
  },
  methods: {
    async fetchData () {
      // const actions = await helper({
      //   resource: `hospitalizations/${this.hospitalization}/actions?_expand=type&_limit=10&_sort=timestamp`
      // });
      const now = new Date().getTime();
      const values = await multiFetch([
        { url: `hospitalizations/${this.hospitalization}/actions?_expand=type&_limit=7&_sort=timestamp&timestamp_gte=${now}` },
        { url: `hospitalizations/${this.hospitalization}/actions?_expand=type&_limit=7&_sort=timestamp&timestamp_lte=${now - 1}` }
      ]);

      // update state
      this.upcomingActions = values[0];
      this.missedActions = values[1];
    },
    updateAction (action) {
      helper({
        resource: 'actions/' + action.id,
        method: 'PATCH',
        body: { ...action }
      });
    },
    async deleteAction (id) {
      // delete action from state
      if (this.missedActions.filter(a => a.id === id).length !== 0) {
        // remove from missed actions state
        const i = this.missedActions.findIndex(a => a.id === id);
        this.missedActions.splice(i, 1);
      } else {
        // remove from upcoming actions state
        const i = this.upcomingActions.findIndex(a => a.id === id);
        this.upcomingActions.splice(i, 1);
      }

      // send delete request to API
      helper({
        resource: 'actions/' + id,
        method: 'DELETE'
      });
    },
    async addAction () {
      // check if we have a type selected
      if (!this.type) {
        this.error = 'Type is required to create an action';
        return;
      };

      const action = {
        hospitalizationId: this.hospitalization,
        timestamp: moment(this.date).unix() * 1000,
        completed: false,
        typeId: this.type,
        description: this.description
      };

      // post action to API
      await helper({
        resource: 'actions',
        method: 'POST',
        body: action
      });

      // hide dialog
      this.createDialog = false;
      this.error = '';

      // refetch data
      this.fetchData();
    }
  },
  computed: {
    displayedUpcomingActions () {
      return this.upcomingActions.filter(action => {
        return this.hideCompleted ? action.completed !== true : true;
      }).length;
    },
    displayedMissedActions () {
      return this.missedActions.filter(action => {
        return this.hideCompleted ? action.completed !== true : true;
      }).length;
    }
  },
  mounted () {
    this.fetchData();
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

.nothing-found-label {
  color: $detail_text;
  text-align: center;
}

section.options {
  display: flex;
  color: $detail_text;
  background-color: $detail_color;
  padding: 0.25rem;
}
</style>
