const app = new Vue ({
    el: '#app',
    data:{
        apiKey: 'e6b299c9bc3d24b73c05ea01c7f18871',
        search: '',

    },
    created(){

    },
    methods:{
        makeResearch(){
            console.log(this.search);
        }
    }
});