import { route, validation } from "18h";
import { PrismaModel } from "../../../dist/modules/PrismaModel";

export default route({
  get: {
    schema: {
      request: validation.object({
        modelName: validation.string(),
        fields: validation.array(
          validation.object({
            type: validation.enum(["string", "int"]),
            name: validation.string(),
          })
        ),
      }),
      response: validation.string(),
    },
    accepts: ["json"],
    async handler(context) {
      const { body } = context.request;
      const model = new PrismaModel(body.modelName);
      model.string("id", { id: true, default: { uuid: true } });

      for (const { type, name } of body.fields) {
        model[type](name);
      }

      return {
        status: 200,
        body: model.toString(),
      };
    },
  },
});
