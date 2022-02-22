const better_name = document.getElementById('constructionSiteName');
const inpSiteAddress = document.getElementById('siteAddress');
const inpSiteContractor = document.getElementById('contractorName');
const inpSiteDueDate = document.getElementById('dueDate');
const inpSiteStartDate = document.getElementById('startDate');
const btnAddSite = document.getElementById('btnAddSite');
const siteContainer = document.getElementById('siteContainer');
const inpErrorDesc = document.getElementById("errorDesc");
const errorContainer = document.getElementById('errorContainer');
const errorImage = document.getElementById('errorImage');

var allSites = [];
var allErrors = [];
var siteErrors = [];
var allImages = [];
var newImage = [];
var siteImages = [];
var siteId;

window.onload = app();

function app() {
    if (checkArray('sites')) {
        getAllSites();
        siteContainer.innerHTML = '';
        for (let i = 0; i < allSites.length; i++) {
            createCard(allSites[i]);
        }
    }
}

function addSite() {
    // Check if 'sites' exsists and get all existing data.
    if (checkArray('sites')) {
        getAllSites();
    }
    // Construct object and append to array.
    var newData = {
        id: allSites.length,
        name: inpSiteName.value,
        contractor: inpSiteContractor.value,
        address: inpSiteAddress.value,
        dueDate: inpSiteDueDate.value,
        startDate: inpSiteStartDate.value
    }
    allSites.push(newData);
    // Set new array with new object.
    localStorage.setItem('sites', JSON.stringify(allSites));
    siteContainer.innerHTML = '';
    for (let i = 0; i < allSites.length; i++) {
        createCard(allSites[i]);
    }

    inpSiteName.value = '';
    inpSiteAddress.value = '';
    inpSiteContractor.value = '';
    inpSiteDueDate.value = '';
}

function getAllSites() {
    if (checkArray('sites')) {
        // Get all errors and append to array.
        allSites = [];
        JSON.parse(localStorage.getItem('sites')).forEach(element => {
            allSites.push(element);
        });
    } else {
        return;
    }
}

function checkArray(key) {
    if (localStorage.getItem(String(key)) !== null) {
        return true;
    } else {
        return false;
    }
}

function addError() {
    // Check if 'errors' exsists and get all existing data.
    if (checkArray('sites')) {
        getAllErrors();
    }
    // Construct object and append to array.
    var newData = {
        siteId: siteId,
        description: inpErrorDesc.value,
        date: new Date()
    }
    allErrors.push(newData);
    // Set new array with new object.
    localStorage.setItem('errors', JSON.stringify(allErrors));
    // siteContainer.innerHTML = '';
    // for (let i = 0; i < allSites.length; i++) {
    //     createCard(allErrors[i]);
    // }

    inpErrorDesc.value = '';
}

function getAllErrors() {
    if (checkArray('errors')) {
        // Get all errors and append to array.
        allErrors = [];
        JSON.parse(localStorage.getItem('errors')).forEach(element => {
            allErrors.push(element);
        });
    } else {
        return;
    }
}

function getSiteErrors() {

    if (checkArray('errors')) {
        allErrors = [];
        allImages = [];
        siteImages = [];
        siteErrors = [];
        getAllErrors();
        getAllImages();

        for (let i = 0; i < allErrors.length; i++) {
            if (allErrors[i].siteId == siteId) {
                siteErrors.push(allErrors[i]);
            }
        }

        if (siteErrors.length <= 0) {
            errorContainer.innerText = '';
            return;
        }

        for (let i = 0; i < allImages.length; i++) {
            if (allImages[i].siteId == siteId) {
                siteImages.push(allImages[i]);
            }
        }

        errorContainer.innerText = '';
        for (let i = 0; i < siteErrors.length; i++) {
            console.log('making error');
            var imageIndex = 0;
            createError(siteErrors[i], siteImages[imageIndex].url);
            imageIndex++;
            console.log('error nr ' + i + 'done');
        }
    }
    return;
}

function getAllImages() {
    if (checkArray('images')) {
        // Get all errors and append to array.
        allImages = [];
        JSON.parse(localStorage.getItem('images')).forEach(element => {
            allImages.push(element);
        });
    } else {
        return;
    }
}


errorImage.addEventListener('change', function () {
    const reader = new FileReader();
    reader.readAsDataURL(this.files[0]);

    reader.addEventListener('load', () => {
        var data = {
            siteId: siteId,
            url: reader.result
        }
        newImage.push(data);

        if (checkArray('images')) {
            getAllImages();
            allImages.push(newImage);
            localStorage.setItem('images', JSON.stringify(allImages));
            return;
        }

        localStorage.setItem('images', JSON.stringify(newImage));
        errorImage.value = '';
        return;
    })

});

function createError(data, url) {
    let contaier = document.createElement('div');
    contaier.classList.add('card', 'mb-3', 'border-0');
    errorContainer.appendChild(contaier);

    let cardImage = document.createElement('img');
    cardImage.classList.add('card-img-top');
    contaier.appendChild(cardImage);
    cardImage.setAttribute('src', url);

    let cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    contaier.appendChild(cardBody);


    let cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title', 'mb-2');
    cardBody.appendChild(cardTitle);
    cardTitle.innerHTML = data.description;
}

function createCard(data) {

    let contaier = document.createElement('div');
    contaier.classList.add('card', 'mb-3', 'border-0');
    siteContainer.appendChild(contaier);

    let cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    contaier.appendChild(cardBody);

    // let cardImg = document.createElement('img');
    // cardImg.classList.add('card-img-top');
    // cardBody.appendChild(cardImg);
    // cardImg.src = 'https://source.unsplash.com/random/?apartament';

    let cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title', 'mb-2');
    cardBody.appendChild(cardTitle);
    cardTitle.innerHTML = data.name;

    let cardSubtitle = document.createElement('h6');
    cardSubtitle.classList.add('card-subtitle', 'mb-4', 'text-muted');
    cardBody.appendChild(cardSubtitle);
    cardSubtitle.innerHTML = data.address;

    let cardContractor = document.createElement('p');
    cardContractor.classList.add('card-text', 'mb-3');
    cardBody.appendChild(cardContractor);
    cardContractor.innerHTML = 'Contractor: ' + data.contractor;

    let cardDueDate = document.createElement('p');
    cardDueDate.classList.add('card-text', 'mb-2');
    cardBody.appendChild(cardDueDate);
    cardDueDate.innerHTML = 'Due date: ' + data.dueDate;

    let cardStartDate = document.createElement('p');
    cardStartDate.classList.add('card-text', 'mb-4');
    cardBody.appendChild(cardStartDate);
    cardStartDate.innerHTML = 'Due date: ' + data.startDate;

    let btnStartInspection = document.createElement('button');
    btnStartInspection.type = 'button';
    btnStartInspection.classList.add('btn', 'btn-primary')
    cardBody.appendChild(btnStartInspection);

    btnStartInspection.innerHTML = 'Start inspection';
    btnStartInspection.setAttribute('data-bs-toggle', 'modal');
    btnStartInspection.setAttribute('data-bs-target', '#inspectModal');
    btnStartInspection.id = data.id;
    btnStartInspection.addEventListener('click', function () {
        console.log(this.id);
        siteId = parseInt(this.id);
        getSiteErrors();
    });
}
