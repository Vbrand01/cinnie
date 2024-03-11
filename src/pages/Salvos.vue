<template>
  <div id="salvos">

    <div class="container">
      <div class="alig">
        <div class="flex-list">
          <i class="ph ph-list-dashes"></i>
          <h1 class="mt-4 title">Minha lista</h1>
        </div>
      </div>
    </div>

    <div class="container left">
      <div class="alig">
        <div class="flex-list" v-if="filmes.length <= 0">
          <div class="align-list-not">
            <span class="n-possui">
              Você não possui nenhum filme salvo na sua lista
            </span>
            <div class="card-not-list">
              <i class="ph ph-placeholder"></i>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="container mt-3" v-for="filme in filmes" :key="filme.id">
      <div class="row bg-items" :class="{ 'bg-items-hover': filme.hover }">
        <div class="col-xl-12">
          <div class="flex-center">
            <div class="flex-d">
              <div class="filme-item">
                <i class="ph ph-film-strip"></i>
                <span class="title-filme">{{ filme.title }}
                </span>
              </div>
              <div class="btns">
                <router-link class="btn-detahes" :to="`/filme/${filme.id}`"><i class="ph ph-eye"></i><span>Visualizar
                    detalhes</span></router-link>
                <button class="btn-trailer">
                  <a :href="`https://youtube.com/results?search_query=Trailer ${filme.title}`" target="blank">
                    <i class="ph ph-film-strip" style="font-size: 20px;"></i>
                  </a>
                </button>
                <button class="btn-delete" @click="excluirFilme(filme.id)"><i class="ph ph-trash"></i></button>
              </div>
            </div>
          </div>
          <router-link class="image-banner-desktop" :to="`/filme/${filme.id}`">
            <img class="image-post" :src="`https://image.tmdb.org/t/p/w500/${filme.poster_path}`" alt="">
          </router-link>
          <img class="image-post image-banner-mobile" :src="`https://image.tmdb.org/t/p/w500/${filme.poster_path}`"
            alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Swal from 'sweetalert2';

export default {
  data() {
    return {
      filmes: [],
    }
  },
  created() {
    const myList = localStorage.getItem("myFilme");
    this.filmes = JSON.parse(myList) || [];
  },
  methods: {
    excluirFilme(id) {
      Swal.fire({
        title: 'Tem certeza que deseja excluir este filme?',
        background: "#1f1f1f",
        color: '#fff',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          Toast.fire({
            icon: "error",
            title: "Filme excluído com sucesso!"
          });
        }
      });
    },
    hoverImage(filme) {
      filme.hover = !filme.hover;
    }
  },
  watch: {
    filmes() {
      localStorage.setItem('myFilme', JSON.stringify(this.filmes))
    }
  }
}
</script>

<style scoped>
#salvos {
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 0px;
  padding-bottom: 30px;
}

.left {
  display: flex;
  justify-content: center;
  text-align: left;
}

.title {
  color: var(--color-white);
}

.container {
  display: flex;
  justify-content: center;
  padding: 0px;
}

.flex-d {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.bg-items {
  background-color: var(--color-zinc-2);
  padding: 25px;
  border-radius: 10px;
  width: 100%;
  margin-left: 10px;
  margin-right: 10px;
}

.bg-items-hover {
  height: 800px;
}

.btn-detahes {
  border: var(--border);
  padding: 15px;
  border-radius: 60px;
  color: var(--color-zinc) !important;
  display: inline-flex;
  align-items: center;
}

.btn-detahes i {
  font-size: 20px;
  margin-right: 10px;
}

.btn-delete {
  background-color: #ff0037;
  color: var(--color-white);
  padding: 15px;
  border-radius: 80px;
  display: inline-flex;
  align-items: center;
}

.btn-delete i {
  color: var(--color-white);
}

.title-filme {
  color: var(--color-white);
}

.filme-item {
  display: flex;
  align-items: center;
  margin-top: -20px;
}

.image-post {
  height: 50px;
  width: 30%;
  border-radius: 60px;
  border: var(--border);
  margin-right: 10px;
  object-fit: cover;
  transition: 1s !important;
  margin-top: -10px;
}

.image-post:hover {
  height: 80%;
  cursor: pointer;
  border-radius: 10px;
}

.filme-item i {
  margin-right: 10px;
  color: var(--color-primary);
  font-size: 20px;
}

.n-possui {
  color: #818181;
}

.card-not-list {
  margin-top: 10px;
  background-color: var(--color-zinc-2);
  height: 200px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px;
}

.card-not-list .ph-placeholder {
  margin: 0 !important;
  font-size: 5rem !important;
  color: #818181 !important;
}

.alig {
  display: flex;
  justify-content: left;
  width: 100%;
  margin-left: 10px;
}

.alig .title {
  font-size: 1.5rem
}

.flex-list {
  display: flex;
  align-items: center;
}

.flex-list i {
  font-size: 1.5rem;
  margin-top: 20px;
  margin-right: 10px;
  color: var(--color-white) !important;
  align-items: center;
  justify-content: center;
}

@media(max-width: 768px) {
  .bg-items {
    width: 100%;
  }

  .flex-d {
    display: block;
  }

  .alig {
    display: flex;
    justify-content: right;
    text-align: left;
    width: 100%;
    margin-right: 10px;
  }

  .alig .title {
    font-size: 1rem
  }

  .btns {
    margin-top: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .btn-detahes {
    font-size: .7rem;
  }

  .btn-delete {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px;
  }

}
</style>