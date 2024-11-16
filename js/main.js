var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var search = document.getElementById("search");
var btnAdd = document.getElementById("btnAdd");
var btnUpdate = document.getElementById("btnUpdate");
var bookmarkList =JSON.parse(localStorage.getItem("bookmarks")) ?? [];
var z;
// var urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
// var urlRegex = /^https:\/\/www\.[a-zA-Z0-9.-]+\.(com)$/;
var urlRegex = /^https:\/\/www\..+$/;

display();
function addBookmark() {
    var bookmarkObject={
        name: siteName.value,
        url: siteUrl.value,
    }
    if(bookmarkObject.name==""||bookmarkObject.url=="") {
        alert("all fields must be requird");
    }else if (!isNaN(siteName.value.charAt(0))) {
              alert("Name shouldn't start with numbers 😁 ");
    }else if (!urlRegex.test(siteUrl.value)) {
        alert("Please enter a valid URL");
    } else {
      var exsist = false;
      for (var i = 0; i < bookmarkList.length; i++) {
        if (siteUrl.value == bookmarkList[i].url) {
          alert("This Url already exists");
          exsist = true;
          break;
        }
      }
      if (!exsist) {
        bookmarkList.push(bookmarkObject);
        localStorage.setItem("bookmarks", JSON.stringify(bookmarkList));
        display();
        clearInputs();
        console.log(bookmarkList);
      }
    }

}


function clearInputs(){
    siteName.value="";
    siteUrl.value="";
}

function display(){
    var cart="";
    for(var i=0; i<bookmarkList.length;i++){
        cart += `
        <tr>
                    <th scope="row">${i + 1}</th>
                    <td class="fw-bold fs-5">${bookmarkList[i].name}</td>
                    
                    <td><a target="_blank" href="${
                      bookmarkList[i].url
                    }" class="btn px-4 btn-visit"><i class="fa-solid fa-eye pe-2"></i>Visit</a></td>
                    <td><button onclick="deleteBookmark(${i})" class="btn px-2  btn-delete"><i class="fa-solid fa-trash pe-2"></i>Delete</button></td>
                    <td><button onclick="updateBookmarkSetInfo(${i})" class="btn px-2  update btn-update"><i class="fa-solid fa-pen pe-2"></i>Update</button></td>
        </tr>
        `;
    }
    document.getElementById("tbody").innerHTML=cart;
}
function updateBookmarkSetInfo(index){
    siteName.value=bookmarkList[index].name;
    siteUrl.value=bookmarkList[index].url;
    btnAdd.classList.add("d-none");
    btnUpdate.classList.remove("d-none");
    z=index;
}


function update(z) {
if (siteName.value === "" || siteUrl.value === "") {
    alert("All fields must be filled.");
    return; 
}
if (!isNaN(siteName.value.charAt(0))) {
    alert("Name shouldn't start with a number 😁");
    return;
}
if (!urlRegex.test(siteUrl.value)){
    alert("Please enter a valid URL");
    return;
}
bookmarkList[z].name = siteName.value;
bookmarkList[z].url = siteUrl.value;
localStorage.setItem("bookmarks", JSON.stringify(bookmarkList));

display();
clearInputs();

btnAdd.classList.remove("d-none");
btnUpdate.classList.add("d-none");
}


function deleteBookmark(x){
    bookmarkList.splice(x,1);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarkList));
    display();
}

function filterTable() {
    cart='';
    for(var i=0; i < bookmarkList.length;i++){
        if(bookmarkList[i].name.toLowerCase().includes(search.value.toLowerCase().trim())){
        cart += `
        <tr>
                    <th scope="row">${i + 1}</th>
                    <td class="fw-bold fs-5">${bookmarkList[i].name}</td>
                    
                    <td><a target="_blank" href="${
                      bookmarkList[i].url
                    }" class="btn px-4 btn-visit"><i class="fa-solid fa-eye pe-2"></i>Visit</a></td>
                    <td><button onclick="deleteBookmark(${i})" class="btn px-2  btn-delete"><i class="fa-solid fa-trash pe-2"></i>Delete</button></td>
                    <td><button onclick="updateBookmarkSetInfo(${i})" class="btn px-2  update btn-update"><i class="fa-solid fa-pen pe-2"></i>Update</button></td>
        
                    </tr>
        `;
        }
    }
    document.getElementById("tbody").innerHTML=cart;
}

/* <tr>
  <th scope="row">1</th>
  <td class="fw-bold fs-4">google</td>
  <td>
    <a href="www.google.com" class="btn px-4 btn-visit">
      <i class="fa-solid fa-eye pe-2"></i>Visit
    </a>
  </td>

  <td>
    <button class="btn px-2  btn-delete">
      <i class="fa-solid fa-trash pe-2"></i>Delete
    </button>
  </td>
</tr> */