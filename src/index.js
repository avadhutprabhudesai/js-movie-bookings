import './sass/main.scss';

const movie = document.querySelector('#moviePicker');
const count = document.querySelector('#count');
const price = document.querySelector('#price');
const seatContainer = document.querySelector('.seat-container');

let moviePrice = +movie.value;

const populateUI = () => {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if (selectedSeats) {
    const seats = [...getAllSeats()];
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) !== -1) {
        seat.classList.toggle('selected');
      }
    });
    const selectedMoviePrice = localStorage.getItem('selectedTicketPrice');
    if (selectedMoviePrice) {
      price.textContent = selectedSeats.length * selectedMoviePrice;
    }
    count.textContent = selectedSeats.length;
  }

  const selectedMovie = localStorage.getItem('selectedMovie');
  if (selectedMovie) {
    movie.selectedIndex = selectedMovie;
  }
};

const getSelectedSeats = () => {
  return seatContainer.querySelectorAll('.selected') || [];
};
const getAllSeats = () => {
  return seatContainer.querySelectorAll('.seat');
};

// Store selected movie, selectedSeats indices into localStorage
const persistSeatSelection = () => {
  const selectedSeats = [...getSelectedSeats()];
  const allSeats = [...getAllSeats()];
  const indices = selectedSeats.map((selected) => {
    return allSeats.indexOf(selected);
  });
  localStorage.setItem('selectedSeats', JSON.stringify(indices));
};

const persistMovieData = (movieIndex, ticketValue) => {
  localStorage.setItem('selectedMovie', movieIndex);
  localStorage.setItem('selectedTicketPrice', ticketValue);
};

const updateSelectedCount = () => {
  const selectedCount = getSelectedSeats().length;
  count.textContent = selectedCount;
  price.textContent = moviePrice * selectedCount;
};

seatContainer.addEventListener('click', (event) => {
  const clickTarget = event.target.classList;
  if (clickTarget.contains('seat') && !clickTarget.contains('occupied')) {
    clickTarget.toggle('selected');
    updateSelectedCount();
    persistSeatSelection();
  }
});

movie.addEventListener('change', (event) => {
  moviePrice = +event.target.value;
  updateSelectedCount();
  persistMovieData(event.target.selectedIndex, event.target.value);
});

populateUI();
