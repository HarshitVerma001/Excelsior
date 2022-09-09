// select row number div via dom
// query selector is used to select class of name given

// --------- Global Variables ---------------------------------

// last highlighted cell for removing highlight from last selected cell (if any)
let last_highlighted_cell;
let data_obj = {};

let row_numbers_section = document.querySelector(".row-numbers-section");
let cell_selected_div = document.querySelector(".selected-cell-div");
let selectstyle = document.querySelector(".fontstyleselect");
let selectsize = document.querySelector(".fontsizeselect");


//  ------------ Row number label ------- 
// create row number cells (100)
for (let i = 1; i <= 100; i++) {
  // create a div 
  let newdiv = document.createElement("div");
  // give text value as rownumber 
  newdiv.innerText = i;
  // add class to created div
  newdiv.classList.add("row-number-div");
  // add div to row number section div's variable
  row_numbers_section.append(newdiv);
}


//  ------------ Column Name label ------- 
let column_tags_section = document.querySelector(".column-tags-section");
// create column tag cells (A-Z)
for (let i = 0; i < 26; i++) {
  let ascii = 65 + i;
  // convert integer value to ascii value internal fn
  let newchar = String.fromCharCode(ascii);
  let new_div = document.createElement("div");
  new_div.innerText = newchar;
  new_div.classList.add("column-tag");
  column_tags_section.append(new_div);
}


// -------- create grid cells ---------- 
let cells_section = document.querySelector(".cells-section");
for (let i = 1; i <= 100; i++) {
  let rowDiv = document.createElement("div");
  rowDiv.classList.add("row");

  for (let j = 0; j < 26; j++) {
    let ascii = 65 + j;
    let newchar = String.fromCharCode(ascii);
    let cellAddress = newchar + i; //A1 B1............Z1

    // intialize data_obj of current generated cell
    data_obj[cellAddress] = {
      value: undefined,
      formula: undefined,
      downstream: [],
      upstream: [],
      align: "right",
      color: "black",
      bgcolor: "white",
      fontstyle: "Times new Roman",
      fontsize: "Medium",
      bold: false,
      italics: false,
      underline: false,
    };

    let cellDiv = document.createElement("div");

    // Assumption - that we will only enter direct values in cells and only formulas in Formula Bar
    // get direct value from cell and update cell if required
    cellDiv.addEventListener("input", function (e) {

      // jis cell par type kiya uske attribute se maine uska cell address fetch kiya
      let current_cell_address = e.currentTarget.getAttribute("data-address");

      // kyuki sare cell object dataObj me store ho rakhe h using their cell address as key
      // maine jis cell par click karke type kara uska hi address fetch and uska hi object chahiye
      // to wo address as key use karke dataObj se fetch karliya req cell object ko
      let current_cell_object = data_obj[current_cell_address];


      // !! Step 1 and 2 - value and formula change 
      // update value and formula
      current_cell_object.value = e.currentTarget.innerText;
      current_cell_object.formula = undefined;


      // !! Step 3 - Upstream ko saaf kardiya  
      // iterate on upsteam, remove yourself from their DS, clearing your upstream
      let current_upstream = current_cell_object.upstream;
      for (let k = 0; k < current_upstream.length; k++) {

        //removeFromDownStream(Parent,Child)
        removeFromDownStream(current_upstream[k], current_cell_address);
      }

      // !! Step 4 - Upstream ko empty kardiya
      current_cell_object.upstream = [];

      // !! Step 5 and 6 - Not applicable

      // !! Step 7 - Downstream ko bolna hai ki apni  values updates karlo
      let current_downstream = current_cell_object.downstream;
      for (let k = 0; k < current_downstream.length; k++) {
        updateCell(current_downstream[k]);
      }

      data_obj[cellAddress] = current_cell_object;
    });

    // add data address attribute and make it cell editable
    cellDiv.classList.add("cell");
    cellDiv.setAttribute("data-address", cellAddress);
    cellDiv.contentEditable = "true";

    cellDiv.addEventListener("click", function (e) {
      if (cellDiv.innerText == "") {
        cellDiv.style.fontFamily = selectstyle.value;
        data_obj[cellAddress].fontstyle = selectstyle.value;
        cellDiv.style.fontSize = selectsize.value;
        data_obj[cellAddress].fontsize = selectsize.value;
      } else {
        data_obj[cellAddress].fontstyle = selectstyle.value;
        data_obj[cellAddress].fontsize = selectsize.value;
      }

      // ----- Update Highlight ------ 
      // remove highlighted class if last highlight cell exist 
      if (last_highlighted_cell != undefined) {
        last_highlighted_cell.classList.remove("cell-selected");
      }

      // add highted class on current cell 
      e.currentTarget.classList.add("cell-selected");
      // get data address from current cell
      let selected_cell_address = e.currentTarget.getAttribute("data-address");
      // update current cell in menu option bar
      cell_selected_div.innerText = selected_cell_address;
      //  update last highlighted cell
      last_highlighted_cell = e.currentTarget;
    });

    //add current cell in current row
    rowDiv.append(cellDiv);
  }

  // add current row in grid
  cells_section.append(rowDiv);
}


