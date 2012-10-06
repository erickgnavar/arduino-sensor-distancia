# Detección de volumen de un recipiente utilizando un sensor de distancia

## Curso de Inteligencia Artificial

### Materiales usados

1.	Placa Arduino Uno
2.	Sensor ultrasonico
3.	Cables conectores
4.	Cable USB
5.	Protoboard

### Teconologias Usadas

1. 	Arduino IDE (Plataforma de programación del Arduino)
2.	NodeJS + Socket.io + SerialPort (Realizar conexión serial con el Arduino y enviar datos via http)
3.	Html, Css, Javascript (Mostrar via web los rsultados obtenidos)

### Definiciones

* **Arduino** es una plataforma de hardware libre, basada en una placa con un microcontrolador y un entorno de desarrollo, diseñada para facilitar el uso de la electrónica en proyectos multidisciplinares

* **NodeJS** es una plataforma construida sobr el motor de javascript de Chrome, para fácilmente crear aplicaciones rápidas y escalables de red

* **Sensor ultrasonico**, es un sensor que emite una señal de sonido y esta regresa al mismo luego de rebotar en algun objeto, este sensor nos brinda una señal analógica del tiempo que demora el sonido en viajar desde que es emitido hasta que regresa al sensor lo cual nos permite mediante algunos cálculos matemáticos calcular la distancia entre el sensor y el objeto contra el que reboto la señal de sonido

### Procedimiento

La placa arduino nos brinda un conjunto de puertos digitales como analógicos para su conexión con mas dispositivos, en este caso vamos a usar una de sus entradas analógicas para conectar esta con la salida de la señal de nuestro sensor.

El sensor utilizado dispone de 3 pines de conexión (tierra, fuente y señal) los cuales conectaremos a nuestra placa arduino

Una vez hechas las conexiones procedemos a escribir el programa que residira en la memoria de nuestra placa Arduino

### Código Fuente Placa Arduino

```Arduino
	const int pingPin = 7; 

	void setup() {
		Serial.begin(9600);
		digitalWrite(13, HIGH);
	}

	void loop()
	{
		long duration, cm;
		pinMode(pingPin, OUTPUT);
		digitalWrite(pingPin, LOW);
		delayMicroseconds(2);
		digitalWrite(pingPin, HIGH);
		delayMicroseconds(5);
		digitalWrite(pingPin, LOW);
		pinMode(pingPin, INPUT);
		duration = pulseIn(pingPin, HIGH); 

		cm = microsecondsToCentimeters(duration);

		Serial.print(cm);
		Serial.println();

		delay(100);
	}

	long microsecondsToCentimeters(long microseconds)
	{
		return microseconds / 29 / 2;
	}
```

Este programa leerá repetidamente los valores de los pines en la placa arduino y verificará el valor en el pin que estamos usando en este caso el pin #7 para capturar la señal del sensor

El valor recibido del sensor es el tiempo que demora la onda de sonido en ir y regresar hacia el sensor, con este tiempo podemos calcular la distancia en *cm* aplicando una sencilla formula la cual esta en la funcion *microSecondsToCentimetres()* y ese valor calculado lo enviamos a través de la conexión serial de la placa Arduino

### Código Fuente Servidor de conexiones

```js
	var serialport = require('serialport');
	var SerialPort = serialport.SerialPort;
	var io = require('socket.io').listen(6969, {'log': false});
	var sp = new SerialPort('/dev/tty.usbmodemfa131',{
		parser: serialport.parsers.readline('\n'),
		baudrate: 9600
	});
	sp.on('data', function(data){
		io.sockets.emit('data', data);
	});
	console.log('Listening serial port...');
	console.log('Socket.io server listen on 6969 port');
```

La información enviada por la conexión serial del arduino la recibimos en nuestro programa hecho en **NodeJs** y procedemos a recuperar la data y enviarla hacia la página web para poder mostrarla en el navegador

### Integrantes

1.	CRUZ CONTRERAS, Jesus Leonell
2.	NAVARRO GALDOS, Marlon Erick
3.	NIEVA CRUZ, Augusto Braulio José