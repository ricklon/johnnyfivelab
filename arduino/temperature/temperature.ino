void setup() {
  Serial.begin(9600);
  delay(5000);
  Serial.println("ON");
}

float a;
int i;

void loop() {
  a = 0;
  for (i=0; i < 10000; i++)
  {
    float sensorValue = analogRead(A0);
    float voltage = sensorValue * (3300.0 / 1024.0);
    float celsius = (voltage - 500) / 10.0;
    a += celsius;
  }
  Serial.print("Celsius: ");
  Serial.print(a/10000.0);
  Serial.print(" Fahernheit: ");
  Serial.println((a/10000.0) * (9.0/5.0) + 32);
  
}
