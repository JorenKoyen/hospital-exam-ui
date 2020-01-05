
const routes = [
  {
    path: '/',
    component: () => import('layouts/DefaultLayout.vue'),
    children: [
      // TODO: add dashboard with overview of the hospital
      { path: 'departments', component: () => import('pages/Departments.vue') },
      { path: 'departments/:id', component: () => import('pages/DepOverview.vue') },
      { path: 'departments/:id/rooms', component: () => import('pages/RoomsOverview.vue') },
      // TODO: add patient overview page -> simple list of patients with link to detail page
      { path: 'patient/:id', component: () => import('pages/PatientDetail.vue') },
      { path: 'settings', component: () => import('pages/Settings.vue') }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  });
}

export default routes;