//  ------------ Storage ------- 
// if local storage's sheet is not empty string or undefined
if (localStorage.getItem("sheet")) {
  // parse stored string as JSON object
  data_obj = JSON.parse(localStorage.getItem("sheet"));

  // using for in loop to get data object key 
  for (celladdress in data_obj) {
    let correspondingcell = document.querySelector(
      `[data-address=${celladdress}]`
    );
    if (
      data_obj[celladdress].value != undefined &&
      data_obj[celladdress].value != "" &&
      data_obj[celladdress].value != null
    ) {
      correspondingcell.innerText = data_obj[celladdress].value;
      correspondingcell.style.color = data_obj[celladdress].color;
      correspondingcell.style.backgroundColor = data_obj[celladdress].bgcolor;
      correspondingcell.style.fontFamily = data_obj[celladdress].fontstyle;
      correspondingcell.style.fontSize = data_obj[celladdress].fontsize;
      correspondingcell.style.justifyContent = data_obj[celladdress].align;
      if (data_obj[celladdress].bold) {
        correspondingcell.style.fontWeight = "bold";
      }
      if (data_obj[celladdress].italics) {
        correspondingcell.style.fontStyle = "italic";
      }
      if (data_obj[celladdress].underline) {
        correspondingcell.style.textDecoration = "underline";
      }
    }
  }
}

// ---- add independent scrolling on row number and column name bar ---
cells_section.addEventListener("scroll", function (e) {
  // e.currentTarget.scrollLeft ->   gives left se scrolled distance
  let left_scroll_distance = e.currentTarget.scrollLeft;
  // scroll column name bar by same scroll value
  column_tags_section.style.transform = `translateX(-${left_scroll_distance}px)`;

  // e.currentTarget.scrollTop ->   gives Top se scrolled distance
  let up_scroll_distance = e.currentTarget.scrollTop;
  // scroll row number bar by same scroll value
  row_numbers_section.style.transform = `translateY(-${up_scroll_distance}px)`;
});


// iss function ka bss itna kaam h ki parent do and child do, aur mai parent ki downstream
// se child ko hata dunga taki unke bich ka connection khatam ho jaye
// taki unke bichka connection khatam ho jaye 
// taki agar parent update ho toh connection khatam hone ke baad child update na ho

function removeFromDownStream(ParentCell, ChildCell) {
  // fetch parent Cell's downstream
  let requiredDS = data_obj[ParentCell].downstream;

  // filter out ChildCell from downstream
  let modifiedDS = [];
  for (let i = 0; i < requiredDS.length; i++) {
    if (requiredDS[i] != ChildCell) {
      modifiedDS.push(requiredDS[i]);
    }
  }

  // update dowstream with filtered downstream
  data_obj[ParentCell].downstream = modifiedDS;
}

