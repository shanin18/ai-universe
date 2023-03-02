// loading all Data
const loadAllData = async (dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const data = await res.json();
    displayAllData(data.data.tools, dataLimit);
}

// display all Data
const displayAllData = (data, dataLimit) => {
    const cardsContainer = document.getElementById("cards-container");
    cardsContainer.innerHTML = "";

    // conditions
    if(dataLimit && data.length > 6){
        data = data.slice(0, 6);
    }else if(data.length === data.length){
        seeMore.classList.add("hidden");
    }else{
        seeMore.classList.remove("hidden");
    }

    data.forEach(element => {
        const card = document.createElement("div");
        console.log(element)
        // create the ol element
        const ol = document.createElement("ol"); 
        element.features.forEach((feature, index) => {
            const li = document.createElement("li");
            li.classList.add("text-[#585858]", "mb-2")
            li.innerText = `${index+1}. ${feature}`;
            ol.appendChild(li);
        });

        card.innerHTML = `
            <div class="card h-[660px] bg-base-100 shadow-xl border p-6 rounded-xl flex flex-col justify-between">
                <figure>
                    <img src="${element.image}"alt="Shoes" class="rounded-xl"/>
                </figure>
                <div class="card-body items-center">
                    <div class="features my-6">
                        <h2 class="text-2xl font-semibold  mb-4">Features</h2>
                    </div>

                    <div class="py-6 border-t-2 flex items-center justify-between">
                        <div>
                            <h2 class="text-3xl font-semibold mb-4 ">${element.name}</h2>
                            <p><i class="fa-regular fa-calendar-days mr-2 text-[#585858]"></i>${element.published_in}</p>
                        </div>
                        <button>
                            <i class="fa-solid fa-arrow-right text-[#EB5757] bg-[#FEF7F7] p-4 rounded-full"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        // append the ol to the features
        const features = card.querySelector(".features");
        features.appendChild(ol); 
        cardsContainer.appendChild(card);
    });
}

const seeMore = document.getElementById("see-more");
seeMore.addEventListener("click", () => {
    loadAllData();
});

loadAllData(6);

  