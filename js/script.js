// JavaScript Document

$(function () {
    var myList = [];
    var myCheck = [];
var list = '';

if (window.localStorage){
    
    if (localStorage.theList){
        console.log("the list is in storage");
        var theList = JSON.parse(localStorage.theList);
        myList = theList;
        
        
        createAndReportList();
    } else {
        console.log("the list is not in local storage");
        myList = ["Tent", "Sleeping Bag", "Axe", "Water", "Firewood"];
        
        createAndReportList();
    }
}

function createAndReportList(){
    list = '';
    myList.forEach(function(listItem){ 
        list += "<li>" + listItem + "</li>";
    });

    var content = document.getElementById("listContent");
    content.innerHTML = list;
    localStorage.theList = JSON.stringify(myList);
}

    $('#listContent').sortable({
        cursor: 'grabbing', 
        axis: 'y',
        cancel: 'a, span',
        stop: function(){
            console.log("sorting stopped")
            reOrderLists();
        }
    });
    
    function reOrderLists(){
        var myNewList = [];
        $('#listContent li').each(function(index){
            var me = $(this).contents().not($('span')).text();
            var pos = myList.indexOf(me);
            
            myNewList[index] = me;
            
        });
        
        myList = myNewList;
        localStorage.theList = JSON.stringify(myList);
    }
    
    
    $('#listContent li').prepend('<span class="select">&#9711;</span>');
    $("#listContent li").append('<span class="delete">\u00D7</span>');
    
    $("listContent").html(list);
    $('.select').on("click", onSelect);
    $('.delete').on("click", onDelete);

    
    function onSelect(){
       $(this).toggleText("\u2713", "\u25EF");
     
    }

  function onDelete() {
     var me = $(this).parent().contents().not($('span')).text();
      var pos = myList.indexOf(me);
      myList.splice(pos, 1);
      localStorage.theList = JSON.stringify(myList);
      $(this).parent().animate({opacity: 0, 'margin-bottom': -40}, 300, 'swing', function(){$(this).remove();}); 
    
  }
 
    
    
$("#submit").click(function () {
    var myText = $('#addToList').val();
    myList.push(myText);
    localStorage.theList = JSON.stringify(myList);
    $('#listContent').append('<li><span class="select">&#9711;</span>' + myText + "<span class='delete'>\u00D7</span></li>");
   $("#listContent li:last-child .select").on("click", onSelect);
    $("#listContent li:last-child .delete").on("click", onDelete);
     $("#listContent li:last-child").hide().slideDown(100);
    $("#addToList").val("");
  });

    
//jQuery Text Toggling function
 jQuery.fn.extend({
    toggleText: function (a, b){
        var that = this;
            if (that.text() != a && that.text() != b){
                that.text(a);
            }
            else
            if (that.text() == a){
                that.text(b);
            }
            else
            if (that.text() == b){
                that.text(a);
            }
        return this;
    }
});
    
    

});
