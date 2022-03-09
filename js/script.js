const searchMoblie = () => {
    const searchInputValue = document.getElementById('searchInputField');
    const searchText = searchInputValue.value;
    // console.log(searchText);
    searchInputValue.value = ''; // input field clear
    // empty string error alert
    if(searchText == ''){
        const toggleError = displayStyle => {
            const erroShow = document.getElementById('emptyString');
            // console.log(erroShow);
            erroShow.style.display = displayStyle;
            erroShow.style.margin = '100px';
            erroShow.style.backgroundColor = '#fa0606b2';
            erroShow.style.color = 'white';
        }
        toggleError('block');
    }
    else{
        // load data (API link)
        const url = (`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
        fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.data.slice(0, 20)));
    }
};

// search Result
const displaySearchResult = data => {
    const searchResultField = document.getElementById('searchResult');
    searchResultField.textContent = ''; // search reslut clear 
    // user ja type kore ta jodi na take tokon alert show korano
    if(data == 0){
        const toggleError = displayStyle => {
            const erroShow = document.getElementById('noItemFound');
            // console.log(erroShow);
            erroShow.style.display = displayStyle;
            erroShow.style.margin = '100px';
            erroShow.style.backgroundColor = '#fa0606b2';
            erroShow.style.color = 'white';
        }
        toggleError('block');
    }
    else{
        data.forEach(moblie => {
            // console.log(moblie);
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card h-100 text-center align-items-center p-3">
                <img src="${moblie.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title"> Model : ${moblie.phone_name}</h5>
                    <p class="card-text"> Brand : ${moblie.brand}</p>
                    <button onclick = "loadMoreDetail('${moblie.slug}')" class="btn btn-outline-primary">Details</button>
                </div>
            </div>
            `;
            searchResultField.appendChild(div);
        });
    }
}
// Moblie details json & api link
const loadMoreDetail = moblie => {
    // console.log(moblie);
    const url =`https://openapi.programming-hero.com/api/phone/${moblie}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayMoblieDetails(data.data));
}
const displayMoblieDetails = slug => {
    // console.log(slug);
    const moblie_Detailes = document.getElementById('moblieDetails');
    moblie_Detailes.textContent = ''; // details clear
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML =`
    <img src="${slug.image}" class="card-img-top" alt="...">
    <h5 class="card-title mt-3"> Model: ${slug.name}</h5>
    <p class="card-text"> Brand: ${slug.brand}</p>
    <p class="card-text">
     Released Date: ${slug.releaseDate ? slug.releaseDate: "Not Avaiable"}
    </p>
    <ul class="list-group"> Main Features :
        <li class="list-group-item"> Chipset: ${slug.mainFeatures.chipSet}</li>
        <li class="list-group-item"> Display Size: ${slug.mainFeatures.displaySize}</li>
        <li class="list-group-item"> Memory: ${slug.mainFeatures.memory}</li>
        <li class="list-group-item"> Sensors:
            <ul class="list-group">
                <li class="list-group-item">${slug.mainFeatures.sensors[0] ? slug.mainFeatures.sensors[0]: "Not Avaiable"}</li>
                <li class="list-group-item">${slug.mainFeatures.sensors[1] ? slug.mainFeatures.sensors[1]: "Not Avaiable"}</li>
                <li class="list-group-item">${slug.mainFeatures.sensors[2] ? slug.mainFeatures.sensors[2]: "Not Avaiable"}</li>
                <li class="list-group-item">${slug.mainFeatures.sensors[3] ? slug.mainFeatures.sensors[3]: "Not Avaiable"}</li>
                <li class="list-group-item">${slug.mainFeatures.sensors[4] ? slug.mainFeatures.sensors[4]: "Not Avaiable"}</li>
                <li class="list-group-item">${slug.mainFeatures.sensors[5] ? slug.mainFeatures.sensors[5]: "Not Avaiable"}</li>
            </ul>
        </li>
        <li class="list-group-item"> Storage: ${slug.mainFeatures.storage}</li>
    </ul>
    
    <ul class="list-group"> Others:
        <li class="list-group-item">Bluetooth: ${slug.others ? slug.others.Bluetooth: "Not Avaiable"}</li>
        <li class="list-group-item">GPS: ${slug.others ? slug.others.GPS: "Not Avaiable"}</li>
        <li class="list-group-item">NFC: ${slug.others ? slug.others.NFC: "Not Avaiable"}</li>
        <li class="list-group-item">Radio: ${slug.others ? slug.others.Radio: "Not Avaiable"}</li>
        <li class="list-group-item">USB: ${slug.others ? slug.others.USB: "Not Avaiable"}</li>
        <li class="list-group-item">WLAN: ${slug.others ? slug.others.WLAN: "Not Avaiable"}</li>
    </ul>
    `;
    moblie_Detailes.appendChild(div);
}