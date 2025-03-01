let dropList = document.querySelectorAll(".dropdown select")
let fromCurrency = document.querySelector(".from select")
let toCurrency= document.querySelector(".to select")
let getButton =document.querySelector("form button")
console.log(getButton);

console.log(dropList);


for (let index = 0; index < dropList.length; index++) {
    
    for(currency_code in countryList){
        // select default currency
        let selected;
        if(index==0){
            selected=currency_code=="USD" ? "selected" : "";
        }
        else if(index==1){
            selected=currency_code=="INR" ? "selected" : ""
        }

        //creating option tag with passing currency code as a text and value
        let optionTag =`<option value="${currency_code}" ${selected}>${currency_code}</option>`
        console.log(optionTag);
        //inserting option tag inside the select tag
        dropList[index].insertAdjacentHTML("beforeend",optionTag)
    }

    dropList[index].addEventListener("change", e=>{
        console.log(e.target);
        
        loadFlag(e.target); //calling loading flag with passing target element as an argument
    })
}

function loadFlag(element){
    for(code in countryList){
        if(code == element.value){
            let imgTag=element.parentElement.querySelector("img")
            console.log(imgTag);

            imgTag.src=`https://flagsapi.com/${countryList[code]}/flat/64.png`
            
        }
    }
}


window.addEventListener("onload",()=>{
    console.log(e);
    e.preventDefault(); //preventing from form submitting
    getExchangeRate();
})
getButton.addEventListener("click",e=>{
    console.log(e);
    e.preventDefault(); //preventing from form submitting
    getExchangeRate();
})

const exchangeIcon=document.querySelector(".dropdown .icon")

exchangeIcon.addEventListener("click",()=>{
    let temp =fromCurrency.value
    fromCurrency.value=toCurrency.value
    toCurrency.value =temp
    loadFlag(fromCurrency)
    loadFlag(toCurrency)
    getExchangeRate()
})

function getExchangeRate(){
    const amount = document.querySelector(".amount input")
    console.log(amount.value);
    let amountValue=amount.value;
    const exchangeRateTxt= document.querySelector(".msg")

    //if user don't put any value or enter 0 then we'll put 1 by default in the input box
    if(amountValue=="" || amountValue=="0"){
        amount.value="1";
        amountValue=amount.value;
    }

    exchangeRateTxt.innerText="Getting Exchange Rate..."
    let url =` https://v6.exchangerate-api.com/v6/dcca92fd5133c9040ab1f74c/latest/${fromCurrency.value}`
    fetch(url)
    .then(response =>response.json())
    .then(result=>{
        console.log(result.conversion_rates);
        let exchangeRate = result.conversion_rates[toCurrency.value]
        let totalExchangeRate=(amountValue*exchangeRate).toFixed(2)
        console.log(exchangeRate);
        console.log(totalExchangeRate);
        
        
        exchangeRateTxt.innerText=`${amountValue} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value} `
        
    }).catch(()=>{
        exchangeRateTxt.innerText="Something Went Wrong"
    })
}