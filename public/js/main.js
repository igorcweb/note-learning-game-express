'use strict';

(function() {
  let note,
    imgSrc,
    reg,
    noteNumber,
    notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
    trebleButton = $('.treble'),
    bassButton = $('.bass'),
    bothButton = $('.both'),
    easyButton = $('#easy'),
    mediumButton = $('#medium'),
    hardButton = $('#hard'),
    noteButtons = $('ul.note-buttons'),
    regButtons = $('ul.register-buttons'),
    clefButtons = $('.button__mode--clef'),
    score = 0,
    scoreDisplay = $('h1 span#streak'),
    usedNotes = [],
    maxNotes = 0,
    counter = 0,
    hamburger = $('.hamburger'),
    cross = $('.cross'),
    fullKeyboard = $('ul.keyboard-keys'),
    level = 'easy',
    clef = 'treble',
    answeredNote = false,
    answeredReg = false;

  generateTreble();

  function reset() {
    noteButtons
      .children()
      .show()
      .css({
        opacity: '1',
        color: 'inherit',
        'background-color': 'rgba(180, 191, 191, 0.9)'
      });
    regButtons
      .children()
      .show()
      .css({
        opacity: '1',
        color: 'inherit',
        'background-color': 'rgba(180, 191, 191, .9)'
      });
    $('.task1').text('Pick a Note:');
    $('.task2').text('Pick a Register:');
    $('.task3').text('or Pick a Key:');
    $('.task4').text('or a Key:');
    $('div.button__task').css('opacity', '1');
    answeredNote = false;
    answeredReg = false;
  }

  function generateTreble() {
    reset();
    switch (level) {
      case 'medium':
        mediumTreble();
        maxNotes = 17;
        break;
      case 'hard':
        hardTreble();
        maxNotes = 32;
        break;
      default:
        easyTreble();
        maxNotes = 11;
    }
    let noteLetter = notes[noteNumber];
    note = noteLetter + reg;
    //prevent repeating notes until all have been used
    if (counter === maxNotes || counter >= 32) {
      counter = 0;
      usedNotes = [];
    }
    //----------------------------------
    if (usedNotes.indexOf(note) != -1) {
      generateTreble();
    } else {
      counter++;
      imgSrc = `images/${note}.jpg`;
      $('.notes').attr('src', imgSrc);
      usedNotes.push(note);
    }
  }

  function generateBass() {
    reset();
    switch (level) {
      case 'medium':
        mediumBass();
        maxNotes = 17;
        break;
      case 'hard':
        hardBass();
        maxNotes = 26;
        break;
      default:
        easyBass();
        maxNotes = 11;
    }
    let noteLetter = notes[noteNumber];
    note = noteLetter + reg;
    //prevent repeating notes until all have been used
    if (counter === maxNotes || counter >= 26) {
      counter = 0;
      usedNotes = [];
    }
    //-----------------------------------
    if (usedNotes.indexOf(note) >= 0) {
      generateBass();
    } else {
      counter++;
      imgSrc = 'images/' + 'b' + note + '.jpg';
      $('.notes').attr('src', imgSrc);
      usedNotes.push(note);
    }
  }

  let count = 0;
  function generateBoth() {
    let bothClefs = [generateTreble, generateBass];
    count++;
    let i = count % 2 === 0 ? 0 : 1;
    bothClefs[i]();
  }

  function easyTreble() {
    reg = getRandomInt(4, 5);
    if (reg === 4) {
      noteNumber = getRandomInt(1, 6);
    } else {
      noteNumber = getRandomInt(0, 4);
    }
  }

  function mediumTreble() {
    reg = getRandomInt(3, 6);
    if (reg === 3) {
      noteNumber = getRandomInt(5, 6);
    } else if (reg === 6) {
      noteNumber = 0;
    } else {
      noteNumber = getRandomInt(0, 6);
    }
  }

  function hardTreble() {
    reg = getRandomInt(3, 7);
    noteNumber = getRandomInt(0, 6);
    if (reg === 3) {
      noteNumber = getRandomInt(3, 6);
    }
  }

  function easyBass() {
    reg = getRandomInt(2, 3);
    if (reg === 2) {
      noteNumber = getRandomInt(3, 6);
    } else {
      noteNumber = getRandomInt(0, 6);
    }
  }

  function mediumBass() {
    reg = getRandomInt(2, 4);
    if (reg < 4) {
      noteNumber = getRandomInt(0, 6);
    } else {
      noteNumber = getRandomInt(0, 2);
    }
  }

  function hardBass() {
    reg = getRandomInt(1, 4);
    noteNumber = getRandomInt(0, 6);
    if (reg === 4) {
      noteNumber = getRandomInt(0, 4);
    }
  }

  //Treble Button
  $('.clef').on('click', '.treble', function() {
    clef = 'treble';
    $('div.button__task').css('opacity', '1');
    generateTreble();
    $('.clef')
      .children()
      .removeClass('selected hard medium highlight');
    $(this).addClass('selected highlight');
  });

  //Bass Button
  $('.clef').on('click', '.bass', function() {
    clef = 'bass';
    $('div.button__task').css('opacity', '1');
    generateBass();
    $('.clef')
      .children()
      .removeClass('selected hard medium highlight')
      .addClass('easy');
    $(this).addClass('selected highlight');
  });

  //Both Button
  $('.clef').on('click', '.both', function() {
    clef = 'both';
    $('div.button__task').css('opacity', '1');
    generateBoth();
    $('.clef')
      .children()
      .removeClass('selected hard medium highlight')
      .addClass('easy');
    $(this).addClass('selected highlight');
  });

  //Easy Button
  $('.level').on('click', '#easy', function() {
    level = 'easy';
    $('.level')
      .children()
      .removeClass('hard medium highlight selected');
    $(this).addClass('highlight selected');
    if (trebleButton.hasClass('selected')) {
      generateTreble();
    } else if (bassButton.hasClass('selected')) {
      generateBass();
    } else {
      generateBoth();
    }
  });

  //Medium Button
  $('.level').on('click', '#medium', function() {
    level = 'medium';
    $('.level')
      .children()
      .removeClass('easy hard highlight selected');
    $(this).addClass('highlight selected');
    if (trebleButton.hasClass('selected')) {
      generateTreble();
    } else if (bassButton.hasClass('selected')) {
      generateBass();
    } else {
      generateBoth();
    }
  });

  //Hard Button
  $('.level').on('click', '#hard', function() {
    level = 'hard';
    $('.level')
      .children()
      .removeClass('easy medium highlight selected');
    $(this).addClass('highlight selected');
    if (trebleButton.hasClass('selected')) {
      generateTreble();
    } else if (bassButton.hasClass('selected')) {
      generateBass();
    } else {
      generateBoth();
    }
  });

  function win() {
    let answered = answeredNote && answeredReg ? true : false;
    if (answered) {
      score += 1;
      scoreDisplay.text(' ' + score);
      switch (clef) {
        case 'bass':
          setTimeout(generateBass, 2000);
          break;
        case 'both':
          setTimeout(generateBoth, 2000);
          break;
        default:
          setTimeout(generateTreble, 2000);
      }
    }
  }

  noteButtons.on('click', 'li.button', function() {
    let clickedNote = $(this)[0];
    if (clickedNote.dataset.note === note[0]) {
      answeredNote = true;
      $(this).css({
        color: '#fafafa',
        'background-color': 'steelblue'
      });
      $(this)
        .siblings()
        .hide();
      $('.task1').text('Correct!');
      win();
    } else {
      score = 0;
      $('.task1')
        .text('Try Again!')
        .css('color', '#e9ebee');
      setTimeout(function() {
        $('.task1').css('color', '#333');
      }, 200);
      scoreDisplay.text(' ' + score);
      $(this).css('opacity', '0');
    }
  });

  regButtons.on('click', 'li.button', function() {
    let clickedReg = $(this)[0];
    if (clickedReg.dataset.reg === note[1]) {
      answeredReg = true;
      $(this).css({
        color: '#fafafa',
        'background-color': 'steelblue'
      });
      $(this)
        .siblings()
        .hide();
      $('.task2').text('Correct!');
      win();
    } else {
      score = 0;
      $('.task2')
        .text('Try Again!')
        .css('color', '#e9ebee');
      setTimeout(function() {
        $('.task2').css('color', '#333');
      }, 200);
      scoreDisplay.text(' ' + score);
      $(this).css('opacity', '0');
    }
  });

  hamburger.on('click', function() {
    $(this).hide();
    cross.show();
    $('.button__mode').css('visibility', 'visible');
    $('.button__info').css('visibility', 'visible');
  });

  cross.on('click', function() {
    $(this).hide();
    hamburger.show();
    $('.button__mode').css('visibility', 'hidden');
    $('.button__info').css('visibility', 'hidden');
  });

  //small keyboard for small screens
  // $('.one-octave > img').each(function() {
  //   $(this).on('click', function() {
  //     if ($(this).attr('alt') === note[0]) {
  //       noteButton.each(function() {
  //         if ($(this).context.innerText === note[0]) {
  //           $(this).css({
  //             color: '#fafafa',
  //             'background-color': 'steelblue'
  //           });
  //           $(this)
  //             .siblings()
  //             .hide();
  //           clefButtons.addClass('note');
  //           $('.task1').text('Correct!');
  //           $('.task4').text('Correct!');
  //           win();
  //         }
  //       });
  //     } else {
  //       $('.task4').text('');
  //       setTimeout(function() {
  //         $('.task4').text('Try Again!');
  //       }, 200);
  //       score = 0;
  //       scoreDisplay.text(' ' + score);
  //     }
  //   });
  // });

  //Full Keyboard for Large and Medium Screens
  fullKeyboard.on('click', 'li', function() {
    let clickedKey = $(this)[0];
    note = note.toLowerCase();
    if (clickedKey.dataset.key === note) {
      buttonWin();
      $('.task3').text('Correct!');
      answeredNote = true;
      answeredReg = true;
      win();
    } else {
      score = 0;
      $('.task3')
        .text('Try Again!')
        .css('color', '#e9ebee');
      setTimeout(function() {
        $('.task3').css('color', '#333');
      }, 200);
      scoreDisplay.text(' ' + score);
    }
  });

  function buttonWin() {
    $('.note-buttons > li.button').each(function() {
      if ($(this)[0].dataset.note === note[0].toUpperCase()) {
        $(this).css({ color: '#fafafa', backgroundColor: 'steelblue' });
        $(this)
          .siblings()
          .hide();
        $('.task1').text('Correct!');
      }
    });

    $('.register-buttons > li.button').each(function() {
      if ($(this)[0].dataset.reg === note[1]) {
        $(this).css({ color: '#fafafa', backgroundColor: 'steelblue' });
        $(this)
          .siblings()
          .hide();
        $('.task2').text('Correct!');
      }
    });
  }

  //Random Number Generator
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  //Footer Year
  $('.year').text(new Date().getFullYear());
})();
