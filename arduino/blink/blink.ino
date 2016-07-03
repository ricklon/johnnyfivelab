int ledPin = PIN_LED1; 		  //led on pin 1
void setup() {
  pinMode(ledPin, OUTPUT);  //make pin an output
}
void loop() {
  digitalWrite(ledPin, HIGH);  //led on
  delay(1000); 			   //wait one second
  digitalWrite(ledPin, LOW);   //led off
  delay(1000); 			   //wait one second
}
