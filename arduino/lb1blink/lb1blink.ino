//Setup the inputs and outputs and run once 
void setup() {
      pinMode(PIN_LED1, OUTPUT);  
}
// the loop function runs over and over again forever
void loop() {
    digitalWrite(PIN_LED1, HIGH);
    delay(750);
    digitalWrite(PIN_LED1, LOW);
    delay(250);
  
}
