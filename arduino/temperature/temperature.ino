void setup() {
  Serial.begin(9600);
  delay(5000);
  Serial.println("ON");
}

void loop() {
  float sensorValue = analogRead(A0);
  float voltage = sensorValue * (3300.0 / 1024.0);
  float celsius = (voltage - 500) / 10.0;
  Serial.print("Celsius: ");
  Serial.println(celsius);
  delay(250);
}
