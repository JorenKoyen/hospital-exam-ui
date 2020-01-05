<template>
  <div class="horizontal-center">
    <!-- floorplan settings -->
    <q-card class="settings-card">
      <header class="text-h5">Room Card</header>
      <div class="settings">
        <q-list>
          <!-- show number -->
          <q-item v-ripple>
            <q-item-section avatar>
              <q-checkbox v-model="settings.showNumber" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Show number</q-item-label>
              <q-item-label caption>Show the number on the room card</q-item-label>
            </q-item-section>
          </q-item>
          <!-- show facilities -->
          <q-item v-ripple>
            <q-item-section avatar>
              <q-checkbox v-model="settings.showFacilities" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Show facilities</q-item-label>
              <q-item-label caption>Show all facilities available for the specific room</q-item-label>
            </q-item-section>
          </q-item>
          <!-- show patient -->
          <q-item v-ripple>
            <q-item-section avatar>
              <q-checkbox v-model="settings.showPatient" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Show patient</q-item-label>
              <q-item-label caption>Show the patient that occupies the room (if any)</q-item-label>
            </q-item-section>
          </q-item>
          <!-- show monitoring data -->
          <q-item v-ripple>
            <q-item-section avatar>
              <q-checkbox v-model="settings.showMetrics" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Show monitoring data</q-item-label>
              <q-item-label caption>Show metrics such as heartrate and blood pressure</q-item-label>
            </q-item-section>
          </q-item>
          <!-- show action -->
          <q-item v-ripple>
            <q-item-section avatar>
              <q-checkbox v-model="settings.showAction" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Show action</q-item-label>
              <q-item-label caption>Show the upcoming or missed action for the patient</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-card>

    <!-- monitoring settings -->
    <q-card class="settings-card">
      <header class="text-h5">Monitoring</header>
      <div class="settings">
        <q-list>
          <!-- sound alarm -->
          <q-item v-ripple>
            <q-item-section avatar>
              <q-checkbox v-model="settings.soundAlarm" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Sound alarm</q-item-label>
              <q-item-label caption>Play an audible alarm sound when a treshold gets exceeded</q-item-label>
            </q-item-section>
          </q-item>
          <!-- heartrate -->
          <q-item v-ripple>
            <q-item-section avatar>
              <q-item-label caption>Tresholds for the heartrate alarm</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-range
                v-model="settings.heartrate"
                :min="0"
                :max="250"
                label
              />
            </q-item-section>
          </q-item>
          <!-- blood pressure -->
          <q-item v-ripple>
            <q-item-section avatar>
              <q-item-label caption>Tresholds for the blood pressure alarm</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-range
                v-model="settings.blood"
                :min="20"
                :max="200"
                label
              />
            </q-item-section>
          </q-item>
          <q-item v-ripple>
            <q-item-section avatar>
              <q-item-label caption>Action warning treshold (in minutes)</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-slider
                v-model="settings.timer"
                :min="10"
                :max="240"
                label
              />
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-card>

  </div>
</template>

<script>
import { saveSettings, getSettings } from '../util/settings';
export default {
  name: 'SettingsPage',
  data: function () {
    return {
      settings: {}
    };
  },
  mounted () {
    // load settings from local storage
    const s = getSettings();
    if (s) {
      this.settings = s;
    }
  },
  watch: {
    settings: {
      handler: function (val) {
        saveSettings(val);
      },
      deep: true
    }
  }
};
</script>

<style lang="scss" scoped>
.settings-card {
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 1rem;

  @media screen and (min-width: 1200px) {
    width: 70%;
  }

  &:last-child {
    margin-bottom: unset;
  }

  header {
    padding: 0.75rem;
  }

  .settings {
    padding-bottom: 0.75rem;
  }
}
.horizontal-center {
  padding: 1rem;
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>
