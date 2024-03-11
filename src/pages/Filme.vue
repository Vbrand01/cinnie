<template>
    <div id="filme">
        <div class="loading-list" v-if="loading">
            <Loading />
        </div>
        <div class="container mb-5 card-group" v-else>
            <div class="bg-content">
                <div class="row mt-4">
                    <div class="col-xl-5">
                        <div class="card-image">
                            <img :src="`https://image.tmdb.org/t/p/w500/${filme.poster_path}`" alt="">
                            <!-- <span class="">
                                <p><strong>Lançamento:</strong> {{ filme.releaseDateFormatted }}</p>
                            </span> -->
                        </div>
                    </div>
                    <div class="col-xl-7">
                        <div class="card-info">
                            <label class="ui-bookmark">
                                <input type="checkbox" v-model="isSaved" disabled>
                                <div class="bookmark">
                                    <svg viewBox="0 0 32 32">
                                        <g>
                                            <path
                                                d="M27 4v27a1 1 0 0 1-1.625.781L16 24.281l-9.375 7.5A1 1 0 0 1 5 31V4a4 4 0 0 1 4-4h14a4 4 0 0 1 4 4z">
                                            </path>
                                        </g>
                                    </svg>
                                </div>
                            </label>
                            <h2 class="title-filme">{{ filme.title }}</h2>
                            <h3 class="text-sub">Sinopse</h3>
                            <p class="descr-text-filmes ">{{ filme.overview }}</p>
                            <div class="botoes btn-desktop">
                                <button class="btn-salvar" @click="salvarfilme">
                                    <i class="ph ph-list-plus" style="font-size: 1.3rem;"></i>
                                    Adicionar na minha lista
                                </button>
                                <button class="btn-trailer">
                                    <a :href="`https://youtube.com/results?search_query=Trailer ${filme.title}`"
                                        target="blank">
                                        <i class="ph ph-film-strip" style="font-size: 1.3rem;"></i>
                                        Trailer
                                    </a>
                                </button>
                                <router-link class="v-mais" to="/">
                                    <i class="ph ph-info" style="font-size: 1.3rem;"></i>
                                    Ver outros filmes
                                </router-link>
                            </div>
                            <div class="btn-mobile">
                                <div class="row">
                                    <div class="col-xl-12">
                                        <div class="botoes">
                                            <button class="btn-salvar" @click="salvarfilme">
                                                <i class="ph ph-list-plus" style="font-size: 1.3rem;"></i>
                                                Minha lista
                                            </button>
                                            <button class="btn-trailer">
                                                <a :href="`https://youtube.com/results?search_query=Trailer ${filme.title}`"
                                                    target="blank">
                                                    <i class="ph ph-film-strip" style="font-size: 1.3rem;"></i>
                                                    Trailer
                                                </a>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xl-12">
                                        <router-link class="v-mais" to="/">
                                            <i class="ph ph-info" style="font-size: 1.3rem;"></i>
                                            Ver outros filmes
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                            <div class="card-info info-mt">
                                <div class="inline">
                                    <ul id="scrollerAcao" class="UserList Scroller inline gap-2">
                                        <li v-for="filme in filmesListWithOverview" :key="filme.id">
                                            <router-link class="Card block-center-center" :to="`/filme/${filme.id}`">
                                                <figure class="block-center-center gap-1">

                                                    <img class="image-carousel"
                                                        :src="'https://image.tmdb.org/t/p/w500' + filme.poster_path"
                                                        :alt="filme.title">

                                                    <div class="name">{{ filme.title }}</div>

                                                </figure>
                                            </router-link>
                                        </li>
                                    </ul>
                                </div>
                                <div class="Controls block-center-center">
                                    <div class="Wrapper inline content-3 space-between"> <button id="PrevBtn"
                                            class="ControlsBtn previous" aria-label="Previous item"
                                            title="Previous item" onclick="scrollerAcao.scrollBy(-600, 0)"> <svg
                                                viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                                <path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                                            </svg> </button> <button id="NextBtn" class="ControlsBtn next"
                                            aria-label="Next item" title="Next item"
                                            onclick="scrollerAcao.scrollBy(600, 0)">
                                            <svg viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                                <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                            </svg> </button> </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import apiGenre from '../service/apiGenre';
import apiLancamento from '../service/apiLancamento';

import Loading from '../components/Loading.vue';

import '../styles/carousel.css'
import Swal from 'sweetalert2';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';

