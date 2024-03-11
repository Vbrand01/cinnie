<template>
    <div>
        <div class="container" id="acao">
            <div class="row">
                <div class="col-xl-12">
                    <section class="block gap-1">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-xl-12">
                                    <h3 class="title-genre">Filmes de ação</h3>
                                </div>
                            </div>
                        </div>
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
                                    class="ControlsBtn previous" aria-label="Previous item" title="Previous item"
                                    onclick="scrollerAcao.scrollBy(-600, 0)"> <svg viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor">
                                        <path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                                    </svg> </button> <button id="NextBtn" class="ControlsBtn next"
                                    aria-label="Next item" title="Next item" onclick="scrollerAcao.scrollBy(600, 0)">
                                    <svg viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                        <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                    </svg> </button> </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import apiGenre from '../../service/apiGenre';
import '../../styles/carousel.css'

export default {
    data() {
        return {
            filmesListWithImages: []
        };
    },
    async mounted() {
        try {
            const response = await apiGenre.get('', {
                params: {
                    with_genres: '28'
                }
            });
            this.filmesListWithImages = response.data.results;
        } catch (error) {
            console.error('Erro ao buscar filmes:', error);
        }
    },
    async handleClick(filmeId) {
        this.$router.push({ path: `/filme/${filmeId}` });
        window.location.reload();
    },
    beforeDestroy() {
        this.$refs.scroller.removeEventListener('scroll', this.updateControlsVisibility);
    },
    methods: {
        scroll(amount) {
        },
        updateControlsVisibility() {
            const scroller = this.$refs.scroller;
            this.showControls = scroller.scrollWidth > scroller.clientWidth;
        },
        truncateOverview(overview) {
            if (overview.length > 80) {
                return overview.slice(0, 80) + '...';
            }
            return overview;
        }
    },
    computed: {
        filmesListWithOverview() {
            return this.filmesListWithImages.filter(filme => filme.overview);
        }
    }
};


</script>

<style scoped></style>