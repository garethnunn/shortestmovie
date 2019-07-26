
Vue.component('searchresult', {
    props: ['result'],
    template: '<div class="searchresult" ><div class="searchresult__content"><div class="searchresult__content__title">{{ result.title }} </div><div class="searchresult__content__runtime"> {{ result.runtime }} minutes</div> </div><img v-bind:src="\'http://image.tmdb.org/t/p/w185/\' + result.images.posters[0].file_path" /><iframe v-bind:src="\'https://www.youtube.com/embed/\' + result.videos.results[0].key + \'?autoplay=1&mute=1\' "></iframe></div>'
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
                        promises.push(axios.get("https://api.themoviedb.org/3/movie/" + e.id + "?api_key=d6f12ddc103a301a347006b8083d3626&append_to_response=videos,images"));

                    });

                    axios.all(promises).then(function (results) {
                        var newArray = new Array();

                       
                        results.forEach(function (response) {
                            newArray.push(response.data);
                        });

                        newArray.sort((a, b) => parseFloat(a.runtime) - parseFloat(b.runtime));

                        app7.searchResults = newArray;
                    });
                })
          
        }
    }
});