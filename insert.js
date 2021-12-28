// Inserts div with styled text into new opened page
function inject() {
  var div = document.createElement("div");
  div.id = "insertion";
  div.style.position = "fixed";
  div.style.top = 0;
  div.style.left = 0;
  div.style.color = "#aeaeae";
  div.style.background = "#bcffbc";
  div.style.fontWeight = "bold";
  div.style.fontFamily = "arial";
  div.textContent = " We recommend you this recipe. Happy cookig!";
  document.body.appendChild(div);
}
inject();
