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
    <h5 class="card-title"> Model: ${slug.name}</h5>
    <p class="card-text"> Brand: ${slug.brand}</p>
    <p class="card-text">
     Released Date: ${slug.releaseDate ? slug.releaseDate: "Not Avaiable"}
    </p>
    `;
    moblie_Detailes.appendChild(div);
}