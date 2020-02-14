const app = new Vue({
    el: "#app",
    data: {
        header: {
            text: "SC5",
            image: {
                src: "./logo.svg"
            }
        },
        randomQuote: homersimpson[Math.floor(Math.random() * homersimpson.length)]
    }
});