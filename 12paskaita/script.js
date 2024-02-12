const paragraph = document.createElement('p');
paragraph.innerHTML = "Labas <b>vakaras</b> visiems."
document.querySelector('#article-content').append(paragraph);

const paragraphSummary = document.createElement('p');
paragraphSummary.textContent = "Straipsnio isvados";
document.querySelector('#article-content').append(paragraphSummary);

const header = document.createElement("h4");
header.textContent = "Straipsnio antraste";
document.querySelector('#article-content').prepend(header);

const mygtukas = document.querySelector('#addContent');
mygtukas.addEventListener("click", () => {
    const paragraph2 = document.createElement('p');
    paragraph2.innerHTML = "Kazkoks tai tekstas";
    document.getElementById('article-content').append(paragraph2);
});

document.getElementById('refreshContent').addEventListener("click", () => {
    const refreshedHeader = document.createElement('h4');
    refreshedHeader.innerHTML = "Atnaujinta antraste";
    const refreshedParagraph = document.createElement('p');
    refreshedParagraph.innerHTML = "<b>Atnaujinta: </b> naujausia informacija";
    const refreshedFooter = document.createElement('p');
    refreshedFooter.innerHTML = new Date();

    const article = document.querySelector('#article-content');
    article.innerHTML = '';
    article.append(refreshedHeader);
    article.append(refreshedParagraph);
    article.append(refreshedFooter);
});;

document.getElementById('get-input').addEventListener('click', () => {
    const input = document.getElementsById('my-input');
    alert(input.value);
})