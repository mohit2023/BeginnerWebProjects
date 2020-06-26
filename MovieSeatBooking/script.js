const container = document.querySelector('.container');
const count = document.getElementById('count');
const seats = document.querySelectorAll('.row .seat');
const total = document.getElementById('total');
const selectedMovie = document.getElementById('movie');

function loadUserData(){
    const selectedMovieIndex = localStorage.getItem('movieIndex');
    if(selectedMovieIndex != null){
        selectedMovie.selectedIndex = selectedMovieIndex;
    }
    

    const selectedSeatsIndex = JSON.parse(localStorage.getItem('seatIndex'));
    if(selectedSeatsIndex != null && selectedSeatsIndex.length>0){
        seats.forEach(function(seat,index){
            if(selectedSeatsIndex.indexOf(index)>-1){
                seat.classList.add('selected');
            }
        });
    }

    updateCount();
}

function updateCount(){
    const selectedSeats = container.querySelectorAll('.selected');

    const selectedSeatsIndex = [...selectedSeats].map(function(item){
        return [...seats].indexOf(item);
    });
    localStorage.setItem('seatIndex',JSON.stringify(selectedSeatsIndex));

    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;

    total.innerText = selectedSeatsCount * selectedMovie.value;
}


loadUserData();

container.addEventListener('click',function(evt){
    if(evt.target.classList.contains('seat') && !evt.target.classList.contains('occupied')){
        evt.target.classList.toggle('selected');

        updateCount();
    }
});

selectedMovie.addEventListener('change',function(evt){
    localStorage.setItem('movieIndex',evt.target.selectedIndex);
    updateCount();
});