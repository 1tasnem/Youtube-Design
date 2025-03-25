//console.log("okkk");

//1-Fetch ,Load and Show Categories on html
//create load categories

const loadCategories = () =>
{
    //fetch the data 
console.log("load categories created");
    fetch ("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch ((error) => console.log(error));


};

//{ 
// "category_id ": "1001",
// "category" : "Music",
//}

//create displaycategories
const displayCategories = (categories) =>
    {

        const categoryContainer = document.getElementById("categories");

   categories.forEach((item) => {
    console.log(item);

    //create a button
    const button = document.createElement("button");
    button.classList = "btn";
    button.innerText = item.category;

    //add button to caategory container
    categoryContainer.append(button);
   });



        
     

    };
loadCategories();