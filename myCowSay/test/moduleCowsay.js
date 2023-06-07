const log = console.log;

class Animal {
  duckSay(message) {
    log(`
      ( ${message} )
         \\
           \\
            _.-.
        __.-' ,  \\
       '--'-'._   \\
               '.  \\
                )-- \\ __.--._
               /   .'        '--.
              .               _/-._
              :       ____._/   _-'
               '._          _.'-'
                  '-._    _.'
                      \\_|/
                     __|||
                      >__/'
    `)
  }

  catSay(message) {
    log(`
      ( ${message} )
         \\
           \\
         /\\_/\\  (
            ( ^.^ ) _)
              \\"/  (
            ( | | )
           (__d b__)
    `)
  }

  elephantSay(message) {
    log(`
           ( ${message} )
       \\
         \\
         _.--, ,.--.
         .'   .'    /
         | @       |'..--------._
        /      \\._/              '.
       /  .-.-                     \\
      (  /    \\                     \\
       \\\\      '.                  | #
        \\\\       \\   -.           /
         :\\       |    )._____.'   \\
          "       |   /  \\  |  \\    )
                  |   |./'  :__ \\.-'
                  '--'
    `)
  }

  monkeySay(message) {
    log(`
      ( ${message} )
         \\
           \\
         __
         w  c(..)o   (
          \\__(-)    __)
              /\\   (
             /(_)___)
             w /|
              | \\
              m  m
    `)
  }
}

module.exports = Animal;
