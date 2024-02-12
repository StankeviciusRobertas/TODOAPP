btn_fetch_superhero.onclick = function () {
    console.log("btn_fetch_superhero clicked");
    const url = "https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json";
    fetch(url) // grazina Promise objekta
        .then(response => {
            console.log("response status", response.status);
            return response.json()
        }) // Promise objektas sulaukiamas su then
        .then(result => {
            console.log("result", result);
            populateHeader(result);
            populateMembers(result);
        })
        .catch(error => {
        console.log("my error", error);
    })
};

populateHeader = (obj) => {
    const header = document.querySelector("#header");
    const h1 = document.createElement("h1");
    h1.textContent = obj.squadName;
    header.appendChild(h1);
    const p = document.createElement("p");
    p.textContent = `Hometown: ${obj.homeTown} // Formed: ${obj.formed}`;
    header.appendChild(p);
}

populateMembers = (obj) => {
    const membersdiv = document.querySelector("#members");
    const heroes = obj.members; //turetu buti masyvas

    heroes.forEach(hero => {
        membersdiv.innerHTML += `
        <div>
            <h2>${hero.name}</h2>
            <p>Secret identity: ${hero.secretIdentity}</p>
            <p id="age">Age: ${hero.age}</p>
            <p>
                Superpowers: 
                <ul>
                    ${hero.powers.map(power => `<li>${power}</li>`).join("")}
                </ul>
            </p>
        </div>`;

        // const hero_container = document.createElement("div");
        // const h2 = document.createElement("h2");
        // h2.textContent = hero.name;
        // hero_container.appendChild(h2);

        // const p_secret_identity = document.createElement("p");
        // p_secret_identity.textContent = `Secret identity: ${hero.secretIdentity}`;
        // hero_container.appendChild(p_secret_identity);

        // const p_age = document.createElement("p");
        // p_age.textContent = `Age: ${hero.age}`;
        // hero_container.appendChild(p_age);

        // const p_superpowers = document.createElement("p");
        // p_superpowers.textContent = "Superpowers: ";
        // const ul = document.createElement("ul");
        // hero.powers.forEach(power => {
        //     const li = document.createElement("li");
        //     li.textContent = power;
        //     ul.appendChild(li);
        // });
        // p_superpowers.appendChild(ul);
        // hero_container.appendChild(p_superpowers);

        // membersdiv.appendChild(hero_container);
    });
}