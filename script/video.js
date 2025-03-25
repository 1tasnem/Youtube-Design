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




const loadVideos = () =>
    {
        //fetch the data 
    console.log("load categories created");
        fetch ("https://openapi.programming-hero.com/api/phero-tube/videos")
        .then((res) => res.json())
        .then((data) => displayVideos(data.videos))
        .catch ((error) => console.log(error));
    
    
    };
    
    function getTimeString(time)
    {
        //get Hour and rest seconds 
        const hour = parseInt(time / 3600);
        let remainigSecond = time % 3600;
        const minute = parseInt(remainigSecond / 60);
        remainigSecond = remainigSecond % 60;
        return `${hour} hour ${minute} minute ${remainigSecond} second ago`;
    }
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


    const displayVideos = (videos) => {
       // console.log(videos);
       const videoContainer = document.getElementById("videos");
       videos.forEach((video) => 
    {
        console.log(video);
        const card = document.createElement("div");
        card.classList = "card bg-base-100  shadow-sm"
        card.innerHTML = `<figure class="h-[200px]  relative">
    <img
      src=${video.thumbnail}
      class = "w-full h-full object-cover"
      alt="Shoes" />
     ${
    video.others.posted_date?.length == 0
    ? "" : `<span class = "absolute right-2 bottom-2 bg-black text-white rounded p-1">${getTimeString(video.others.posted_date)}</span>`
     }
 
  </figure>
  <div class=" px-0 py-2 flex  gap-2">
  <div >
  <img class = "w-10 h-10 rounded-full object-cover" src=${video.authors[0].profile_picture}/>
  </div>
  <div >
  <h2 class = "font-bold">${video.title}</h2>
  <div class ="flex items-center gap-3">
  
  <p class = "text-gray-400">${video.authors[0].profile_name}</p>
 ${
    video.authors[0].verified == true 
    ? ` <img class = "w-5" src="https://img.icons8.com/?size=96&id=D9RtvkuOe31p&format=png"/>`
    : ""
 }
  </div>
  <p class = "text-gray-400"> 91 views</p>
 
  </div>
  </div>`;
  videoContainer.append(card);
    })
    }
loadCategories();
loadVideos();