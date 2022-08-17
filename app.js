
const cards = document.querySelector("#card-dinamicas");
const templateCard = document.querySelector("#template-card").content;
const loading = document.querySelector("#loading")
const fragment = document.createDocumentFragment();

document.addEventListener("DOMContentLoaded", () => {
    fetchData()
})


// Una vez qu este cargado el dom hacemos nuestra solicitud fetch
const fetchData = async () => {  
    try {        
        loadingData(true);        
// Ahora aca vamos a hacer solicitud a nuestra API, aqui aplicamos el fetch        
        const res = await fetch("https://rickandmortyapi.com/api/character")
        const data = await res.json();
        // console.log(data);
        pintarCards(data)

    } catch (error) {
        console.log(error);
    } finally {
        loadingData(false)        
    }
};

//Aca vamos a Pintar las Cards ya que ya tenemos la data o los datos 
const pintarCards = (data) => {
    // console.log(data); // como dentro del data hay un result con array puedo usar un for
    data.results.forEach((item) => {
        // console.log(item)
        const clone = templateCard.cloneNode(true);
        clone.querySelector("h5").textContent = item.name;
        clone.querySelector("p").textContent = item.species;
        clone.querySelector("img").setAttribute("src", item.image);


        // Guardamos en el fragment para evitar el re-flow
        fragment.appendChild(clone);
    });

    cards.appendChild(fragment);
        
}
        
const loadingData = estado => {
    if (estado) {
        loading.classList.remove("d-none")
    } else {
        loading.classList.add("d-none")
        
    }

}



