
//Youtube id
trailervideos = {

    "youtubeId":["1Amk3FzLS5k", "Y8DvEJl4Hh0", "M-N2Fn1tP3Q", "aWcVn8iKkeo", "sZGPH1MHOyI"]

};
// array af film titlerne til omdb
let movies = ["My%20Little%20Pony:%20The%20Movie", "My%20Little%20Pony:%20Friendship%20Is%20Magic", "My%20Little%20Pony:%20Equestria%20Girls%20-%20Rainbow%20Rocks", "My%20Little%20Pony:%20Equestria%20Girls%20-%20Friendship%20Games", "My%20Little%20Pony%20Tales"];
// variable med omdb url der indeholder API Key samt title parameter
let omdbUrl = "https://www.omdbapi.com/?apikey=cec8d3b2&t=";
let container = document.getElementById("movieContainer");
// For loop fetcher alt dataen fra API for de forskellige film og indsætter den i elementer vi creater samtidigt
for (let i = 0; i < movies.length; i++) {
    fetch(omdbUrl + movies[i])
        .then(response => {
            return response.json();
        })
        .then(data => {
            //list item, hver film i egen list
            const box = document.createElement("li");

            const section = document.createElement("section");
            section.setAttribute("class", "movie");

            // Create alt html og sætter class attribute dertil

            const title = document.createElement("h2");
            title.setAttribute("class", "movieTitle");

            const poster = document.createElement("img");
            poster.setAttribute("src", data.Poster);

            const desc = document.createElement("p");
            desc.setAttribute("class", "description");

            const age = document.createElement("p");
            age.setAttribute("class", "year");

            const imdbrating = document.createElement("p");
            imdbrating.setAttribute("class", "rating");
            //create iframe til visning af trailer
            const video = document.createElement("iframe");

            //laver en container til at samle alt tekst, description, rating og age til at sætte det i grid
            const tekst_container = document.createElement("div");
            tekst_container.setAttribute("class", "container");

            // sætter src til iframe gennem omdb api
            video.setAttribute("src", "https://www.youtube.com/embed/" +trailervideos.youtubeId[i]);

            // laver date og henter full year
            let n = new Date();
            date = n.getFullYear();

            //indsætter data fra apien ind i innertext i html
            title.innerText = data.Title;
            desc.innerText = data.Plot;

            imdbrating.innerText ="Imdb rating: " + data.imdbRating;
            // Henter released og trimmer med substr (data.Released.length-5) får kun årstallet
            // Vi bruger released i stedet for data.year da "my little pony friendship is magic" er et tv-show hvor årstallet strækker sig fra 2010-2019
            age.innerText = "Movie was released: " + (date - data.Released.substr(data.Released.length-5) ) + " years ago";


            // vi tilføjer elementerne til section og derefter tilføjer den til moviecontaineren
            box.appendChild(section);
            section.appendChild(title);
            section.appendChild(poster);

            tekst_container.appendChild(desc);
            tekst_container.appendChild(imdbrating);
            tekst_container.appendChild(age);
            section.appendChild(tekst_container);

            section.appendChild(video);
            container.appendChild(box);

        })

}
