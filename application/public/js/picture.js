var opacity = 0;
var intervalID = 0;

//var div = document.getElementsByClassName("fadeOut")[0].addEventListener('click',(e) => {});

var pictureDivs = document.getElementsByClassName('fadeOut'); // an array

function fadeOut(event) {                           // currentTarget, target
    let clickDiv = event.currentTarget;
    intervalID = setInterval(function () {
        opacity = clickDiv.style.opacity;
        if(opacity>=0) {
            opacity = opacity - .1
            clickDiv.style.opacity = opacity;
        } else {
            clearInterval(intervalID);
            clickDiv.remove();
            document.getElementById('item-count').innerHTML= `There are ${pictureDivs.length} photo(s) being shown`
        }    
    },50);
    //once opacity hits a certian limit, clear interval and delete element
}

/*function hide() {
    var img = document.getElementById(url);           //id of the image
    opacity = Number(window.getComputedStyle(img).getPropertyValue("opacity"));
    if(opacity>=0) {
        opacity = opacity - 1
        img.style.opacity = opacity;
    } else {
        clearInterval(intervalID);
    }
}*/

function createPhotoCard(data, containerDiv) {
    url = data.url;
    let img = document.createElement("img");
    let p = document.createElement("p");
    let div = document.createElement("div");
    div.setAttribute("id",data.id);
    div.setAttribute("class", "fadeOut");
    div.addEventListener('click', fadeOut);
    img.setAttribute("src",url);
    img.setAttribute("id",url);
    div.setAttribute("style","opacity:1");
    img.className = "img";
    //containerDiv.innerHTML += `<div> + ${img} + data.title + </div>`;
    div.append(img);
    p.append(data.title);
    div.append(p);
    containerDiv.append(div);

}

let mainDiv = document.getElementById("container");

if(mainDiv) {
    let fetchURL = "https://jsonplaceholder.typicode.com/albums/2/photos"
    fetch(fetchURL)
    .then((data) => data.json())
    .then((photos) => {
        let innerHTML = "";
        photos.forEach((photo) => {
            createPhotoCard(photo,mainDiv);
        });
        document.getElementById('item-count').innerHTML= `There are ${photos.length} photo(s) being shown`;
    }) 
}
