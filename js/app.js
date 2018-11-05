const searchContainer = document.querySelector('.search-container');
const gallery =  document.querySelector('#gallery');
fetchData('https://randomuser.me/api/?results=7')
   .then(data => {
      const dataResults = data.results;
      // let olo = dataResults;

         createCards (data.results);
         const arrCard = document.querySelectorAll('.card');
         byClickCreateModal (dataResults);
   // function to open modal window
   function byClickCreateModal (dataResults) {
      for (let i = 0; i < arrCard.length; i++) {
         arrCard[i].addEventListener ('click', el => {
            // console.log(arrCard[i])
         createModal (data.results[i], dataResults);
         });
      }
   }



//////////////////---------------------------------------/

searchContainer.innerHTML = `
                              <form action="#" method="get">
                                  <input type="search" id="search-input" class="search-input" placeholder="Search...">
                                  <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
                              </form>
                           `;

   const serachSubmit = document.querySelector('.serach-submit');
   const searchInput = document.querySelector('.search-input');
   const arrName = [...document.querySelectorAll('#name')];
   // const arrCard = document.querySelectorAll('.card');
   searchInput.addEventListener('input', elInput => {


      for (let i = 0; i < arrName.length; i++) {
         if (!checkLetter(arrName[i], elInput)) {
               arrCard[i].classList.add('hidden');
               arrCard[i].classList.remove('view');
         } else {
            arrCard[i].classList.remove('hidden');
            arrCard[i].classList.add('view');
            console.log(dataResults[i]);
         }
      }
   });
});


   // console.log(document.querySelectorAll('.card'));

// ------------------------------------------
//  FUNCTION TO CREATE MODAL WINDOW
// ------------------------------------------

// let index = 0;
function createModal (el, dataResults, olo) {
   const body = document.querySelector('body');
   const modalWindow = document.createElement('DIV');

   if (document.querySelector('.modal-container')) {
      document.querySelector('.modal-container').remove();
   }

   modalWindow.className = 'modal-container';

   modalWindow.innerHTML = `<div class="modal">
                                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                                <div class="modal-info-container">
                                    <img class="modal-img" src='${el.picture.large}' alt="profile picture">
                                    <h3 id="name" class="modal-name cap">${el.name.first} ${el.name.last}</h3>
                                    <p class="modal-text">${el.email}</p>
                                    <p class="modal-text cap">${el.location.city}</p>
                                    <hr>
                                    <p class="modal-text">${el.cell}</p>
                                    <p class="modal-text">${captLetr(el.location.street)}, ${captLetr(el.location.city)}, ${el.location.postcode}</p>
                                    <p class="modal-text">Birthday: ${formatBOD(el.dob.date)}</p>
                                </div>
                           </div>
                           <div class="modal-btn-container">
                                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                                <button type="button" id="modal-next" class="modal-next btn">Next</button>
                           </div>
                        `;
   body.appendChild(modalWindow);

   // event click to close modalWindow

   const modalCloseBtn = document.querySelector('#modal-close-btn');
   modalCloseBtn.addEventListener('click', closeModalBtn);

   // event click to slide modal window ahead

   i = dataResults.indexOf(el);
   const modalNext = document.querySelector('#modal-next');
   modalNext.addEventListener('click', () => {



      //    // console.log(el);
      //
      //    const arrCard = [...document.querySelectorAll('.view')];
      //    // console.log(i + ' index from fetch request');
      //    const arrID = [];
      //    arrCard.map(el => arrID.push(el.getAttribute('id')));
      //    index++;

      // console.log(arrID[index]);

      if (dataResults[i + 1]) createModal(dataResults[i + 1], dataResults);
      else createModal(dataResults[0], dataResults);
   });

   // event click to slide modal window back

   const modalPrev = document.querySelector('#modal-prev');
   modalPrev.addEventListener('click', () => {
      if (dataResults[i - 1]) createModal(dataResults[i - 1], dataResults);
      else createModal(dataResults[dataResults.length - 1], dataResults);
   });
}




// ------------------------------------------
//  FUNCTION TO CREATE CARDS FOR EACH PERSON
// ------------------------------------------

function createCards (arr) {
   for (let i = 0; i < arr.length; i++) {
      const domElements =  `<div class="card view" id='${i}'>
                               <div class="card-img-container">
                                   <img class="card-img" src="${arr[i].picture.large}" alt="profile picture">
                               </div>
                               <div class="card-info-container">
                                   <h3 id="name" class="card-name cap">${arr[i].name.first} ${arr[i].name.last}</h3>
                                   <p class="card-text">${arr[i].email}</p>
                                   <p class="card-text cap">${arr[i].location.city}, ${arr[i].location.state}</p>
                               </div>
                           </div>`;
      gallery.innerHTML += domElements;
   }

   // arr.map(el => {
   //    const domElements =  `<div class="card view">
   //                             <div class="card-img-container">
   //                                 <img class="card-img" src="${el.picture.large}" alt="profile picture">
   //                             </div>
   //                             <div class="card-info-container">
   //                                 <h3 id="name" class="card-name cap">${el.name.first} ${el.name.last}</h3>
   //                                 <p class="card-text">${el.email}</p>
   //                                 <p class="card-text cap">${el.location.city}, ${el.location.state}</p>
   //                             </div>
   //                         </div>`;
   //    gallery.innerHTML += domElements;
   // });
}





// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------



// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------
function fetchData(url) {
  return fetch(url)
           .then(checkStatus)
           .then(res => res.json())
           .catch(error => console.log('Looks like there was a problem!', error))
}

// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

function checkStatus(response) {
 if (response.ok) {
   return Promise.resolve(response);
 } else {
   return Promise.reject(new Error(response.statusText));
 }
}

function closeModalBtn () {
   index = 0;
   const modalContainer = document.querySelector('.modal-container');
   modalContainer.remove();
}

function captLetr(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function formatBOD(setence) {
  const expression  = /(\d{4})-(\d{2})-(\d{2})(.+)/;
  return setence.replace(expression, "$1/$2/$3");
}

function checkLetter(elArr, elInput) {
   return elArr.innerText.toUpperCase().match(elInput.target.value.toUpperCase());
}
