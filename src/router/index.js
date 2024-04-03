import  {createRouter, createWebHistory} from 'vue-router';

import Homepage from '../components/pages/HomePage.vue';
import ContactUsPage from '../components/pages/ContactUsPage.vue';
import NotFoundPage from '../components/pages/NotFoundPage.vue'
import ProjectDetailPage from '../components/pages/ProjectDetailPage.vue'
import TypeProjectsPages from '../components/pages/TypeProjectsPages.vue'

const router = createRouter({
    history: createWebHistory(),
    linkActiveClass: 'partial-active',
    linkExactActiveClass: 'active',
    routes: [
        {path: '/', component: Homepage, name: 'home'},
        {path: '/contact-us', component: ContactUsPage, name: 'contact-us'},

        {path: '/project/:slug', component: ProjectDetailPage, name: 'project-detail'},
        {path: '/types/:slug/projects', component: TypeProjectsPages, name: 'type-projects'},


        {path: '/not-found', component: NotFoundPage, name: 'not-found'},
        {path: '/:pathMatch(.*)*', redirect: 'not-found'},
    ]
})

export {router}