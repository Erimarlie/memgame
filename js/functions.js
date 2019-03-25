function gameChooser() {
  const one = document.getElementById("gc");
  const child = one.rows;
  let number = getRandomInt();

  for (i = 0; i < child.length; i++) {
    child[i].style = "";
  }

  switch (number) {
    case 1:
      child[1].style.backgroundColor = "lightgrey";
      break;
    case 2:
      child[2].style.backgroundColor = "lightgrey";
      break;
    case 3:
      child[3].style.backgroundColor = "lightgrey";
      break;
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * 3) + 1; //The maximum is exclusive and the minimum is inclusive
}

// Shuffle function
function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
}