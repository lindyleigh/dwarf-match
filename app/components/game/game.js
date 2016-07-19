;(function () {
  angular.module('dwarfMatch')
    .component('gameComponent', {
      controller: GameController,
      templateUrl: 'app/components/game/game.html'
    })

  function GameController ($timeout, GameService) {
    var gc = this

    // This is a freebie we are using the GameService to help keep our controller clean. The GameServie will be in charge of creating and shuffling the deck.
    gc.deck = GameService.getDeck()

    var cardOne = null;
    var cardTwo = null;

    gc.flipped = 0;
    gc.pairs = 0;
    gc.victory = false;


    // Create two card variables. These will be responsible
    // for keeping track of our selections as we click cards.

    // Next we need to initate a few more variables on gc for later use
    // Let's add variables for tracking the number of guesses (pairs flipped),
    // for the total number of correct guesses (pairs matched) and finally a
    // victory boolean to let our controller know if we've won. Refer to the index.html
    // for variable names

    gc.selectCard = function(card) {
      if(card.show || cardOne && cardTwo) {
        return;
      }

      card.show = true;
      if(!cardOne) {
        cardOne = card;
      }

      else {
        cardTwo = card;

        if(gc.isMatch()) {
          gc.pairs ++;
          gc.flipped ++;
          gc.resetCards();
          return;
        } else { $timeout(function() {
          cardOne.show = false;
          cardTwo.show = false;
          gc.resetCards();
          }, 1000)

            return;
        }
      }

    }

    

    // Next write a selectCard function on gc that accepts a card object on click and
    // let's make it set card.show to true (boolean). Give it a test!
    // After you complete this refer back to readme.md

    gc.resetCards = function() {
      cardOne = null;
      cardTwo = null;
      gc.flipped ++;
    };

    // Write a local resetCards function that will empty our card variables
    // and increase the number of attempts

    gc.isMatch = function() {

      if(cardOne.title == cardTwo.title) {
        return true;

      } else {
        return false;
      }
    //     gc.pairs ++;
    //     gc.flipped ++;
    //     cardOne = null;
    //     cardTwo = null;
    //     return;
    //   } else { $timeout(function() {
    //     gc.resetCards();
    //   }, 2000)
    //   }
    }

    // Next write a local isMatch function that accepts our two cards and if the card titles 
    // match, increases our totalMatches and returns true else returns false. After this refer 
    // back to readme.md

  function checkVictory() {
  if(gc.pairs == gc.deck.length*0.5) {
    gc.victory = true;
  }
  }

  checkVictory();
    // Finally, write a local checkVictory function that will set gc.victory = true if the totalMatches 
    // is half the length of the deck. Tip: the game deck array is available at gc.deck. When you're done
    // refer back to readme.md

    // Bonus Challenge: Write a function on gc that can reset the game and add a button that calls it

  }
}())
