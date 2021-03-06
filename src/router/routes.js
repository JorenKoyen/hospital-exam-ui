
const routes = [
  {
    path: '/',
    component: () => import('layouts/DefaultLayout.vue'),
    children: [
      { path: 'departments', component: () => import('pages/Departments.vue') },
      // { path: 'departments/:id', component: () => import('pages/DepOverview.vue') },
      { path: 'departments/:id/rooms', component: () => import('pages/RoomsOverview.vue') },
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
