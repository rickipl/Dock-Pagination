new Vue({

    data(){

        return{
         
            posts: [],
            currentPage: 1,                                     //zmienne
            pageSize: 10

        };
    },

    computed: {
        paginatedPosts() {
          const startIndex = (this.currentPage - 1) * this.pageSize;
          const endIndex = startIndex + this.pageSize;
          return this.posts.slice(startIndex, endIndex);        // Podtablica postów dla bieżącej strony
        },
        totalPages() {
          return Math.ceil(this.posts.length / this.pageSize);  // Całkowita liczba stron
        }
    },

    mounted() {
        this.fetchPosts();                                      // Pobiera posty przy ładowaniu komponentu
    },

    methods: {
        fetchPosts() {
          fetch('https://jsonplaceholder.typicode.com/posts')   // Wywołuje żądanie do API
            .then(response => response.json())                  // Parsuje odpowiedź jako JSON
            .then(data => {
              this.posts = data;                                            // Zapisuje pobrane posty w tablicy
              this.posts.sort((a, b) => a.title.localeCompare(b.title));    // Sortowanie po tytule
              localStorage.setItem('posts', JSON.stringify(data));          // Zapisuje dane w Local Storage
            })
            .catch(error => console.log(error));
        },
        goToPage(page) {
          this.currentPage = page;                              // Zmienia bieżącą stronę
        }
      }
}).$mount('#app');
