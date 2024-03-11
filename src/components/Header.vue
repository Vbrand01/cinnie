<template>
  <div class="container">
    <div class="row">
      <div class="col-xl-12">
        <div class="bg-nav-header">
          <header id="header">
            <router-link class="logo" to="/" exact><img :src="Logo" height="40px" alt=""></router-link>
            <div class="content-nav">
              <router-link to="/salvos" exact class="meusfilmes">
                <i class="ph ph-film-slate">
                  <span class="num-filmes">{{ numFilmesSalvos }}</span>
                </i>
              </router-link>
            </div>
          </header>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import Logo from '../../public/cinnie-white-lig.svg'

export default {
  components: {},
  data() {
    return {
      Logo: Logo,
      numFilmesSalvos: 0
    }
  },
  mounted() {
    this.getNumFilmesSalvos();
    window.addEventListener('storage', this.handleStorageChange);
  },
  beforeDestroy() {
    window.removeEventListener('storage', this.handleStorageChange);
  },
  methods: {
    getNumFilmesSalvos() {
      const myList = localStorage.getItem("myFilme");
      const filmes = JSON.parse(myList) || [];
      this.numFilmesSalvos = filmes.length;
    },
    handleStorageChange(event) {
      if (event.key === 'myFilme') {
        this.getNumFilmesSalvos();
      }
    }
  }
}

</script>

<style scoped>

#header {
  margin-top: 10px !important;
  justify-content: space-between;
  padding: 15px;
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  background-color: var(--color-zinc-2);
  border-radius: 30px;
  backdrop-filter: blur(9.5px);
  -webkit-backdrop-filter: blur(9.5px);
  border-radius: 10px;
  border: var(--border);
}

#header a {
  text-decoration: none;
}

.bg-nav-header {
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo {
  cursor: pointer;
  color: var(--color-white);
}

.num-filmes {
  position: absolute;
  top: 15px;
  right: 15px;
  color: var(--color-white);
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 0.8rem;
}

.meusfilmes {
  color: var(--color-white);
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.meusfilmes i {
  font-size: 25px;
  color: var(--color-white);
}

.content-nav {
  display: flex;
  align-items: center;
}

.content-nav .list-nav {
  display: flex;
  margin-right: 10px;
  gap: 15px;
  margin-top: -5px;
}

.content-nav .list-nav div {
  color: rgb(82, 82, 82);
  cursor: pointer;
  transition: 0.6s;
}

.content-nav .list-nav div:hover {
  color: var(--color-primary);
  cursor: pointer;
}

</style>