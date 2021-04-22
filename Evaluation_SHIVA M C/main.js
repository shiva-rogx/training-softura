$(function(){

    let inputWord;
    let player1 = 0;
    let player2 = 0;
    let gameCount = 0;
    let alphabet = $('#alphabet');
    let scoreboard = $('#scoreboard');
    let initial = $('#initial');
    let input = $('#input');
    let ward = $('#ward');
    let inputField = $('input[name=word]');
    let wordField = $('#wordField');
    let gameStarted = false;
    let player1Turn = false;
    let gameImgs = ['img/player-one-win.png',
        'img/img3.png',
        'img/img2.png',
        'img/img1.png',
        'img/start.png',
        'img/player-two-win.png'];

    function setup(){
        if(gameStarted){
            //Clear dynamically created els from html
            $('.instructions').eq(0).text('');
            wordField.html('');
            alphabet.html('');
            inputField.val('');
            initial.hide();
        }
        else {
            input.hide();
        }
        guessBank = 4;
        correctBank = 0;
        ward.css('background-image', `url(${gameImgs[6]})`);
        wordField.hide();
        alphabet.hide();
    }

    function validate(inputWord) {
      if (inputWord.length <=3) {
          alert("Please enter a word longer than 3 letters!");
          return false;
      }else if (!/^[a-zA-Z]*$/g.test(inputWord)) {
          alert("Please enter only valid characters (a-z and A-Z)!");
          return false;
      }else {
        return true;
      }
    }

    function createLetterHolders(inputWord) {
        for(let i = 0; i < inputWord.length; i++) {
            wordField.append(`<div class="letter-holder">
                <p class="letter">${inputWord[i]}</p><div class="dash"></div>
                </div>`);
            $('.letter').hide();
        }
    }
    function createAlphabet(){
        let letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
        for(let i in letters) {
            alphabet.append($(`<div class="alphabet"><p>${letters[i].toUpperCase()}</p></div>`));
            
        }
    }

  
    function createGameBoard(){
        
        inputWord = inputField.val();
        let valiadation = validate(inputWord);
        if (valiadation) {
            inputWord = inputWord.toUpperCase().split('');
            input.hide();
            createLetterHolders(inputWord);
            createAlphabet();
            alphabet.show();
            wordField.show();
        }else {
            inputField.val('');
        }
    }

    function createScoreBoard(gameCount, player1, player2, guessBank){
      scoreboard.find('p').remove();
      scoreboard.append(`<p>Games Played: ${gameCount}</p>`);
      scoreboard.append(`<p>Player 1 Score: ${player1}</p>`);
      scoreboard.append(`<p>Player 2 Score: ${player2}</p>`);
      scoreboard.append(`<p>Guess Left: ${guessBank}</p>`);
      if (gameCount % 2){
        scoreboard.find('p').eq(1).addClass('player2');
        scoreboard.find('p').eq(2).addClass('player1');
      }
      else {
        scoreboard.find('p').eq(1).addClass('player1');
        scoreboard.find('p').eq(2).addClass('player2');
      }
    }

    function checkUserGuess(letterPicked, divClicked){
        if(inputWord.indexOf(letterPicked)!== -1){
            for(let i in inputWord){
                if(letterPicked === inputWord[i]) {
                    $('.letter').eq(i).show();
                    correctBank++;
            }}
        }else {
            guessBank--;
            ward.css('background-image', 'none');
            ward.css('background-image', `url(${gameImgs[guessBank]})`);
        }
    }

    function reverseScore(player1Turn){
        if (player1Turn){
          player1 += 100;
        }else {
          player2 +=100;
        }
    }
  
    function checkEndGame(guessBank) {
        if (guessBank === 0){
            $('.instructions').eq(0).text('Player 1 has defeated Player 2! Switch roles, and play again?');
            $('.letter').show();
            reverseScore(!player1Turn);
        }else {
            $('.instructions').eq(0).text('Player 2 has defeated Player 1! Switch roles, and play again?');
            ward.css('background-image', `url(${gameImgs[7]})`);
            reverseScore(player1Turn);
        }
        alphabet.html('');
        $('button').eq(0).prop('id', 'startNewGame');
        $('.instructions').eq(1).text('');
        initial.show();
    }

    setup();
    createScoreBoard(gameCount, player1, player2, guessBank);

    $('button').click(function(){
        if($(this).attr('id') === 'start'){
            initial.hide();
            input.show();
            gameStarted = !gameStarted;
        }else if ($(this).attr('id') === 'startNewGame'){
            setup();
            input.show();
            gameCount++;
            player1Turn = !player1Turn;
        }else {
            createGameBoard();
        }
        createScoreBoard(gameCount, player1, player2, guessBank);
    });
    $(document).on('click', '.alphabet', (function(){
        checkUserGuess($('p', this).text(), $(this));
        $(this).removeClass('alphabet').addClass('clicked');
        createScoreBoard(gameCount, player1, player2, guessBank);
        if ((guessBank === 0) || (correctBank === inputWord.length)){
            checkEndGame(guessBank);
        }
    }));
});
