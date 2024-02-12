document.addEventListener('DOMContentLoaded', function () {
    const galleryElement = document.getElementById('gallery');

    const random = Math.floor(Math.random() * 33) + 1;

    // Define the Picsum API URL with the random number
    const api = 'https://picsum.photos/v2/list?page=';
    const apiUrl = api + random;

    // Fetch nuotraukų duomenis iš API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Sukurkite nuotraukų elementus ir pridėkite juos prie galerijos
            data.forEach(photo => {
                const imgElement = document.createElement('img');
                imgElement.src = photo.download_url;
                imgElement.alt = photo.author;
                imgElement.classList.add('photo');
                galleryElement.appendChild(imgElement);
            });
        })
        .catch(error => console.error('Klaida gavant duomenis iš API:', error));
});