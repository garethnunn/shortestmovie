
Vue.component('searchresult', {
    props: ['result'],
    template: '<div class="searchresult" >{{ result.title }} {{ result.runtime }} minutes</div>'
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
                    this.searchResults = response.data.results.slice(0, 1);
                    var promises = [];

                    this.searchResults.forEach(function (e) {                    
                        promises.push(axios.get("https://api.themoviedb.org/3/movie/" + e.id + "?api_key=d6f12ddc103a301a347006b8083d3626"));
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