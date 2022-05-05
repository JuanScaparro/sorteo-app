# Sorteo App!


### Resumen
Aplicación que emula sorteos de lotería.  

Cada sorteo se realiza los días viernes.  El transcurso de los días se simula por medio de un timer.

Un listado de usuarios adquirirán un numero de billete al azar.  De acuerdo a la cantidad de participantes, se define el valor del premio actual.

El premio es parte de un bote que se acumula de acuerdo a la inexistencia de ganadores.


---

### Detalle
##### Sorteo semanal - días viernes
En el sorteo se simulara el pasar de los días con un setInterval() que manejara cada cierto tiempo el paso de un día de la semana.

##### Números - bolillas del sorteo
Los números del sorteo serán de seis dígitos y se obtendrán multiplicando la cantidad de usuarios por cuatro.

##### Usuarios
Los usuarios / jugadores se obtendrán desde [Dummy**JSON**](https://dummyjson.com/). 

El usuario ganador de la semana se publicara en la portada principal mostrando su nombre, apellido y ciudad donde compro el billete. 

##### Bote
El bote / premio se compone multiplicando la cantidad de usuarios participantes por diez, de ese total el 60% será para el primer premio, 30% para el segundo y el 10% restante para el tercero.

Si el bote queda vacante el mismo se acumulara para el siguiente sorteo. Para ello se utilizara la persistencia de datos del localStorage.

##### Manejo de datos
Los datos obtenidos fruto del sorteo servirán para obtener diferentes métricas sobre le comportamiento de los usuarios, para ello utilizaremos la persistencia de datos del localStorage y guardaremos:

- Fecha de nacimiento
- Edad
- Sexo
- Dirección
	- Coordenadas
	- Código Postal
	- Estado

Con los datos mencionados se construirán gráficos para visualizar las diferente métricas obtenidas.