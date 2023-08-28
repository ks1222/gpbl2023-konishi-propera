flag = False
rain = 0
OLED.init(128, 64)
basic.clear_screen()

def on_forever():
    global rain, flag
    basic.clear_screen()
    rain = Environment.read_water_level(AnalogPin.P3)
    flag = False
    OLED.clear()
    OLED.write_string("water level:")
    OLED.write_num_new_line(rain)
    if rain >= 4:
        flag = True
    if flag == True:
        servos.P1.set_range(0, 90)
        Environment.led_brightness(AnalogPin.P2, True)
        music.play(music.tone_playable(988, music.beat(BeatFraction.HALF)),
            music.PlaybackMode.UNTIL_DONE)
    else:
        servos.P1.set_range(90, 0)
        Environment.led_brightness(AnalogPin.P2, False)
    basic.pause(1000)
basic.forever(on_forever)
