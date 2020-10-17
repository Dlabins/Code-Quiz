function resultHighscores() {
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
    
    highscores.sort(function(a, b) {
      
      return b.score - a.score;
    });
  
    highscores.forEach(function(score) {
      var list = document.createElement("li");
      list.textContent = score.initials + " - " + score.score;

      var orderedList = document.getElementById("highscores");
      orderedList.appendChild(list);
    });
  }
  
  function removeHighscores() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
  }
  
  document.getElementById("clear").onclick = removeHighscores;
  
  resultHighscores();
  