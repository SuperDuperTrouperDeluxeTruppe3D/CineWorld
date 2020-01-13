const mongoose = require("mongoose");
const model = require("../models/model");

mongoose.connect("mongodb+srv://admin-munir:test123@cluster0-onjha.mongodb.net/CineWorldDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const films = [
    new model.Film({
        title: "Le Mans 66 - Gegen jede Chance",
        genre: "Drama, Porträt/Biographie, Sport",
        fsk: "12",
        price: 35,
        playingTime: "153",
        crew: "Christian Bale (Ken Miles), Ray McKinnon, Matt Damon (Carroll Shelby), Josh Lucas, Tracy Letts, JJ Feild, Jon Bernthal, Caitriona Balfe (Mollie Miles), Ian Harding, Noah Jupe",
        start: "13.12.2019",
        playingWeek: "4",
        short: "Rennsport-Film über die Rivalität zwischen Ford und Ferrari in den 1960er Jahren",
        long: "Die USA in den 1960er Jahren: Henry Ford II (Tracy Letts) hat das von seinem Großvater gegründete Familiengeschäft übernommen und will die Ford Motor Company nun zum Sieg bei dem legendären 24-Stunden-Rennen von Le Mans führen. Doch dafür muss Ford erstmal an Ferrari vorbeikommen.  Der junge Manager Lee Iacocca (Jon Bernthal) hat eine Idee, um den italienischen Autohersteller endlich zu schlagen: Er verpflichtet den Sportwagenkonstrukteur Carroll Shelby (Matt Damon), der selbst einst Rennen fuhr und für ihn einen Auto bauen soll, mit dem Ford in Le Mans gewinnen kann. Shelby holt den exzentrischen, in Großbritannien geborenen Rennfahrer Ken Miles (Christian Bale) an Bord, der am Steuer des neu entworfenen Ford GT40 sitzen soll. In einem Rennen gegen die Zeit machen sich Shelby und Miles an die Arbeit, die durch Fords Einmischungen und die technischen Limitierungen erschwert wird…",
        photo: "film1"
    }),
    new model.Film({
        title: "Le Mans 66 - Gegen jede Chance",
        genre: "Drama, Porträt/Biographie, Sport",
        fsk: "12",
        price: 35,
        playingTime: "153",
        crew: "Christian Bale (Ken Miles), Ray McKinnon, Matt Damon (Carroll Shelby), Josh Lucas, Tracy Letts, JJ Feild, Jon Bernthal, Caitriona Balfe (Mollie Miles), Ian Harding, Noah Jupe",
        start: "13.12.2019",
        playingWeek: "4",
        short: "Rennsport-Film über die Rivalität zwischen Ford und Ferrari in den 1960er Jahren",
        long: "Die USA in den 1960er Jahren: Henry Ford II (Tracy Letts) hat das von seinem Großvater gegründete Familiengeschäft übernommen und will die Ford Motor Company nun zum Sieg bei dem legendären 24-Stunden-Rennen von Le Mans führen. Doch dafür muss Ford erstmal an Ferrari vorbeikommen.  Der junge Manager Lee Iacocca (Jon Bernthal) hat eine Idee, um den italienischen Autohersteller endlich zu schlagen: Er verpflichtet den Sportwagenkonstrukteur Carroll Shelby (Matt Damon), der selbst einst Rennen fuhr und für ihn einen Auto bauen soll, mit dem Ford in Le Mans gewinnen kann. Shelby holt den exzentrischen, in Großbritannien geborenen Rennfahrer Ken Miles (Christian Bale) an Bord, der am Steuer des neu entworfenen Ford GT40 sitzen soll. In einem Rennen gegen die Zeit machen sich Shelby und Miles an die Arbeit, die durch Fords Einmischungen und die technischen Limitierungen erschwert wird…",
        photo: "film1"
    })




];

let done = 0;
for(let i = 0; i < films.length; i++){
    films[i].save((err, result)=>{
        done++;
        if (done === films.length){
           exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}