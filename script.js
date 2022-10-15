let names = ["Mihai", "Sofia"];
let phoneNumbers = ["015733691523", "015733691577"];

let content;

function initContent() {
    content = document.getElementById("content");
    renderContent();
}

function renderContent() {
    clearContentHTML();
    renderContentTitle();
    renderContentSearchInput();
    renderContentContactInput();
    renderContentContactList();
}

function clearContentHTML() {
    content.innerHTML = '';
}

function renderContentTitle() {
    content.innerHTML += generateContentTitleHTML();
}

function generateContentTitleHTML() {
    return `<!--html-->
    <h1>My Contacts</h1>`;
}

function renderContentSearchInput() {
    content.innerHTML += generateContentSearchHTML();
}

function generateContentSearchHTML() {
    return `<!--html-->
    <div>
        <input type="text" id="search">
        <input type="button" value="Search Contact" onclick="handleSearch()">
    </div>`;
}

function renderContentContactInput() {
    content.innerHTML += generateContentContactInputHTML();
}

function generateContentContactInputHTML() {
    return `<!--html-->
    <div>
        <input type="text" id="name" placeholder="Enter Name...">
        <input type="text" id="phoneNumber" placeholder="Enter Phone number...">
        <input type="button" value="Save" onclick="handleCreateContact()">
    </div>`;
}

function renderContentContactList() {
    renderContentContactListHeader();
    renderContentContacts();
}

function renderContentContactListHeader(){
    content.innerHTML += generateContactListHeaderHTML();
}

function generateContactListHeaderHTML(){
    return `<!--html-->
    <div>
        <b>Name</b> : <b>Phone Number</b>
    </div>`;
}

function renderContentContacts(){
    for (let i = 0; i < names.length; i++) {
        content.innerHTML += generateContactHTML(i);
    }
}

function generateContactHTML(i) {
    const name = names[i];
    const phoneNumber = phoneNumbers[i];
    return `<!--html-->
    <div id="contact${i}">
        <div>
            <span id="name${i}">${name}</span> :
            <span id="phoneNumber${i}">${phoneNumber}</span>
            <input type="button" value="Save Changes" id="saveChangesInput${i}" class="d-none" onclick="handleSaveChanges(${i})">
            <input type="button" value="Cancel" id="cancelChangesInput${i}" class="d-none" onclick="handleCancelUpdate(${i})">
        </div>
        <div>
            <input type="button" value="Delete" onclick="handleDeleteContact(${i})">
            <input type="button" value="Update" onclick="handleUpdateContact(${i})">
        </div>
    </div>`;
}

function handleSearch() {
    const searchInput = getSearchInput();
    if (searchInput) {
        showContactsMatchingSearch(searchInput);
    } else {
        renderContent();
    }
}

function getSearchInput() {
    const search = document.getElementById('search').value.trim().toLowerCase();
    return search;
}

function showContactsMatchingSearch(searchInput) {
    const matchingNames = filterIncludesSearch(searchInput, names);
    const matchingPhones = filterIncludesSearch(searchInput, phoneNumbers);

    if (matchingNames.length > 0) {
        hideNotMatchingContactsFrom(matchingNames, names);
    } else if (matchingPhones.length > 0) {
        hideNotMatchingContactsFrom(matchingPhones, phoneNumbers);
    } else {
        renderContent();
    }
}

function filterIncludesSearch(searchInput, array) {
    return array.filter(n => n.toLowerCase().includes(searchInput));
}

function hideNotMatchingContactsFrom(toShowElements, allElements) {
    for (let index = 0; index < allElements.length; index++) {
        const element = allElements[index];
        if (!toShowElements.includes(element)) {
            document.getElementById(`contact${index}`).classList.add('d-none');
        }
    }
}

function handleCreateContact() {
    const { name, phoneNumber } = getInputs();
    if (name && phoneNumber) {
        createContact(name, phoneNumber);
        renderContent();
    }
    else
        alert('Please enter a name and a phone number!');
}

function getInputs() {
    const name = document.getElementById("name").value.trim();
    const phoneNumber = document.getElementById("phoneNumber").value.trim();
    return { name, phoneNumber };
}

function createContact(name, phoneNumber) {
    names.push(name);
    phoneNumbers.push(phoneNumber);
}

function handleSaveChanges(index) {
    const { changedName, changedPhoneNumber } = getChanges(index);
    if (changedName && changedPhoneNumber) {
        makeChanges(changedName, changedPhoneNumber, index);
        renderContent();
    }
    else
        alert('Empty Fields not allowed!');
}

function getChanges(index) {
    const changedName = document.getElementById(`name${index}`).innerHTML.trim();
    const changedPhoneNumber = document.getElementById(`phoneNumber${index}`).innerHTML.trim();

    return { changedName, changedPhoneNumber };
}

function makeChanges(changedName, changedPhoneNumber, index) {
    names[index] = changedName;
    phoneNumbers[index] = changedPhoneNumber;
}

function handleCancelUpdate(index) {
    closeUpdateMenu(index);
    renderContent();
}

function closeUpdateMenu(index) {
    document.getElementById(`saveChangesInput${index}`).classList.add('d-none');
    document.getElementById(`cancelChangesInput${index}`).classList.add('d-none');
}

function handleDeleteContact(index) {
    names.splice(index, 1);
    phoneNumbers.splice(index, 1);

    renderContent();
}

function handleUpdateContact(index) {
    makeContactEditable(index);
    showUpdateMenu(index);
}

function makeContactEditable(index) {
    document.getElementById(`name${index}`).contentEditable = "true";
    document.getElementById(`phoneNumber${index}`).contentEditable = "true";
}

function showUpdateMenu(index) {
    document.getElementById(`saveChangesInput${index}`).classList.remove('d-none');
    document.getElementById(`cancelChangesInput${index}`).classList.remove('d-none');
}

function makeContactUnEditable(index) {
    document.getElementById(`name${index}`).contentEditable = "false";
    document.getElementById(`phoneNumber${index}`).contentEditable = "false";
}