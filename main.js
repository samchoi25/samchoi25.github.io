const app = new Vue({
    el: "#app",
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
        }
    }
});