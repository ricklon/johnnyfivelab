float tempValue;

void setup() {
  Serial.begin(9600);
  delay(5000);
  Serial.println("ON");
}

void loop() {
  tempValue = analogRead(A0);
  tempValue = (tempValue * 3.3) / 1024;
  Serial.print("Temp: ");
  Serial.println(tempValue);
  delay(250);
}

