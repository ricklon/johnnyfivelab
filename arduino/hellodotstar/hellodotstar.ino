#include <Adafruit_DotStar.h>
#include <SPI.h>

#define NUMPIXELS    30  // Number of LEDs in strip

#define RED    0xFF0000
#define GREEN  0x00FF00
#define BLUE   0x0000FF

uint32_t frame[NUMPIXELS];
uint32_t colors[3] = {RED, GREEN, BLUE };

Adafruit_DotStar strip = Adafruit_DotStar(NUMPIXELS, DOTSTAR_BGR);

void setup() {
  strip.begin(); // Initialize pins for output
  strip.show();  // Turn all LEDs off ASAP

  //initialize strip array
  for (int i = 0; i < NUMPIXELS; i++) {
    frame[i] = RED; //initialize all to red
    strip.setPixelColor(i, frame[i]);
  }
  strip.show();
  delay(1000);
  //initialize strip array
  for (int i = 0; i < NUMPIXELS; i++) {
    frame[i] = GREEN; //initialize all to GREEN
    strip.setPixelColor(i, frame[i]);
  }
  strip.show();
  delay(1000);
  //initialize strip array
  for (int i = 0; i < NUMPIXELS; i++) {
    frame[i] = BLUE; //initialize all to BLUE
    strip.setPixelColor(i, frame[i]);
  }
  strip.show();
  delay(1000);
}

void loop() {
  /*
    for (int ii = 0; ii < NUMPIXELS; ii++) {
     frame[ii] = colors[ii % 3]; //initialize all to red
     strip.setPixelColor(ii, frame[ii]);
    }
    strip.show();
  */

  for (int i = 0; i <= NUMPIXELS; i++) {
    if (i == 0) {
      frame[i] = 0xFFFFFF;
      strip.setPixelColor(i, frame[i]);
      strip.show();
      delay(100);
    }
    else {
      frame[i - 1] = 0x000000;
      frame[i] = 0xFFFFFF;
      strip.setPixelColor(i - 1, frame[i - 1]);
      strip.setPixelColor(i, frame[i]);
      strip.show();
      delay(100);
    }

    for (int i = NUMPIXELS; i < 0; i--) {
      if (i == 30) {
        frame[i] = 0xFFFFFF;
        strip.setPixelColor(i, frame[i]);
        strip.show();
        delay(100);
      }
      else {
        frame[i + 1] = 0x000000;
        frame[i] = 0xFFFFFF;
        strip.setPixelColor(i + 1, frame[i + 1]);
        strip.setPixelColor(i, frame[i]);
        strip.show();
        delay(100);
      }
    }
  }
}
