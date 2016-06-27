void setup() {
  Serial.begin(9600);	//init UART
}
void loop() {
  Serial.println();
  Serial.println("Hello World!");
  for (int i = 1; i <= 10; i++) {
    Serial.print(" i = ");
    Serial.println(i, DEC);
  }
  delay(5000); 	//wait five seconds
}
