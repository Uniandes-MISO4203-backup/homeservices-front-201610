#Tabla de contenidos
-  [Introducción](#introducción)
-  [API](#api-de-la-aplicación-homeservices)
  - [Entidad Category](#entidad-category)
  - [Entidad Contractor](#entidad-contractor)
  - [Entidad Customer](#entidad-customer)
  - [Entidad ServiceRequest](#entidad-servicerequest)
  - [Entidad Skill](#entidad-skill)
  - [Entidad Status](#entidad-status)
  - [Entidad WorkExperience](#entidad-workexperience)

#API Rest
##Introducción
La comunicación entre cliente y servidor se realiza intercambiando objetos JSON. Para cada entidad se hace un mapeo a JSON, donde cada uno de sus atributos se transforma en una propiedad de un objeto JSON. Todos los servicios se generan en la URL /HomeServices.api/webresources/. Por defecto, todas las entidades tienen un atributo `id`, con el cual se identifica cada registro:

```javascript
{
    id: '',
    attribute_1: '',
    attribute_2: '',
    ...
    attribute_n: ''
}
```

###CRUD Básico
Para los servicios de CRUD Básico, Cuando se transmite información sobre un registro específico, se realiza enviando un objeto con la estructura mencionada en la sección anterior.
La única excepción se presenta al solicitar al servidor una lista de los registros en la base de datos, que incluye información adicional para manejar paginación de lado del servidor.

La respuesta del servidor al solicitar una colección presenta el siguiente formato:

```javascript
{
    totalRecords: 0, //cantidad de registros en la base de datos
    records: [] //collección con los datos solicitados. cada objeto tiene la estructura de la entidad.
}
```

##API de la aplicación HomeServices
###Entidad Category
####CRUD Básico
En la siguiente tabla se detalla los servicios REST generados para la entidad Category, la estructura del objeto que intercambian y sus respectivas funciones.

#####Estructura de objeto Category
```javascript
{
    id: '' /*Tipo Long*/,
    name: '' /*Tipo String*/,
    description: '' /*Tipo String*/
}
```
#####Servicios
Método|URI|Acción|Parámetros|Cuerpo|Retorno
:--:|:--:|:--:|:--:|:--:|:--:
**GET**|/categorys|Obtener todos los objetos JSON de Category (READ)|**@QueryParam page**: página a consultar<br>**@QueryParam maxRecords**: cantidad de registros a consultar<br><br>*Si se omite alguno de estos parámetros se obtiene todos los registros en la base de datos*||Colección de objetos JSON Category y el total de registros en la base de datos en el header X-Total-Count
**GET**|/categorys/:id|Obtener los atributos de una instancia de Category en formato JSON(READ)|**@PathParam id**: Identificador del registro||Objeto JSON con detalle de la instancia de Category
**POST**|/categorys|Crear una nueva instancia de la entidad Category (CREATE)||Objeto JSON de Category a crear|Objeto JSON de Category creado
**PUT**|/categorys/:id|Actualiza una instancia de la entidad Category (UPDATE)|**@PathParam id**: Identificador del registro|Objeto JSON de Category|Objeto JSON de Category actualizado
**DELETE**|/categorys/:id|Borra instancia de Category en el servidor (DELETE)|<strong>@PathParam id</strong>: Identificador del registro||

[Volver arriba](#tabla-de-contenidos)

###Entidad Contractor
####CRUD Básico
En la siguiente tabla se detalla los servicios REST generados para la entidad Contractor, la estructura del objeto que intercambian y sus respectivas funciones.

#####Estructura de objeto Contractor
```javascript
{
    id: '' /*Tipo Long*/,
    name: '' /*Tipo String*/,
    lastName: '' /*Tipo String*/,
    document: '' /*Tipo String*/
}
```
#####Servicios
Método|URI|Acción|Parámetros|Cuerpo|Retorno
:--:|:--:|:--:|:--:|:--:|:--:
**GET**|/contractors|Obtener todos los objetos JSON de Contractor (READ)|**@QueryParam page**: página a consultar<br>**@QueryParam maxRecords**: cantidad de registros a consultar<br><br>*Si se omite alguno de estos parámetros se obtiene todos los registros en la base de datos*||Colección de objetos JSON Contractor y el total de registros en la base de datos en el header X-Total-Count
**GET**|/contractors/:id|Obtener los atributos de una instancia de Contractor en formato JSON(READ)|**@PathParam id**: Identificador del registro||Objeto JSON con detalle de la instancia de Contractor
**POST**|/contractors|Crear una nueva instancia de la entidad Contractor (CREATE)||Objeto JSON de Contractor a crear|Objeto JSON de Contractor creado
**PUT**|/contractors/:id|Actualiza una instancia de la entidad Contractor (UPDATE)|**@PathParam id**: Identificador del registro|Objeto JSON de Contractor|Objeto JSON de Contractor actualizado
**DELETE**|/contractors/:id|Borra instancia de Contractor en el servidor (DELETE)|<strong>@PathParam id</strong>: Identificador del registro||

####Maestros Detalle de Contractor
#####Servicios
A diferencia del API para CRUD Básico, el API de Maestro/Detalle no provee un servicio para listar los registros de la entidad maestra. Los servicios generados para el componente Maestro/Detalle de Contractor son los siguientes:

######Relaciones Composite

Método|URI|Acción|Parámetros|Cuerpo|Retorno
:--:|:--:|:--:|:--:|:--:|:--:
**GET**|contractors/:id/workExperiences|Obtener Objetos JSON de workExperiences(WorkExperience) dependientes de Contractor|**@PathParam id**: `id` de instancia de Contractor||Colección de objetos JSON de workExperiences(WorkExperience)
**POST**|contractors/:id/workExperiences|Creación de instancias de workExperiences(WorkExperience) dependientes de Contractor|**@PathParam id**: `id` de instancia de Contractor|Colección de objetos JSON de workExperiences(WorkExperience) a crear|Colección de objetos JSON de workExperiences(WorkExperience) creados con sus respectivos ID
**PUT**|contractors/:id/workExperiences|Actualización de instancias de workExperiences(WorkExperience) dependientes de Contractor|**@PathParam id**: `id` de instancia de Contractor|Colección de objetos JSON de workExperiences(WorkExperience) a actualizar|Colección de objetos JSON de workExperiences(WorkExperience) actualizados
**DELETE**|contractors/:id/workExperiences|Eliminación de instancias de workExperiences(WorkExperience) dependientes de Contractor|**@PathParam id**: `id` de instancia de Contractor|Colección de atributo `id` de workExperiences(WorkExperience) a eliminar|

######Relaciones Shared

Método|URI|Acción|Parámetros|Cuerpo|Retorno
:--:|:--:|:--:|:--:|:--:|:--:
**GET**|contractors/:id/skills|Obtener instancias de skills(Skill) asociados con Contractor|**@PathParam id**: `id` de instancia de Contractor||Colección de `id` de skills(Skill) asociados con Contractor
**PUT**|contractors/:id/skills|Actualización de referencias a skills(Skill) desde Contractor|**@PathParam id**: `id` de instancia de Contractor|Colección de `id` de skills(Skill) a asociar|Colección de objetos JSON de skills(Skill) asociados
[Volver arriba](#tabla-de-contenidos)

###Entidad Customer
####CRUD Básico
En la siguiente tabla se detalla los servicios REST generados para la entidad Customer, la estructura del objeto que intercambian y sus respectivas funciones.

#####Estructura de objeto Customer
```javascript
{
    id: '' /*Tipo Long*/,
    name: '' /*Tipo String*/,
    lastName: '' /*Tipo String*/,
    document: '' /*Tipo String*/
}
```
#####Servicios
Método|URI|Acción|Parámetros|Cuerpo|Retorno
:--:|:--:|:--:|:--:|:--:|:--:
**GET**|/customers|Obtener todos los objetos JSON de Customer (READ)|**@QueryParam page**: página a consultar<br>**@QueryParam maxRecords**: cantidad de registros a consultar<br><br>*Si se omite alguno de estos parámetros se obtiene todos los registros en la base de datos*||Colección de objetos JSON Customer y el total de registros en la base de datos en el header X-Total-Count
**GET**|/customers/:id|Obtener los atributos de una instancia de Customer en formato JSON(READ)|**@PathParam id**: Identificador del registro||Objeto JSON con detalle de la instancia de Customer
**POST**|/customers|Crear una nueva instancia de la entidad Customer (CREATE)||Objeto JSON de Customer a crear|Objeto JSON de Customer creado
**PUT**|/customers/:id|Actualiza una instancia de la entidad Customer (UPDATE)|**@PathParam id**: Identificador del registro|Objeto JSON de Customer|Objeto JSON de Customer actualizado
**DELETE**|/customers/:id|Borra instancia de Customer en el servidor (DELETE)|<strong>@PathParam id</strong>: Identificador del registro||

####Maestros Detalle de Customer
#####Servicios
A diferencia del API para CRUD Básico, el API de Maestro/Detalle no provee un servicio para listar los registros de la entidad maestra. Los servicios generados para el componente Maestro/Detalle de Customer son los siguientes:


######Relaciones Shared

Método|URI|Acción|Parámetros|Cuerpo|Retorno
:--:|:--:|:--:|:--:|:--:|:--:
**GET**|customers/:id/serviceRequests|Obtener instancias de serviceRequests(ServiceRequest) asociados con Customer|**@PathParam id**: `id` de instancia de Customer||Colección de `id` de serviceRequests(ServiceRequest) asociados con Customer
**PUT**|customers/:id/serviceRequests|Actualización de referencias a serviceRequests(ServiceRequest) desde Customer|**@PathParam id**: `id` de instancia de Customer|Colección de `id` de serviceRequests(ServiceRequest) a asociar|Colección de objetos JSON de serviceRequests(ServiceRequest) asociados
[Volver arriba](#tabla-de-contenidos)

###Entidad ServiceRequest
####CRUD Básico
En la siguiente tabla se detalla los servicios REST generados para la entidad ServiceRequest, la estructura del objeto que intercambian y sus respectivas funciones.

#####Estructura de objeto ServiceRequest
```javascript
{
    customer: '' /*Objeto que representa instancia de Customer*/,
    recommendedTime: '' /*Tipo String*/,
    price: '' /*Tipo Integer*/,
    creationDate: '' /*Tipo Date*/,
    name: '' /*Tipo String*/,
    id: '' /*Tipo Long*/,
    statusService: '' /*Tipo String*/,
    status: '' /*Objeto que representa instancia de Status*/,
    category: '' /*Objeto que representa instancia de Category*/,
    dueDate: '' /*Tipo Date*/
}
```
#####Servicios
Método|URI|Acción|Parámetros|Cuerpo|Retorno
:--:|:--:|:--:|:--:|:--:|:--:
**GET**|/serviceRequests|Obtener todos los objetos JSON de ServiceRequest (READ)|**@QueryParam page**: página a consultar<br>**@QueryParam maxRecords**: cantidad de registros a consultar<br><br>*Si se omite alguno de estos parámetros se obtiene todos los registros en la base de datos*||Colección de objetos JSON ServiceRequest y el total de registros en la base de datos en el header X-Total-Count
**GET**|/serviceRequests/:id|Obtener los atributos de una instancia de ServiceRequest en formato JSON(READ)|**@PathParam id**: Identificador del registro||Objeto JSON con detalle de la instancia de ServiceRequest
**POST**|/serviceRequests|Crear una nueva instancia de la entidad ServiceRequest (CREATE)||Objeto JSON de ServiceRequest a crear|Objeto JSON de ServiceRequest creado
**PUT**|/serviceRequests/:id|Actualiza una instancia de la entidad ServiceRequest (UPDATE)|**@PathParam id**: Identificador del registro|Objeto JSON de ServiceRequest|Objeto JSON de ServiceRequest actualizado
**DELETE**|/serviceRequests/:id|Borra instancia de ServiceRequest en el servidor (DELETE)|<strong>@PathParam id</strong>: Identificador del registro||

####Maestros Detalle de ServiceRequest
#####Servicios
A diferencia del API para CRUD Básico, el API de Maestro/Detalle no provee un servicio para listar los registros de la entidad maestra. Los servicios generados para el componente Maestro/Detalle de ServiceRequest son los siguientes:


######Relaciones Shared

Método|URI|Acción|Parámetros|Cuerpo|Retorno
:--:|:--:|:--:|:--:|:--:|:--:
**GET**|serviceRequests/:id/expectedskills|Obtener instancias de expectedskills(Skill) asociados con ServiceRequest|**@PathParam id**: `id` de instancia de ServiceRequest||Colección de `id` de expectedskills(Skill) asociados con ServiceRequest
**PUT**|serviceRequests/:id/expectedskills|Actualización de referencias a expectedskills(Skill) desde ServiceRequest|**@PathParam id**: `id` de instancia de ServiceRequest|Colección de `id` de expectedskills(Skill) a asociar|Colección de objetos JSON de expectedskills(Skill) asociados
[Volver arriba](#tabla-de-contenidos)

###Entidad Skill
####CRUD Básico
En la siguiente tabla se detalla los servicios REST generados para la entidad Skill, la estructura del objeto que intercambian y sus respectivas funciones.

#####Estructura de objeto Skill
```javascript
{
    id: '' /*Tipo Long*/,
    name: '' /*Tipo String*/,
    description: '' /*Tipo String*/
}
```
#####Servicios
Método|URI|Acción|Parámetros|Cuerpo|Retorno
:--:|:--:|:--:|:--:|:--:|:--:
**GET**|/skills|Obtener todos los objetos JSON de Skill (READ)|**@QueryParam page**: página a consultar<br>**@QueryParam maxRecords**: cantidad de registros a consultar<br><br>*Si se omite alguno de estos parámetros se obtiene todos los registros en la base de datos*||Colección de objetos JSON Skill y el total de registros en la base de datos en el header X-Total-Count
**GET**|/skills/:id|Obtener los atributos de una instancia de Skill en formato JSON(READ)|**@PathParam id**: Identificador del registro||Objeto JSON con detalle de la instancia de Skill
**POST**|/skills|Crear una nueva instancia de la entidad Skill (CREATE)||Objeto JSON de Skill a crear|Objeto JSON de Skill creado
**PUT**|/skills/:id|Actualiza una instancia de la entidad Skill (UPDATE)|**@PathParam id**: Identificador del registro|Objeto JSON de Skill|Objeto JSON de Skill actualizado
**DELETE**|/skills/:id|Borra instancia de Skill en el servidor (DELETE)|<strong>@PathParam id</strong>: Identificador del registro||

[Volver arriba](#tabla-de-contenidos)

###Entidad Status
####CRUD Básico
En la siguiente tabla se detalla los servicios REST generados para la entidad Status, la estructura del objeto que intercambian y sus respectivas funciones.

#####Estructura de objeto Status
```javascript
{
    id: '' /*Tipo Long*/,
    name: '' /*Tipo String*/
}
```
#####Servicios
Método|URI|Acción|Parámetros|Cuerpo|Retorno
:--:|:--:|:--:|:--:|:--:|:--:
**GET**|/statuss|Obtener todos los objetos JSON de Status (READ)|**@QueryParam page**: página a consultar<br>**@QueryParam maxRecords**: cantidad de registros a consultar<br><br>*Si se omite alguno de estos parámetros se obtiene todos los registros en la base de datos*||Colección de objetos JSON Status y el total de registros en la base de datos en el header X-Total-Count
**GET**|/statuss/:id|Obtener los atributos de una instancia de Status en formato JSON(READ)|**@PathParam id**: Identificador del registro||Objeto JSON con detalle de la instancia de Status
**POST**|/statuss|Crear una nueva instancia de la entidad Status (CREATE)||Objeto JSON de Status a crear|Objeto JSON de Status creado
**PUT**|/statuss/:id|Actualiza una instancia de la entidad Status (UPDATE)|**@PathParam id**: Identificador del registro|Objeto JSON de Status|Objeto JSON de Status actualizado
**DELETE**|/statuss/:id|Borra instancia de Status en el servidor (DELETE)|<strong>@PathParam id</strong>: Identificador del registro||

[Volver arriba](#tabla-de-contenidos)

###Entidad WorkExperience
####CRUD Básico
En la siguiente tabla se detalla los servicios REST generados para la entidad WorkExperience, la estructura del objeto que intercambian y sus respectivas funciones.

#####Estructura de objeto WorkExperience
```javascript
{
    id: '' /*Tipo Long*/,
    name: '' /*Tipo String*/,
    description: '' /*Tipo String*/
}
```
#####Servicios
Método|URI|Acción|Parámetros|Cuerpo|Retorno
:--:|:--:|:--:|:--:|:--:|:--:
**GET**|/workExperiences|Obtener todos los objetos JSON de WorkExperience (READ)|**@QueryParam page**: página a consultar<br>**@QueryParam maxRecords**: cantidad de registros a consultar<br><br>*Si se omite alguno de estos parámetros se obtiene todos los registros en la base de datos*||Colección de objetos JSON WorkExperience y el total de registros en la base de datos en el header X-Total-Count
**GET**|/workExperiences/:id|Obtener los atributos de una instancia de WorkExperience en formato JSON(READ)|**@PathParam id**: Identificador del registro||Objeto JSON con detalle de la instancia de WorkExperience
**POST**|/workExperiences|Crear una nueva instancia de la entidad WorkExperience (CREATE)||Objeto JSON de WorkExperience a crear|Objeto JSON de WorkExperience creado
**PUT**|/workExperiences/:id|Actualiza una instancia de la entidad WorkExperience (UPDATE)|**@PathParam id**: Identificador del registro|Objeto JSON de WorkExperience|Objeto JSON de WorkExperience actualizado
**DELETE**|/workExperiences/:id|Borra instancia de WorkExperience en el servidor (DELETE)|<strong>@PathParam id</strong>: Identificador del registro||

[Volver arriba](#tabla-de-contenidos)

