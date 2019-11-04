
document.getElementById("myForm").addEventListener("submit", saveBookmarks);

function saveBookmarks(e) {
    var siteName = document.getElementById("siteName").value;
    var siteURL = document.getElementById("siteURL").value;
    
    var bookmark = {
        name:siteName,
        url:siteURL
    }

    if(!siteName || !siteURL) {
        alert("Please Fill in the Form");
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    if(!siteURL.match(regex)){
        alert("Please use a valid URL");
        return false;
    }

    if(localStorage.getItem("bookmarks")===null) {
        var bookmarks = [];

        bookmarks.push(bookmark);

        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

    } else {
        var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

        bookmarks.push(bookmark);

        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }

    fetchBookmarks();
    clearForm();
    e.preventDeafult();
}

function fetchBookmarks(){

    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

    var bookmarksResults = document.getElementById("bookmarksResults");

    bookmarksResults.innerHTML = '';

    for(var i = 0; i<bookmarks.length; i++){
       var name = bookmarks[i].name;
       var url = bookmarks[i].url;
    bookmarksResults.innerHTML += '<div class="well">'+
                                   '<h3>'+name+
                                   '<a class="btn btn-light ml-2" target="_blank" href="'+url+'">visit</a>'+
                                   '<a class="btn btn-danger ml-2" href="#" onclick="deleteBookmark(\''+url+'\')">delete</a>'
                                   '</h3>'+
                                   '</div>' ;
    }
}

function deleteBookmark(url) {
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    for(var i = 0; i<bookmarks.length; i++){
       if(bookmarks[i].url== url){
        bookmarks.splice(i, 1);
       }
    }

        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));    
        fetchBookmarks();
}

function clearForm(){
    var inputs = document.getElementsByClassName("form-control");
    for(var i=0 ;i<inputs.length; i++){
        inputs[i].value ="";
    }
}