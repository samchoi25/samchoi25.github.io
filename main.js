const bender = [
    "<b>Fry</b>: Bender, this has nothing to do with you.<br><b>Bender</b>: That's impossible!",
    "I failed at my life-long dream again. How can I be…o bad at everything I try, and still be so great?",
"<b>Professor Farnsworth</b>: These bees are larger…b>: It's not small?<br><b>Hermes</b>: No, no, no.",
"<b>Leela</b>: You can't go to Omega 3. It's forbid…ingly pathetic. I guess I can't let you go alone.",
"<b>Fry</b>: Usually on the show, they came up with…on!<br><b>Fry</b>: Of course! It's all so simple!",
"<b>Bender</b>: Uh, can people who hate \"Star Trek\"…>Melllvar</b>: No, they have to stay even longer.",
"My story is a lot like yours, only more interesting 'cause it involves robots.",
"<b>Bender</b>: Fleeing somewhere?<br><b>Fry</b>: W…u blocking the only escape route? Don't be silly.",
"If it's chicken, chicken à la king. If it's fish, fish à la king. If it's turkey, fish à la king.",
"Hey, whose been messing with my radio? This is not alternative rock, it's college rock.",
"Let's commence preparations for rumbling!",
"Congratulations, Fry! You snagged the perfect girl…ch, she probably has got other characteristics...",
"<b>Leela</b>: Why is Zoidberg the only one still a…ny girl I want anytime I want! I'm just too busy.",
"Lets face it, comedy's a dead art form. Now tragedy! Ha ha ha, that's funny.",
"<b>Fry</b>: You look different. Did you get a hair…y dollar you make on jewelry and skintight pants.",
"<b>Bender</b>: Ah, yes! John Quincy Adding Machine…iticians, he promised more than he could deliver.",
"<b>Leela</b>: Bender, I thought you were supposed … it, make sure you put them in after you cook it.",
"<b>Amy</b>: You should try homeopathic medicine, B…b>: Or a big fat placebo. It's all the same crap!",
"<b>Dean Vernon</b>: You robots are a disgrace to t…ated...<br><b>Bender</b>: Now I can explain that!",
"<b>Countess de LaRoca</b>: Bender, you risked your…! And perhaps a third time! But that would be it.",
"<b>Leela</b>: That was the worst delivery ever.<br…<b>Bender</b>: Me neither! Food was good, though.",
"<b>Farnsworth</b>: Good news, everyone!<br><b>Bend…nes have names like that in the Galaxy of Terror!",
"<b>Bender</b>: There was nothing wrong with that f…Zoidberg</b>: Uh-oh! I shouldn't have had seconds",
"In the name of all that is good and logical, we gi…zero one zero one one zero zero one... two. Amen.",
"<b>Bender</b>: Now Wireless Joe Jackson - there wa…s just a modified howitzer!<br><b>Leela</b>: Yep.",
"Not enough room? My place is two cubic meters, and… room for a whole 'nother two thirds of a person!",
"<b>Fry</b>: Where's the bathroom?<br><b>Bender</b>…y</b>: Bathroom!<br><b>Bender</b>: The what what?",
"<b>Bender</b>: <em>[in his sleep]</em> Kill all hu…the most wonderful dream. I think you were in it.",
"I'm going to build my own theme park! With blackjack! And hookers! You know what- forget the park!",
"After all, our love isn't any different from yours. Except it's hotter, 'cause I'm involved.",
"This is the worst kind of discrimination: the kind against me!",
"<b>Voice on T.V.</b>: Is today's hectic lifestyle …<br><b>Bender</b>: Shut up and get to the point! ",
"Of all the friends I've had... you're the first.",
"I decline the title of Iron Cook and accept the le…e up. Uhh... also, comes with double prize money.",
"Have you ever tried just turning off the TV, sitting down with your children, and hitting them?",
"<b>Leela</b>: Bender, we're trying our best.<br><b>Bender</b>: Your best is an idiot! ",
"<b>Fry</b>: My only other dreams are to be invisib…r the head until you think that's what happened. ",
"My life, and by extension everyone else's, is meaningless.",
"<em>[dying]</em> I came here with a simple dream..…billion ton robot monster here? Not I... Not I...",
"Blackmail's such an ugly word. I prefer extortion. The X makes it sound cool."];

const app = new Vue({
    el: "#app",
    data: {
        header: {
            text: "SC5",
            image: {
                src: "./logo.svg"
            }
        },
        randomQuote: bender[Math.floor(Math.random() * bender.length)]
    }
});