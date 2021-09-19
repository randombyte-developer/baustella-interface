# baustella-interface

## Arduino libraries
- https://github.com/bogde/HX711
- https://github.com/avishorp/TM1637
- https://github.com/milesburton/Arduino-Temperature-Control-Library

## Serial protocol
The Arduino Nano and Raspberry Zero communicate in both directions over a serial port via USB.

### Arduino -> Raspberry
| Value name | Schema | Example |
| --- | --- | --- |
| Weight 0 | `w0:<long>;` | `w0:22500;` |
| Weight 1 | `w1:<long>;` | `w1:22500;` |
| Temperatur 0 | `t0:<float>;` | `t0:20.3;` |
| Button 0 | `b0:<0\|1>` | `b0:1` |
| Button 1 | `b1:<0\|1>` | `b1:1` |
| Button 2 | `b2:<0\|1>` | `b2:1` |

### Raspberry -> Arduino
| Value name | Schema | Example |
| --- | --- | --- |
| Display | `d0:<char[]>;` | `d0:XXXX;` |

The chars are to be set like described [here](https://github.com/avishorp/TM1637/blob/3cca19607013c49f6708b7f492765fea835431ca/TM1637Display.cpp#L31-L38).
