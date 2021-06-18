'use strict';

const btnList = document.querySelectorAll('.btn-ham');
const position = document.getElementById('drop-down');

btnList.forEach(btn => {
    btn.addEventListener('click', function (e) {
        position.classList.toggle('active'); ``
        e.preventDefault();
        this.classList.toggle('open');
    });
});


//smooth anchor scrolling

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

//toggle section content

function _onCollapse(evt) {
    console.log(evt.target);
    console.log(evt.target.parentElement);
    evt.target.parentElement.classList.toggle('fa-arrow-up');
}

//observer

const icons = document.querySelectorAll('.heading-functions i');
const clocks = document.querySelectorAll('.bg-counter h1');

const options = {
    root: null,
    threshold: 0.05,
    rootMargin: "0px 0px -250px 0px"
};
const observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        }
        else {
            if (entry.target.tagName == 'I') {

                entry.target.classList.toggle("appear");
                observer.unobserve(entry.target);
            }
            else if (entry.target.tagName == "H1") {

                entry.target.classList.toggle('scale');
                observer.unobserve(entry.target);
            }
        }
    })
}, options);

icons.forEach(icon => { observer.observe(icon); });   //fa-icons
clocks.forEach(clock => { observer.observe(clock); });  //roster/employee - counter



function rotateFn(evt) {
    let ele = event.target;
    console.log(ele);
    ele.classList.toggle('triangle-rotate');
}


// load text
window.addEventListener('load', _onLoad);


function _onLoad() {
    _applyTexts(window.siteTexts);

}


//add text
function _applyTexts(texts) {
    
    for (let i = 0; i < texts.length; i++) {
        let section = texts[i];  
        for (let prop in section) {  
            console.log(prop);
            let contents = section[prop];    
            console.log(contents);
            let cnt = 0;                     
            for (let content_prop in contents) {
                if (content_prop.substr(0, 1) == "h") {
                    let value = contents[content_prop];
                    let container = document.getElementById(prop);
                    container.getElementsByTagName("h6")[cnt].innerHTML = value;
                    
                }
                if (content_prop.substr(0, 1) == "p") {
                    let value = contents[content_prop];
                    let container = document.getElementById(prop);
                    container.getElementsByTagName("p")[cnt].innerHTML = value;

                    cnt++;
                }
            }
        }
    }
}



// function displayRandomInt(max){
//     let counter=0;

//     while (counter<max){
//         counter+=getRandomInt(max);
//         document.getElementById('$')+=counter;
//     }

// }

//     function getRandomInt(max) {
//         return Math.floor(Math.random() * max);
//       }
































