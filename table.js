// https://stackoverflow.com/questions/38916969/how-to-create-a-javascript-multiplication-table
var tabIndex = 1;

//https://stackoverflow.com/questions/12376173/auto-submit-form-using-javascript
function auto_submit() {
  // If the form is valid
  if( $("form#form").valid() == true ) {
    // Then make it submit, which should update the tab in the process.
    $("form#form").submit();
  }
}

//https://stackoverflow.com/questions/29143955/how-to-call-a-javascript-function-as-well-as-save-the-form-data-into-a-text-file
function save_tab() {

  // 
  var tabCount = $("#tabs li").length + 1;
  console.log("Current tab count is: " + tabCount);

  if(tabCount > 5) {
    alert("You can only save 5 table. You can remove saved table to save this table.");
    return false;
  }

  $( "#tabs" ).tabs();

  
  var horizontal_start = Number(document.getElementById('horizontal_start').value);
  var horizontal_end = Number(document.getElementById('horizontal_end').value);
  var vertical_start = Number(document.getElementById('vertical_start').value);
  var vertical_end = Number(document.getElementById('vertical_end').value);

  tabIndex++;   

  // 
  var title = "<li class='tab'><a href='#tab-" + tabIndex + "'>" + horizontal_start +
              " to " + horizontal_end + " by " + vertical_start + " to " + vertical_end + "</a>" +
              "<span class='ui-icon ui-icon-close' role='presentation'></span>" + "</li>";

  
  $( "div#tabs ul" ).append( title );

  $( "div#tabs" ).append('<div id="tab-' + tabIndex + '">' + $("#multiplication_table").html() + '</div>');

  $( "#tabs" ).tabs("refresh");

  $( "#tabs" ).tabs("option", "active", -1);

  // https://www.codeproject.com/Questions/1027735/On-Click-Of-Button-I-Need-Tab
  $( "#tabs" ).delegate( "span.ui-icon-close", "click", function() {
      var panelID = $( this ).closest( "li" ).remove().attr( "aria-controls" );
      $( "#" + panelID ).remove();

      try {
        $( "#tabs" ).tabs("refresh");
      }
      catch (e) {
      }

      if( $('div#tabs ul li.tab').length == 0) {
        try {
          $("#tabs").tabs("destroy");
        }
        catch (e) {
            
        }

        return false;   
      }
  });
}


//https://kenwheeler.github.io/slick/ 
function slider() {
  
  // 
  $("#slider_horizontal_start").slider({
    min: -50,
    max: 50,
    slide: function(event, ui) {
      $("#horizontal_start").val(ui.value);
      auto_submit();  
    }
  });
  $("#horizontal_start").on("keyup", function() {
    $("#slider_horizontal_start").slider("value", this.value);
    auto_submit();  
  });

  $("#slider_horizontal_end").slider({
    min: -50,
    max: 50,
    slide: function(event, ui) {
      $("#horizontal_end").val(ui.value);
      auto_submit();  
    }
  });
  $("#horizontal_end").on("keyup", function() {
    $("#slider_horizontal_end").slider("value", this.value);
    auto_submit(); 
  });

  $("#slider_vertical_start").slider({
    min: -50,
    max: 50,
    slide: function(event, ui) {
      $("#vertical_start").val(ui.value);
      auto_submit();  
    }
  });
  $("#vertical_start").on("keyup", function() {
    $("#slider_vertical_start").slider("value", this.value);
    auto_submit(); 
  });

  $("#slider_vertical_end").slider({
    min: -50,
    max: 50,
    slide: function(event, ui) {
      $("#vertical_end").val(ui.value);
      auto_submit();  
    }
  });
  $("#vertical_end").on("keyup", function() {
    $("#slider_vertical_end").slider("value", this.value);
    auto_submit();  
  });
}

