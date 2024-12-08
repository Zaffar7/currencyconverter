const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdown= document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromcurr=document.querySelector(".from select");
const tocurr=document.querySelector(".to select");
const msg = document.querySelector(".msg");

window.addEventListener("load" ,()=>{
    updateexchangerate();
});

for(let select of dropdown){
    for(currcode in countryList){
        let newopt = document.createElement("option");
        newopt.innerText=currcode;
        newopt.value =currcode;
        if(select.name==="from" && currcode==="USD"){
            newopt.selected="selected";
        }
      else if(select.name==="to" && currcode==="INR"){
            newopt.selected="selected";
        }
        select.append(newopt); 
    }
    select.addEventListener("change",(evt)=>{
        updflag(evt.target);
    });
}
const updflag =(element) =>{
    let currcode=element.value;
    let ctrycode =countryList[currcode];
    let newsrc=`https://flagsapi.com/${ctrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src=newsrc;

};
btn.addEventListener("click" ,(evt)=>{
evt.preventDefault();
updateexchangerate();

});
updateexchangerate =async ()=>{
    let amt= document.querySelector("form input");
let amtval =amt.value;
if(amtval===" " || amtval <1){
    amtval=1;
    amt.value="1";
}
const URL = `${BASE_URL}/${fromcurr.value.toLowerCase()}.json`;

//const URL=`${BASE_URL}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
let response =await fetch(URL);
let data =await response.json();
let rate = data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];

//let rate = data[tocurr.value.toLowerCase()];
let finalamt= amtval*rate;
msg.innerText = `${amtval} ${fromcurr.value} = ${finalamt}${tocurr.value}`

};