export default {
    props: ['id'],
    components: {
        Loading,
    },
    data() {
        return {
            filme: {},
            releaseDateFormatted: '',
            isSaved: false,
            loading: true,
            filmesListWithImages: []
        }
    },
    async created() {
        const response = await apiGenre.get(`https://api.themoviedb.org/3/movie/${this.id}`);
        this.filme = response.data;
        this.releaseDateFormatted = this.formatDate(this.filme.release_date);
        this.loading = false;

        const mylList = localStorage.getItem('myFilme');
        if (mylList) {
            const filmes = JSON.parse(mylList);
            this.isSaved = filmes.some((filme) => filme.id == this.filme.id);
        }
    },
    beforeDestroy() {
        this.$refs.scroller.removeEventListener('scroll', this.updateControlsVisibility);
    },
    async mounted() {
        try {
            const response = await apiLancamento.get('');
            this.filmesListWithImages = response.data.results;

            this.filmesListWithImages = this.shuffle(this.filmesListWithImages);
        } catch (error) {
            console.error('Erro ao buscar filmes:', error);
        }
    },
    watch: {
        id(newId) {
            this.carregarDetalhesFilme(newId);
        }
    },
    methods: {
        salvarfilme() {
            if (this.isSaved) {
                Swal.fire({
                    title: 'Ops! Já adicionado na sua lista.',
                    background: "#1f1f1f",
                    color: '#fff',
                    customClass: {
                        container: 'custom-swal-container'
                    },
                    text: 'Você já tem esse filme salvo!',
                });
                return;
            }

            const mylList = localStorage.getItem('myFilme');
            let filmes = JSON.parse(mylList) || [];

            filmes.push(this.filme);
            localStorage.setItem('myFilme', JSON.stringify(filmes));
            this.isSaved = true; // Marca o filme como salvo

            const Toast = Swal.mixin({
                toast: true,
                position: "bottom-end",
                background: "#1f1f1f",
                color: '#fff',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "success",
                title: "Filme salvo com sucesso!"
            });

        },
        toggleSave() {
            if (this.isSaved) {
                // Remover o filme da lista de salvos se o checkbox for desmarcado
                const mylList = localStorage.getItem('myFilme');
                let filmes = JSON.parse(mylList) || [];
                filmes = filmes.filter((filme) => filme.id != this.filme.id);
                localStorage.setItem('myFilme', JSON.stringify(filmes));
                this.isSaved = false;
            } else {
                // Salvar o filme se o checkbox for marcado
                this.salvarfilme();
            }
        },
        formatDate(dateString) {
            try {
                const date = new Date(dateString);
                return format(date, 'dd \'de\' MMMM \'de\' yyyy', { locale: pt });
            } catch (error) {
                console.error('Erro ao formatar a data:', error);
                return 'Data inválida';
            }
        },
        async carregarDetalhesFilme(id) {
            this.loading = true;
            const response = await apiGenre.get(`https://api.themoviedb.org/3/movie/${id}`);
            this.filme = response.data;
            this.releaseDateFormatted = this.formatDate(this.filme.release_date);
            this.loading = false;

            const mylList = localStorage.getItem('myFilme');
            if (mylList) {
                const filmes = JSON.parse(mylList);
                this.isSaved = filmes.some((filme) => filme.id == this.filme.id);
            }

            await this.loadSimilarMovies(this.filme.genre_ids[0]);
        },
        shuffle(array) {
            let currentIndex = array.length, randomIndex;

            while (currentIndex != 0) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;

                [array[currentIndex], array[randomIndex]] = [
                    array[randomIndex], array[currentIndex]];
            }

            return array;
        }
    },
    computed: {
        filmesListWithOverview() {
            return this.filmesListWithImages.filter(filme => filme.overview);
        }
    }
}
</script>

<style scoped>
.card-image {
    background-color: var(--color-black-bg);
    padding: 10px;
    border-radius: 10px;
    border: var(--border);
}

.card-image img {
    width: 100%;
    border-radius: 5px;
}

.title-filme {
    color: var(--color-white);
    font-size: 2rem;
}

.card-info {
    position: relative;
    background-color: var(--color-black-bg);
    padding: 40px;
    border: var(--border);
    border-radius: 10px;
}

.info-mt {
    max-height: 100%;
    display: flex;
    align-items: center;
    padding: 0px;
    margin-top: 50px;
    border: none;
}

.Controls {
    position: absolute;
    inset-inline: 0;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
}


.ControlsBtn {
    inline-size: 44px;
    block-size: 44px;
}


.botoes {
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: left;
}

.btn-desktop {
    display: block;
    display: flex;
}

.btn-mobile {
    display: none;
}

.btn-salvar {
    background-color: var(--color-primary);
    border: var(--border);
    padding: 15px;
    border-radius: 60px;
    margin-right: 10px;
    color: var(--color-white) !important;
    font-size: 1rem;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: .6s;
}

.btn-salvar:hover {
    background-color: #6500ca;
}

.v-mais {
    background-color: rgb(26, 26, 26);
    border: var(--border);
    padding: 15px;
    border-radius: 60px;
    margin-left: 10px;
    gap: 8px;
    color: #868686 !important;
    font-size: 1rem;
    display: flex;
    align-items: center;
    transition: .6s;
}

.v-mais:hover {
    background-color: rgb(15, 15, 15);
}

