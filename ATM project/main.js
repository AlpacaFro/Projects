function setLocal() {
  localStorage.setItem("cardNo", 2754372283459272);
  localStorage.setItem("LogPIN", 4567);
  localStorage.setItem("cardBal", 30000);
}
setLocal();


let counter = 0;
let savedBalance = parseInt(localStorage.getItem("cardBal"));
let createSumText;
let tranCatcher = "";
const elForm = document.querySelector("form");
const buttonsDiv = document.querySelector("div");
const btnNodeList = buttonsDiv.querySelectorAll("button");
const depotInputBtn = document.getElementById("depotInputBtn");
const withdrawInputBtn = document.getElementById("withdrawInputBtn");
const depositInput = document.getElementById("depositInput");
const withdrawInput = document.getElementById("withdrawInput");
const lastTransactionCard = document.getElementById("lastTransactionCard");
const categoriesCardsContent = document.querySelectorAll(
  "#categoriesCards > div"
);


function updateBalance(amount, type) {
  savedBalance =
    type === "deposit" ? savedBalance + amount : savedBalance - amount;
  localStorage.setItem("cardBal", `${savedBalance}`);
  createSumText = document.createElement("h2");
  createSumText.innerText = `Your current balance is ${savedBalance} EggPlants`;
}


function recordTransaction(value, type) {
  tranCatcher = ` - A ${type} of ${value} EggPlants was made on • ${new Date().toLocaleString()}`;
  updateTrans(tranCatcher);
}


function updateTrans(tranCatcher) {
  const createPara = document.createElement("p");
  createPara.innerHTML = tranCatcher;
  lastTransactionCard.appendChild(createPara);
  lastTransactionCard.classList.add("show");
}


function validateInput(input) {
  return input !== "" && parseInt(input) > 0;
}

elForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const inpValue = document.getElementById("pinInput").value;
  let validationText = document.getElementById("validation");

  if (inpValue === localStorage.getItem("LogPIN")) {
    validationText.innerText = "Connected";
    validationText.classList.remove("invalid");
    validationText.classList.add("valid");
    buttonsDiv.classList.remove("hidden");
    elForm.style.display = "none";
  } else {
    if (3 - counter > 0) {
      validationText.innerText = `Incorrect, you have ${
        3 - counter
      } tries left.`;
      validationText.classList.add("invalid");
      counter++;
    } else {
      location.reload();
    }
  }
});


btnNodeList.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    categoriesCardsContent.forEach((div) => div.classList.add("hidden"));
    categoriesCardsContent[index].classList.remove("hidden");
  });
});


depotInputBtn.addEventListener("click", () => {
  if (validateInput(depositInput.value)) {
    if (!createSumText) createDeposit();
    else {
      updateBalance(parseInt(depositInput.value), "deposit");
      depositCard.appendChild(createSumText);
      recordTransaction(depositInput.value, "deposit");
    }
  } else {
    alert("Please insert a valid number.");
  }
});


withdrawInputBtn.addEventListener("click", () => {
  if (validateInput(withdrawInput.value)) {
    if (!createSumText) createWithdraw();
    else {
      updateBalance(parseInt(withdrawInput.value), "withdraw");
      withdrawCard.appendChild(createSumText);
      recordTransaction(withdrawInput.value, "withdraw");
    }
  } else {
    alert("Please insert a valid number.");
  }
});


function createDeposit() {
  updateBalance(parseInt(depositInput.value), "deposit");
  depositCard.appendChild(createSumText);
}


function createWithdraw() {
  updateBalance(parseInt(withdrawInput.value), "withdraw");
  withdrawCard.appendChild(createSumText);
}


balanceBtn.addEventListener("click", () => {
  balanceCard.innerHTML = "";
  createSumText = document.createElement("h1");
  createSumText.innerText = `Your current balance is ${localStorage.getItem(
    "cardBal"
  )} EggPlants`;
  balanceCard.appendChild(createSumText);
  createSumText.classList.add("balance");
  setTimeout(() => {
    createSumText.classList.add("show");
  }, 10);
});
