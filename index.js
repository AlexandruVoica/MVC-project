window.onload = function () {

  const globalContainer = document.querySelector('.container');
  const counterContainer = document.querySelector('.counter-container');
  const photoContainer = document.querySelector('.photo-container');

  function fetchCatPhoto () {
    const catApiUrl = 'https://cataas.com/cat';
    fetch(catApiUrl)
      .then(response => response.blob())
      .then(function (image) {
        let link = URL.createObjectURL(image);
        let imgElement = `<img src="${link}" alt="cute kitty">`;
        const photoContainer = document.querySelector('.photo-container');
        photoContainer.innerHTML = '';
        photoContainer.innerHTML += imgElement;
      });
  }

  fetchCatPhoto();

  photoContainer.addEventListener('click', function(event) {
    event.preventDefault();
    let counter = document.querySelector('.counter');
    let counterValue = counter.textContent;
    counterValue ++;
    counter.textContent = counterValue;
  });
};