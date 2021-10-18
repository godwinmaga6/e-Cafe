
// START ORDER OF GETTING & RENDERING OF DATA FROM THE DATABASE
    // reference the DOM element to display the cafe from our Database
    const cafeList = document.querySelector('#cafe-list');

    // start create elements and render documents function
        function renderCafe(doc){
            let li = document.createElement('li');
            let name = document.createElement('span');
            let city = document.createElement('span');
            let deleteIcon = document.createElement('div'); //OPTIONAL

            //create an attribute to contain doc id
            li.setAttribute('data-id',doc.id);

            //set the text contents
            name.textContent = doc.data().name;
            city.textContent = doc.data().city;
            deleteIcon.textContent = 'x'; //OPTIONAL

            //append name and city to the li
            li.appendChild(name);
            li.appendChild(city);
            li.appendChild(deleteIcon); //OPTIONAL

            //append li to the cafeList (The ul)
            cafeList.appendChild(li);

            //DELETE DATA FROM THE DATABASE (OPTIONAL)
            deleteIcon.addEventListener('click', (e)=> {
                e.stopPropagation(); //stops the event from bubbling up
                let id = e.target.parentElement.getAttribute('data-id'); //get reference to the id of the parent element of the delete icon
                DB.collection('cafes').doc(id).delete();
            })
        }
    // end create elements and render documents function

    
    //1st Get reference of the collections(Asynchronous request) which returns a promise
    //2nd call the renderCafe() function within and pass in the doc
    //CHOOSE EITHER: NOT REAL-TIME LISTENER OR: REAL-TIME LISTENER

        // 1 **Not a real-time listener */
            // DB.collection('cafes').get().then((snapshot)=>{
            //     snapshot.docs.forEach(doc => {
            //         console.log(doc.data());// .data() gets us the actual data from the document
            //         renderCafe(doc);
            //     })
            // })
        //END 1 **Not a real-time listener */

        // 2 **Real-time listener */
            DB.collection('cafes').orderBy('name').onSnapshot(snapshot => {
                let changes = snapshot.docChanges(); //track changes        
                // console.log(changes);
                changes.forEach(change => {
                    if(change.type == 'added'){
                        renderCafe(change.doc);
                    } else if (change.type == 'removed') {
                        let li = cafeList.querySelector('[data-id=' + change.doc.id + ']');
                        cafeList.removeChild(li);
                    }
                })
            })
        //END 2 **Real-time listener */

// END ORDER OF GETTING & RENDER DATA FROM THE DATABASE






// START ORDER OF ADDING DATA INTO THE DATABASE
    // reference the DOM form element that will take the new inputs
    const form = document.querySelector('#add-cafe-form');

    // saving data
    form.addEventListener('submit', (e)=>{
        e.preventDefault();
        //get reference to the collection you want to add data to (in this case the "cafes")
        if(form.name.value != ""){
            DB.collection('cafes').add({
                name: form.name.value,
                city: form.city.value
            }).then(()=> { //the .then promise may be removed, it just helps the form to be cleared if data was saved successfully without any errors And so that the form doesn't get cleared if form wasn't saved successfully. (If you wish to remove it make sure you add a semi colon to this line)
                //clear the form after submit
                form.name.value = '';
                form.city.value = '';
            });
        }else {
            alert('Input fields contains errors, or are empty!');
        }
        
    })
// END ORDER OF ADDING DATA INTO THE DATABASE
