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
        filter: 'all',
        filterObj: {},
        showFilter: false,
        overDescription: false,
        more:false,
        

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
                                overview: response.data.results[i].overview,
                            })
                        };
                        this.shortDescription();

                    })
                    .catch(error =>{
                        console.log('eror: ', error);
                    });


                    // clear input text
                    // this.search= '';
                })
                .catch(error =>{
                    console.log('eror: ', error);
                })
            };
            this.showFilter = true;

        },
        takeVote(vote){
            return Math.ceil(vote /2 );
        },
        flag(lang){
            return this.flagList.includes(lang);
        },
        takeGenres(){
            //non funzionante
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
                this.allGenre = this.allGenre.concat(response.data.genres);
                // console.log(this.allGenre.id);
            })
            .catch(error =>{
                console.log(error);
            })

            axios.get('https://api.themoviedb.org/3/genre/tv/list', {
                params: {
                    api_key: this.apiKey,
                    language: 'it-IT',
                }
            })
            .then(response => {
                this.allGenre = this.allGenre.concat(response.data.genres);
                // console.log(this.allGenre.id);
            })
            .catch(error =>{
                console.log(error);
            })
        },
        shortDescription(){
            this.list.forEach(element =>{
                if (element.overview.length > 300){
                    this.overDescription = true;
                    element.short_overview = element.overview.slice(0,300);
                    // element.overview = element.overview.slice(0,300);
                };
            })
        },
        applyFilter(){
            if (this.search !== ''){
                // other api call for movie 
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
                                overview: response.data.results[i].overview,
                            })
                        };
                        this.shortDescription();
                        // filter new results
                        this.allGenre.forEach(genre => {
                            if (genre.name === this.filter){
                                this.filterObj = {
                                    name: genre.name,
                                    id: genre.id
                                };
                            };
                        });
                        if (this.filter !== 'all'){
                            this.list = this.list.filter(element => element.genre_ids.includes(this.filterObj.id))
                        };        
                    })
                    .catch(error =>{
                        console.log('eror: ', error);
                    });
                })
                .catch(error =>{
                    console.log('eror: ', error);
                });
            };
        },


    }
});