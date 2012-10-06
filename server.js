var serialport = require('serialport'); //solicitamos el modulo serialport
var SerialPort = serialport.SerialPort; //instanciamos un objeto SerialPort

var io = require('socket.io').listen(6969, {'log': false}); //Creamos una conexión en el puerto 6969

var sp = new SerialPort('/dev/tty.usbmodemfa131',{ //Abrimos una conexión en el puerto serial
	parser: serialport.parsers.readline('\n'), //definimos que leera un mensaje cada vez que encuentre el salto de linea
	baudrate: 9600 //Definimos la velocidad con la que se enviarán datos por el puerto serial
});

sp.on('data', function(data){ //Ponemos a la escucha del puerto serial
	io.sockets.emit('data', data); //Enviamos el valor capturado a la página para la presentación
});
//Mensajes informativos
console.log('Listening serial port...');
console.log('Socket.io server listen on 6969 port');