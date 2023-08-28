radio.onReceivedString(function (receivedString) {
    recieve = 1
})
let flag = false
let rain = 0
let recieve = 0
radio.setGroup(48)
OLED.init(128, 64)
basic.clearScreen()
basic.forever(function () {
    basic.clearScreen()
    rain = Environment.ReadWaterLevel(AnalogPin.P2)
    flag = false
    recieve = 0
    OLED.clear()
    OLED.writeString("water level:")
    OLED.writeNumNewLine(rain)
    while (input.buttonIsPressed(Button.A)) {
        servos.P1.setAngle(45)
        music.play(music.tonePlayable(988, music.beat(BeatFraction.Half)), music.PlaybackMode.UntilDone)
    }
    if (rain >= 4) {
        flag = true
        radio.sendString("GO")
    }
    if (flag == true) {
        if (recieve == 1) {
            servos.P1.setAngle(90)
            music.play(music.tonePlayable(988, music.beat(BeatFraction.Half)), music.PlaybackMode.UntilDone)
        }
    } else {
        servos.P1.setAngle(0)
    }
    basic.pause(1000)
})
