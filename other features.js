//NOTE: this file is not link to any html file, is just used to record features..
// ..that can be added to when getting data from the database


//METHODS THAT CAN BE USED WHEN RETRIEVING DATA FROM THE DATABASE

//THE .where() method
//START EXAMPLE (1) THIS CODE IS ON LINE 38 OF THE app.js file
//Feature: Get data where a "cafe name = something" or the "cafe city =  something" 
//using the .where() method which takes in three (3) parameters:
    // (1st the value), 
    // (2nd is how it sould be evaluated) 
    // (3rd the value it sould be evaluated with)
DB.collection('cafes').where('city', '==', 'sabo').get().then((snapshot)=>{
    snapshot.docs.forEach(doc => {
        console.log(doc.data());// .data() gets us the actual data from the document
        renderCafe(doc);
    })
})
//END EXAMPLE (1) THIS CODE IS ON LINE 38 OF THE app.js file



//THE .orderby() method (Takes)
//Feature: Order items alphabetically by the data 
//START EXAMPLE (2) THIS CODE IS ON LINE 38 OF THE app.js file
DB.collection('cafes').orderBy('name').get().then((snapshot)=>{
    snapshot.docs.forEach(doc => {
        console.log(doc.data());// .data() gets us the actual data from the document
        renderCafe(doc);
    })
})
//END EXAMPLE (2) THIS CODE IS ON LINE 38 OF THE app.js file




//START EXAMPLE (3) THIS CODE IS ON LINE 38 OF THE app.js file
// NOTE: Both .where() & .orderBy can used combined to get a certain type of query

// ERROR NOTICE: This will throw an error which will say "The query requires an index"..
// ..on the console at first. Just open console, click on the link which redirects to your firebase account
DB.collection('cafes').where('city', '==', 'sabo').orderBy('name').get().then((snapshot)=>{
    snapshot.docs.forEach(doc => {
        console.log(doc.data());// .data() gets us the actual data from the document
        renderCafe(doc);
    })
})
//END EXAMPLE (3) THIS CODE IS ON LINE 38 OF THE app.js file





//METHODS THAT CAN BE USED UPDATE EXISTING DATA ON THHE DATABASE
//using the update() method passing it an object of the information needed to be changed
DB.collection('cafes').doc(id).update({
    name: 'MaryCafe',
    city: 'Maryland'
});

