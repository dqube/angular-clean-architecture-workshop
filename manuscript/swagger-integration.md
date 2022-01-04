# Install and Configure Swagger

## Installation

To begin using it, we first install the required dependencies.

```ts
yarn add @nestjs/core @nestjs/common @nestjs/swagger swagger-ui-express -D
```

The OpenAPI JSON 

```json
{
  "openapi": "3.0.0",
  "paths": {
    "/api": {
      "get": {
        "operationId": "getData",
        "parameters": [],
        "responses": {
          "200": {
            "description": ""
          }
        }
      }
    },
    "/api/accounts": {
      "post": {
        "operationId": "addAccount",
        "parameters": [],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/NewAccount"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Created new account.",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/"
                }
              }
            }
          },
          "400": {
            "description": "Error while processing request to create new account."
          },
          "500": {
            "description": "Failed to create account."
          }
        }
      }
    }
  },
  "info": {
    "title": "Accounts API",
    "description": "The accounts API with Swagger documentation.",
    "version": "1.0",
    "contact": {}
  },
  "tags": [
    {
      "name": "accounts",
      "description": ""
    }
  ],
  "servers": [],
  "components": {
    "schemas": {
      "NewAccount": {
        "type": "object",
        "properties": {}
      }
    }
  }
}
```

Update the model with the `@ApiProperty()`. 

> Swagger will examine the `@Body` annotation that points to the model. 

```ts
import { ApiProperty } from '@nestjs/swagger';

export class NewAccount {
  @ApiProperty()
  acceptTermsConditions: boolean;

  @ApiProperty()
  emailAddress: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  passwordConfirm: string;
}
```

```json
{
  "openapi": "3.0.0",
  "paths": {
    "/api": {
      "get": {
        "operationId": "getData",
        "parameters": [],
        "responses": {
          "200": {
            "description": ""
          }
        }
      }
    },
    "/api/accounts": {
      "post": {
        "operationId": "addAccount",
        "parameters": [],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/NewAccount"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Created new account.",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/"
                }
              }
            }
          },
          "400": {
            "description": "Error while processing request to create new account."
          },
          "500": {
            "description": "Failed to create account."
          }
        }
      }
    }
  },
  "info": {
    "title": "Accounts API",
    "description": "The accounts API with Swagger documentation.",
    "version": "1.0",
    "contact": {}
  },
  "tags": [
    {
      "name": "accounts",
      "description": ""
    }
  ],
  "servers": [],
  "components": {
    "schemas": {
      "NewAccount": {
        "type": "object",
        "properties": {
          "acceptTermsConditions": {
            "type": "boolean"
          },
          "emailAddress": {
            "type": "string"
          },
          "password": {
            "type": "string"
          },
          "passwordConfirm": {
            "type": "string"
          }
        },
        "required": [
          "acceptTermsConditions",
          "emailAddress",
          "password",
          "passwordConfirm"
        ]
      }
    }
  }
}
```

## Extend Models with Base Classes

Add a base class for the *create* models. 

```ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateBase {
  @ApiProperty()
  createdOn: Date;

  @ApiProperty()
  createdBy: string;
}

export class NewAccount extends CreateBase {
  @ApiProperty()
  acceptTermsConditions: boolean;

  @ApiProperty()
  emailAddress: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  passwordConfirm: string;
}
```

The Swagger OpenApi JSON document model is updated.

```json
{
  "openapi": "3.0.0",
  "paths": {
    "/api": {
      "get": {
        "operationId": "getData",
        "parameters": [],
        "responses": {
          "200": {
            "description": ""
          }
        }
      }
    },
    "/api/accounts": {
      "post": {
        "operationId": "addAccount",
        "parameters": [],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/NewAccount"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Created new account.",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/"
                }
              }
            }
          },
          "400": {
            "description": "Error while processing request to create new account."
          },
          "500": {
            "description": "Failed to create account."
          }
        }
      }
    }
  },
  "info": {
    "title": "Accounts API",
    "description": "The accounts API with Swagger documentation.",
    "version": "1.0",
    "contact": {}
  },
  "tags": [
    {
      "name": "accounts",
      "description": ""
    }
  ],
  "servers": [],
  "components": {
    "schemas": {
      "NewAccount": {
        "type": "object",
        "properties": {
          "createdOn": {
            "format": "date-time",
            "type": "string"
          },
          "createdBy": {
            "type": "string"
          },
          "acceptTermsConditions": {
            "type": "boolean"
          },
          "emailAddress": {
            "type": "string"
          },
          "password": {
            "type": "string"
          },
          "passwordConfirm": {
            "type": "string"
          }
        },
        "required": [
          "createdOn",
          "createdBy",
          "acceptTermsConditions",
          "emailAddress",
          "password",
          "passwordConfirm"
        ]
      }
    }
  }
}
```

### Execute Swagger

The *Request* body:

```json
{
  "createdOn": "2021-12-27T03:19:19.133Z",
  "createdBy": "string",
  "acceptTermsConditions": true,
  "emailAddress": "string",
  "password": "string",
  "passwordConfirm": "string"
}
```

The *response*. 

```json
{
  "isSuccess": true,
  "message": "Successfully created new account for 2db01022-2b86-a5b0-1fc5-0f7d2136f486",
  "messages": [
    {
      "code": "ACCOUNT_CREATE",
      "message": "We successfully created your account. Please check your email to verify.",
      "messageType": 1
    }
  ],
  "timestamp": "2021-12-27T03:19:49.790Z",
  "data": {
    "accountId": "1234",
    "emailAddress": "string",
    "userId": "2db01022-2b86-a5b0-1fc5-0f7d2136f486"
  },
  "id": "b1711b29-8ff8-947b-8d41-86db623f2930"
}
```

### OpenAPI

```json
{
  "openapi": "3.0.0",
  "paths": {
    "/api": {
      "get": {
        "operationId": "getData",
        "parameters": [],
        "responses": {
          "200": {
            "description": ""
          }
        }
      }
    },
    "/api/accounts": {
      "post": {
        "operationId": "addAccount",
        "parameters": [],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/NewAccount"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Created new account.",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/"
                }
              }
            }
          },
          "400": {
            "description": "Error while processing request to create new account."
          },
          "500": {
            "description": "Failed to create account."
          }
        }
      }
    }
  },
  "info": {
    "title": "Accounts API",
    "description": "The accounts API with Swagger documentation.",
    "version": "1.0",
    "contact": {}
  },
  "tags": [
    {
      "name": "accounts",
      "description": ""
    }
  ],
  "servers": [],
  "components": {
    "schemas": {
      "NewAccount": {
        "type": "object",
        "properties": {
          "createdOn": {
            "format": "date-time",
            "type": "string"
          },
          "createdBy": {
            "type": "string"
          },
          "acceptTermsConditions": {
            "type": "boolean",
            "description": "Indicates if the user has accepted the terms and conditions.",
            "default": false
          },
          "emailAddress": {
            "type": "string",
            "description": "The account user name [email address].",
            "minLength": 5,
            "maxLength": 120
          },
          "password": {
            "type": "string",
            "minLength": 8,
            "maxLength": 256
          },
          "passwordConfirm": {
            "type": "string"
          }
        },
        "required": [
          "createdOn",
          "createdBy",
          "acceptTermsConditions",
          "emailAddress",
          "password",
          "passwordConfirm"
        ]
      }
    }
  }
}
```