const app = new Vue({
    el: "#app",
    mounted:function(){
    },
    data: {
        header: {
            text: "SC5",
            image: {
                src: "./logo.svg"
            }
        },
        quote: homersimpson[Math.floor(Math.random() * homersimpson.length)]
    },
    methods: {
        randomQuote: function () {
            const characters = [ homersimpson, bender, jason, ronswanson];
            const randomCharacter = characters[Math.floor(Math.random() * characters.length)];
            return randomCharacter[Math.floor(Math.random() * randomCharacter.length)];
        },
        setRandomQuote: function (event) {
            this.quote = this.randomQuote();
        },
        quoteOfTheDay: () => {
            const _self = this;
            fetch('https://quotes.rest/qod.json', {mode: 'cors'})
                .then(function(response) {
                    return response.json();
                })
                .then(function(text) {
                    _self.quote = `${text.contents.quotes[0].quote} - ${text.contents.quotes[0].author}`;
                })
                .catch(function(error) {
                    console.log('Request failed', error)
                });
       }
    }
});