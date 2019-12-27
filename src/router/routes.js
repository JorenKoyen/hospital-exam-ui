
const routes = [
  {
    path: '/departments',
    component: () => import('layouts/DefaultLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Departments.vue') }
    ]
  },
  {
    path: '/departments/:id',
    component: () => import('layouts/DefaultLayout.vue'),
    children: [
      { path: '', component: () => import('pages/DepOverview.vue') },
      { path: 'rooms', component: () => import('pages/RoomsOverview.vue') }
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
