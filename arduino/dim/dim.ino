int pinLed = 9;		//Needs a PWM pin for analogWrite()
int pinPot = A0;	//assume pot on analog 0
void setup() {	//nothing needed
}
void loop() {
  int val;
  val = analogRead(pinPot);
  analogWrite(pinLed, val / (1024 / 256));
  delay(1000); 
}

