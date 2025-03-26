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





const loadVideos = (searchText = "") =>
    {
        //fetch the data 
    console.log("load categories created");
        fetch (`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
        .then((res) => res.json())
        .then((data) => displayVideos(data.videos))
        .catch ((error) => console.log(error));
    
    
    };

    const loadCategoryVideos = (id) => {
        //alert(id);
        fetch (`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then((res) => res.json())
        .then((data) =>  {

            removeActiveClass();
            const activeBtn = document.getElementById(`btn-${id}`);
            activeBtn.classList.add("active");
            
            displayVideos(data.category)})
        //then((data) => displayCategories(data.category))
        .catch ((error) => console.log(error));
    }
    
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

const removeActiveClass = () =>{
    const buttons = document.getElementsByClassName('category-btn');
    console.log(buttons);
    for (let btn of buttons)
    {
        btn.classList.remove("active");
    }
}
//create displaycategories
const displayCategories = (categories) =>
    {

        const categoryContainer = document.getElementById("categories");

   categories.forEach((item) => {
    console.log(item);

    //create a button
    const buttonContainer = document.createElement("div");

    //button.classList = "btn";
    //button.innerText = item.category;
    buttonContainer.innerHTML = `
    <button id="btn-${item.category_id}" onclick ="loadCategoryVideos(${item.category_id})" class ="btn category-btn">
    ${item.category}
    </button>`;
    categoryContainer.append(buttonContainer);

    //add button to caategory container
    //categoryContainer.append(button);
   });
    

    };


    const loadDetails= async (videoId)=>{
        console.log(videoId);
        const uri = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
        const res = await fetch(uri);
        const data = await res.json();
        //console.log(data);
        displayDetails(data.video);
    }
const displayDetails = (video) =>{
    console.log(video);
    const detailContainer = document.getElementById("modal-content");
    detailContainer.innerHTML = `<img src = ${video.thumbnail}/>
    <p>${video.description}</P>`;
    //way-1
    document.getElementById("showModalData").click();
};

    const displayVideos = (videos) => {
       // console.log(videos);
       const videoContainer = document.getElementById("videos");
       videoContainer.innerHTML = "";
       if(videos.length == 0)
       {
        videoContainer.classList.remove("grid");
        videoContainer.innerHTML = `
        <div class = "min-h-[300px] w-full mx-auto flex flex-col gap-5 justify-center items-center">
        <img src = "assets/Icon.png"/>
        <h2 class = "font-bold text-xl">
        NO Content avilable</h2>
        
        `;
        return ;
       }
       else
       {
        videoContainer.classList.add("grid");
       }
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
    ? "" : `<span class = "absolute text-sm right-2 bottom-2 bg-black text-white rounded p-1">${getTimeString(video.others.posted_date)}</span>`
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
  <p><button onclick = "loadDetails('${video.video_id}')"
  class = "btn btn-sm btn-error">details</button</P>

  </div>
  
  
  
  
  `;
  videoContainer.append(card);
    })
    }


    document.getElementById("search-input").addEventListener("keyup",(e)=>

    {
        loadVideos(e.target.value);

    })
loadCategories();
loadVideos();