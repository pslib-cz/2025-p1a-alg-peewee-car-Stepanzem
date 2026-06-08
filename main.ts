//*Kód pro ovládání microbitu*
let serioveeCisloOvladace = -1133145777
let strip = neopixel.create(DigitalPin.P8, 9, NeoPixelMode.RGB)
radio.setGroup(23)
let rychlost: number = 100
let shakedTimes: number = 0

radio.onReceivedString(function (receivedString: string) {
    let ovladac = radio.receivedPacket(RadioPacketProperty.SerialNumber)
    if (ovladac === serioveeCisloOvladace) {

        if (receivedString === "goForward") {
            PeeWeeLight.wheelSpeed(rychlost, -rychlost)
            strip.showColor(NeoPixelColors.Red)
        } else if(receivedString === "goBack"){
            PeeWeeLight.wheelSpeed(-rychlost, rychlost)
            strip.showColor(NeoPixelColors.Indigo)
        } else if (receivedString === "turnLeft") {
            PeeWeeLight.wheelSpeed(rychlost, 0)
            strip.showColor(NeoPixelColors.Yellow)
        } else if (receivedString === "turnRight") {
            PeeWeeLight.wheelSpeed(0, -rychlost)
            strip.showColor(NeoPixelColors.Blue)
        } else if (receivedString === "stop") {
            PeeWeeLight.wheelStop()
            strip.clear()
            strip.show()
        } else if (receivedString === "shaked") {
            shakedTimes++
            if (shakedTimes === 1) {
                rychlost = 30
            } else if (shakedTimes === 2) {
                rychlost = 100
                shakedTimes = 0
            }
        }
    }
})
