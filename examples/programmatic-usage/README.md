# Schemix Example

Welcome to Schemix.

This example creates an API at 0.0.0.0:8000 with a route in which you can send GET requests to a `/model` endpoint.
It accepts the following `zod` schema.

```ts
validation.object({
  modelName: validation.string(),
  fields: validation.array(validation.object({
    type: validation.enum(["string", "int"]),
    name: validation.string(),
  })),
});
```

When a request is sent with the following body to `0.0.0.0:8000/model`, it will respond with the subsequent string.

```json
{
	"modelName": "ExampleModel",
	"fields": [
		{
			"type": "int",
			"name": "number"
		},
		{
			"type": "string",
			"name": "name"
		}
	]
}
```

```
model ExampleModel {
  id     String @id @default(uuid())
  number Int
  name   String
}
```

This example simply serves to prove that a purely programmatic approach to schema generation can be taken as of the release dated 15-09-2022.