const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const selectedMovie = document.getElementById('movie');

let ticketPrice = Number(selectedMovie.value);

populateUI();

let setMovieData = (movieIndex, moviePrice) => {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
};

let updateCountAndPrice = () => {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const selectedSeatsCount = selectedSeats.length;
    ticketPrice = selectedMovie.value;

    const seatsIndex = [...selectedSeats].map((seat) =>
        [...seats].indexOf(seat)
    );

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
};

function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats !== null && selectedSeats.length !== 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if (selectedMovieIndex !== null) {
        selectedMovie.selectedIndex = selectedMovieIndex;
    }
}

selectedMovie.addEventListener('change', (e) => {
    ticketPrice = e.target.value;
    let movieIndex = e.target.selectedIndex;

    setMovieData(movieIndex, ticketPrice);
    updateCountAndPrice();
});

container.addEventListener('click', (e) => {
    if (
        e.target.classList.contains('seat') &&
        !e.target.classList.contains('occupied')
    ) {
        e.target.classList.toggle('selected');

        updateCountAndPrice();
    }
});

updateCountAndPrice();
