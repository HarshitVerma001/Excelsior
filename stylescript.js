// ------------ Alignment --------------------------

// in the align cell content class, get all the span tag 
let allAlignOptions = document.querySelectorAll(".align-cell-content span");
let leftAlignbtn = allAlignOptions[0];
let centerAlignbtn = allAlignOptions[1];
let rightAlignbtn = allAlignOptions[2];

leftAlignbtn.addEventListener("click", function (e) {
  // apply setting on last highlighted cell if it exists
  if (last_highlighted_cell != undefined) {
    // justify content on left
    last_highlighted_cell.style.justifyContent = "left";
    // store the changes in cell object
    // Note - Storage is for the cases when we store data using storage API so that we can use it later
    let address = last_highlighted_cell.getAttribute("data-address");
    data_obj[address].align = "left";
  }
});

centerAlignbtn.addEventListener("click", function (e) {
  if (last_highlighted_cell != undefined) {
    last_highlighted_cell.style.textAlign = "center";
    last_highlighted_cell.style.justifyContent = "center";
    let address = last_highlighted_cell.getAttribute("data-address");
    data_obj[address].align = "center";
  }
});

rightAlignbtn.addEventListener("click", function (e) {
  if (last_highlighted_cell != undefined) {
    last_highlighted_cell.style.justifyContent = "right";
  }
  let address = last_highlighted_cell.getAttribute("data-address");
  data_obj[address].align = "right";
});


// ------------ Alignment --------------------------
let boldBtn = document.querySelector(".bold");
let italicsBtn = document.querySelector(".italics");
let underLineBtn = document.querySelector(".underline");

let boldspan = document.querySelector(".boldouterspan");
let italicsspan = document.querySelector(".italicsouterspan");
let underlinespan = document.querySelector(".underlineouterspan");
boldBtn.addEventListener("click", function (e) {
  if (last_highlighted_cell != undefined) {
    let isBold =
      data_obj[last_highlighted_cell.getAttribute("data-address")].bold;
    if (!isBold) {
      last_highlighted_cell.style.fontWeight = "bold";
      let address = last_highlighted_cell.getAttribute("data-address");
      data_obj[address].bold = true;
      boldspan.style.color = "green";
    } else {
      last_highlighted_cell.style.fontWeight = "100";
      let address = last_highlighted_cell.getAttribute("data-address");
      data_obj[address].bold = false;
      boldspan.style.color = "black";
    }
  }
});
italicsBtn.addEventListener("click", function (e) {
  if (last_highlighted_cell != undefined) {
    let isItalics =
      data_obj[last_highlighted_cell.getAttribute("data-address")].italics;
    if (!isItalics) {
      last_highlighted_cell.style.fontStyle = "italic";
      let address = last_highlighted_cell.getAttribute("data-address");
      data_obj[address].italics = true;
      italicsspan.style.color = "green";
    } else {
      last_highlighted_cell.style.fontStyle = "normal";
      let address = last_highlighted_cell.getAttribute("data-address");
      data_obj[address].italics = false;
      italicsspan.style.color = "black";
    }
  }
});
underLineBtn.addEventListener("click", function (e) {
  if (last_highlighted_cell != undefined) {
    let isUnderLined =
      data_obj[last_highlighted_cell.getAttribute("data-address")].underline;
    if (!isUnderLined) {
      last_highlighted_cell.style.textDecoration = "underline";
      let address = last_highlighted_cell.getAttribute("data-address");
      data_obj[address].underline = true;
      underlinespan.style.color = "green";
    } else {
      last_highlighted_cell.style.textDecoration = "none";
      let address = last_highlighted_cell.getAttribute("data-address");
      data_obj[address].underline = false;
      underlinespan.style.color = "black";
    }
  }
});

let cells = document.querySelectorAll(".cell");
let fb = document.querySelector(".formula-bar-div");
for (let i = 0; i < cells.length; i++) {
  let cell = cells[i];
  cell.addEventListener("click", function (e) {
    if (data_obj[last_highlighted_cell.getAttribute("data-address")].bold) {
      boldspan.style.color = "green";
    } else {
      boldspan.style.color = "black";
    }
    if (data_obj[last_highlighted_cell.getAttribute("data-address")].italics) {
      italicsspan.style.color = "green";
    } else {
      italicsspan.style.color = "black";
    }
    if (
      data_obj[last_highlighted_cell.getAttribute("data-address")].underline
    ) {
      underlinespan.style.color = "green";
    } else {
      underlinespan.style.color = "black";
    }
  });
}

let allCells = document.querySelector(".cells-section");
let font_style_select = document.querySelector(".fontstyleselect");
font_style_select.addEventListener("change", function (e) {
  if (last_highlighted_cell == undefined) {
    return;
  }
  let font_style = e.currentTarget.value;
  last_highlighted_cell.style.fontFamily = font_style;
  data_obj[last_highlighted_cell.getAttribute("data-address")].fontstyle =
    font_style;
});

let font_size_select = document.querySelector(".fontsizeselect");
font_size_select.addEventListener("change", function (e) {
  if (last_highlighted_cell == undefined) {
    return;
  }
  let font_size = e.currentTarget.value;
  last_highlighted_cell.style.fontSize = font_size;
  data_obj[last_highlighted_cell.getAttribute("data-address")].fontsize =
    font_size;
});

// ------------ Coloring --------------------------

let body = document.querySelector("body");
let bgcolor_selector = document.querySelector(".bgcolor");
let textcolor_selector = document.querySelector(".textcolor");

// -- background color--
// on selecting bgColor icon, create a color picker and apply choosen color
bgcolor_selector.addEventListener("click", function (e) {
  // create a color picker input type and add to body and open it up by click
  let colorPicker = document.createElement("input");
  colorPicker.type = "color";
  body.append(colorPicker);
  colorPicker.click();

  // add background color to last highlighted cell on selecting bgColor
  colorPicker.addEventListener("input", function (e) {
    let color_chosen = e.currentTarget.value;
    if (last_highlighted_cell != undefined) {
      last_highlighted_cell.style.backgroundColor = color_chosen;
      // store the bgColor setting of curr cell to dataObj for future use of save
      data_obj[last_highlighted_cell.getAttribute("data-address")].bgcolor =
        color_chosen;
    }
  });
});

// -- font color --
// on selecting font Color icon, create a color picker and apply choosen color
textcolor_selector.addEventListener("click", function (e) {
  let colorPicker = document.createElement("input");
  colorPicker.type = "color";
  body.append(colorPicker);
  colorPicker.click();
  colorPicker.addEventListener("input", function (e) {
    let color_chosen = e.currentTarget.value;
    if (last_highlighted_cell != undefined) {
      last_highlighted_cell.style.color = color_chosen;
      data_obj[last_highlighted_cell.getAttribute("data-address")].color =
        color_chosen;
    }
  });
});

// ------------ Storage --------------------------
let saveBtn = document.querySelector(".saveicon");
saveBtn.addEventListener("click", function (e) {
  // in local storage, save string with name of 'sheet'
  localStorage.setItem("sheet", JSON.stringify(data_obj));
});

let clearBtn = document.querySelector(".clearicon");
clearBtn.addEventListener("click", function (e) {
  // in local storage, update the stored 'sheet' as empty string
  localStorage.setItem("sheet", "");
});