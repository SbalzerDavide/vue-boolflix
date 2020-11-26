const app = new Vue ({
    el: '#app',
    data:{
        apiKey: 'e6b299c9bc3d24b73c05ea01c7f18871',
        search: '',
        list: [],
        flagList: ['it', 'en'],
        filter:'',
        allGenre: [],
        listActualGenre: [],
        

    },
    created(){ 
        this.getGenres();

    },
    methods:{
        makeResearch(){
            if (this.search != 0 ){
                this.list = [];
                // api call for movie 
                axios.get('https://api.themoviedb.org/3/search/movie', {
                    params: {
                        api_key: this.apiKey,
                        query: this.search,
                        language: 'it-IT',
                    }
                })
                .then(response => {
                    this.list = response.data.results;

                    // api call for tv series 
                    axios.get('https://api.themoviedb.org/3/search/tv', {
                        params: {
                            api_key: this.apiKey,
                            query: this.search,
                            language: 'it-IT',
                        }
                    })
                    .then(response => {
                        // push tv object with the same key of movie object
                        for (let i = 0; i < response.data.results.length; i++){
                            this.list.push({
                                vote_average: response.data.results[i].vote_average,
                                title: response.data.results[i].name,
                                original_title: response.data.results[i].original_name,
                                original_language: response.data.results[i].original_language,
                                genre_ids: response.data.results[i].genre_ids,
                            })
                        };
                    })
                    .catch(error =>{
                        console.log('eror: ', error);
                    });


                    // clear input text
                    this.search= '';
                })
                .catch(error =>{
                    console.log('eror: ', error);
                })
            };
            // this.takeGenres();

        },
        takeVote(vote){
            return Math.ceil(vote /2 );
        },
        flag(lang){
            return this.flagList.includes(lang);
        },

        takeGenres(){
            this.list.forEach(element =>{
                element.genre_ids.forEach(genre =>{
                    if (!this.listActualGenre.includes(genre)){
                        this.listActualGenre.push(genre);
                    };
                });
                console.log('ciao');
                console.log(element.genre_ids);
            });
            console.log(this.listActualGenre);




            // this.listActualGenre = this.allGenre.filter(genre =>{
            //     genre.id.includes(this.list.genre_ids);
            // });
            // console.log('genres');
            // console.log(this.listActualGenre);
        },
        getGenres(){
            axios.get('https://api.themoviedb.org/3/genre/movie/list', {
                params: {
                    api_key: this.apiKey,
                    language: 'it-IT',
                }
            })
            .then(response => {
                this.allGenre = response.data.genres;
                // console.log(this.allGenre.id);
            })
            .catch(error =>{
                console.log(error);
            })
        }


    }
});