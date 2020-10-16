function resultHighscores() {
    // either get scores from localstorage or set to empty array
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
  
    // sort highscores by score property in descending order
    highscores.sort(function(a, b) {
      return b.score - a.score;
    });
  
    highscores.forEach(function(score) {
      // create li tag for each high score
      var list = document.createElement("li");
      list.textContent = score.initials + " - " + score.score;
  
      // display on page
      var orderedList = document.getElementById("highscores");
      orderedList.appendChild(list);
    });
  }
  
  function removeHighscores() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
  }
  
  document.getElementById("clear").onclick = removeHighscores;
  
  // run function when page loads
  resultHighscores();
  