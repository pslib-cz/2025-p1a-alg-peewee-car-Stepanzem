# Řešení úkolu 1 a 2
## Link na google drive s videem
https://drive.google.com/file/d/11G9PpqDkhBfw_jqtSvoQKFOtRCJLLQog/view?usp=drive_link
## Kód pro Breakdance
```typescript
//**Making the LED's starting color**
//I have 12 leds here for more smooth rainbow colors rotating
let strip = neopixel.create(DigitalPin.P8, 12, NeoPixelMode.RGB)
strip.showColor(neopixel.rgb(10, 82, 4))

//**Making logo on the built in microbit led screen**
//(column, line, brightness)

//First column
led.plotBrightness(0, 0, 0)
led.plotBrightness(0, 1, 0)
led.plotBrightness(0, 2, 0)
led.plotBrightness(0, 3, 255)
led.plotBrightness(0, 4, 255)

//Second column
led.plotBrightness(1, 0, 255)
led.plotBrightness(1, 1, 255)
led.plotBrightness(1, 2, 0)
led.plotBrightness(1, 3, 0)
led.plotBrightness(1, 4, 255)

//Third column
led.plotBrightness(2, 0, 0)
led.plotBrightness(2, 1, 0)
led.plotBrightness(2, 2, 0)
led.plotBrightness(2, 3, 0)
led.plotBrightness(2, 4, 255)

//Fourth column
led.plotBrightness(3, 0, 255)
led.plotBrightness(3, 1, 255)
led.plotBrightness(3, 2, 0)
led.plotBrightness(3, 3, 0)
led.plotBrightness(3, 4, 255)

//Fifth column
led.plotBrightness(4, 0, 0)
led.plotBrightness(4, 1, 0)
led.plotBrightness(4, 2, 0)
led.plotBrightness(4, 3, 255)
led.plotBrightness(4, 4, 255)

//**Body of the code**

//*Starting*
let didWeStart: boolean = false
input.onButtonPressed(Button.A, () => {
    didWeStart = true
})

//Movement
basic.forever(() => {
    if (didWeStart) {
        //Spinning
        PeeWeeLight.wheelSpeed(50, 50)
        basic.pause(1000)
        PeeWeeLight.wheelSpeed(-50, -50)
        basic.pause(1000)
        //Driving in many directions
        PeeWeeLight.wheelStop()
        basic.pause(500)
        for (let i = 0; i <= 5; i++) {
            PeeWeeLight.wheelSpeed(50, -50)
            basic.pause(1000)
            PeeWeeLight.wheelSpeed(50, 50)
            basic.pause(333)
        }
    }
    basic.pause(10)
})

//LED's
basic.forever(() => {
    if (didWeStart) {
        strip.showRainbow(1, 360)
        while (didWeStart) {
            strip.rotate(1)
            strip.show()
            basic.pause(500)
        }
    }
    basic.pause(10)
})

//*Ending*
input.onButtonPressed(Button.B, () => {
    didWeStart = false
})

//Movement
basic.forever(() => {
    if (didWeStart === false) {
        PeeWeeLight.wheelStop()
    }
    basic.pause(10)
})

//LED's
basic.forever(() => {
    if (didWeStart === false) {
        strip.showColor(neopixel.rgb(10, 82, 4))
    }
    basic.pause(10)
})
```
