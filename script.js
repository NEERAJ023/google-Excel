let sno= document.querySelector(".sno");
let header_icon=document.querySelector(".tools");
let row=100;
let coloum=26;
function createheader(){
    for(let i=0;i<=coloum;i++){
        let div=document.createElement("div");
        div.classList.add("cells");
        if(i!==0){
            div.innerText=String.fromCharCode(i+64);
        }
        header_icon.appendChild(div);
    }
}
createheader();
function createrow(){
    for(let i=1;i<=row;i++){
        let div=document.createElement("div");
        div.classList.add("sno-cell");
        div.innerText=i;
        sno.appendChild(div);
    }
}
createrow();
let body =document.querySelector(".body");
function row2(){
    for(let i=1; i<=row; i++){
        coloum2(i);
    }
}
row2();

function coloum2(b){
    let rows=document.createElement("div");
    rows.className="row";
    for(let i=1; i<=coloum; i++){
        let innercell=document.createElement("div");
        innercell.classList.add("innercell");
        innercell.contentEditable=true;
        innercell.id=String.fromCharCode(i+64)+b;
        innercell.addEventListener("focus",onfocus);
        innercell.addEventListener("change",formchange)
        rows.appendChild(innercell);
    }
    body.appendChild(rows);
}

let form= document.querySelector("form");
let active_cell=document.querySelector("#active-cell");
let state={};
let defaultstate={
    bold:false,
    italic:false,
    underline:false,
    align:"left",
    color:"#000000",
    bgcolor:"#ffffff"
   }
   let activeElement=null;
function onfocus(event){
     activeElement=event.target;
    let   ElementId=  activeElement.id;
    active_cell.innerText=ElementId;
    if(state[ElementId]){
        resetoption(state[ElementId]);
   }else{
       resetoption(defaultstate);
   }
}
function formchange(){
    if(!activeElement){
        alert("please select a cell");
        form.reset();
        return;
      }
      let currstate={
        textcolor:form.color.value,
        isbold:form.bold.checked,
        isitalic:form.italic.checked,
        isunderline:form.underline.checked,
        textalign:form.align.value,
        bgcolor:form.bgcolor.value
    }
    console.log(currstate.isbold);
    applystyletotext(currstate);
    state[activeElement.id]={...currstate,value:activeElement.innerText}; 
}
function resetoption(optionstate){
    form.bold.checked=optionstate.bold;
    form.italic.checked=optionstate.italic;
    form.underline.checked=optionstate.underline;
    form.align.value=optionstate.align;
    form.color.value=optionstate.color;
    form.bgcolor.value=optionstate.bgcolor;  
    console.log(form.bold.checked);
}
function applystyletotext(subjectobject){
    activeElement.style.color=subjectobject.textcolor;
        activeElement.style.backgroundColor=subjectobject.bgcolor;
        activeElement.style.textAlign=subjectobject.textalign;
        if(subjectobject.isbold){
            activeElement.style.fontWeight="bold";
        }else{
            activeElement.style.fontWeight="normal";
        }
        if(subjectobject.isitalic){
            activeElement.style.fontStyle="italic";
        }else{
            activeElement.style.fontStyle="normal";
        }
        if(subjectobject.isunderline){
            activeElement.style.textDecoration="underline";
        }else{
            activeElement.style.textDecoration="none";
        }
}

let downloadBtn = document.querySelector(".import");
let uploadBtn = document.querySelector(".export");



downloadBtn.addEventListener("click", function (event) {
    const fileData = JSON.stringify(state);
    const blob = new Blob([fileData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement("a");
    link.href = url;
    link.download = "sheets.json";
    link.click();
  
});

function importData(e) {
  e.preventDefault();
  const input = document.createElement("input");
  input.type = "file";

  input.addEventListener("change", (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const importedSheets = JSON.parse(e.target.result);
        state.length = 0;

        importedSheets.forEach((importedSheet) => {
            state.push(importedSheet);
        });
        switchSheet(state.length - 1);
        updateUI();
      };

      reader.readAsText(file);
    }
  });

  input.click();
}

uploadBtn.addEventListener("click", importData);
let copy=document.querySelector("#copy");
let cut=document.querySelector("#cut");
let paste=document.querySelector("#paste");
let current="";
copy.addEventListener("click",()=>{
     current=activeElement.innerText;
     console.log(current);
})
paste.addEventListener("click",()=>{
   
    activeElement.innerText=current;
    console.log(current);
})
cut.addEventListener("click",()=>{
    current=activeElement.innerText;
    if(cut){
        activeElement.innerText="";
    }
})
let input=document.querySelector(".input");
input.addEventListener("focus",()=>{
    let expression=input.value;
    let result=eval(expression);
    activeElement.innerText=result;
})


