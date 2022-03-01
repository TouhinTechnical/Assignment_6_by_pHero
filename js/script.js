const searchMoblie = () => {
    const searchInputValue = document.getElementById('searchInputField');
    const searchText = searchInputValue.value;
    console.log(searchText);
    searchInputValue.value = ''; // input field clear
    
};