// Update downstream cell's value with it's upstream's updated value 
function updateCell(cell) {
  let reqd_obj = data_obj[cell];
  let reqd_Upstream = reqd_obj.upstream;
  let reqd_formula = reqd_obj.formula;

  // upstream me jobhi cells hai unke objects me jaunga wahase unki value lekr aaunga. 
  // woh sari values ma ek obj me key value pair form
  // me store kaurnga where key being the cell address
  // eg {A1: 10, B1: 20, ..}

  // to store the value of upstream
  let values_obj = {};
  // fill the obj with values from each upsteams' object
  for (let k = 0; k < reqd_Upstream.length; k++) {
    let celladd = reqd_Upstream[k];
    let cellval = data_obj[celladd].value;
    values_obj[celladd] = cellval;
  }

  // formula to values = "2 * A1" -> "2 * 20" where A1 = 20
  for (key in values_obj) {
    reqd_formula = reqd_formula.replaceAll(key, values_obj[key]);
  }
  // evaluate values new string
  let newValue = eval(reqd_formula);

  // call children to be updated

  let reqd_downstream = reqd_obj.downstream;
  data_obj[cell].value = newValue;
  for (let k = 0; k < reqd_downstream.length; k++) {
    updateCell(reqd_downstream[k]);
  }
  // in post order, update the cell value as all children are processed
  let celltobeupdateddiv = document.querySelector(`[data-address=${cell}]`);
  celltobeupdateddiv.innerText = newValue;
}


// ------------- incase of formula bar input --------
let formula_input = document.querySelector(".formula-bar-div");
formula_input.addEventListener("keydown", function (e) {
  // if enter is pressed in formula bar
  if (e.key == "Enter") {
    let typed_formula = e.currentTarget.value;

    // no cell is selected for formula
    if (last_highlighted_cell == undefined) {
      return;

    } else {

      // !! Step 1- formula change 
      let selected_c_address =
        last_highlighted_cell.getAttribute("data-address");
      let cellobj = data_obj[selected_c_address];
      cellobj.formula = typed_formula;

      // !! step 2- go to upstream cell and remove khudko from downstream
      let US = cellobj.upstream;
      for (let k = 0; k < US.length; k++) {
        removeFromDownStream(US[k], selected_c_address);
      }

      // !! Step 3 - add new formula cell in upstream and connect these upstream cell's
      // downstream to khudko

      // get upstream cells from new formula
      let newUS = [];
      let splittedformula = typed_formula.split(" ");
      for (let k = 0; k < splittedformula.length; k++) {
        let ch = splittedformula[k];
        if (ch == "+" || ch == "-" || ch == "*" || ch == "/" || !isNaN(ch)) {
        } else {
          newUS.push(splittedformula[k]);
          addtoDownstream(splittedformula[k], selected_c_address);
        }
      }

      // !! Step 4 - Evaluate new formula to find new value
      // NB - Could be converted into a function as almost same logic used before
      cellobj.upstream = newUS;
      let values_obj = {};
      for (let k = 0; k < newUS.length; k++) {
        let celladd = newUS[k];
        let cellval = data_obj[celladd].value;
        values_obj[celladd] = cellval;
      }
      for (key in values_obj) {
        typed_formula = typed_formula.replaceAll(key, values_obj[key]);
      }
      let newValue = eval(typed_formula);
      cellobj.value = newValue;


      // !! Step 5 - Update downstream value
      let DS = cellobj.downstream;
      for (let k = 0; k < DS.length; k++) {
        updateCell(DS[k]);
      }
      // store local cellObj into dataObj to udpate global value
      data_obj[selected_c_address] = cellobj;

      // print changed value to UI
      let reqdcell = document.querySelector(
        `[data-address=${selected_c_address}]`
      );
      reqdcell.innerText = newValue;
      e.currentTarget.value = "";
    }
  }
});

// child ko parent ki downstream me add karna hai
function addtoDownstream(parent, child) {
  data_obj[parent].downstream.push(child);
}

let help_btn = document.querySelector(".helpbtn");
help_btn.addEventListener("click", function (e) {
  alert("Even God helps those, who help themselves :)");
});