//https://jqueryvalidation.org/validate/
/* https://stackoverflow.com/questions/37355054/min-max-price-range-validation-not-working-with-jquery-validate-js */
/*https://stackoverflow.com/questions/17934565/submithandler-function-not-working*/
function validate() {

  /*       */
  $("#form").validate({
    // Rules
    rules: {
      horizontal_start: {
        number: true,
        min: -50,
        max: 50,
        required: true
      },
      horizontal_end: {
        number: true,
        min: -50,
        max: 50,
        required: true
      },
      vertical_start: {
        number: true,
        min: -50,
        max: 50,
        required: true
      },
      vertical_end: {
        number: true,
        min: -50,
        max: 50,
        required: true
      }
    },

    messages: {
      horizontal_start: {
        number:     "ERROR: you did not enter a valid number.<br/>Please enter a number between -50 and 50 in horizontal start.",
        min:        "ERROR: number entered is too small.<br/>Please enter a number between -50 and 50 in horizontal start.",
        max:        "ERROR: number entered is too large.<br/>Please enter a number between -50 and 50 in horizontal start.",
        required:   "ERROR: no number was entered.<br/>Please enter a number between -50 and 50 in horizontal start."
      },
      horizontal_end: {
        number:     "ERROR: you did not enter a valid number.<br/>Please enter a number between -50 and 50 in horizontal end.",
        min:        "ERROR: number entered is too small.<br/>Please enter a number between -50 and 50 in horizontal end.",
        max:        "ERROR: number entered is too large.<br/>Please enter a number between -50 and 50 in horizontal end.",
        required:   "ERROR: no number was entered.<br/>Please enter a number between -50 and 50 in horizontal end."
      },
      vertical_start: {
        number:     "ERROR: you did not enter a valid number.<br/>Please enter a number between -50 and 50 in vertical start.",
        min:        "ERROR: number entered is too small.<br/>Please enter a number between -50 and 50 in vertical start.",
        max:        "ERROR: number entered is too large.<br/>Please enter a number between -50 and 50 in vertical start.",
        required:   "ERROR: no number was entered.<br/>Please enter a number between -50 and 50 in vertical start."
      },
      vertical_end: {
        number:     "ERROR: you did not enter a valid number.<br/>Please enter a number between -50 and 50",
        min:        "ERROR: number entered is too small.<br/>Please enter a number between -50 and 50",
        max:        "ERROR: number entered is too large.<br/>Please enter a number between -50 and 50",
        required:   "ERROR: no number was entered."
      }
    },

        //https://stackoverflow.com/questions/17934565/submithandler-function-not-working
    submitHandler: function() {
      table_calculate();
      return false;
    },

    invalidHandler: function() {
      $("#warning").empty();
      $("#multiplication_table").empty();
    },

    errorElement: "div",
    errorPlacement: function(error, element) {
      error.insertAfter(element);
    },

    onkeyup: function( element, event ) {
      auto_submit();
    }
  });
}

//function calculate table.
function table_calculate() {
  /*
      
  */
  var horizontal_start = Number(document.getElementById('horizontal_start').value);
  var horizontal_end = Number(document.getElementById('horizontal_end').value);
  var vertical_start = Number(document.getElementById('vertical_start').value);
  var vertical_end = Number(document.getElementById('vertical_end').value);

  
  $("#warning").empty();
  
  if (horizontal_start > horizontal_end) {

    $("#warning").append("<p class='warning_class'>Swapping the Horizontal start and Horizontal end.</p>");

    var tmp_num = horizontal_start;
    horizontal_start = horizontal_end;
    horizontal_end = tmp_num;
  }

  if (vertical_start > vertical_end) {

    $("#warning").append("<p class='warning_class'>Swapping the Vertical start and Vertical end.</p>");

    var tmp_num = vertical_start;
    vertical_start = vertical_end;
    vertical_end = tmp_num;
  }

  var matrix = {};

  var rows = Math.abs(horizontal_end - horizontal_start);
  var columns = Math.abs(vertical_end - vertical_start);

  
  var horz = horizontal_start;
  var vert = vertical_start;

  for (var x = 0; x <= columns; x++) {
    var tmp_arr = [];

    for (var y = 0; y <= rows; y++) {
      var calc = horz * vert;
      tmp_arr[y] = calc;
      horz++;
    }

    matrix["row" + x] = tmp_arr;

    horz = horizontal_start;       
    vert++;
  }
    
  var content = "";

  content += "<table>";

  content += "<tr><td></td>";
 //https://stackoverflow.com/questions/6012823/how-to-make-html-table-cell-editable
  for (var a = horizontal_start; a <= horizontal_end; a++) {
    content += "<td>" + a + "</td>";
  }


  content += "</tr>";

  var vert = vertical_start;
    
  for (var x = 0; x <= columns; x++) {
    
    content += "<tr><td>" + vert + "</td>";

    for (var y = 0; y <= rows; y++) {
      content += "<td>" + matrix["row" + x][y] + "</td>";
    }
    vert++;

    content += "</tr>";
  }

  content += "</table>";

  $("#multiplication_table").html(content);

  return false;
}
