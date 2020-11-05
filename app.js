//Select dom element to display cafe list
const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');

//Grab a reference to the input form to add data to the database

//using a Function, create html element, put the data inside them and render to the dom
function renderCafe(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');
    //adding delete feature
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    city.textContent = doc.data().city;
    cross.textContent = 'X';

    //append name and city to the li
    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cross);
    //append li to cafeList in the dom
    cafeList.appendChild(li);

    //deleting data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('cafes').doc(id).delete();
    })
}

//Get data collected from database
// db.collection('cafes').orderBy('name').get().then((cafes) => {
//     cafes.docs.forEach(doc => {
//         renderCafe(doc);
//     })
// })

//Real-time listener
//Get data collected using using a listerner for real-time output
db.collection('cafes').orderBy('city').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if(change.type == 'added'){
            renderCafe(change.doc);
        }else if (change.type == 'removed'){
            let li = cafeList.querySelector('[data-id=' + change.doc.id + ']');
            cafeList.removeChild(li);
        }
    })
})


//Saving data
//listen for a Submit Event on the form, and fire off the data to firestore
form.addEventListener('submit', (e) => {
    e.preventDefault();
    //get reference to cafe collections
    db.collection('cafes').add({
        name: form.name.value,
        city: form.city.value
    }); 
    //clear out field after the add button is clicked
    form.name.value = '';
    form.city.value = ''
})
