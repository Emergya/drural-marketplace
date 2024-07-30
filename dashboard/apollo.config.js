module.exports = {
  client: {
    addTypename: true,
    includes: ["src/**/*.ts", "src/**/*.tsx"],
    name: "dashboard",
    service: {
      localSchemaFile: "graphql-schema.json",
      name: "drural"
    }
  }
};
