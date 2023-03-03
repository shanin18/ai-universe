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
        // create the ol element
        const ol = document.createElement("ol"); 
        element.features.forEach((feature, index) => {
            const li = document.createElement("li");
            li.classList.add("text-[#585858]", "mb-2")
            li.innerText = `${index+1}. ${feature}`;
            ol.appendChild(li);
        });

        card.innerHTML = `
            <div class="card h-[660px] bg-base-100 shadow-xl border p-6 rounded-xl">
                <figure>
                    <img src="${element.image}"alt="Shoes" class="rounded-xl"/>
                </figure>
                <div class="card-body p-0">
                    <div class="features my-6">
                        <h2 class="text-2xl font-semibold  mb-4">Features</h2>
                    </div>

                    <div class="py-6 border-t-2 flex items-center justify-between">
                        <div>
                            <h2 class="text-3xl font-semibold mb-4 ">${element.name}</h2>
                            <p><i class="fa-regular fa-calendar-days mr-2 text-[#585858]"></i>${element.published_in}</p>
                        </div>
                       
                        <div>
                        <label onclick="loadDetail('${element.id}')" for="my-modal-3"><i class="fa-solid fa-arrow-right text-[#EB5757] bg-[#FEF7F7] p-4 rounded-full"></i></label>
                        </div>
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

// see more button 
const seeMore = document.getElementById("see-more");
seeMore.addEventListener("click", () => {
    loadAllData();
});

// load details
const loadDetail = async (id) =>{
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayDetail(data.data)
}

// display the detail
const displayDetail = (data) =>{
    document.getElementById("card-description").innerText = `${data.description}`;

    const packageContainer =document.getElementById("package-container");

    // packageContainer.innerHTML = `
    //     <p class="text-center p-4 bg-white rounded-2xl text-[#03A30A] flex items-center justify-center">${data.pricing[0].price ? data.pricing[0].price : "Free of Cost"} <br> ${data.pricing[0].plan ? data.pricing[0].plan : "No Package"}</p>
    //     <p class="text-center p-4 bg-white rounded-2xl text-[#F28927] flex items-center justify-center">${data.pricing[1].price ? data.pricing[1].price : "Free of Cost"} <br> ${data.pricing[1].plan ? data.pricing[1].plan : "No Package"}</p>
    //     <p class="text-center p-4 bg-white rounded-2xl text-[#EB5757] flex items-center justify-center">${data.pricing[2].price ? data.pricing[2].price : "Free of Cost"} <br> ${data.pricing[2].plan ? data.pricing[2].plan : "No Package"}</p>
    // `

    const featuresContainer = document.getElementById("features-container");
    const ul = document.createElement("ol"); 
    ul.classList.add("ml-5")
    for(let i = 1; i <= Object.keys(data.features).length; i++){
        const li = document.createElement("li");
        li.classList.add("text-[#585858]", "mb-2", "list-disc")
        li.innerText = `${data.features[i].feature_name}`;
        ul.appendChild(li);
    }
 
    featuresContainer.innerHTML = `
    <div class="features">
        <h2 class="text-3xl font-semibold mb-4 ">Features</h2>
    </div>
    `
    const features = featuresContainer.querySelector(".features");
    features.appendChild(ul); 
    
    // integration
    const integrationsContainer = document.getElementById("integrations-container");
    integrationsContainer.innerHTML = "";
    data.integrations.forEach(integration => {
        const p = document.createElement("p");
        p.classList.add("mb-2")
        p.innerText = integration? integration : "No data Found";
        integrationsContainer.appendChild(p);
    });

    const cardsContainer = document.getElementById("card-container");
    cardsContainer.innerHTML = `
    <img class="rounded-xl" src= "${data.image_link[0]}"/>
    <h2></h2>
    <p></p>
    `

    // accuracy
    const accuracy = document.getElementById("accuracy");
    accuracy.innerHTML = `
    <p class="font-semibold text-white bg-[#EB5757] px-4 py-2 rounded-xl"><span>${data.accuracy.score}</span>% Accuracy</p>
    `
    console.log(data)
}

loadAllData(6);

  