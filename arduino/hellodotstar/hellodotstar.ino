#include <Adafruit_DotStar.h>
#include <SPI.h>

// Number of LEDs in strip
#define NUMPIXELS    30  
#define RED    0xFF0000
#define GREEN  0x00FF00
#define BLUE   0x0000FF
#define WHITE  0xFFFFFF
#define BLACK  0x000000

uint32_t frame[NUMPIXELS];
uint32_t colors[] = 
  {RED, GREEN, BLUE, WHITE, BLACK};

Adafruit_DotStar strip = 
  Adafruit_DotStar(NUMPIXELS, DOTSTAR_BGR);

void setup() {
  strip.begin(); // Initialize pins for output

  // Write all LEDs to be red
  for (int i = 0; i < NUMPIXELS; i++) {
    strip.setPixelColor(i, RED);
  }
  strip.show();
  delay(1000);
  // Write all LEDs to be green
  for (int i = 0; i < NUMPIXELS; i++) {
    strip.setPixelColor(i, GREEN);
  }
  strip.show();
  delay(1000);
  // Write all LEDs to be blue
  for (int i = 0; i < NUMPIXELS; i++) {
    strip.setPixelColor(i, BLUE);
  }
  strip.show();
  delay(1000);
}
void loop() {
  // and so on . . . 

  
  // Start off with LEDs set to random colors
  for (int i = 0; i < NUMPIXELS; i++) {
    frame[i] = colors[random(3)];   // Save the color in the frame
  }
  DisplayFrame(frame);

  // Slowly clear the strip, one LED at a time
  for (int j = 0; j <= NUMPIXELS - 1; j++)
  {
    // Slide all colors down one LED
    for (int i = 0; i <= NUMPIXELS - 1; i++) {
      frame[i] = frame[i+1];
    }
    frame[NUMPIXELS-1] = BLACK;
    DisplayFrame(frame);
    delay(50);
  }
}

// Put a frame's worth of colors out on the LED strip
void DisplayFrame(uint32_t * NewFrame) {
  for (int i = 0; i < NUMPIXELS; i++) {
    strip.setPixelColor(i, NewFrame[i]);
  }
  strip.show();
}
 
