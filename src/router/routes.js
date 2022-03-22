function loadPage (component) {
    // '@' is aliased to src/components
    return () => import(/* webpackChunkName: "[request]" */ `@/pages/${component}.vue`)
}

export default [
    { path: '/', component: loadPage('HelloWorld')},
    { path: '/blog', component: loadPage('Blog') },
    { path: '/aboutus', component: loadPage('AboutUs')},
    { path: '/register', component: loadPage('Register')},
    { path: '/login', component: loadPage('Login')},
    { path: '/secure', component: loadPage('Secure')}
]