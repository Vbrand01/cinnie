<template>
  <div id="home">
    <div class="lista-filmes" v-if="loading">
      <LoadingVue />
    </div>
    <div class="in-bg" v-else>
      <div class="container">
        <div class="row">
          <div class="col-xl-12">
            <div class="fluid-center">
              <div class="slider">
                <div class="slides">
                  <div class="slide" v-for="(filme, index) in filmesCarouselWithImages" :key="index"
                    v-show="index === currentSlide">
                    <img :src="'https://image.tmdb.org/t/p/original' + filme.backdrop_path" :alt="filme.title">
                    <span class="banner-text-top-right">
                      <p><strong>Lançamento:</strong> {{ filme.releaseDateFormatted }}</p>
                    </span>
                    <div class="slide-text">
                      <h2>{{ filme.title }}</h2>
                      <p class="descr-text">{{ filme.overview }}</p>
                      <div class="banner-text">
                        <router-link class="btn-acesso" :to="`/filme/${filme.id}`">
                          <i class="ph ph-eye"></i>
                          <span class="txt-views">Visualizar</span>
                        </router-link>
                      </div>
                      <div class="infos">
                        <p><strong><i class="ph ph-star"
                              style="color: rgb(211, 197, 0); margin-right: 5px;"></i></strong>
                          {{ Math.round(filme.vote_average * 10) / 10 }}</p>
                        <p><strong></strong> <span class="generos">Gênero: {{ getGenres(filme.genre_ids) }}</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="button-flex">
          <div class="radio-buttons radio-input">
            <input name="radio" type="radio" class="input" v-for="(filme, index) in filmesCarouselWithImages"
              :key="index" :value="index" v-model="currentSlide">
          </div>
        </div>
      </div>
    </div>

    <div class="lista-filmes" v-if="loading">
      <LoadingVue />
    </div>

    <br />

    <Cards />
    <Acao />
    <Terror />
    <Drama />
    <Comedia />
    <Ficcao />

  </div>


</template>

<script>

import Cards from '../components/genres/Familia.vue';
import Acao from '../components/genres/Acao.vue';
import Comedia from '../components/genres/Comedia.vue';
import Terror from '../components/genres/Terror.vue';
import Drama from '../components/genres/Drama.vue';
import Ficcao from '../components/genres/Ficcao.vue';
import apiLancamento from '../service/apiLancamento';
import LoadingVue from '../components/Loading.vue';

import { format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

export default {
  components: {
    Cards,
    Acao,
    Comedia,
    Terror,
    Drama,
    Ficcao,
    LoadingVue
  },
  data() {
    return {
      genres: [
        { id: '10751', title: 'Família' },
        { id: '28', title: 'Ação' },
        { id: '35', title: 'Comédia' },
        { id: '27', title: 'Terror' },
        { id: '16', title: 'Animação' }
      ],
      filmesListByGenre: {},
      filmesCarousel: [],
      filmesList: [],
      currentSlide: 0,
      intervalId: null,
      filmeOverview: {},
      loading: true
    }
  },
  computed: {
    filmesCarouselWithImages() {
      return this.filmesCarousel.filter(filme => filme.backdrop_path);
    },
    filmesListWithImages() {
      return this.filmesList.filter(filme => filme.poster_path);
    }
  },
  mounted() {
    this.fetchCarouselData();
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      return format(date, 'dd \'de\' MMMM \'de\' yyyy', { locale: pt });
    }
  }
}
</script>


<style>
a {
  text-decoration: none !important;
  color: inherit !important;
}

.infos {
  display: flex;
  justify-content: left;
  margin-top: 20px;
  font-size: 13px;
  gap: 10px;
}

.infos p {
  background-color: rgba(0, 0, 0, 0.322);
  border: var(--border);
  padding: 8px;
  border-radius: 5px;
}

.slide {
  position: relative;
}

.slide-text {
  position: absolute;
  bottom: 0;
  width: 100%;
  backdrop-filter: blur(10px);
  padding: 30px;
  padding-bottom: 15px;
  color: white;
}

.slide-text h2 {
  font-size: 3vw;
}

.txt-views{
  display: block;
}

.in-bg {
  display: flex;
  justify-content: center;
  align-items: center;
}

.fluid-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.banner-text-top-right {
  position: absolute;
  top: 20px;
  right: 20px;
  backdrop-filter: blur(10px);
  padding: 10px 10px;
  background-color: rgba(22, 22, 22, 0.233);
  border: var(--border);
  color: white;
  height: 40px;
  border-radius: 5px;
  font-size: .8rem;
}

.banner-text {
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: var(--color-primary);
  color: var(--color-white);
  padding: 10px;
  border-radius: 60px;
  font-size: 1rem;
}

.btn-acesso {
  display: flex;
  align-items: center;
}

.btn-acesso i {
  margin-right: 10px;
}

.button-flex {
  display: flex;
  justify-content: right;
  margin-top: 10px;
}

.input {
  -webkit-appearance: none;
  margin: 2px;
  width: 14px;
  height: 14px;
  border-radius: 3px;
  cursor: pointer;
  border: var(--border);
  background-color: hsla(0, 0%, 0%, .2);
  background-image: -webkit-radial-gradient(hsla(200, 100%, 90%, 1) 0%, var(--color-primary) 15%, hsla(286, 100%, 60%, 0.3) 28%, hsla(200, 100%, 30%, 0) 70%);
  background-repeat: no-repeat;
  -webkit-transition: background-position .15s cubic-bezier(.8, 0, 1, 1),
    -webkit-transform .25s cubic-bezier(.8, 0, 1, 1);
  outline: none;
}

.input:checked {
  -webkit-transition: background-position .2s .15s cubic-bezier(0, 0, .2, 1),
    -webkit-transform .25s cubic-bezier(0, 0, .2, 1);
}

.input:active {
  -webkit-transform: scale(1.5);
  -webkit-transition: -webkit-transform .1s cubic-bezier(0, 0, .2, 1);
}


/* The up/down direction logic */

.input,
.input:active {
  background-position: 0 24px;
}

.input:checked {
  background-position: 0 0;
}

.input:checked~.input,
.input:checked~.input:active {
  background-position: 0 -24px;
}
</style>
