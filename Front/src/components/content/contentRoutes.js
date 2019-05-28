export var contentRoutes = [
    {
        path: '/not-found',
        component: function () { return import(/* webpackChunkName: "notFound" */ './NotFound/NotFound.vue').then(function (m) { return m.default; }); },
    },
    {
        path: '/error',
        component: function () { return import(/* webpackChunkName: "error" */ './Error/Error.vue').then(function (m) { return m.default; }); },
    },
    // example redirect
    // TODO: remove from production code
    {
        path: '/redirect',
        redirect: '/',
    },
    // catch-all route
    // shows 404 page and also makes server respond with HTTP status code 404
    // make sure to also adjust `src/server/isomorphic` in case you implement a more complex behavior here
    {
        path: '*',
        component: function () { return import(/* webpackChunkName: "notFound" */ './NotFound/NotFound.vue').then(function (m) { return m.default; }); },
    },
];