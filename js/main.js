// Listen for form submit
document.getElementById('bookmarkForm').addEventListener('submit',saveBookmark);
// Save bookmark
function saveBookmark(e){
  // get values
  var siteName =document.getElementById('siteName').value;
  var siteUrl =document.getElementById('siteUrl').value;

  // bookmark object to save to local storage
  var bookmark = {
    name: siteName,
    url: siteUrl
  }
  console.log(bookmark);
  // test if bookmarks null
  if(localStorage.getItem('bookmarks') === null){
      // Init array
      var bookmarks = [];
      // Add to array
      bookmarks.push(bookmark);
      // Set to localStorage
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    else {
      // Get bookmarks from localStorage
      var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
      // Add bookmark to array
      bookmarks.push(bookmark);
      // Re-set back to localStorage
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
  getBookmarks();

  //prevent form submit
  e.preventDefault();
}

function deleteBookmark(url){
  // get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  for (var i = 0; i < bookmarks.length; i++) {
    if(bookmarks[i].url == url){
      //remove from array
      bookmarks.splice(i, 1);
    }
  }
  // re-set to localStorage
  localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
  getBookmarks();
}

function getBookmarks(){
  // Get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Get output id
  var bookmarksResults = document.getElementById('bookmarksResults');

  // Build output
  bookmarksResults.innerHTML = '';
  for(var i = 0; i < bookmarks.length; i++){
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResults.innerHTML += '<div class="well">'+
                                  '<h3>'+name+
                                  ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> ' +
                                  ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
                                  '</h3>'+
                                  '</div>';
  }
}
