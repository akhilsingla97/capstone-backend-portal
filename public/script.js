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
    }
  };
  xhttp.open("POST", "prepared/" + id, true);
  xhttp.send();
}