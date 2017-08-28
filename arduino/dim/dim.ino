#include "SoftPWMServo.h"

// LED on pin 1 (built-in green LED on FBMini)
const int pinLed = LED_BUILTIN;
//assume pot on analog 2 (pin 4 on FBMini)
const int pinPot = A2;  

void setup() {   //nothing needed
}

void loop() {
  int val;
  val = analogRead(pinPot);
  SoftPWMServoPWMWrite(pinLed, val/(1024.0/256.0));
  delay(100);
}

