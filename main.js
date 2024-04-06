var cookButton = document.querySelector('.cook');
var recipeButton = document.querySelector(".recipe-button");
var newRecipeButton = document.querySelector('.add-new');
var sideButton = document.querySelector('#radioOne');
var mainButton = document.querySelector('#radioTwo');
var dessertButton = document.querySelector('#radioThree');
var entreButton = document.querySelector('#radioFour');
var clearButton = document.querySelector('.clear');

var recipeSection = document.querySelector('.random-recipe')
var userInputSection = document.querySelector('.user-input');
var userCustomType = document.querySelector('.type-input');
var userCustomName = document.querySelector('.name-input');
var youShouldText = document.querySelector('.you-should');
var crockPot = document.querySelector('.crockPot')


var sides = [
    'Miso Glazed Carrots',
    'Coleslaw',
    'Garden Salad',
    'Crispy Potatoes',
    'Sweet Potato Tots',
    'Coconut Rice',
    'Caeser Salad',
    'Shrimp Summer Rolls',
    'Garlic Butter Mushrooms',
    'Hush Puppies'
];

var mainDishes = [
'Spaghetti and Meatballs',
'Pineapple Chicken',
'Shakshuka',
'Thai Yellow Curry',
'Bibimbap',
'Chicken Parmesean',
'Butternut Squash Soup',
'BBQ Chicken Burgers',
'Ramen',
'Empanadas',
'Chicken Fried Rice',
'Sheet Pan Fajitas',
'Margarita Pizza'
];

var desserts = [
    'Apple Pie',
    'Lemon Meringue Pie',
    'Black Forest Cake',
    'Banana Bread',
    'Peach Cobbler',
    'Cheesecake',
    'Funfetti Cake',
    'Baklava',
    'Flan',
    'Macarons',
    'Macaroons',
    'Chocolate Cupcakes',
    'Pavlova',
    'Pumpkin Pie',
    'Key Lime Pie',
    'Tart Tatin',
    'Croissants',
    'Eclairs'
];

var userRecipes = [];

addEventListener('load', function(event){
    event.preventDefault()
    toggleViews(false, false, false)
})

sideButton.addEventListener('click', function(){
    mainButton.checked = false;
    dessertButton.checked = false;
    entreButton.checked = false;
});

mainButton.addEventListener('click', function(){
    sideButton.checked = false;
    dessertButton.checked = false;
    entreButton.checked = false;
});

dessertButton.addEventListener('click', function(){
    mainButton.checked = false;
    sideButton.checked = false;
    entreButton.checked = false;
});

entreButton.addEventListener('click', function(){
    mainButton.checked = false;
    dessertButton.checked = false;
    sideButton.checked = false;
});


cookButton.addEventListener('click', function(event){
    event.preventDefault()
    if(!sideButton.checked && !mainButton.checked && !dessertButton.checked && !entreButton.checked){
        showError('An option must be chosen before a message is displayed!')
    } else {
        randomRecipe();
        toggleViews(true, false, false)
    }
});

document.addEventListener('click', function(event){
    if (event.target.classList.contains('clear')) {
        clearInputs();
    }
})

function randomRecipe(){
    var randomSides = getRandomSides(sides)
    var randomMainDish = getRandomMainDish(mainDishes);
    var randomDessert = getRandomDessert(desserts);
    var randomEntre = getRandomEntre(randomMainDish, randomSides,randomDessert);

    if(sideButton.checked){
        showRecipe(randomSides)
    } else if (mainButton.checked){
        showRecipe(randomMainDish)
    } else if (dessertButton.checked){
        showRecipe(randomDessert)
    } else if (entreButton.checked) {
        showRecipe(randomEntre);
    }
}

function showRecipe(text){
        recipeSection.innerHTML = ''
        recipeSection.innerHTML += '<div>' +
            '<p class="you-should">You should make:</p>' +
            '<p class="new-make">' + text + '</p>' +
            '<button class="clear" id="clear-button">CLEAR</button>' +
            '</div>';
    }

function getRandomSides(sides){
    var randomIndex = Math.floor(Math.random() * sides.length);
    return sides[randomIndex]
}

function getRandomMainDish(mainDishes){
    var randomIndex = Math.floor(Math.random() * mainDishes.length);
    return mainDishes[randomIndex];
}

function getRandomDessert(desserts){
    var randomIndex = Math.floor(Math.random() * desserts.length);
    return desserts[randomIndex];
}

function getRandomEntre() {
    var randomSide = getRandomSides(sides);
    var randomMainDish = getRandomMainDish(mainDishes);
    var randomDessert = getRandomDessert(desserts);

    return randomMainDish + ' with a side of ' + randomSide + ' and  ' + randomDessert + ' for dessert! ';
}


function toggleViews(clearRecipes, outputText, showClearButton) {

    clearButton.classList.toggle('hidden', !clearRecipes)
    youShouldText.classList.toggle('hidden', !outputText);
}

function showError(message) {
    var errorContainer = document.createElement('div');
errorContainer.classList.add('error-container');

document.body.appendChild(errorContainer);
    var errorParagraph = document.createElement('p');
    errorParagraph.textContent = message;
    errorContainer.appendChild(errorParagraph);

    setTimeout(() => {
        errorContainer.remove();
    }, 4000); 
}

function clearInputs(){
    crockPot.src = 'assets/cookpot.svg';
    crockPot.style.display = 'none'
    recipeSection.innerHTML = 
    '<div>'+
    '<img class="crockPot" src="assets/cookpot.svg" alt="open pot">' +
    '</div>'
}