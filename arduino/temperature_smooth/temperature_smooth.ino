void setup() {
  Serial.begin(9600);
  while(!Serial);
  Serial.println("Reading temperature sensor");
}

void loop() 
{
  // Store 10000 samples, summed, in this variable
  float accumulator = 0;

  // Make 10000 analog conversions
  for (int i=0; i < 10000; i++)
  {
    float sensorValue = analogRead(A0);

    // Convert them to raw volts (raw ADC is 0 to 1023), added fudge factor for accuracy
    float voltage = (sensorValue * (3.3 / 1024.0)) + 0.0025;

    // Sum the raw volts value into the accumulator
    accumulator += voltage;
  }

  // Compute the average voltage over all conversions
  float volt_ave = accumulator/10000.0;

  // Compute Celsius. Sensor reads in 10mV/deg C, with 500mV offset
  float celsius = ((volt_ave * 1000.0) - 500.0) / 10.0;

  // Convert to degrees Fahernheit
  float fahernheit = celsius * (9.0/5.0) + 32.0;

  // Print out the three values for the human
  Serial.print(volt_ave, 3); // Force 3 digits after decimal point
  Serial.print(" V ");
  Serial.print(celsius);
  Serial.print(" C ");
  Serial.print(fahernheit);
  Serial.println(" F");
}
