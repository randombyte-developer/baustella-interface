#include <HX711.h>
#include <TM1637Display.h>
#include <DallasTemperature.h>
#include <OneWire.h>

#define SCALE1_DATA_PIN 2
#define SCALE1_CLOCK_PIN 3

#define SCALE2_DATA_PIN 4
#define SCALE2_CLOCK_PIN 5

#define DISPLAY_DATA_PIN 6
#define DISPLAY_CLOCK_PIN 7

#define BUTTON1_PIN 8
#define BUTTON2_PIN 9
#define BUTTON3_PIN 10

#define ONE_WIRE_BUS_PIN 11

#define MAX_TEMPERATURE_SENSORS 1

HX711 scale1;
HX711 scale2;

OneWire oneWire(ONE_WIRE_BUS_PIN);
DallasTemperature sensors(&oneWire);

TM1637Display display(DISPLAY_CLOCK_PIN, DISPLAY_DATA_PIN);

#define DISPLAY_TAG "d0:"
#define DISPLAY_TAG_LENGTH 3
#define DISPLAY_TEXT_LENGTH 4
#define DISPLAY_DATA_LENGTH (DISPLAY_TAG_LENGTH + DISPLAY_TEXT_LENGTH)

void setup() {
  Serial.begin(9600);
  Serial.setTimeout(100);
  
  scale1.begin(SCALE1_DATA_PIN, SCALE1_CLOCK_PIN);
  scale2.begin(SCALE2_DATA_PIN, SCALE2_CLOCK_PIN);

  display.setBrightness(3);

  setupButton(BUTTON1_PIN);
  setupButton(BUTTON2_PIN);
  setupButton(BUTTON3_PIN);

  sensors.setWaitForConversion(false);
  sensors.begin();
  sensors.requestTemperatures();
}

void loop() {
  readScaleIfReady(scale1, "s0");
  readScaleIfReady(scale2, "s1");

  updateDisplay();

  readButton(BUTTON1_PIN, "b0");
  readButton(BUTTON2_PIN, "b1");
  readButton(BUTTON3_PIN, "b2");

  readTemperatures();
}

void readScaleIfReady(HX711 scale, const char* tag) {
  if (!scale.is_ready()) return;

  Serial.print(tag);
  Serial.print(":");
  Serial.print(scale.read());
  Serial.print(";");
}

void setupButton(char pin) {
  pinMode(pin, INPUT_PULLUP);
}
  
void readButton(char pin, const char* tag) {
  bool pressed = digitalRead(pin) == LOW;
  
  Serial.print(tag);
  Serial.print(":");
  Serial.print(pressed ? 1 : 0);
  Serial.print(";");
}

void readTemperatures() {
  if (!sensors.isConversionComplete()) return; // TODO: only checks for the first sensor on the wire

  for (int i = 0; i < MAX_TEMPERATURE_SENSORS; i++) {
    float temperature = sensors.getTempCByIndex(i);

    Serial.print("t");
    Serial.print(i + 1);
    Serial.print(":");
    Serial.print(temperature);
    Serial.print(";");  
  }
  
  sensors.requestTemperatures();
}

void updateDisplay() {
  if (!Serial.available()) return;
  String data = Serial.readStringUntil(';');
  if (!data.startsWith(DISPLAY_TAG)) return;
  if (data.length() != DISPLAY_DATA_LENGTH) return;
  
  String text = data.substring(DISPLAY_TAG_LENGTH, DISPLAY_DATA_LENGTH);
  display.setSegments(text.c_str(), DISPLAY_TEXT_LENGTH);
}
