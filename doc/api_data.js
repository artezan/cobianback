define({ "api": [
  {
    "type": "GET",
    "url": "/administrator/",
    "title": "Request all",
    "version": "0.1.0",
    "name": "get",
    "group": "administrator",
    "sampleRequest": [
      {
        "url": "https://cobianback.herokuapp.com/api/v1/administrator/"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response a JSON-Array<administrator>:",
          "content": "{ \"data\": { \"timestamp\": \"2018-08-27T14:49:37.217Z\", \"_id\": \"5b840f8116b1cf2accc95ae4\", \"name\": \"admin2\", \"password\": \"cobian2018\", \"__v\": 0 } }",
          "type": "json"
        }
      ]
    },
    "filename": "src/router/AdministratorRouter.ts",
    "groupTitle": "administrator"
  },
  {
    "type": "GET",
    "url": "/administrator/:b64",
    "title": "Request by Object Id",
    "version": "0.1.0",
    "name": "getByNameAndPassword",
    "group": "administrator",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "b64",
            "description": "<p>(name:password) Must be provided as QueryParam</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "https://cobianback.herokuapp.com/api/v1/administrator/"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response Company:",
          "content": "{ \"data\": { \"timestamp\": \"2018-08-27T14:49:37.217Z\", \"_id\": \"5b840f8116b1cf2accc95ae4\", \"name\": \"admin2\", \"password\": \"cobian2018\", \"__v\": 0 } }",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "_id",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "timestamp",
            "description": ""
          }
        ]
      }
    },
    "filename": "src/router/AdministratorRouter.ts",
    "groupTitle": "administrator"
  },
  {
    "type": "POST",
    "url": "/administrator/",
    "title": "Request New",
    "version": "0.1.0",
    "name": "post",
    "group": "administrator",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{ \"name\":\"admin2\", \"password\":\"cobian2018\" }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response Created Company:",
          "content": "{ \"data\": { \"timestamp\": \"2018-08-27T14:49:37.217Z\", \"_id\": \"5b840f8116b1cf2accc95ae4\", \"name\": \"admin2\", \"password\": \"cobian2018\", \"__v\": 0 } }",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "_id",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "timestamp",
            "description": ""
          }
        ]
      }
    },
    "filename": "src/router/AdministratorRouter.ts",
    "groupTitle": "administrator",
    "sampleRequest": [
      {
        "url": "https://cobianback.herokuapp.com/api/v1/administrator/"
      }
    ]
  },
  {
    "type": "DELETE",
    "url": "/adviser/:id",
    "title": "Request  Deleted",
    "version": "0.1.0",
    "name": "deleteByToken",
    "group": "adviser",
    "filename": "src/router/AdviserRouter.ts",
    "groupTitle": "adviser",
    "sampleRequest": [
      {
        "url": "https://cobianback.herokuapp.com/api/v1/adviser/:id"
      }
    ]
  },
  {
    "type": "GET",
    "url": "/adviser/",
    "title": "Request all",
    "version": "0.1.0",
    "name": "get",
    "group": "adviser",
    "sampleRequest": [
      {
        "url": "https://cobianback.herokuapp.com/api/v1/adviser/"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response a JSON-Array<consultant>:",
          "content": "{ \"data\": [ { \"timestamp\": \"2018-08-24T22:12:10.843Z\", \"schedule\": [], \"buyer\": [], \"goal\": [], \"notification\": [], \"_id\": \"5b8082ba69a5a10b589abc75\", \"name\": \"asesor\", \"lastName\": \"apellido\", \"password\": \"cobian2018\", \"email\": \"asesor@correo.com\", \"hourStart\": 9, \"hourEnd\": 18, \"isRenter\": false, \"__v\": 0 }, { \"timestamp\": \"2018-08-24T22:12:43.596Z\", \"schedule\": [], \"buyer\": [], \"goal\": [], \"notification\": [], \"_id\": \"5b8082db69a5a10b589abc76\", \"name\": \"asesor2\", \"lastName\": \"apellido\", \"password\": \"cobian2018\", \"email\": \"asesor2@correo.com\", \"hourStart\": 10, \"hourEnd\": 18, \"isRenter\": true, \"__v\": 0 }, { \"timestamp\": \"2018-08-24T22:13:03.608Z\", \"schedule\": [], \"buyer\": [], \"goal\": [], \"notification\": [], \"_id\": \"5b8082ef69a5a10b589abc77\", \"name\": \"asesor3\", \"lastName\": \"apellido\", \"password\": \"cobian2018\", \"email\": \"asesor3@correo.com\", \"hourStart\": 7, \"hourEnd\": 20, \"isRenter\": true, \"__v\": 0 }, { \"timestamp\": \"2018-08-24T22:13:28.257Z\", \"schedule\": [], \"buyer\": [], \"goal\": [], \"notification\": [], \"_id\": \"5b80830869a5a10b589abc78\", \"name\": \"asesor4\", \"lastName\": \"apellido\", \"password\": \"cobian2018\", \"email\": \"asesor4@correo.com\", \"hourStart\": 7, \"hourEnd\": 21, \"isRenter\": false, \"__v\": 0 }, { \"timestamp\": \"2018-08-27T15:00:31.181Z\", \"schedule\": [], \"buyer\": [], \"goal\": [], \"notification\": [], \"_id\": \"5b84120f0255c71b3c0a21d8\", \"name\": \"asesor5\", \"lastName\": \"apellido\", \"password\": \"cobian2018\", \"email\": \"asesor5@correo.com\", \"hourStart\": 8, \"hourEnd\": 22, \"isRenter\": true, \"__v\": 0 } ] }",
          "type": "json"
        }
      ]
    },
    "filename": "src/router/AdviserRouter.ts",
    "groupTitle": "adviser"
  },
  {
    "type": "GET",
    "url": "/byadvisercity/:city",
    "title": "Request by Object City",
    "version": "0.1.0",
    "name": "getByCity",
    "group": "adviser",
    "filename": "src/router/AdviserRouter.ts",
    "groupTitle": "adviser",
    "sampleRequest": [
      {
        "url": "https://cobianback.herokuapp.com/api/v1/byadvisercity/:city"
      }
    ]
  },
  {
    "type": "GET",
    "url": "/adviser/byadviserid/:id",
    "title": "Request by Object Id",
    "version": "0.1.0",
    "name": "getById",
    "group": "adviser",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "consultantId",
            "description": "<p>Must be provided as QueryParam</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "https://cobianback.herokuapp.com/api/v1/adviser/byadviserid/5b8082ba69a5a10b589abc75"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response Consultant:",
          "content": "{ \"data\": { \"timestamp\": \"2018-08-24T22:12:10.843Z\", \"schedule\": [], \"buyer\": [], \"goal\": [], \"notification\": [], \"_id\": \"5b8082ba69a5a10b589abc75\", \"name\": \"asesor\", \"lastName\": \"apellido\", \"password\": \"cobian2018\", \"email\": \"asesor@correo.com\", \"hourStart\": 9, \"hourEnd\": 18, \"isRenter\": false, \"__v\": 0 } }",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "timestamp",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "ISchedule[]",
            "optional": false,
            "field": "schedule",
            "description": "<p>Calendario</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "hourStart",
            "description": "<p>Hora inicio servicio</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "hourEnd",
            "description": "<p>Hora fin de servicio</p>"
          },
          {
            "group": "Success 200",
            "type": "IBuyer[]",
            "optional": false,
            "field": "buyer",
            "description": "<p>Compradores asignados</p>"
          },
          {
            "group": "Success 200",
            "type": "IGoal[]",
            "optional": false,
            "field": "goal",
            "description": "<p>Objetivos planteados</p>"
          },
          {
            "group": "Success 200",
            "type": "INotification[]",
            "optional": false,
            "field": "notification",
            "description": "<p>Historial notificaciones</p>"
          },
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "isRenter",
            "description": "<p>Si renta o vende</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "lastName",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "companyId",
            "description": ""
          }
        ]
      }
    },
    "filename": "src/router/AdviserRouter.ts",
    "groupTitle": "adviser"
  },
  {
    "type": "GET",
    "url": "byadviserpassword/:base64",
    "title": "Request by Object Pass",
    "version": "0.1.0",
    "name": "getByPass",
    "group": "adviser",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "b64",
            "description": "<p>(name:password) Must be provided as QueryParam</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "https://cobianback.herokuapp.com/api/v1/adviser/byadviserid/5b8082ba69a5a10b589abc75"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response Consultant:",
          "content": "{ \"data\": { \"timestamp\": \"2018-08-24T22:12:10.843Z\", \"schedule\": [], \"buyer\": [], \"goal\": [], \"notification\": [], \"_id\": \"5b8082ba69a5a10b589abc75\", \"name\": \"asesor\", \"lastName\": \"apellido\", \"password\": \"cobian2018\", \"email\": \"asesor@correo.com\", \"hourStart\": 9, \"hourEnd\": 18, \"isRenter\": false, \"__v\": 0 } }",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "timestamp",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "ISchedule[]",
            "optional": false,
            "field": "schedule",
            "description": "<p>Calendario</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "hourStart",
            "description": "<p>Hora inicio servicio</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "hourEnd",
            "description": "<p>Hora fin de servicio</p>"
          },
          {
            "group": "Success 200",
            "type": "IBuyer[]",
            "optional": false,
            "field": "buyer",
            "description": "<p>Compradores asignados</p>"
          },
          {
            "group": "Success 200",
            "type": "IGoal[]",
            "optional": false,
            "field": "goal",
            "description": "<p>Objetivos planteados</p>"
          },
          {
            "group": "Success 200",
            "type": "INotification[]",
            "optional": false,
            "field": "notification",
            "description": "<p>Historial notificaciones</p>"
          },
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "isRenter",
            "description": "<p>Si renta o vende</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "lastName",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "companyId",
            "description": ""
          }
        ]
      }
    },
    "filename": "src/router/AdviserRouter.ts",
    "groupTitle": "adviser"
  },
  {
    "type": "POST",
    "url": "/adviser/",
    "title": "Request New",
    "version": "0.1.0",
    "name": "post",
    "group": "adviser",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "lastName",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "hourStart",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "hourEnd",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "isRenter",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{ \"name\":\"asesor5\", \"password\":\"cobian2018\", \"lastName\":\"apellido\", \"email\":\"asesor5@correo.com\", \"hourStart\":8, \"hourEnd\":22, \"isRenter\":true }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response Created User:",
          "content": "{ \"data\": { \"timestamp\": \"2018-08-27T15:00:31.181Z\", \"schedule\": [], \"buyer\": [], \"goal\": [], \"notification\": [], \"_id\": \"5b84120f0255c71b3c0a21d8\", \"name\": \"asesor5\", \"lastName\": \"apellido\", \"password\": \"cobian2018\", \"email\": \"asesor5@correo.com\", \"hourStart\": 8, \"hourEnd\": 22, \"isRenter\": true, \"__v\": 0 } }",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "timestamp",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "ISchedule[]",
            "optional": false,
            "field": "schedule",
            "description": "<p>Calendario</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "hourStart",
            "description": "<p>Hora inicio servicio</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "hourEnd",
            "description": "<p>Hora fin de servicio</p>"
          },
          {
            "group": "Success 200",
            "type": "IBuyer[]",
            "optional": false,
            "field": "buyer",
            "description": "<p>Compradores asignados</p>"
          },
          {
            "group": "Success 200",
            "type": "IGoal[]",
            "optional": false,
            "field": "goal",
            "description": "<p>Objetivos planteados</p>"
          },
          {
            "group": "Success 200",
            "type": "INotification[]",
            "optional": false,
            "field": "notification",
            "description": "<p>Historial notificaciones</p>"
          },
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "isRenter",
            "description": "<p>Si renta o vende</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "lastName",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "companyId",
            "description": ""
          }
        ]
      }
    },
    "filename": "src/router/AdviserRouter.ts",
    "groupTitle": "adviser",
    "sampleRequest": [
      {
        "url": "https://cobianback.herokuapp.com/api/v1/adviser/"
      }
    ]
  },
  {
    "type": "PUT",
    "url": "/adviser/:_id",
    "title": "Request Update",
    "version": "0.1.0",
    "name": "put",
    "group": "adviser",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "adviserId",
            "description": "<p>Must be provided as QueryParam</p>"
          },
          {
            "group": "Parameter",
            "type": "ISchedule[]",
            "optional": false,
            "field": "schedule",
            "description": "<p>Calendario</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "hourStart",
            "description": "<p>Hora inicio servicio</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "hourEnd",
            "description": "<p>Hora fin de servicio</p>"
          },
          {
            "group": "Parameter",
            "type": "IBuyer[]",
            "optional": false,
            "field": "buyer",
            "description": "<p>Compradores asignados</p>"
          },
          {
            "group": "Parameter",
            "type": "IGoal[]",
            "optional": false,
            "field": "goal",
            "description": "<p>Objetivos planteados</p>"
          },
          {
            "group": "Parameter",
            "type": "INotification[]",
            "optional": false,
            "field": "notification",
            "description": "<p>Historial notificaciones</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "isRenter",
            "description": "<p>Si renta o vende</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "lastName",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{ \"isRenter\": true }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{ \"data\": true }",
          "type": "json"
        }
      ]
    },
    "filename": "src/router/AdviserRouter.ts",
    "groupTitle": "adviser",
    "sampleRequest": [
      {
        "url": "https://cobianback.herokuapp.com/api/v1/adviser/:_id"
      }
    ]
  },
  {
    "type": "DELETE",
    "url": "/buyer/:Id",
    "title": "Request  Deleted",
    "version": "0.1.0",
    "name": "deleteByToken",
    "group": "buyer",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "buyerId",
            "description": "<p>Must be placed as QueryParam</p>"
          }
        ]
      }
    },
    "filename": "src/router/BuyerRouter.ts",
    "groupTitle": "buyer",
    "sampleRequest": [
      {
        "url": "https://cobianback.herokuapp.com/api/v1/buyer/:Id"
      }
    ]
  },
  {
    "type": "GET",
    "url": "/buyer/",
    "title": "Request all",
    "version": "0.1.0",
    "name": "get",
    "group": "buyer",
    "sampleRequest": [
      {
        "url": "https://cobianback.herokuapp.com/api/v1/buyer/"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response a JSON-Array<consultant>:",
          "content": "{ \"data\": { \"timestamp\": \"2018-08-27T20:00:38.939Z\", \"typeOfProperty\": \"departamento\", \"tag\": [ \"mascotas\", \"estudiante\" ], \"schedule\": [ { \"timestamp\": \"2018-08-27T21:57:08.771Z\", \"_id\": \"5b8473b42a3ac4214ce7590b\", \"title\": \"Evento2\", \"address\": \"La paz\", \"property\": \"5b842b334f965c30a03c1951\", \"buyer\": \"5b84586674acb1030cabb419\", \"adviser\": \"5b8082ba69a5a10b589abc75\", \"status\": \"Pendiente\", \"note\": \"Ver Propiedad segunda visita\", \"dateOfEvent\": \"20/18/2018\", \"__v\": 0 } ], \"statusBuyerProperty\": [ { \"timestamp\": \"2018-08-27T22:18:13.525Z\", \"_id\": \"5b8478a5258cea39b839cbf7\", \"status\": \"negociacion\", \"buyer\": \"5b84586674acb1030cabb419\", \"property\": \"5b842b334f965c30a03c1951\", \"note\": \"En proceso\", \"__v\": 0 } ], \"credit\": [], \"files\": [], \"property\": [ { \"timestamp\": \"2018-08-27T16:47:47.968Z\", \"tag\": [ \"UPAEP\" ], \"files\": [ \"documento1\", \"documento2\", \"documento3\" ], \"_id\": \"5b842b334f965c30a03c1951\", \"isRent\": true, \"name\": \"Depa 1\", \"typeOfProperty\": \"departamento\", \"space\": 45, \"dateToBuy\": \"18/11/2018\", \"zone\": \"La Paz\", \"minPrice\": 2500, \"maxPrice\": 2500, \"numRooms\": 1, \"numCars\": 1, \"isOld\": false, \"isClose\": false, \"numBathrooms\": 2, \"hasGarden\": false, \"isLowLevel\": false, \"hasElevator\": false, \"allServices\": true, \"wayToBuy\": \"otros\", \"__v\": 0 } ], \"propertySave\": [], \"adviser\": [ { \"timestamp\": \"2018-08-24T22:12:10.843Z\", \"schedule\": [], \"buyer\": [], \"goal\": [], \"notification\": [], \"_id\": \"5b8082ba69a5a10b589abc75\", \"name\": \"asesor\", \"lastName\": \"apellido\", \"password\": \"cobian2018\", \"email\": \"asesor@correo.com\", \"hourStart\": 9, \"hourEnd\": 18, \"isRenter\": true, \"__v\": 0 } ], \"notification\": [ { \"timestamp\": \"2018-08-27T21:23:47.038Z\", \"_id\": \"5b846be3ca86762eb84e7ac3\", \"title\": \"Notificacion 1\", \"content\": \"Nueva Propiedad Agregada\", \"__v\": 0 } ], \"ofert\": [ { \"timestamp\": \"2018-08-27T21:34:43.860Z\", \"files\": [], \"_id\": \"5b846e73829f5e1f94efc48a\", \"buyer\": \"5b84586674acb1030cabb419\", \"property\": \"5b842b334f965c30a03c1951\", \"status\": \"negociacion\", \"notes\": \"Oferta para ...\", \"ofertPrice\": 3000, \"__v\": 0 } ], \"_id\": \"5b84586674acb1030cabb419\", \"name\": \"Comprador 1\", \"fatherLastName\": \"Apellido\", \"motherLastName\": \"Apellido\", \"password\": \"12345\", \"email\": \"comprador@gmail.com\", \"phone\": 2222, \"years\": 21, \"isMale\": true, \"numOfFamily\": 1, \"isSingle\": true, \"space\": 40, \"isRenter\": true, \"dateToBuy\": \"20/12/2018\", \"zone\": \"La Paz\", \"minPrice\": 2000, \"maxPrice\": 4000, \"numRooms\": 1, \"numCars\": 0, \"isOld\": false, \"isClose\": false, \"numBathrooms\": 2, \"hasGarden\": false, \"isLowLevel\": false, \"hasElevator\": false, \"allServices\": true, \"wayToBuy\": \"otro\", \"__v\": 0 } }",
          "type": "json"
        }
      ]
    },
    "filename": "src/router/BuyerRouter.ts",
    "groupTitle": "buyer"
  },
  {
    "type": "GET",
    "url": "/bybuyercity/:city",
    "title": "Request by Object City",
    "version": "0.1.0",
    "name": "getByCity",
    "group": "buyer",
    "filename": "src/router/BuyerRouter.ts",
    "groupTitle": "buyer",
    "sampleRequest": [
      {
        "url": "https://cobianback.herokuapp.com/api/v1/bybuyercity/:city"
      }
    ]
  },
  {
    "type": "GET",
    "url": "/buyer/bybuyerid/:Id",
    "title": "Request by Object Id",
    "version": "0.1.0",
    "name": "getById",
    "group": "buyer",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "consultantId",
            "description": "<p>Must be provided as QueryParam</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "https://cobianback.herokuapp.com/api/v1/buyer/bybuyerid/5b80863a23b3ba24ac8320ce"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response Consultant:",
          "content": "{ \"data\": { \"timestamp\": \"2018-08-24T22:27:06.678Z\", \"typeOfProperty\": [ \"departamento\" ], \"tag\": [ \"amueblado\", \"no compartido\", \"estudiantes\" ], \"schedule\": [], \"credit\": [], \"files\": [], \"property\": [], \"adviser\": [], \"notification\": [], \"_id\": \"5b80863a23b3ba24ac8320ce\", \"name\": \"Comprador1\", \"fatherLastName\": \"Paterno\", \"motherLastName\": \"Materno\", \"password\": \"cobian2018\", \"email\": \"comprador@gmail.com\", \"phone\": 22323, \"years\": 21, \"isMale\": true, \"numOfFamily\": 1, \"isSingle\": true, \"space\": 50, \"__v\": 0 } }",
          "type": "json"
        }
      ]
    },
    "filename": "src/router/BuyerRouter.ts",
    "groupTitle": "buyer"
  },
  {
    "type": "GET",
    "url": "/buyer/bybuyerpassword/:base64",
    "title": "Request by Pass",
    "version": "0.1.0",
    "name": "getByPass",
    "group": "buyer",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "B64",
            "optional": false,
            "field": "name:pass",
            "description": "<p>Must be provided as QueryParam</p>"
          }
        ]
      }
    },
    "filename": "src/router/BuyerRouter.ts",
    "groupTitle": "buyer",
    "sampleRequest": [
      {
        "url": "https://cobianback.herokuapp.com/api/v1/buyer/bybuyerpassword/:base64"
      }
    ]
  },
  {
    "type": "POST",
    "url": "/buyer/",
    "title": "Request New",
    "version": "0.1.0",
    "name": "post",
    "group": "buyer",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "name",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "fatherLastName",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "motherLastName",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "phone",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "years",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "isMale",
            "description": "<p>Sexo</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "numOfFamily",
            "description": "<p>Número de miembros de familia</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "isSingle",
            "description": "<p>estado civil</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "typeOfProperty",
            "description": "<p>Tipos de Vivienda casa, departamento, terreno, nave industrial, etc., con la posibilidad de agregar alguna opción que no aparezca dentro del listado.</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "space",
            "description": "<p>Espacio de vivienda</p>"
          },
          {
            "group": "Parameter",
            "type": "string[]",
            "optional": false,
            "field": "tag",
            "description": "<p>Etiquetas</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "isRenter",
            "description": "<p>Renta o Compra</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "dateToBuy",
            "description": "<p>Fecha posible compra/renta</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "zone",
            "description": "<p>Zona de compra/renta</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "minPrice",
            "description": "<p>Costo minimo</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "maxPrice",
            "description": "<p>Costo maximo</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "numRooms",
            "description": "<p>Numero de recamaras</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "numCars",
            "description": "<p>Numero de lugares de estacionamiento</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "isOld",
            "description": "<p>Nuevo o usado</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "isClose",
            "description": "<p>fraccionamiento cerrado o abierto</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "numBathrooms",
            "description": "<p>numero de banos</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "hasGarden",
            "description": "<p>jardin</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "isLowLevel",
            "description": "<p>Si se desea recámara en planta baja</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "hasElevator",
            "description": "<p>Elevador</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "allServices",
            "description": "<p>Con o sin servicios</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "wayToBuy",
            "description": "<p>Forma de compra FOVISSTE, IMSS, contado, PEMEX, Infonavit, aliados, otros</p>"
          },
          {
            "group": "Parameter",
            "type": "IOfert[]",
            "optional": false,
            "field": "ofert",
            "description": "<p>Ofertas</p>"
          },
          {
            "group": "Parameter",
            "type": "IStatusBuyerProperty[]",
            "optional": false,
            "field": "statusBuyerProperty",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{ \"name\":\"Comprador 1\", \"fatherLastName\":\"Apellido\", \"motherLastName\":\"Apellido\", \"password\":\"12345\", \"email\":\"comprador@gmail.com\", \"phone\":\"2222\", \"years\":\"21\", \"isMale\": true, \"numOfFamily\":1, \"isSingle\":true, \"typeOfProperty\":\"departamento\", \"space\":40, \"tag\":[\"mascotas\", \"estudiante\"], \"isRenter\":true, \"dateToBuy\":\"20/12/2018\", \"zone\":\"La Paz\", \"minPrice\":2000, \"maxPrice\":4000, \"numRooms\":1, \"numCars\":0, \"isOld\":false, \"isClose\":false, \"numBathrooms\":2, \"hasGarden\":false, \"isLowLevel\":false, \"hasElevator\":false, \"allServices\":true, \"wayToBuy\":\"otro\" }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response Created User:",
          "content": "{ \"data\": { \"timestamp\": \"2018-08-27T15:54:47.089Z\", \"typeOfProperty\": [ \"departamento\" ], \"tag\": [ \"mascotas\", \"estudiante\" ], \"schedule\": [], \"credit\": [], \"files\": [], \"property\": [], \"adviser\": [], \"notification\": [], \"_id\": \"5b841ec705695f07c06c14f4\", \"name\": \"Comprador 1\", \"fatherLastName\": \"Apellido\", \"motherLastName\": \"Apellido\", \"password\": \"12345\", \"email\": \"comprador@gmail.com\", \"phone\": 2222, \"years\": 21, \"isMale\": true, \"numOfFamily\": 1, \"isSingle\": true, \"space\": 40, \"isRenter\": true, \"dateToBuy\": \"20/12/2018\", \"zone\": \"La Paz\", \"minPrice\": 2000, \"maxPrice\": 4000, \"numRooms\": 1, \"numCars\": 0, \"isOld\": false, \"isClose\": false, \"numBathrooms\": 2, \"hasGarden\": false, \"isLowLevel\": false, \"hasElevator\": false, \"allServices\": true, \"wayToBuy\": \"otro\", \"__v\": 0 } }",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "timestamp",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "name",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "_id",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "fatherLastName",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "motherLastName",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "phone",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "years",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "isMale",
            "description": "<p>Sexo</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "numOfFamily",
            "description": "<p>Número de miembros de familia</p>"
          },
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "isSingle",
            "description": "<p>estado civil</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "typeOfProperty",
            "description": "<p>Tipo de Vivienda casa, departamento, terreno, nave industrial, etc., con la posibilidad de agregar alguna opción que no aparezca dentro del listado.</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "space",
            "description": "<p>Espacio de vivienda</p>"
          },
          {
            "group": "Success 200",
            "type": "string[]",
            "optional": false,
            "field": "tag",
            "description": "<p>Etiquetas</p>"
          },
          {
            "group": "Success 200",
            "type": "ISchedule[]",
            "optional": false,
            "field": "schedule",
            "description": "<p>Eventos programados</p>"
          },
          {
            "group": "Success 200",
            "type": "ICredit[]",
            "optional": false,
            "field": "credit",
            "description": "<p>Creditos</p>"
          },
          {
            "group": "Success 200",
            "type": "string[]",
            "optional": false,
            "field": "files",
            "description": "<p>Documentos</p>"
          },
          {
            "group": "Success 200",
            "type": "IProperty[]",
            "optional": false,
            "field": "property",
            "description": "<p>Lista de sugerencias</p>"
          },
          {
            "group": "Success 200",
            "type": "IAdviser[]",
            "optional": false,
            "field": "adviser",
            "description": "<p>Asesores Asignados</p>"
          },
          {
            "group": "Success 200",
            "type": "INotification[]",
            "optional": false,
            "field": "notification",
            "description": "<p>Notificaciones guardadas</p>"
          },
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "isRenter",
            "description": "<p>Renta o Compra</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "dateToBuy",
            "description": "<p>Fecha posible compra/renta</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "zone",
            "description": "<p>Zona de compra/renta</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "minPrice",
            "description": "<p>Costo minimo</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "maxPrice",
            "description": "<p>Costo maximo</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "numRooms",
            "description": "<p>Numero de recamaras</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "numCars",
            "description": "<p>Numero de lugares de estacionamiento</p>"
          },
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "isOld",
            "description": "<p>Nuevo o usado</p>"
          },
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "isClose",
            "description": "<p>fraccionamiento cerrado o abierto</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "numBathrooms",
            "description": "<p>numero de banos</p>"
          },
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "hasGarden",
            "description": "<p>jardin</p>"
          },
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "isLowLevel",
            "description": "<p>Si se desea recámara en planta baja</p>"
          },
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "hasElevator",
            "description": "<p>Elevador</p>"
          },
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "allServices",
            "description": "<p>Con o sin servicios</p>"
          },
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "wayToBuy",
            "description": "<p>Forma de compra FOVISSTE, IMSS, contado, PEMEX, Infonavit, aliados, otros</p>"
          },
          {
            "group": "Success 200",
            "type": "IOfert[]",
            "optional": false,
            "field": "ofert",
            "description": "<p>Ofertas asignadas</p>"
          },
          {
            "group": "Success 200",
            "type": "IStatusBuyerProperty[]",
            "optional": false,
            "field": "statusBuyerProperty",
            "description": "<p>Estado buyer/property</p>"
          }
        ]
      }
    },
    "filename": "src/router/BuyerRouter.ts",
    "groupTitle": "buyer",
    "sampleRequest": [
      {
        "url": "https://cobianback.herokuapp.com/api/v1/buyer/"
      }
    ]
  },
  {
    "type": "POST",
    "url": "/buyer/checkbuyer/",
    "title": "Request Check",
    "version": "0.1.0",
    "name": "postCheck",
    "group": "buyer",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "name",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "fatherLastName",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "motherLastName",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "phone",
            "description": ""
          }
        ]
      }
    },
    "filename": "src/router/BuyerRouter.ts",
    "groupTitle": "buyer",
    "sampleRequest": [
      {
        "url": "https://cobianback.herokuapp.com/api/v1/buyer/checkbuyer/"
      }
    ]
  },
  {
    "type": "PUT",
    "url": "/buyer/:_id",
    "title": "Request Update",
    "version": "0.1.0",
    "name": "put",
    "group": "buyer",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "timestamp",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "name",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "_id",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "fatherLastName",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "motherLastName",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "phone",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "years",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "isMale",
            "description": "<p>Sexo</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "numOfFamily",
            "description": "<p>Número de miembros de familia</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "isSingle",
            "description": "<p>estado civil</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "typeOfProperty",
            "description": "<p>Tipos de Vivienda casa, departamento, terreno, nave industrial, etc., con la posibilidad de agregar alguna opción que no aparezca dentro del listado.</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "space",
            "description": "<p>Espacio de vivienda</p>"
          },
          {
            "group": "Parameter",
            "type": "string[]",
            "optional": false,
            "field": "tag",
            "description": "<p>Etiquetas</p>"
          },
          {
            "group": "Parameter",
            "type": "ISchedule[]",
            "optional": false,
            "field": "schedule",
            "description": "<p>Eventos programados</p>"
          },
          {
            "group": "Parameter",
            "type": "ICredit[]",
            "optional": false,
            "field": "credit",
            "description": "<p>Creditos</p>"
          },
          {
            "group": "Parameter",
            "type": "string[]",
            "optional": false,
            "field": "files",
            "description": "<p>Documentos</p>"
          },
          {
            "group": "Parameter",
            "type": "IProperty[]",
            "optional": false,
            "field": "property",
            "description": "<p>Lista de sugerencias</p>"
          },
          {
            "group": "Parameter",
            "type": "IAdviser[]",
            "optional": false,
            "field": "adviser",
            "description": "<p>Asesores Asignados</p>"
          },
          {
            "group": "Parameter",
            "type": "INotification[]",
            "optional": false,
            "field": "notification",
            "description": "<p>Notificaciones guardadas</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "isRenter",
            "description": "<p>Renta o Compra</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "dateToBuy",
            "description": "<p>Fecha posible compra/renta</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "zone",
            "description": "<p>Zona de compra/renta</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "minPrice",
            "description": "<p>Costo minimo</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "maxPrice",
            "description": "<p>Costo maximo</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "numRooms",
            "description": "<p>Numero de recamaras</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "numCars",
            "description": "<p>Numero de lugares de estacionamiento</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "isOld",
            "description": "<p>Nuevo o usado</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "isClose",
            "description": "<p>fraccionamiento cerrado o abierto</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "numBathrooms",
            "description": "<p>numero de banos</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "hasGarden",
            "description": "<p>jardin</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "isLowLevel",
            "description": "<p>Si se desea recámara en planta baja</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "hasElevator",
            "description": "<p>Elevador</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "allServices",
            "description": "<p>Con o sin servicios</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "wayToBuy",
            "description": "<p>Forma de compra FOVISSTE, IMSS, contado, PEMEX, Infonavit, aliados, otros</p>"
          },
          {
            "group": "Parameter",
            "type": "IOfert[]",
            "optional": false,
            "field": "ofert",
            "description": "<p>Ofertas</p>"
          },
          {
            "group": "Parameter",
            "type": "IStatusBuyerProperty[]",
            "optional": false,
            "field": "statusBuyerProperty",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{ \"tag\": [\"Estudiante\", \"mascotas\", \"UPAEP\"], \"adviser\": [\"5b8082ba69a5a10b589abc75\", \"5b8082db69a5a10b589abc76\"] }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{ \"data\": true }",
          "type": "json"
        }
      ]
    },
    "filename": "src/router/BuyerRouter.ts",
    "groupTitle": "buyer",
    "sampleRequest": [
      {
        "url": "https://cobianback.herokuapp.com/api/v1/buyer/:_id"
      }
    ]
  },
  {
    "type": "DELETE",
    "url": "/credit/:id",
    "title": "Request  Deleted",
    "version": "0.1.0",
    "name": "deleteByToken",
    "group": "credit",
    "filename": "src/router/CreditRouter.ts",
    "groupTitle": "credit",
    "sampleRequest": [
      {
        "url": "https://cobianback.herokuapp.com/api/v1/credit/:id"
      }
    ]
  },
  {
    "type": "GET",
    "url": "/credit/bycreditid/:id",
    "title": "Request by Object Id",
    "version": "0.1.0",
    "name": "getById",
    "group": "credit",
    "filename": "src/router/CreditRouter.ts",
    "groupTitle": "credit",
    "sampleRequest": [
      {
        "url": "https://cobianback.herokuapp.com/api/v1/credit/bycreditid/:id"
      }
    ]
  },
  {
    "type": "GET",
    "url": "/credit/",
    "title": "Request all",
    "version": "0.1.0",
    "name": "getall",
    "group": "credit",
    "filename": "src/router/CreditRouter.ts",
    "groupTitle": "credit",
    "sampleRequest": [
      {
        "url": "https://cobianback.herokuapp.com/api/v1/credit/"
      }
    ]
  },
  {
    "type": "POST",
    "url": "/credit/",
    "title": "Request New",
    "version": "0.1.0",
    "name": "post",
    "group": "credit",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "buyer",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "property",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "status",
            "description": "<p>Gris Verde Amarillo Rojo</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "notes",
            "description": "<p>Notas o Describir</p>"
          },
          {
            "group": "Parameter",
            "type": "string[]",
            "optional": false,
            "field": "files",
            "description": "<p>Archivos para el credito</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{ \"buyer\":\"5b84586674acb1030cabb419\", \"property\":\"5b842b334f965c30a03c1951\", \"status\":\"Verde\", \"files\":[\"documento1\", \"documento2\"], \"notes\":\"Describir credito\" }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response Created User:",
          "content": "{ \"data\": { \"timestamp\": \"2018-08-27T20:53:41.976Z\", \"files\": [ \"documento1\", \"documento2\" ], \"_id\": \"5b8464d565fb8a39b8ae3523\", \"buyer\": \"5b84586674acb1030cabb419\", \"property\": \"5b842b334f965c30a03c1951\", \"status\": \"Verde\", \"notes\": \"Describir credito\", \"__v\": 0 } }",
          "type": "json"
        }
      ]
    },
    "filename": "src/router/CreditRouter.ts",
    "groupTitle": "credit",
    "sampleRequest": [
      {
        "url": "https://cobianback.herokuapp.com/api/v1/credit/"
      }
    ]
  },
  {
    "type": "PUT",
    "url": "/credit/:_id",
    "title": "Request Update",
    "version": "0.1.0",
    "name": "put",
    "group": "credit",
    "filename": "src/router/CreditRouter.ts",
    "groupTitle": "credit",
    "sampleRequest": [
      {
        "url": "https://cobianback.herokuapp.com/api/v1/credit/:_id"
      }
    ]
  },
  {
    "type": "DELETE",
    "url": "/goal/:id",
    "title": "Request  Deleted",
    "version": "0.1.0",
    "name": "deleteByToken",
    "group": "goal",
    "filename": "src/router/GoalRouter.ts",
    "groupTitle": "goal",
    "sampleRequest": [
      {
        "url": "https://cobianback.herokuapp.com/api/v1/goal/:id"
      }
    ]
  },
  {
    "type": "GET",
    "url": "/goal/",
    "title": "Request all by company",
    "version": "0.1.0",
    "name": "get",
    "group": "goal",
    "filename": "src/router/GoalRouter.ts",
    "groupTitle": "goal",
    "sampleRequest": [
      {
        "url": "https://cobianback.herokuapp.com/api/v1/goal/"
      }
    ]
  },
  {
    "type": "GET",
    "url": "/goal/bygoalid/:id",
    "title": "Request by Object Id",
    "version": "0.1.0",
    "name": "getById",
    "group": "goal",
    "filename": "src/router/GoalRouter.ts",
    "groupTitle": "goal",
    "sampleRequest": [
      {
        "url": "https://cobianback.herokuapp.com/api/v1/goal/bygoalid/:id"
      }
    ]
  },
  {
    "type": "POST",
    "url": "/goal/",
    "title": "Request New",
    "version": "0.1.0",
    "name": "post",
    "group": "goal",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "content",
            "description": "<p>Descripcion de meta</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjetId[]",
            "optional": false,
            "field": "adviser",
            "description": "<p>Asesores</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "status",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "dataNumber",
            "description": "<p>Dato Cuantitativo</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "isByManagement",
            "description": "<p>Personal o equipo</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>Titulo</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "dateLimit",
            "description": "<p>Fecha limite</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{ \"adviser\":\"5b8082ba69a5a10b589abc75\", \"status\":\"sin completar\", \"dataNumber\":2, \"isByManagement\":false, \"title\":\"Objetivo1\", \"content\": \"Ventas por mes\", \"dateLimit\": \"20/11/2018\" }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response Created User:",
          "content": "{ \"data\": { \"timestamp\": \"2018-08-27T21:11:44.455Z\", \"adviser\": [ \"5b8082ba69a5a10b589abc75\" ], \"dataNumber\": 2, \"isComplete\": false, \"_id\": \"5b8469105b769522d8806ff0\", \"content\": \"Ventas por mes\", \"status\": \"sin completar\", \"isByManagement\": false, \"title\": \"Objetivo1\", \"dateLimit\": \"20/11/2018\", \"__v\": 0 } }",
          "type": "json"
        }
      ]
    },
    "filename": "src/router/GoalRouter.ts",
    "groupTitle": "goal",
    "sampleRequest": [
      {
        "url": "https://cobianback.herokuapp.com/api/v1/goal/"
      }
    ]
  },
  {
    "type": "PUT",
    "url": "/goal/:_id",
    "title": "Request Update",
    "version": "0.1.0",
    "name": "put",
    "group": "goal",
    "filename": "src/router/GoalRouter.ts",
    "groupTitle": "goal",
    "sampleRequest": [
      {
        "url": "https://cobianback.herokuapp.com/api/v1/goal/:_id"
      }
    ]
  },
  {
    "type": "DELETE",
    "url": "/management/:id",
    "title": "Request  Deleted",
    "version": "0.1.0",
    "name": "deleteByToken",
    "group": "management",
    "filename": "src/router/ManagementRouter.ts",
    "groupTitle": "management",
    "sampleRequest": [
      {
        "url": "https://cobianback.herokuapp.com/api/v1/management/:id"
      }
    ]
  },
  {
    "type": "GET",
    "url": "/management//",
    "title": "Request all",
    "version": "0.1.0",
    "name": "get",
    "group": "management",
    "filename": "src/router/ManagementRouter.ts",
    "groupTitle": "management",
    "sampleRequest": [
      {
        "url": "https://cobianback.herokuapp.com/api/v1/management//"
      }
    ]
  },
  {
    "type": "GET",
    "url": "/bymanagementcity/:city",
    "title": "Request by Object City",
    "version": "0.1.0",
    "name": "getByCity",
    "group": "management",
    "filename": "src/router/ManagementRouter.ts",
    "groupTitle": "management",
    "sampleRequest": [
      {
        "url": "https://cobianback.herokuapp.com/api/v1/bymanagementcity/:city"
      }
    ]
  },
  {
    "type": "GET",
    "url": "/management/bymanagementid/:id",
    "title": "Request by Object Id",
    "version": "0.1.0",
    "name": "getById",
    "group": "management",
    "filename": "src/router/ManagementRouter.ts",
    "groupTitle": "management",
    "sampleRequest": [
      {
        "url": "https://cobianback.herokuapp.com/api/v1/management/bymanagementid/:id"
      }
    ]
  },
  {
    "type": "GET",
    "url": "/management/bymanagementpassword/:b64",
    "title": "Request by Object Id",
    "version": "0.1.0",
    "name": "getById",
    "group": "management",
    "filename": "src/router/ManagementRouter.ts",
    "groupTitle": "management",
    "sampleRequest": [
      {
        "url": "https://cobianback.herokuapp.com/api/v1/management/bymanagementpassword/:b64"
      }
    ]
  },
  {
    "type": "POST",
    "url": "/management/",
    "title": "Request New",
    "version": "0.1.0",
    "name": "post",
    "group": "management",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": ""
          }
        ]
      }
    },
    "filename": "src/router/ManagementRouter.ts",
    "groupTitle": "management",
    "sampleRequest": [
      {
        "url": "https://cobianback.herokuapp.com/api/v1/management/"
      }
    ]
  },
  {
    "type": "PUT",
    "url": "/management/:_id",
    "title": "Request Update",
    "version": "0.1.0",
    "name": "put",
    "group": "management",
    "filename": "src/router/ManagementRouter.ts",
    "groupTitle": "management",
    "sampleRequest": [
      {
        "url": "https://cobianback.herokuapp.com/api/v1/management/:_id"
      }
    ]
  },
  {
    "type": "DELETE",
    "url": "/notification/:id",
    "title": "Request  Deleted",
    "version": "0.1.0",
    "name": "deleteByToken",
    "group": "notification",
    "filename": "src/router/NotificationRouter.ts",
    "groupTitle": "notification",
    "sampleRequest": [
      {
        "url": "https://cobianback.herokuapp.com/api/v1/notification/:id"
      }
    ]
  },
  {
    "type": "GET",
    "url": "/notification/",
    "title": "Request all",
    "version": "0.1.0",
    "name": "get",
    "group": "notification",
    "filename": "src/router/NotificationRouter.ts",
    "groupTitle": "notification",
    "sampleRequest": [
      {
        "url": "https://cobianback.herokuapp.com/api/v1/notification/"
      }
    ]
  },
  {
    "type": "POST",
    "url": "/notification/",
    "title": "Request New",
    "version": "0.1.0",
    "name": "post",
    "group": "notification",
    "filename": "src/router/NotificationRouter.ts",
    "groupTitle": "notification",
    "sampleRequest": [
      {
        "url": "https://cobianback.herokuapp.com/api/v1/notification/"
      }
    ]
  },
  {
    "type": "PUT",
    "url": "/notification/:_id",
    "title": "Request Update",
    "version": "0.1.0",
    "name": "put",
    "group": "notification",
    "filename": "src/router/NotificationRouter.ts",
    "groupTitle": "notification",
    "sampleRequest": [
      {
        "url": "https://cobianback.herokuapp.com/api/v1/notification/:_id"
      }
    ]
  },
  {
    "type": "DELETE",
    "url": "/ofert/:id",
    "title": "Request  Deleted",
    "version": "0.1.0",
    "name": "deleteByToken",
    "group": "ofert",
    "filename": "src/router/OfertRouter.ts",
    "groupTitle": "ofert",
    "sampleRequest": [
      {
        "url": "https://cobianback.herokuapp.com/api/v1/ofert/:id"
      }
    ]
  },
  {
    "type": "GET",
    "url": "/ofert/Request",
    "title": "all",
    "version": "0.1.0",
    "name": "get",
    "group": "ofert",
    "filename": "src/router/OfertRouter.ts",
    "groupTitle": "ofert",
    "sampleRequest": [
      {
        "url": "https://cobianback.herokuapp.com/api/v1/ofert/Request"
      }
    ]
  },
  {
    "type": "GET",
    "url": "/ofert/:id",
    "title": "Request by Object Id",
    "version": "0.1.0",
    "name": "getById",
    "group": "ofert",
    "filename": "src/router/OfertRouter.ts",
    "groupTitle": "ofert",
    "sampleRequest": [
      {
        "url": "https://cobianback.herokuapp.com/api/v1/ofert/:id"
      }
    ]
  },
  {
    "type": "POST",
    "url": "/ofert/",
    "title": "Request New",
    "version": "0.1.0",
    "name": "post",
    "group": "ofert",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "buyer",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "property",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "status",
            "description": "<p>aceptadas, rechazadas o sigue en negociación.</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "notes",
            "description": "<p>Notas extra</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "ofertPrice",
            "description": "<p>Oferta</p>"
          },
          {
            "group": "Parameter",
            "type": "string[]",
            "optional": false,
            "field": "files",
            "description": "<p>Documentos</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{ \"name\":\"Consultor 1\", \"lastName\":\"Apellido\", \"password\":\"1234\", \"description\":\"Especialidad en\", \"companyId\":\"5b6db7c05291313ddcc318b7\" }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response Created User:",
          "content": "{ \"data\": { \"timestamp\": \"2018-08-10T16:08:32.439Z\", \"rankingAverage\": 0, \"tickets\": [], \"_id\": \"5b6db8805291313ddcc318b9\", \"name\": \"Consultor 1\", \"lastName\": \"Apellido\", \"password\": \"1234\", \"description\": \"Especialidad en\", \"companyId\": \"5b6db7c05291313ddcc318b7\", \"__v\": 0 } }",
          "type": "json"
        }
      ]
    },
    "filename": "src/router/OfertRouter.ts",
    "groupTitle": "ofert",
    "sampleRequest": [
      {
        "url": "https://cobianback.herokuapp.com/api/v1/ofert/"
      }
    ]
  },
  {
    "type": "PUT",
    "url": "/ofert/:_id",
    "title": "Request Update",
    "version": "0.1.0",
    "name": "put",
    "group": "ofert",
    "filename": "src/router/OfertRouter.ts",
    "groupTitle": "ofert",
    "sampleRequest": [
      {
        "url": "https://cobianback.herokuapp.com/api/v1/ofert/:_id"
      }
    ]
  },
  {
    "type": "DELETE",
    "url": "/office/:id",
    "title": "Request  Deleted",
    "version": "0.1.0",
    "name": "deleteByToken",
    "group": "office",
    "filename": "src/router/OfficeRouter.ts",
    "groupTitle": "office",
    "sampleRequest": [
      {
        "url": "https://cobianback.herokuapp.com/api/v1/office/:id"
      }
    ]
  },
  {
    "type": "GET",
    "url": "/office/Request",
    "title": "all",
    "version": "0.1.0",
    "name": "get",
    "group": "office",
    "filename": "src/router/OfficeRouter.ts",
    "groupTitle": "office",
    "sampleRequest": [
      {
        "url": "https://cobianback.herokuapp.com/api/v1/office/Request"
      }
    ]
  },
  {
    "type": "GET",
    "url": "/office/byofficeid/:id",
    "title": "Request by Object Id",
    "version": "0.1.0",
    "name": "getById",
    "group": "office",
    "filename": "src/router/OfficeRouter.ts",
    "groupTitle": "office",
    "sampleRequest": [
      {
        "url": "https://cobianback.herokuapp.com/api/v1/office/byofficeid/:id"
      }
    ]
  },
  {
    "type": "POST",
    "url": "/office/",
    "title": "Request New",
    "version": "0.1.0",
    "name": "post",
    "group": "office",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": ""
          }
        ]
      }
    },
    "filename": "src/router/OfficeRouter.ts",
    "groupTitle": "office",
    "sampleRequest": [
      {
        "url": "https://cobianback.herokuapp.com/api/v1/office/"
      }
    ]
  },
  {
    "type": "PUT",
    "url": "/office/:_id",
    "title": "Request Update",
    "version": "0.1.0",
    "name": "put",
    "group": "office",
    "filename": "src/router/OfficeRouter.ts",
    "groupTitle": "office",
    "sampleRequest": [
      {
        "url": "https://cobianback.herokuapp.com/api/v1/office/:_id"
      }
    ]
  },
  {
    "type": "DELETE",
    "url": "/property/:id",
    "title": "Request  Deleted",
    "version": "0.1.0",
    "name": "deleteByToken",
    "group": "property",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "propertyId",
            "description": "<p>Must be provided as QueryParam</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"data\":true}",
          "type": "json"
        }
      ]
    },
    "filename": "src/router/PropertyRouter.ts",
    "groupTitle": "property",
    "sampleRequest": [
      {
        "url": "https://cobianback.herokuapp.com/api/v1/property/:id"
      }
    ]
  },
  {
    "type": "POST",
    "url": "/property/matchsearchbybuyer/:id",
    "title": "Request match search by buyer",
    "version": "0.1.0",
    "name": "demomatch",
    "group": "property",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "buyerId",
            "description": "<p>Must be provided as QueryParam</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "percentage",
            "description": "<p>% Minimo de match</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{ \"percentage\": 60 }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"data\":true}",
          "type": "json"
        }
      ]
    },
    "filename": "src/router/PropertyRouter.ts",
    "groupTitle": "property",
    "sampleRequest": [
      {
        "url": "https://cobianback.herokuapp.com/api/v1/property/matchsearchbybuyer/:id"
      }
    ]
  },
  {
    "type": "GET",
    "url": "/property/",
    "title": "Request all",
    "version": "0.1.0",
    "name": "get",
    "group": "property",
    "filename": "src/router/PropertyRouter.ts",
    "groupTitle": "property",
    "sampleRequest": [
      {
        "url": "https://cobianback.herokuapp.com/api/v1/property/"
      }
    ]
  },
  {
    "type": "GET",
    "url": "/property/bypropertyid/:id",
    "title": "Request by Object Id",
    "version": "0.1.0",
    "name": "getById",
    "group": "property",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "propertyId",
            "description": "<p>Must be provided as QueryParam</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "https://cobianback.herokuapp.com/api/v1/property/bypropertyid/5b842b334f965c30a03c1951"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response Consultant:",
          "content": "{ \"data\": { \"timestamp\": \"2018-08-27T16:47:47.968Z\", \"tag\": [ \"UPAEP\" ], \"files\": [ \"documento1\", \"documento2\" ], \"_id\": \"5b842b334f965c30a03c1951\", \"isRent\": true, \"name\": \"Depa 1\", \"typeOfProperty\": \"departamento\", \"space\": 45, \"dateToBuy\": \"18/11/2018\", \"zone\": \"La Paz\", \"minPrice\": 2500, \"maxPrice\": 2500, \"numRooms\": 1, \"numCars\": 1, \"isOld\": false, \"isClose\": false, \"numBathrooms\": 2, \"hasGarden\": false, \"isLowLevel\": false, \"hasElevator\": false, \"allServices\": true, \"wayToBuy\": \"otros\", \"__v\": 0 } }",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "timestamp",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "isRent",
            "description": "<p>Renta o Compra</p>"
          },
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "_id",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>apiSuccess {string[]} typeOfProperty Tipos de Vivienda casa, departamento, terreno, nave industrial, etc., con la posibilidad de agregar alguna opción que no aparezca dentro del listado.</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "space",
            "description": "<p>Espacio de vivienda</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "numVisit",
            "description": "<p>num de Visitas</p>"
          },
          {
            "group": "Success 200",
            "type": "string[]",
            "optional": false,
            "field": "tag",
            "description": "<p>Etiquetas</p>"
          },
          {
            "group": "Success 200",
            "type": "string[]",
            "optional": false,
            "field": "files",
            "description": "<p>Documentos</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "dateToBuy",
            "description": "<p>Fecha posible compra/renta</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "zone",
            "description": "<p>Zona de compra/renta</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "minPrice",
            "description": "<p>Costo minimo</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "maxPrice",
            "description": "<p>Costo maximo</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "numRooms",
            "description": "<p>Numero de recamaras</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "numCars",
            "description": "<p>Numero de lugares de estacionamiento</p>"
          },
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "isOld",
            "description": "<p>Nuevo o usado</p>"
          },
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "isClose",
            "description": "<p>fraccionamiento cerrado o abierto</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "numBathrooms",
            "description": "<p>numero de banos</p>"
          },
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "hasGarden",
            "description": "<p>jardin</p>"
          },
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "isLowLevel",
            "description": "<p>Si se desea recámara en planta baja</p>"
          },
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "hasElevator",
            "description": "<p>Elevador</p>"
          },
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "allServices",
            "description": "<p>Con o sin servicios</p>"
          },
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "wayToBuy",
            "description": "<p>Forma de compra FOVISSTE, IMSS, contado, PEMEX, Infonavit, aliados, otros</p>"
          }
        ]
      }
    },
    "filename": "src/router/PropertyRouter.ts",
    "groupTitle": "property"
  },
  {
    "type": "POST",
    "url": "/property/matchsearchbydemo/",
    "title": "Request demo match",
    "version": "0.1.0",
    "name": "matchsearchbybuyer",
    "group": "property",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "percentage",
            "description": "<p>% Minimo de match</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "typeOfProperty",
            "description": "<p>Tipos de Vivienda casa, departamento, terreno, nave industrial, etc., con la posibilidad de agregar alguna opción que no aparezca dentro del listado.</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "space",
            "description": "<p>Espacio de vivienda</p>"
          },
          {
            "group": "Parameter",
            "type": "string[]",
            "optional": false,
            "field": "tag",
            "description": "<p>Etiquetas</p>"
          },
          {
            "group": "Parameter",
            "type": "ISchedule[]",
            "optional": false,
            "field": "schedule",
            "description": "<p>Eventos programados</p>"
          },
          {
            "group": "Parameter",
            "type": "ICredit[]",
            "optional": false,
            "field": "credit",
            "description": "<p>Creditos</p>"
          },
          {
            "group": "Parameter",
            "type": "string[]",
            "optional": false,
            "field": "files",
            "description": "<p>Documentos</p>"
          },
          {
            "group": "Parameter",
            "type": "IProperty[]",
            "optional": false,
            "field": "property",
            "description": "<p>Lista de sugerencias</p>"
          },
          {
            "group": "Parameter",
            "type": "IProperty[]",
            "optional": false,
            "field": "propertySave",
            "description": "<p>Lista Propiedades guardadas o que le interesan</p>"
          },
          {
            "group": "Parameter",
            "type": "IAdviser[]",
            "optional": false,
            "field": "adviser",
            "description": "<p>Asesores Asignados</p>"
          },
          {
            "group": "Parameter",
            "type": "INotification[]",
            "optional": false,
            "field": "notification",
            "description": "<p>Notificaciones guardadas</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "isRenter",
            "description": "<p>Renta o Compra</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "dateToBuy",
            "description": "<p>Fecha posible compra/renta</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "zone",
            "description": "<p>Zona de compra/renta</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "minPrice",
            "description": "<p>Costo minimo</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "maxPrice",
            "description": "<p>Costo maximo</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "numRooms",
            "description": "<p>Numero de recamaras</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "numCars",
            "description": "<p>Numero de lugares de estacionamiento</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "isOld",
            "description": "<p>Nuevo o usado</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "isClose",
            "description": "<p>fraccionamiento cerrado o abierto</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "numBathrooms",
            "description": "<p>numero de banos</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "hasGarden",
            "description": "<p>jardin</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "isLowLevel",
            "description": "<p>Si se desea recámara en planta baja</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "hasElevator",
            "description": "<p>Elevador</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "allServices",
            "description": "<p>Con o sin servicios</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "wayToBuy",
            "description": "<p>Forma de compra FOVISSTE, IMSS, contado, PEMEX, Infonavit, aliados, otros</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{ \"typeOfProperty\":\"departamento\", \"space\":40, \"tag\":[\"mascotas\", \"estudiante\"], \"isRenter\":true, \"dateToBuy\":\"20/12/2018\", \"zone\":\"La Paz\", \"minPrice\":2000, \"maxPrice\":4000, \"numRooms\":1, \"numCars\":0, \"isOld\":false, \"isClose\":false, \"numBathrooms\":2, \"hasGarden\":false, \"isLowLevel\":false, \"hasElevator\":false, \"allServices\":true, \"wayToBuy\":\"otro\", \"percentage\": 60 }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{ \"data\": [ { \"timestamp\": \"2018-08-27T16:47:47.968Z\", \"tag\": [ \"UPAEP\" ], \"files\": [ \"documento1\", \"documento2\", \"documento3\" ], \"_id\": \"5b842b334f965c30a03c1951\", \"isRent\": true, \"name\": \"Depa 1\", \"typeOfProperty\": \"departamento\", \"space\": 45, \"dateToBuy\": \"18/11/2018\", \"zone\": \"La Paz\", \"minPrice\": 2500, \"maxPrice\": 2500, \"numRooms\": 1, \"numCars\": 1, \"isOld\": false, \"isClose\": false, \"numBathrooms\": 2, \"hasGarden\": false, \"isLowLevel\": false, \"hasElevator\": false, \"allServices\": true, \"wayToBuy\": \"otros\", \"__v\": 0 } ] }",
          "type": "json"
        }
      ]
    },
    "filename": "src/router/PropertyRouter.ts",
    "groupTitle": "property",
    "sampleRequest": [
      {
        "url": "https://cobianback.herokuapp.com/api/v1/property/matchsearchbydemo/"
      }
    ]
  },
  {
    "type": "POST",
    "url": "/property/",
    "title": "Request New",
    "version": "0.1.0",
    "name": "post",
    "group": "property",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "isRent",
            "description": "<p>Renta o Compra</p>"
          },
          {
            "group": "Parameter",
            "type": "string[]",
            "optional": false,
            "field": "typeOfProperty",
            "description": "<p>Tipos de Vivienda casa, departamento, terreno, nave industrial, etc., con la posibilidad de agregar alguna opción que no aparezca dentro del listado.</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "space",
            "description": "<p>Espacio de vivienda</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "numVisit",
            "description": "<p>num de Visitas</p>"
          },
          {
            "group": "Parameter",
            "type": "string[]",
            "optional": false,
            "field": "tag",
            "description": "<p>Etiquetas</p>"
          },
          {
            "group": "Parameter",
            "type": "string[]",
            "optional": false,
            "field": "files",
            "description": "<p>Documentos</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "dateToBuy",
            "description": "<p>Fecha posible compra/renta</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "zone",
            "description": "<p>Zona de compra/renta</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "minPrice",
            "description": "<p>Costo minimo</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "maxPrice",
            "description": "<p>Costo maximo</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "numRooms",
            "description": "<p>Numero de recamaras</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "numCars",
            "description": "<p>Numero de lugares de estacionamiento</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "isOld",
            "description": "<p>Nuevo o usado</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "isClose",
            "description": "<p>fraccionamiento cerrado o abierto</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "numBathrooms",
            "description": "<p>numero de banos</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "hasGarden",
            "description": "<p>jardin</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "isLowLevel",
            "description": "<p>Si se desea recámara en planta baja</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "hasElevator",
            "description": "<p>Elevador</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "allServices",
            "description": "<p>Con o sin servicios</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "wayToBuy",
            "description": "<p>Forma de compra FOVISSTE, IMSS, contado, PEMEX, Infonavit, aliados, otros</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{ \"isRent\":true, \"name\":\"Depa 1\", \"typeOfProperty\":\"departamento\", \"space\":45, \"tag\":[\"UPAEP\"], \"files\":[\"documento1\",\"documento2\"], \"dateToBuy\":\"18/11/2018\", \"zone\":\"La Paz\", \"minPrice\":2500, \"maxPrice\":2500, \"numRooms\":1, \"numCars\":1, \"isOld\":false, \"isClose\":false, \"numBathrooms\":2, \"hasGarden\":false, \"isLowLevel\":false, \"hasElevator\":false, \"allServices\":true, \"wayToBuy\":\"otros\" }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response Created User:",
          "content": "{ \"data\": { \"timestamp\": \"2018-08-27T16:47:47.968Z\", \"tag\": [ \"UPAEP\" ], \"files\": [ \"documento1\", \"documento2\" ], \"_id\": \"5b842b334f965c30a03c1951\", \"isRent\": true, \"name\": \"Depa 1\", \"typeOfProperty\": \"departamento\", \"space\": 45, \"dateToBuy\": \"18/11/2018\", \"zone\": \"La Paz\", \"minPrice\": 2500, \"maxPrice\": 2500, \"numRooms\": 1, \"numCars\": 1, \"isOld\": false, \"isClose\": false, \"numBathrooms\": 2, \"hasGarden\": false, \"isLowLevel\": false, \"hasElevator\": false, \"allServices\": true, \"wayToBuy\": \"otros\", \"__v\": 0 } }",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "timestamp",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "isRent",
            "description": "<p>Renta o Compra</p>"
          },
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "_id",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>apiSuccess {string[]} typeOfProperty Tipos de Vivienda casa, departamento, terreno, nave industrial, etc., con la posibilidad de agregar alguna opción que no aparezca dentro del listado.</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "space",
            "description": "<p>Espacio de vivienda</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "numVisit",
            "description": "<p>num de Visitas</p>"
          },
          {
            "group": "Success 200",
            "type": "string[]",
            "optional": false,
            "field": "tag",
            "description": "<p>Etiquetas</p>"
          },
          {
            "group": "Success 200",
            "type": "string[]",
            "optional": false,
            "field": "files",
            "description": "<p>Documentos</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "dateToBuy",
            "description": "<p>Fecha posible compra/renta</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "zone",
            "description": "<p>Zona de compra/renta</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "minPrice",
            "description": "<p>Costo minimo</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "maxPrice",
            "description": "<p>Costo maximo</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "numRooms",
            "description": "<p>Numero de recamaras</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "numCars",
            "description": "<p>Numero de lugares de estacionamiento</p>"
          },
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "isOld",
            "description": "<p>Nuevo o usado</p>"
          },
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "isClose",
            "description": "<p>fraccionamiento cerrado o abierto</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "numBathrooms",
            "description": "<p>numero de banos</p>"
          },
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "hasGarden",
            "description": "<p>jardin</p>"
          },
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "isLowLevel",
            "description": "<p>Si se desea recámara en planta baja</p>"
          },
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "hasElevator",
            "description": "<p>Elevador</p>"
          },
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "allServices",
            "description": "<p>Con o sin servicios</p>"
          },
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "wayToBuy",
            "description": "<p>Forma de compra FOVISSTE, IMSS, contado, PEMEX, Infonavit, aliados, otros</p>"
          }
        ]
      }
    },
    "filename": "src/router/PropertyRouter.ts",
    "groupTitle": "property",
    "sampleRequest": [
      {
        "url": "https://cobianback.herokuapp.com/api/v1/property/"
      }
    ]
  },
  {
    "type": "PUT",
    "url": "/property/:_id",
    "title": "Request Update",
    "version": "0.1.0",
    "name": "put",
    "group": "property",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "propertyId",
            "description": "<p>Must be provided as QueryParam</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "isRent",
            "description": "<p>Renta o Compra</p>"
          },
          {
            "group": "Parameter",
            "type": "string[]",
            "optional": false,
            "field": "typeOfProperty",
            "description": "<p>Tipos de Vivienda casa, departamento, terreno, nave industrial, etc., con la posibilidad de agregar alguna opción que no aparezca dentro del listado.</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "space",
            "description": "<p>Espacio de vivienda</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "numVisit",
            "description": "<p>num de Visitas</p>"
          },
          {
            "group": "Parameter",
            "type": "string[]",
            "optional": false,
            "field": "tag",
            "description": "<p>Etiquetas</p>"
          },
          {
            "group": "Parameter",
            "type": "string[]",
            "optional": false,
            "field": "files",
            "description": "<p>Documentos</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "dateToBuy",
            "description": "<p>Fecha posible compra/renta</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "zone",
            "description": "<p>Zona de compra/renta</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "minPrice",
            "description": "<p>Costo minimo</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "maxPrice",
            "description": "<p>Costo maximo</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "numRooms",
            "description": "<p>Numero de recamaras</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "numCars",
            "description": "<p>Numero de lugares de estacionamiento</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "isOld",
            "description": "<p>Nuevo o usado</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "isClose",
            "description": "<p>fraccionamiento cerrado o abierto</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "numBathrooms",
            "description": "<p>numero de banos</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "hasGarden",
            "description": "<p>jardin</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "isLowLevel",
            "description": "<p>Si se desea recámara en planta baja</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "hasElevator",
            "description": "<p>Elevador</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "allServices",
            "description": "<p>Con o sin servicios</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "wayToBuy",
            "description": "<p>Forma de compra FOVISSTE, IMSS, contado, PEMEX, Infonavit, aliados, otros</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{ \"files\":[\"documento1\",\"documento2\", \"documento3\"] }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{ \"data\": true }",
          "type": "json"
        }
      ]
    },
    "filename": "src/router/PropertyRouter.ts",
    "groupTitle": "property",
    "sampleRequest": [
      {
        "url": "https://cobianback.herokuapp.com/api/v1/property/:_id"
      }
    ]
  },
  {
    "type": "DELETE",
    "url": "/schedule/:id",
    "title": "Request  Deleted",
    "version": "0.1.0",
    "name": "deleteByToken",
    "group": "schedule",
    "filename": "src/router/ScheduleRouter.ts",
    "groupTitle": "schedule",
    "sampleRequest": [
      {
        "url": "https://cobianback.herokuapp.com/api/v1/schedule/:id"
      }
    ]
  },
  {
    "type": "GET",
    "url": "/schedule/:id",
    "title": "Request all by company",
    "version": "0.1.0",
    "name": "get",
    "group": "schedule",
    "filename": "src/router/ScheduleRouter.ts",
    "groupTitle": "schedule",
    "sampleRequest": [
      {
        "url": "https://cobianback.herokuapp.com/api/v1/schedule/:id"
      }
    ]
  },
  {
    "type": "GET",
    "url": "/schedule/byscheduleid/:id",
    "title": "Request by Object Id",
    "version": "0.1.0",
    "name": "getById",
    "group": "schedule",
    "filename": "src/router/ScheduleRouter.ts",
    "groupTitle": "schedule",
    "sampleRequest": [
      {
        "url": "https://cobianback.herokuapp.com/api/v1/schedule/byscheduleid/:id"
      }
    ]
  },
  {
    "type": "POST",
    "url": "/schedule/",
    "title": "Request New",
    "version": "0.1.0",
    "name": "post",
    "group": "schedule",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "address",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "description",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "property",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "buyer",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "adviser",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "seller",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "status",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "note",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "day",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "month",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "year",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "hour",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "minute",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{ \"dateOfEvent\":\"20/18/2018\", \"title\":\"Evento2\", \"address\":\"La paz\", \"property\":\"5b842b334f965c30a03c1951\", \"buyer\":\"5b84586674acb1030cabb419\", \"adviser\":\"5b8082ba69a5a10b589abc75\", \"status\":\"Pendiente\", \"note\":\"Ver Propiedad segunda visita\" }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response Created User:",
          "content": "{ \"data\": { \"timestamp\": \"2018-08-27T21:57:08.771Z\", \"_id\": \"5b8473b42a3ac4214ce7590b\", \"title\": \"Evento2\", \"address\": \"La paz\", \"property\": \"5b842b334f965c30a03c1951\", \"buyer\": \"5b84586674acb1030cabb419\", \"adviser\": \"5b8082ba69a5a10b589abc75\", \"status\": \"Pendiente\", \"note\": \"Ver Propiedad segunda visita\", \"dateOfEvent\": \"20/18/2018\", \"__v\": 0 } }",
          "type": "json"
        }
      ]
    },
    "filename": "src/router/ScheduleRouter.ts",
    "groupTitle": "schedule",
    "sampleRequest": [
      {
        "url": "https://cobianback.herokuapp.com/api/v1/schedule/"
      }
    ]
  },
  {
    "type": "PUT",
    "url": "/schedule/:_id",
    "title": "Request Update",
    "version": "0.1.0",
    "name": "put",
    "group": "schedule",
    "filename": "src/router/ScheduleRouter.ts",
    "groupTitle": "schedule",
    "sampleRequest": [
      {
        "url": "https://cobianback.herokuapp.com/api/v1/schedule/:_id"
      }
    ]
  },
  {
    "type": "DELETE",
    "url": "/seller/:id",
    "title": "Request  Deleted",
    "version": "0.1.0",
    "name": "deleteByToken",
    "group": "seller",
    "filename": "src/router/SellerRouter.ts",
    "groupTitle": "seller",
    "sampleRequest": [
      {
        "url": "https://cobianback.herokuapp.com/api/v1/seller/:id"
      }
    ]
  },
  {
    "type": "GET",
    "url": "/seller/",
    "title": "Request all",
    "version": "0.1.0",
    "name": "get",
    "group": "seller",
    "filename": "src/router/SellerRouter.ts",
    "groupTitle": "seller",
    "sampleRequest": [
      {
        "url": "https://cobianback.herokuapp.com/api/v1/seller/"
      }
    ]
  },
  {
    "type": "GET",
    "url": "/bysellercity/:city",
    "title": "Request by Object City",
    "version": "0.1.0",
    "name": "getByCity",
    "group": "seller",
    "filename": "src/router/SellerRouter.ts",
    "groupTitle": "seller",
    "sampleRequest": [
      {
        "url": "https://cobianback.herokuapp.com/api/v1/bysellercity/:city"
      }
    ]
  },
  {
    "type": "GET",
    "url": "/seller/bysellerid/:Id",
    "title": "Request by Object Id",
    "version": "0.1.0",
    "name": "getById",
    "group": "seller",
    "filename": "src/router/SellerRouter.ts",
    "groupTitle": "seller",
    "sampleRequest": [
      {
        "url": "https://cobianback.herokuapp.com/api/v1/seller/bysellerid/:Id"
      }
    ]
  },
  {
    "type": "POST",
    "url": "/seller/",
    "title": "Request New",
    "version": "0.1.0",
    "name": "post",
    "group": "seller",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "lastName",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "isRenter",
            "description": "<p>Renta o Vende</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{ \"name\": \"Vendedor 1\", \"lastName\": \"Apellido\", \"password\":\"12345\", \"isRenter\": true }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response Created User:",
          "content": "{ \"data\": { \"timestamp\": \"2018-08-27T22:34:35.839Z\", \"property\": [], \"schedule\": [], \"notification\": [], \"_id\": \"5b847c7bdba3a530b0aa264b\", \"name\": \"Vendedor 1\", \"lastName\": \"Apellido\", \"password\": \"12345\", \"isRenter\": true, \"__v\": 0 } }",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "timestamp",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "IProperty[]",
            "optional": false,
            "field": "property",
            "description": "<p>Propiedades</p>"
          },
          {
            "group": "Success 200",
            "type": "ISchedule[]",
            "optional": false,
            "field": "schedule",
            "description": "<p>Eventos</p>"
          },
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "_id",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "INotification[]",
            "optional": false,
            "field": "notification",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "lastName",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "isRenter",
            "description": ""
          }
        ]
      }
    },
    "filename": "src/router/SellerRouter.ts",
    "groupTitle": "seller",
    "sampleRequest": [
      {
        "url": "https://cobianback.herokuapp.com/api/v1/seller/"
      }
    ]
  },
  {
    "type": "PUT",
    "url": "/seller/:_id",
    "title": "Request Update",
    "version": "0.1.0",
    "name": "put",
    "group": "seller",
    "filename": "src/router/SellerRouter.ts",
    "groupTitle": "seller",
    "sampleRequest": [
      {
        "url": "https://cobianback.herokuapp.com/api/v1/seller/:_id"
      }
    ]
  },
  {
    "type": "POST",
    "url": "/status/upgradelevelbyid/:id",
    "title": "Request  UpgradeLevel",
    "version": "0.1.0",
    "name": "UpgradeLevel",
    "group": "status",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "id",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "status",
            "description": "<p>gris, verde, amarillo, rojo</p>"
          }
        ]
      }
    },
    "filename": "src/router/StatusBuyerPropertyRouter.ts",
    "groupTitle": "status",
    "sampleRequest": [
      {
        "url": "https://cobianback.herokuapp.com/api/v1/status/upgradelevelbyid/:id"
      }
    ]
  },
  {
    "type": "DELETE",
    "url": "/status/:id",
    "title": "Request  Deleted",
    "version": "0.1.0",
    "name": "deleteByToken",
    "group": "status",
    "filename": "src/router/StatusBuyerPropertyRouter.ts",
    "groupTitle": "status",
    "sampleRequest": [
      {
        "url": "https://cobianback.herokuapp.com/api/v1/status/:id"
      }
    ]
  },
  {
    "type": "GET",
    "url": "/status/bycompanyid/:companyId",
    "title": "Request all by company",
    "version": "0.1.0",
    "name": "get",
    "group": "status",
    "filename": "src/router/StatusBuyerPropertyRouter.ts",
    "groupTitle": "status",
    "sampleRequest": [
      {
        "url": "https://cobianback.herokuapp.com/api/v1/status/bycompanyid/:companyId"
      }
    ]
  },
  {
    "type": "GET",
    "url": "/status/bystatusid/:id",
    "title": "Request by Object Id",
    "version": "0.1.0",
    "name": "getById",
    "group": "status",
    "filename": "src/router/StatusBuyerPropertyRouter.ts",
    "groupTitle": "status",
    "sampleRequest": [
      {
        "url": "https://cobianback.herokuapp.com/api/v1/status/bystatusid/:id"
      }
    ]
  },
  {
    "type": "POST",
    "url": "/status/",
    "title": "Request New",
    "version": "0.1.0",
    "name": "post",
    "group": "status",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "status",
            "description": "<p>Estado (Negociación,Oferta,Propuesta de crédito  )</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "buyer",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "property",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "note",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{ \"status\":\"negociacion\", \"buyer\":\"5b84586674acb1030cabb419\", \"property\":\"5b842b334f965c30a03c1951\", \"note\":\"En proceso\" }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response Created User:",
          "content": "{ \"data\": { \"timestamp\": \"2018-08-27T22:18:13.525Z\", \"_id\": \"5b8478a5258cea39b839cbf7\", \"status\": \"negociacion\", \"buyer\": \"5b84586674acb1030cabb419\", \"property\": \"5b842b334f965c30a03c1951\", \"note\": \"En proceso\", \"__v\": 0 } }",
          "type": "json"
        }
      ]
    },
    "filename": "src/router/StatusBuyerPropertyRouter.ts",
    "groupTitle": "status",
    "sampleRequest": [
      {
        "url": "https://cobianback.herokuapp.com/api/v1/status/"
      }
    ]
  },
  {
    "type": "PUT",
    "url": "/status/:_id",
    "title": "Request Update",
    "version": "0.1.0",
    "name": "put",
    "group": "status",
    "filename": "src/router/StatusBuyerPropertyRouter.ts",
    "groupTitle": "status",
    "sampleRequest": [
      {
        "url": "https://cobianback.herokuapp.com/api/v1/status/:_id"
      }
    ]
  }
] });
