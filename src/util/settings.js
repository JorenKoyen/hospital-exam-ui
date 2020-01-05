const KEY = 'settings';
const DEFAULT = {
  showNumber: true,
  showFacilities: true,
  showPatient: true,
  showMetrics: true,
  showAction: true,
  soundAlarm: false,
  heartrate: {
    min: 30,
    max: 170
  },
  blood: {
    min: 50,
    max: 155
  },
  timer: 120
};

export function initSettings () {
  // inject default settings if none present
  if (!localStorage.getItem(KEY)) {
    localStorage.setItem(KEY, JSON.stringify(DEFAULT));
  }
}

export function saveSettings (val) {
  const string = JSON.stringify(val);
  localStorage.setItem(KEY, string);
}

export function getSettings () {
  const string = localStorage.getItem(KEY);
  return string ? JSON.parse(string) : null;
}
