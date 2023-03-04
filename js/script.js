// storing all the data to a global variable
let fetchData = [];

// loading all Data
const loadAllData = async (dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const data = await res.json();
    displayAllData(data.data.tools, dataLimit);
    fetchData = data.data.tools;
}

// display all Data
const displayAllData = (data, dataLimit) => {
    const cardsContainer = document.getElementById("cards-container");
    cardsContainer.innerHTML = "";

    // cards & show_more button visibility validations
    if(dataLimit && data.length > 6){
        data = data.slice(0, 6);
        seeMore.classList.remove("hidden");
    }else{
        seeMore.classList.add("hidden");
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
                        <label onclick="loadDetail('${element.id}')" for="my-modal-3"><i class="fa-solid fa-arrow-right text-[#EB5757] bg-[#FEF7F7] p-4 rounded-full hover:cursor-pointer hover:bg-[#EB5757] hover:text-white duration-300"></i></label>
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

// Button click event listener to show all the cards 
const seeMore = document.getElementById("see-more")
seeMore.addEventListener("click", () => {
    loadAllData();
});


// Function to sort the data by date
const sortByDate = () => {  
    fetchData.sort((a,b)=> new Date(a.published_in) - new Date(b.published_in))
    displayAllData(fetchData);
};


// Button click event listener to sort by date
document.getElementById("sort-by-date").addEventListener("click", sortByDate);



//Function to load details
const loadDetail = async (id) =>{
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayDetail(data.data)
}

//Function to display the detail
const displayDetail = (data) =>{

    // description 
    document.getElementById("card-description").innerText = `${data.description}`;
    
    // packages
    const packageContainer = document.getElementById("package-container");
    packageContainer.innerHTML = `
    <p class="text-center bg-white flex items-center justify-center rounded-xl text-[#03A30A] p-4 h-24 w-32">${data.pricing === null ? "Free of Cost" : data.pricing[0].price} <br> ${data.pricing === null ? "" : data.pricing[0].plan}</p>
    <p class="text-center bg-white flex items-center justify-center rounded-xl text-[#F28927] p-4 h-24 w-32">${data.pricing === null ? "Free of Cost" : data.pricing[1].price} <br> ${data.pricing === null ? "" : data.pricing[1].plan}</p>
    <p class="text-center bg-white flex items-center justify-center rounded-xl text-[#EB5757] p-4 h-24 w-32">${data.pricing === null ? "Free of Cost" : data.pricing[2].price} <br> ${data.pricing === null ? "" : data.pricing[2].plan}</p>
    `;

    // features
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
    <h2 class="text-2xl md:text-3xl font-semibold mb-4 ">Features</h2>
    </div>
    `;
    const features = featuresContainer.querySelector(".features");
    features.appendChild(ul); 
    

    // integrations
    const integrationsContainer = document.getElementById("integrations-container");
    integrationsContainer.innerHTML = "";
    
    data.integrations === null ?
    integrationsContainer.innerHTML = `<p class="text-[#585858]","mb-2">No data Found</p>` :
    data.integrations.forEach(integration => {
        const p = document.createElement("p");
        p.classList.add("text-[#585858]","mb-2")
        p.innerText = integration;
        integrationsContainer.appendChild(p);
    });
    
    // modal right side
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = `
    <img class="rounded-xl" src= "${data.image_link[0]}"/>
    <h2 class="text-2xl font-bold mt-6">${data.input_output_examples === null ? "No! Not yet! Take a break!!!" : data.input_output_examples[0].input}</h2>
    <p class="text-[#585858] text-lg mt-4">${data.input_output_examples === null ? "" :  data.input_output_examples[0].output}</p>
    `;
    
    // accuracy
    const accuracy = document.getElementById("accuracy");
    const accuracyScore = document.getElementById("accuracy-score");
    data.accuracy.score === null ? 
    accuracy.classList.add("hidden") : 
    accuracy.classList.remove("hidden"); 
    accuracyScore.innerText = `${data.accuracy.score * 100}% `;
};

// spinner
window.addEventListener("load", ()=>{
    spinner.classList.add("hidden");
});



loadAllData(6);

  