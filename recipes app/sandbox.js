const list = document.querySelector('ul');
const form = document.querySelector('form');

const addRecipe = (recipe, id) => {
    let time = recipe.created_at.toDate();
    let html = `
    <li data-id="${id}">
      <div>${recipe.title}</div>
      <div><small>${time}</small></div>
      <button class="btn btn-danger btn-sm my-2">delete</button>
    </li>
  `;

  list.innerHTML += html;
};

// db.collection('recipes').get().then( (snapshot) => {
//     //when we have the data
//     snapshot.docs.forEach( (doc) => {
//         //console.log(doc.data());
//         addRecipe(doc.data(), doc.id);
//     });
// }).catch( (err) => {
//     //when error
//     console.log(err);
// })

// getting the recipes in a real time
db.collection('recipes').onSnapshot( snapshot => {
    // logs whatever has changed in the db
    snapshot.docChanges().forEach( change => {
        const doc = change.doc;
        if(change.type === 'added') {
            addRecipe(doc.data(), doc.id);
        } else if (change.type === 'removed') {
            deleteRecipe(doc.id);
        }
    });
})

// deleting the recipe - deleting from the DOM

const deleteRecipe = (id) => {
    const recipes = document.querySelectorAll('li');
    recipes.forEach( recipe => {
        if(recipe.getAttribute('data-id') === id) {
            recipe.remove();
        }
    })
};

// adding new document
form.addEventListener('submit', (e) => {
    // stops the page from reloading
    e.preventDefault();

    const now = new Date();

    const recipe = {
        title: form.recipe.value,
        created_at: firebase.firestore.Timestamp.fromDate(now)
    };
    db.collection('recipes').add(recipe).then( () => {
        console.log('recipe added');
    }).catch( err => {
        console.log(err);
    });
})

// deleting data

list.addEventListener('click', (e) => {
    if(e.target.tagName === 'BUTTON') {
        const recipeId = e.target.parentElement.getAttribute('data-id');
        console.log(recipeId);
        db.collection('recipes').doc(recipeId).delete().then( () => {
            console.log('recipe deleted');
        });
    }
});