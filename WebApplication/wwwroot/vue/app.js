
Vue.component('searchresult', {
    props: ['result'],
    template: '<div class="searchresults" >{{ result.title }} {{ result.runtime }} minutes <img v-bind:src="\'http://image.tmdb.org/t/p/w185/\' + result.images.posters[0].file_path" /></div>'
})

var app7 = new Vue({
    el: '#vue-app',
    data: {
        searchQuery: "",
        message: "hi",
        searchResults: [
       
        ],
     
    },
    methods: {
        searchChange: function () {
        
            axios.get("https://api.themoviedb.org/3/search/movie?api_key=d6f12ddc103a301a347006b8083d3626&query=" + this.searchQuery)
                .then(response => {
                    this.searchResults = response.data.results.slice(0, 3);
                    var promises = [];

                    this.searchResults.forEach(function (e) {                    
                        promises.push(axios.get("https://api.themoviedb.org/3/movie/" + e.id + "?api_key=d6f12ddc103a301a347006b8083d3626&append_to_response=images"));

                    });

                    axios.all(promises).then(function (results) {
                        var newArray = new Array();
                        results.forEach(function (response) {
                            newArray.push(response.data);
                        });
                        app7.searchResults = newArray;
                    });
                })
          
        }
    }
});