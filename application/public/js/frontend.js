function setFlashMessageFadeOut(flashMessageElement) {
    setTimeout(() => {
        let currentOpacity = 1.0;
        let timer = setInterval(() => {
            if(currentOpacity < 0.05) {
                clearInterval(timer);
                flashMessageElement.remove();
                
            }
            currentOpacity = currentOpacity - .05;
            flashMessageElement.style.opacity = currentOpacity;
        }, 50);
    }, 4000);
}

function executeSearch() {
    let searchTerm = document.getElementById('search-text').value;
    if(!searchTerm) {
        addFlashFromFrontEnd("No search term given");
        return;
    }

    if(document.getElementById("searched")) {
        document.getElementById("searched").remove();
    }
    
    // if(!searchTerm) {
    //     console.log("theres nothign here");
    //     location.replace('/');
    //     return;
    // }
    
    let mainContent = document.getElementById('main-content');
    let searchURL = `/posts/search?search=${searchTerm}`;

    fetch(searchURL)
    .then((data) => {

        return data.json();
    })
    .then((data_json) => {
        //console.log(data_json);
        let newMainContentHTML = '';
        data_json.results.forEach((row) => {
            newMainContentHTML += createCard(row);
            
        });
        
        mainContent.innerHTML = newMainContentHTML;
        console.log(mainContent.innerHTML);

        if(data_json.message) {
            addFlashFromFrontEnd(data_json.message);
        }
    })
    .catch((err) => {
        console.log(err);
    })
}

function addFlashFromFrontEnd(message) {
    let flashMessageDiv = document.createElement('div');
    let innerFlashDiv = document.createElement('div');
    let innerTextNode = document.createTextNode(message);
    innerFlashDiv.appendChild(innerTextNode);
    flashMessageDiv.appendChild(innerFlashDiv);
    flashMessageDiv.setAttribute('id', 'flash-message');
    innerFlashDiv.setAttribute('class', 'alert alert-info');
    document.getElementsByTagName('body')[0].appendChild(flashMessageDiv);
    setFlashMessageFadeOut(flashMessageDiv);

}

function createCard(postData) {
 return `<div id="post-${postData.id}" class="card">
    <img class='card-image' src="${postData.thumbnail}" alt="Missing Image">
    <div class="card-body">
        <p class="card-title">${postData.title}</p>
        <p class="card-text">${postData.description}</p>
        <a href="/getPost/${postData.id}" class="nav-items anchor-buttons">Post Details</a>
    </div>
</div>`;
}

let flashElement = document.getElementById('flash-message');

if(flashElement) {
    setFlashMessageFadeOut(flashElement);
}

let searchButton = document.getElementById('search-button');

if(searchButton) {
    searchButton.onclick = executeSearch;
}
