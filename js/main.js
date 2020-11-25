const app = new Vue ({
    el: '#app',
    data:{
        apiKey: 'e6b299c9bc3d24b73c05ea01c7f18871',
        search: '',
        list: [],

    },
    created(){

    },
    methods:{
        makeResearch(){
            if (this.search != 0 ){
                this.list = [];
                this.movie();
                this.tv();
                this.search= '';
            };
        },
        movie(){
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
            })
            .catch(error =>{
                console.log('eror: ', error);
            })
        },
        tv(){
            axios.get('https://api.themoviedb.org/3/search/tv', {
                params: {
                    api_key: this.apiKey,
                    query: this.search,
                    language: 'it-IT',
                }
            })
            .then(response => {
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
        },
        takeVote(ind){
            return Math.ceil(this.list[ind].vote_average /2 );
        },
    }
});