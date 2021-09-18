#include <HX711.h>
#include <TM1637Display.h>

#define WEIGHT1_DATA_PIN 2
#define WEIGHT1_CLOCK_PIN 3

#define WEIGHT2_DATA_PIN 4
#define WEIGHT2_CLOCK_PIN 5

#define DISPLAY_DATA_PIN 6
#define DISPLAY_CLOCK_PIN 7

HX711 weight1;
HX711 weight2;

TM1637Display display(DISPLAY_CLOCK_PIN, DISPLAY_DATA_PIN);

#define DISPLAY_TAG "d1:"
#define DISPLAY_TAG_LENGTH 3
#define DISPLAY_TEXT_LENGTH 4
#define DISPLAY_DATA_LENGTH (DISPLAY_TAG_LENGTH + DISPLAY_TEXT_LENGTH)

void setup() {
  Serial.begin(9600);
  Serial.setTimeout(100);
  
  weight1.begin(WEIGHT1_DATA_PIN, WEIGHT1_CLOCK_PIN);
  weight2.begin(WEIGHT2_DATA_PIN, WEIGHT2_CLOCK_PIN);

  display.setBrightness(3);
}

void loop() {
  readWeightIfReady(weight1, "w1");
  readWeightIfReady(weight2, "w2");

  updateDisplay();
}

void readWeightIfReady(HX711 weight, const char* name) {
  if (!weight.is_ready()) return;

  Serial.print(name);
  Serial.print(":");
  Serial.print(weight.read());
  Serial.print(";");
}

void updateDisplay() {
  if (!Serial.available()) return;
  String data = Serial.readStringUntil(';');
  if (!data.startsWith(DISPLAY_TAG)) return;
  if (data.length() != DISPLAY_DATA_LENGTH) return;
  
  String text = data.substring(DISPLAY_TAG_LENGTH, DISPLAY_DATA_LENGTH);
  display.setSegments(text.c_str(), DISPLAY_TEXT_LENGTH);
}
