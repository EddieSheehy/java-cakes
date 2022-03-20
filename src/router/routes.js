function loadPage(component) {
    // '@' is aliased to src/components
    return () => import(/*webpackChunkName:"[request]"*/
        `@/pages/${component}.vue`)
}

export default [
    {path: '/', component:loadPage('HelloWorld')},
    {path: '/register', component: loadPage('Register')},
    {path:'/login', component: loadPage('Login')},
]