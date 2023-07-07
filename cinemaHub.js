const backImg = document.querySelector('.backg-img');
let row = document.getElementById('movie-row');
let base_url= "https://image.tmdb.org/t/p/w185/";




function display_data(data){

    for (let i = 0; i < data.results.length; i++) {
        let column = document.createElement('div');
        let card = document.createElement('div');
        let image = document.createElement('img');
        let cardBody = document.createElement('div');
        let title = document.createElement('h5');
        let rating = document.createElement('p');
        let rlsdate = document.createElement('p');
        

        //adding style
        // card.style.width = '18rem';
        card.style.height = '37rem';

        //adding classes
        column.classList.add('col-lg-3','col-md-6','mb-5');
        card.classList.add('card', 'bg-dark', 'text-white','card-ride','hover-card');
        image.classList.add('card-img-top');
        cardBody.classList.add('card-body', 'text-white', 'bg-dark');
        title.classList.add('card-title', 'bold-text');
        rating.classList.add('card-text');
        rlsdate.classList.add('card-text');

  
        //adding data
        image.src = base_url + data.results[i].poster_path;
        title.innerHTML = data.results[i].title;
        rating.innerHTML =  'Rating: ⭐' + data.results[i].vote_average;
        rlsdate.innerHTML = 'Release Date: '+ '&nbsp;' + data.results[i].release_date;

        //appending data
        cardBody.appendChild(title);
        cardBody.appendChild(rating);
        cardBody.appendChild(rlsdate);
        card.appendChild(image);
        card.appendChild(cardBody);
        column.appendChild(card);
        row.appendChild(column);
      }
}

document.getElementById('btn-fetch').addEventListener('click', () => {
  //backImg.style.height = '30vh'
  row.innerHTML="";
  document.getElementById('input-box').value="";
  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZWUzN2I5OTJiOGMwNTU3OTkzM2IxNjY5OGNmOTU0MSIsInN1YiI6IjY0OWYyYWNhZWRlYjQzMDBlM2RiNjVkMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cm0sUE6DL4HU-BQr8YLBMb2ep8adHuj0smi8DadQP4o'
  }
};


fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', options)

    .then(response => response.json())
    .then(data => {
    display_data(data); 
      // url = 'https://image.tmdb.org/t/p/w185/'+ data.results[].poster_path
      // document.getElementById('image').setAttribute('src', url);
    }).catch(err => console.error(err));
});

function searchByQuery(){
let url= 'https://api.themoviedb.org/3/search/movie?api_key=eee37b992b8c05579933b16698cf9541&query='+ document.getElementById('input-box').value;
  
row.innerHTML= "";
  fetch(url) 
    .then(response => response.json())
    .then(input => {
    display_data(input);

    }) 
}

document.getElementById('search-btn').addEventListener('click',searchByQuery);
document.getElementById('input-box').addEventListener('keypress',(ent)=>{

  if(ent.key==="Enter"){
    searchByQuery();
  }


})

