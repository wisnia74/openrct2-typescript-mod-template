const fetch = async () => {
  const text = 'declare global {\n'
    + '/**\n'
    + '* Global context for accessing all other APIs.\n'
    + '*/\n'
    + '/** APIs for cheats. */\n'
    + 'var cheats: Cheats;\n'
    + '/** APIs for interacting with the stdout console. */\n'
    + 'var console: Console;\n'
    + '/** Core APIs for plugins. */\n'
    + 'var context: Context;\n'
    + '/** APIs for getting or setting the in-game date. */\n'
    + 'var date: GameDate;\n'
    + '/** APIs for manipulating the map. */\n'
    + 'var map: GameMap;\n'
    + '/** APIs for managing the server or interacting with the server or clients. */\n'
    + 'var network: Network;\n'
    + '/** APIs for the park and management of it. */\n'
    + 'var park: Park;\n'
    + '/** APIs for the current scenario. */\n'
    + 'var scenario: Scenario;\n'
    + '}\n';

  return { text: async () => text };
};

export default fetch;
