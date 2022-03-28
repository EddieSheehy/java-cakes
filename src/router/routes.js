function loadPage (component) {
    // '@' is aliased to src/components
    return () => import(/* webpackChunkName: "[request]" */ `@/pages/${component}.vue`)
}

export default [
    { path: '/', component: loadPage('Index')},
    { path: '/homepage', component: loadPage('HomePage')},
    { path: '/house', component: loadPage('House') },
    { path: '/room', component: loadPage('Room')},
    { path: '/register', component: loadPage('Register')},
    { path: '/login', component: loadPage('Login')},
    { path: '/secure', component: loadPage('Secure')},
    { path: '/blog', component: loadPage('Blog')}
]