.ui-bookmark {
    position: absolute;
    top: 20px;
    right: 20px;
    --icon-size: 24px;
    --icon-secondary-color: rgb(77, 77, 77);
    --icon-hover-color: rgb(97, 97, 97);
    --icon-primary-color: var(--color-primary);
    --icon-circle-border: 1px solid var(--icon-primary-color);
    --icon-circle-size: 35px;
    --icon-anmt-duration: 0.3s;
}

.ui-bookmark input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    display: none;
}

.ui-bookmark .bookmark {
    width: var(--icon-size);
    height: auto;
    fill: var(--icon-secondary-color);
    cursor: pointer;
    -webkit-transition: 0.2s;
    -o-transition: 0.2s;
    transition: 0.2s;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    position: relative;
    -webkit-transform-origin: top;
    -ms-transform-origin: top;
    transform-origin: top;
}

.bookmark::after {
    content: "";
    position: absolute;
    width: 10px;
    height: 10px;
    -webkit-box-shadow: 0 30px 0 -4px var(--icon-primary-color),
        30px 0 0 -4px var(--icon-primary-color),
        0 -30px 0 -4px var(--icon-primary-color),
        -30px 0 0 -4px var(--icon-primary-color),
        -22px 22px 0 -4px var(--icon-primary-color),
        -22px -22px 0 -4px var(--icon-primary-color),
        22px -22px 0 -4px var(--icon-primary-color),
        22px 22px 0 -4px var(--icon-primary-color);
    box-shadow: 0 30px 0 -4px var(--icon-primary-color),
        30px 0 0 -4px var(--icon-primary-color),
        0 -30px 0 -4px var(--icon-primary-color),
        -30px 0 0 -4px var(--icon-primary-color),
        -22px 22px 0 -4px var(--icon-primary-color),
        -22px -22px 0 -4px var(--icon-primary-color),
        22px -22px 0 -4px var(--icon-primary-color),
        22px 22px 0 -4px var(--icon-primary-color);
    border-radius: 50%;
    -webkit-transform: scale(0);
    -ms-transform: scale(0);
    transform: scale(0);
}

.bookmark::before {
    content: "";
    position: absolute;
    border-radius: 50%;
    border: var(--icon-circle-border);
    opacity: 0;
}

/* actions */

.ui-bookmark:hover .bookmark {
    fill: var(--icon-hover-color);
}

.ui-bookmark input:checked+.bookmark::after {
    -webkit-animation: circles var(--icon-anmt-duration) cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    animation: circles var(--icon-anmt-duration) cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    -webkit-animation-delay: var(--icon-anmt-duration);
    animation-delay: var(--icon-anmt-duration);
}

.ui-bookmark input:checked+.bookmark {
    fill: var(--icon-primary-color);
    -webkit-animation: bookmark var(--icon-anmt-duration) forwards;
    animation: bookmark var(--icon-anmt-duration) forwards;
    -webkit-transition-delay: 0.3s;
    -o-transition-delay: 0.3s;
    transition-delay: 0.3s;
}

.ui-bookmark input:checked+.bookmark::before {
    -webkit-animation: circle var(--icon-anmt-duration) cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    animation: circle var(--icon-anmt-duration) cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    -webkit-animation-delay: var(--icon-anmt-duration);
    animation-delay: var(--icon-anmt-duration);
}

@-webkit-keyframes bookmark {
    50% {
        -webkit-transform: scaleY(0.6);
        transform: scaleY(0.6);
    }

    100% {
        -webkit-transform: scaleY(1);
        transform: scaleY(1);
    }
}

@keyframes bookmark {
    50% {
        -webkit-transform: scaleY(0.6);
        transform: scaleY(0.6);
    }

    100% {
        -webkit-transform: scaleY(1);
        transform: scaleY(1);
    }
}

@-webkit-keyframes circle {
    from {
        width: 0;
        height: 0;
        opacity: 0;
    }

    90% {
        width: var(--icon-circle-size);
        height: var(--icon-circle-size);
        opacity: 1;
    }

    to {
        opacity: 0;
    }
}

@keyframes circle {
    from {
        width: 0;
        height: 0;
        opacity: 0;
    }

    90% {
        width: var(--icon-circle-size);
        height: var(--icon-circle-size);
        opacity: 1;
    }

    to {
        opacity: 0;
    }
}

@-webkit-keyframes circles {
    from {
        -webkit-transform: scale(0);
        transform: scale(0);
    }

    40% {
        opacity: 1;
    }

    to {
        -webkit-transform: scale(0.8);
        transform: scale(0.8);
        opacity: 0;
    }
}

@keyframes circles {
    from {
        -webkit-transform: scale(0);
        transform: scale(0);
    }

    40% {
        opacity: 1;
    }

    to {
        -webkit-transform: scale(0.8);
        transform: scale(0.8);
        opacity: 0;
    }
}
</style>