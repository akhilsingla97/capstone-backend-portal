setTimeout(function() {
  window.location.reload(1);
}, 10000000);

function confirmOrder(id) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("confirm" + id).disabled = true;
      document.getElementById("done" + id).disabled = false;
      alert("Order Confirmed!");
    }
  };
  xhttp.open("POST", "confirm/" + id, true);
  xhttp.send();
}

function completedOrder(id) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      $("#" + id).remove();
      alert("Order finished!");
    }
  };
  xhttp.open("POST", "prepared/" + id, true);
  xhttp.send();
}

function decrementCounter(itemid, orderid) {
  var buttonId = "button" + itemid + orderid;
  var counterId = "counter" + orderid;
  var itemId = itemid + orderid;
  var count = document.getElementById(counterId).innerHTML;
  count -= 1;
  document.getElementById(counterId).innerHTML = count;
  document.getElementById(itemId).style.color = "#d96950";
  // incase you want strikes
  // var str = document.getElementById(itemId).innerHTML;
  // document.getElementById(itemId).innerHTML = str.strike();
  if (count === 0) {
    document.getElementById("done" + orderid).disabled = false;
  }
  document.getElementById(buttonId).disabled = true;
}

function SendingWaiter(id, purpose) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      $("#" + id).remove();
      alert("Waiter sent...");
    }
  };
  if(purpose == "Generate Bill")
    xhttp.open("GET", "generateBill/101", true);
  else
    xhttp.open("POST", "sendWaiter/" + id, true);
  xhttp.send();
}

function submitForm(){
  console.log('function called')
  var email = $("#exampleInputEmail1").val();
  var pwd = $("#exampleInputPassword1").val()
  $.post('/login',{"email":email, "password":pwd}, (token)=>{
    if(token=="e-mail id invalid")
      alert(token);
    else if(token=="Incorrect Password")
      alert(token);
    else
      location.replace("/home")
  })
  // location.replace("/home");
  // xhttp.send();
}

// $("#submitForm").click(function(){
//   console.log('hello')
//   var email = $("exampleInputEmail1").val()
//   var pwd = $("exampleInputPassword1").val()
//   $.post('/login',{"email":email, "password":pwd},()=>{
//     location.replace("/home")
//   })
// })