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
            this.search= '';

        },
        takeVote(ind){
            return Math.ceil(this.list[ind].vote_average /2 );
        },
        flag(ind){
            if (this.list[ind].original_language === 'en'){
                return
            }
        }
    }
});