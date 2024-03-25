const customerCash = document.getElementById("cash");
const result = document.getElementById("change-due");
const changeAmount = document.getElementById("change-value");
const purchaseBtn = document.getElementById("purchase-btn");

let cid =[
    ["PENNY", 0.5],
    ["NICKEL", 0],
    ["DIME", 0],
    ["QUARTER", 0],
    ["ONE", 0],
    ["FIVE", 0],
    ["TEN", 0],
    ["TWENTY", 0],
    ["ONE HUNDRED", 0]];

const values = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01];
const price = 19.5;
cid.forEach((item) => { changeAmount.innerHTML += `<p id="${item[0]}" class="changes" >${item[0]}: $${item[1]}
</p>`});
const checkStatus = () => {
    let money = parseFloat(customerCash.value);
    let amount = parseFloat(cid.reduce((total, item) => total + parseFloat(item[1]), 0).toFixed(2));

    if (money < price) {
        alert("Customer does not have enough money to purchase the item");
    } else if (money === price) {
        result.innerText = "No change due - customer paid with exact cash";
    }
    else if(checkSufficient(money) === 0){
        result.innerText = "Status: INSUFFICIENT_FUNDS\u00A0";
    }
    else if ((amount - ((money-price).toFixed(2))) === 0 || amount === 0) {
        result.innerText = "Status: CLOSED\u00A0";
        let change = (money - price).toFixed(2);
        let startPoint = startingValue(change);
        calcChange(startPoint, change);
    } else {
        result.innerText = "Status: OPEN\u00A0";
        let change = (money - price).toFixed(2);
        let startPoint = startingValue(change);
        calcChange(startPoint, change);
    }
    console.log(result.innerText)
};
const calcChangeAvailable = (amountAvailable) => {
    return amountAvailable.reduce((total, item) => total + parseFloat(item[1]), 0);
};
const startingValue = (total) => {
    for (let i = 0; i < values.length; i++) {
        if (total >= values[i]) return i;
    }
};

const calcChange = (start, change) => {
    let counter = 0;
    const ci = cid.reverse();
    for (let i = start; i < values.length; i++) {
        while (change >= values[i] && (counter + 1) * values[i] <= ci[i][1]) {
            change = (change - values[i]).toFixed(2);
            counter++;
        }
        if (change >= 0 && counter > 0) {
            result.innerText += `${ci[i][0]}: $${counter * values[i]}\n`;
            ci[i][1] = (ci[i][1] - counter * values[i]).toFixed(2);
            update(ci);
        }
        counter = 0;
    }
};
 const checkSufficient = (money) => {
    let counter = 0;
    let ci = cid;
    let change = (money - price).toFixed(2);
    for(let i=0;i< values.length; i++){
        while (change >= values[i] && (counter + 1) * values[i] <= ci[i][1]) {
            change = (change - values[i]).toFixed(2);
            counter ++;
        }
    }
    return counter-1;
 };
const update = (ci) => {
    changeAmount.innerHTML = '<p><b>Change in drawer:</b></p>';
    ci.reverse().forEach((item) => {
        changeAmount.innerHTML += `<p id="${item[0]}" class="changes" >${item[0]} $${item[1]}</p>`;
    });
};
purchaseBtn.addEventListener("click", checkStatus);
