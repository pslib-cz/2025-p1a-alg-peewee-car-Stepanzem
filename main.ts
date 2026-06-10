// *Kód pro ovladač*
// AI bylo použito na to aby nám poradilo jak fungují nějaké funkce (eg. Math.map, Rotation.Pitch/Roll),
// také bylo použito pro debugging a kontrolu logiky u některých částí kódu

let controllerSerialNumber = -1133145777
let strip = neopixel.create(DigitalPin.P8, 9, NeoPixelMode.RGB)
radio.setGroup(23)

let leftMotorCompensation = 1.15

strip.showColor(NeoPixelColors.Purple)
strip.show()

radio.onReceivedString(function (receivedString: string) {
    let sender = radio.receivedPacket(RadioPacketProperty.SerialNumber)
    if (sender !== controllerSerialNumber) {
        return
    }

    let indexY = receivedString.indexOf("Y")
    let indexG = receivedString.indexOf("G")

    let xText = receivedString.substr(1, indexY - 1)
    let xAngle = parseInt(xText)

    let yText = receivedString.substr(indexY + 1, indexG - (indexY + 1))
    let yAngle = parseInt(yText)

    let gText = receivedString.substr(indexG + 1)
    let gear = parseInt(gText)

    let throttle = yAngle
    let steering = xAngle

    if (gear == 1) {
        steering = steering * 0.7
    }

    let leftSpeed = throttle + steering
    let rightSpeed = throttle - steering

    if (rightSpeed != 0) {
        rightSpeed = rightSpeed * leftMotorCompensation
    }

    leftSpeed = Math.max(-100, Math.min(100, leftSpeed))
    rightSpeed = Math.max(-100, Math.min(100, rightSpeed))

    if (throttle > 15) {
        strip.showColor(NeoPixelColors.Green)
    } else if (throttle < -15) {
        strip.showColor(NeoPixelColors.Red)
    } else if (Math.abs(steering) > 10) {
        strip.showColor(NeoPixelColors.Yellow)
    } else {
        strip.showColor(NeoPixelColors.Purple)
    }
    strip.show()

    PeeWeeLight.wheelSpeed(leftSpeed, -rightSpeed)
})