import swaggerJsdoc from "swagger-jsdoc";
export const swaggerSpec = swaggerJsdoc({
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Task Manager API",
            version: "1.0.0",
            description: "API documentation",
        },
        servers: [
            {
                url: "http://localhost:3000/api",
            },
        ],
        security: [
            {
                bearerAuth: [],
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
            schemas: {
                User: {
                    type: "object",
                    required: ["email", "password"],
                    properties: {
                        id: {
                            type: "integer",
                            example: 1,
                        },
                        email: {
                            type: "string",
                            example: "ali@gmail.com",
                        },
                        name: {
                            type: "string",
                            example: "Ali",
                        },
                        password: {
                            type: "string",
                            example: "123456",
                        },
                        is_active: {
                            type: "boolean",
                            example: false,
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time",
                        },
                    },
                },
                Task: {
                    type: "object",
                    required: ["title", "userId"],
                    properties: {
                        id: {
                            type: "integer",
                            example: 1,
                        },
                        title: {
                            type: "string",
                            example: "Learn Swagger",
                        },
                        description: {
                            type: "string",
                            example: "Read documentation",
                        },
                        userId: {
                            type: "integer",
                            example: 1,
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time",
                        },
                    },
                },
            },
        },
    },
    apis: ["./src/routes/*.ts"],
});
