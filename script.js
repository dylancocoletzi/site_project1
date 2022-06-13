const movieArea = document.querySelector(".movie-container")
const loadBtn = document.querySelector(".load-btn");
const homeBtn = document.querySelector(".home-btn");
const popularBtn = document.querySelector(".explore-btn");
const trendingBtn = document.querySelector(".trending-btn");
const movieForm = document.querySelector("form");
const API_KEY = "3fa89a397d0aa51f064ebe4efd84b357";
const searchBtn = document.getElementsByClassName("search-btn");
let page = 1;
let current = "home";

var mybutton = document.getElementById("myBtn");
window.onscroll = function(){
    scrollFunction();
};
function scrollFunction(){
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

window.onload = function(){
    getResultHome();
};

popularBtn.addEventListener("click", popularButton);

trendingBtn.addEventListener("click", trendingButton);

loadBtn.addEventListener("click", loadMore);

movieForm.addEventListener("submit", searchButton);

homeBtn.addEventListener("click", homeRefresh);

function popularButton(ev){
    current = "popular";
    handleResult(ev);
}

function trendingButton(ev){
    current = "trending";
    handleResult(ev);
}

function homeRefresh(ev){
    current = "home";
    handleResult(ev);
}

function searchButton(ev){
    current = "";
    handleResult(ev);
}

function handleResult(ev){
    movieArea.innerHTML = "";
    page = 1;
    console.log(current);
    if(current == "home"){
        getResultHome();
    }else if(current == "trending"){
        getTrendingResult(ev);
    }else if(current == "popular"){
        getPopularResult(ev);
    }else{
        getSearchResult(ev);
    }
}

async function getPopularResult(ev){
    ev.preventDefault();
    let apiUrl = 'https://api.themoviedb.org/3/movie/popular?api_key=' + API_KEY + '&page=' + page;
    let response = await fetch(apiUrl);
    let responseData = await response.json();
    displayPopularResult(responseData);
}

function displayPopularResult(responseData){
    responseData.results.forEach(function(element){
        movieArea.innerHTML += `
        <div class="movie-card">
            <img class="movie-image" src='https://image.tmdb.org/t/p/original${element.poster_path}'>
            <div class="movie-info">
            <div class="movie-votes"><span><img class="star-icon" src="star-icon.jpeg"></span>${element.vote_average}</div>
            <div class="movie-title">${element.title}</div>
            </div>
        <div>
        `
    });
}

async function getTrendingResult(ev){
    ev.preventDefault();
    let apiUrl = "https://api.themoviedb.org/3/trending/movie/week?api_key=" + API_KEY + '&page=' + page;
    let response = await fetch(apiUrl);
    let responseData = await response.json();
    displayTrending(responseData);
}

function displayTrending(responseData){
    responseData.results.forEach(function(element){
        movieArea.innerHTML += `
        <div class="movie-card">
            <img class="movie-image" src='https://image.tmdb.org/t/p/original${element.poster_path}'>
            <div class="movie-info">
            <div class="movie-votes"><span><img class="star-icon" src="star-icon.jpeg"></span>${element.vote_average}</div>
            <div class="movie-title">${element.title}</div>
            </div>
        <div>
        `
    });
}

async function getResultHome(){
    let apiUrl = 'https://api.themoviedb.org/3/movie/now_playing?api_key=' + API_KEY + '&page=' + page;
    let response = await fetch(apiUrl);
    let responseData = await response.json();
    console.log(responseData);
    displayHomeResult(responseData);
    current = "home";
}

function displayHomeResult(responseData){
    responseData.results.forEach(function(element){
        movieArea.innerHTML += `
        <div class="movie-card">
            <img class="movie-image" src='https://image.tmdb.org/t/p/original${element.poster_path}'>
            <div class="movie-info">
            <div class="movie-votes"><span><img class="star-icon" src="star-icon.jpeg"></span>${element.vote_average}</div>
            <div class="movie-title">${element.title}</div>
            </div>
        <div>
        `
    });
}

async function getSearchResult(ev){
    ev.preventDefault();
    let userInput = document.getElementById("search-bar").value;
    let apiUrl = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_KEY + '&query=' + userInput + '&page=' + page;
    let response = await fetch(apiUrl);
    let responseData = await response.json();
    displaySearchResult(responseData);
}

function displaySearchResult(responseData){
    responseData.results.forEach(function(element){
        movieArea.innerHTML += `
        <div class="movie-card">
            <img class="movie-image" src='https://image.tmdb.org/t/p/original${element.poster_path}'>
            <div class="movie-info">
            <div class="movie-votes"><span><img class="star-icon" src="star-icon.jpeg"></span>${element.vote_average}</div>
            <div class="movie-title">${element.title}</div>
            </div>
        <div>
        `
    });
}

function loadMore(ev){
    page += 1;
    if(current == "home"){
        getResultHome();
    }else if(current == "trending"){
        getTrendingResult(ev);
    }else if(current == "popular"){
        getPopularResult(ev);
    }else{
        getSearchResult(ev);
    }
}

