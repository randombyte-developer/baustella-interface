#include "HX711.h"

#define WEIGHT1_DATA_PIN 2 // D2
#define WEIGHT1_CLK_PIN 3 // D3

#define WEIGHT2_DATA_PIN 4
#define WEIGHT2_CLK_PIN 5

HX711 weight1;
HX711 weight2;

void setup() {
  Serial.begin(9600);
  
  weight1.begin(WEIGHT1_DATA_PIN, WEIGHT1_CLK_PIN);
  weight2.begin(WEIGHT2_DATA_PIN, WEIGHT2_CLK_PIN);
}

void loop() {
  read_weight_if_ready(weight1, "w1");
  read_weight_if_ready(weight2, "w2");
}

void read_weight_if_ready(HX711 weight, const char* name) {
  if (!weight.is_ready()) return;

  Serial.print(name);
  Serial.print(":");
  Serial.print(weight.read());
  Serial.print(";");
}
