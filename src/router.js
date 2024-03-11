import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';
import Filme from './pages/Filme.vue';
import Salvos from './pages/Salvos.vue';
import Error from './pages/Error.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/filme/:id',
            component: Filme,
            props: true,
            beforeEnter: (to, from, next) => {
                const id = to.params.id;
                if (isValidId(id)) {
                    next();
                } else {
                    next('/pagina-de-erro');
                }
            }
        },
        {
            path: '/salvos',
            component: Salvos
        },
        {
            path: '/pagina-de-erro',
            component: Error
        },
        {
            path: '/:pathMatch(.*)*',
            redirect: '/pagina-de-erro'
        }
    ]
});

function isValidId(id) {
    return id && !isNaN(id);
}

export { router };
