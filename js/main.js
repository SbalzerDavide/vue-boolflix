const app = new Vue ({
    el: '#app',
    data:{
        apiKey: 'e6b299c9bc3d24b73c05ea01c7f18871',
        search: '',
        list: [],
        flagList: ['it', 'en'],

    },
    created(){

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
                    console.log(response.data.results);
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
        },
        takeVote(vote){
            return Math.ceil(vote /2 );
        },
        flag(lang){
            return this.flagList.includes(lang);

        }
    }
});