// loading all Data
const loadAllData = async () =>{
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const data = await res.json();
    displayAllData(data.data.tools);
}

// display all Data
const displayAllData = (data) =>{
    const cardsContainer = document.getElementById("cards-container");
    data.forEach(element => {
        console.log(element)
        const card = document.createElement("div");
        card.innerHTML = `
        <div class="card bg-base-100 shadow-xl border p-6 rounded-xl">
            <figure>
                <img src="${element.image}"alt="Shoes" class="rounded-xl"/>
            </figure>
            <div class="card-body items-center">
                <h2 class="text-2xl font-semibold mt-6">Features</h2>
            </div>
        </div>
        `
        cardsContainer.appendChild(card);
    });
}



loadAllData()