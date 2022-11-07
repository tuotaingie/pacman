input.onButtonPressed(Button.A, function () {
    pacman.turn(Direction.Left, 90)
})
input.onButtonPressed(Button.AB, function () {
    press += 1
    if (press % 2 == 0) {
        game.resume()
    } else {
        game.pause()
    }
})
input.onButtonPressed(Button.B, function () {
    pacman.turn(Direction.Right, 90)
})
function GAME (SPEED: number) {
    pacman.move(1)
    basic.pause(SPEED)
    ghost.move(1)
    basic.pause(SPEED)
    if (ghost.get(LedSpriteProperty.X) < pacman.get(LedSpriteProperty.X)) {
        ghost.change(LedSpriteProperty.X, 1)
        basic.pause(SPEED)
    } else if (ghost.get(LedSpriteProperty.X) > pacman.get(LedSpriteProperty.X)) {
        ghost.change(LedSpriteProperty.X, -1)
        basic.pause(SPEED)
    } else if (ghost.get(LedSpriteProperty.Y) < pacman.get(LedSpriteProperty.Y)) {
        ghost.change(LedSpriteProperty.Y, 1)
        basic.pause(SPEED)
    } else if (ghost.get(LedSpriteProperty.Y) > pacman.get(LedSpriteProperty.Y)) {
        ghost.change(LedSpriteProperty.Y, -1)
        basic.pause(SPEED)
    }
}
let pacman: game.LedSprite = null
let ghost: game.LedSprite = null
let press = 0
press = 0
let lives = 3
game.setScore(0)
basic.showNumber(lives)
basic.pause(3000)
let food = game.createSprite(2, 2)
ghost = game.createSprite(4, 4)
pacman = game.createSprite(0, 0)
food.set(LedSpriteProperty.Blink, 250)
ghost.set(LedSpriteProperty.Brightness, 50)
pacman.set(LedSpriteProperty.Brightness, 200)
basic.forever(function () {
    if (pacman.isTouching(food)) {
        music.startMelody(music.builtInMelody(Melodies.PowerUp), MelodyOptions.Once)
        food.change(LedSpriteProperty.X, randint(0, 4))
        food.change(LedSpriteProperty.Y, randint(0, 4))
        game.addScore(5)
        edubitTrafficLightBit.toggleLed(LedColor.Green)
        basic.pause(500)
    }
    if (pacman.isTouching(ghost)) {
        music.startMelody(music.builtInMelody(Melodies.Wawawawaa), MelodyOptions.Once)
        lives += -1
        basic.showNumber(lives)
        basic.pause(3000)
        pacman.set(LedSpriteProperty.X, 0)
        pacman.set(LedSpriteProperty.Y, 0)
        edubitTrafficLightBit.toggleLed(LedColor.Red)
        basic.pause(500)
    }
    if (lives == 0) {
        game.gameOver()
        music.startMelody(music.builtInMelody(Melodies.Funeral), MelodyOptions.Once)
        edubitTrafficLightBit.toggleLed(LedColor.All)
        basic.pause(500)
    }
})
basic.forever(function () {
    if (edubitPotentioBit.comparePot(PotCompareType.MoreThan, 800)) {
        GAME(500)
    } else if (edubitPotentioBit.comparePot(PotCompareType.MoreThan, 600)) {
        GAME(750)
    } else {
        GAME(1000)
    }
})
