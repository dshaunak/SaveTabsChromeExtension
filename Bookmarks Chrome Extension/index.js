
let myLinks = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const contactsLocalStorage = JSON.parse(localStorage.getItem("myLinks"));
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");

if(contactsLocalStorage) {
  myLinks = contactsLocalStorage;
  render(myLinks);
}

inputBtn.addEventListener("click", function() {
  myLinks.push(inputEl.value);
  inputEl.value = "";
  //Only Strings can be stored in localStorage,
  //hence use JSON.stringyfy("myLeads") -- as myLinks is an Array
  localStorage.setItem("myLinks", JSON.stringify(myLinks));
  console.log(localStorage.getItem("myLinks"));
  render(myLinks);
});

tabBtn.addEventListener("click", function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLinks.push(tabs[0].url)
        localStorage.setItem("myLinks", JSON.stringify(myLinks) )
        render(myLinks)
    })
});

deleteBtn.addEventListener("click", function() {
    localStorage.clear();
    myLinks = [];
    render(myLinks);
});


function render(links) {
  let listItems = "";
  for(let i = 0; i < links.length; i++){
    // target=_blank - opens a new tab
    //-- listItems += "<li><a target='_blank' href='"+ myLeads[i] + " '>" + myLeads[i] + "</a></li>";
    //Template String instead of the long code line above.
      //-Replace "" with `` instead and put JS variables in - ${}
    listItems +=  `
      <li>
        <a target='_blank' href='${links[i]}'> ${links[i]}
        </a>
        </li>`;
    /*
    ANOTHER METHOD OF CREATING HTML ELEMENTS FROM JS :
    const li = document.createElement("li");
    li.textContent = myLeads[i];
    ulRl.append(li);
    */
  }
  ulEl.innerHTML = listItems;
}
