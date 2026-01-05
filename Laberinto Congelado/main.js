// Clase para representar un nodo (Galaxia + Site)
class Node {
  constructor(galaxy, site) {
    this.galaxy = galaxy;
    this.site = site;
    this.key = `${galaxy} Site ${site}`;
  }

  toString() {
    return this.key;
  }

  equals(other) {
    return this.key === other.key;
  }
}

// Clase para representar una conexión entre nodos
class Connection {
  constructor(from, to, portal, portalName) {
    this.from = from;
    this.to = to;
    this.portal = portal;
    this.portalName = portalName;
  }

  toString() {
    return `${this.from} → Portal ${this.portal} (${this.portalName}) → ${this.to}`;
  }
}

// Clase principal del grafo
class PortalGraph {
  constructor() {
    this.nodes = new Map(); // key -> Node
    this.connections = new Map(); // key -> [Connection]
    this.galaxies = new Set();
    this.initGraph();
  }

  initGraph() {
    // Datos del laberinto congelado
    const data = [
      // Atlas A
      // === ATLAS A ===
      {
        galaxy: "Atlas A",
        site: 1,
        portals: [
          { portal: 1, to: "Atlas C Site 2", name: "Arriba-Izq" },
          { portal: 2, to: "Orion Site 2", name: "Arriba-Der" },
          { portal: 3, to: "Eridani Site 4", name: "Abajo-Izq" },
          { portal: 4, to: "Cygni Site 2", name: "Abajo-Der" },
        ],
      },
      {
        galaxy: "Atlas A",
        site: 2,
        portals: [
          { portal: 1, to: "Persi Site 3", name: "Arriba-Izq" },
          { portal: 2, to: "Bootes Site 1", name: "Arriba-Der" },
          { portal: 3, to: "Cygni Site 4", name: "Abajo-Izq" },
          { portal: 4, to: "Sirius Site 4", name: "Abajo-Der" },
        ],
      },
      {
        galaxy: "Atlas A",
        site: 3,
        portals: [
          { portal: 1, to: "Orion Site 3", name: "Arriba-Izq" },
          { portal: 2, to: "Volantis Site 2", name: "Arriba-Der" },
          { portal: 3, to: "Maia Site 1", name: "Abajo-Izq" },
          { portal: 4, to: "Alcyone Site 3", name: "Abajo-Der" },
        ],
      },
      {
        galaxy: "Atlas A",
        site: 4,
        portals: [
          { portal: 1, to: "Sirius Site 3", name: "Arriba-Izq" },
          { portal: 2, to: "Volantis Site 2", name: "Arriba-Der" },
          { portal: 3, to: "Maia Site 3", name: "Abajo-Izq" },
          { portal: 4, to: "Maia Site 3", name: "Abajo-Der" },
        ],
      },

      // === ATLAS B ===
      {
        galaxy: "Atlas B",
        site: 1,
        portals: [
          { portal: 1, to: "Maia Site 2", name: "Arriba-Izq" },
          { portal: 2, to: "Volantis Site 2", name: "Arriba-Der" },
          { portal: 3, to: "Atlas C Site 3", name: "Abajo-Izq" },
          { portal: 4, to: "Helvetios Site 4", name: "Abajo-Der" },
        ],
      },
      {
        galaxy: "Atlas B",
        site: 2,
        portals: [
          { portal: 1, to: "Cygni Site 3", name: "Arriba-Izq" },
          { portal: 2, to: "Helvetios Site 2", name: "Arriba-Der" },
          { portal: 3, to: "Aquila Site 2", name: "Abajo-Izq" },
          { portal: 4, to: "Eridani Site 2", name: "Abajo-Der" },
        ],
      },
      {
        galaxy: "Atlas B",
        site: 3,
        portals: [
          { portal: 1, to: "Sirius Site 2", name: "Arriba-Izq" },
          { portal: 2, to: "Sirius Site 1", name: "Arriba-Der" },
          { portal: 3, to: "Sirius Site 1", name: "Abajo-Izq" },
          { portal: 4, to: "Auriga Site 1", name: "Abajo-Der" },
        ],
      },
      {
        galaxy: "Atlas B",
        site: 4,
        portals: [
          { portal: 1, to: "Persi Site 1", name: "Arriba-Izq" },
          { portal: 2, to: "Alcyone Site 1", name: "Arriba-Der" },
          { portal: 3, to: "Orion Site 2", name: "Abajo-Izq" },
          { portal: 4, to: "Cygni Site 1", name: "Abajo-Der" },
        ],
      },

      // === ATLAS C ===
      {
        galaxy: "Atlas C",
        site: 1,
        portals: [
          { portal: 1, to: "Atlas C Site 4", name: "Arriba-Izq" },
          { portal: 2, to: "Auriga Site 1", name: "Arriba-Der" },
          { portal: 3, to: "Cygni Site 3", name: "Abajo-Izq" },
          { portal: 4, to: "Helvetios Site 4", name: "Abajo-Der" },
        ],
      },
      {
        galaxy: "Atlas C",
        site: 2,
        portals: [
          { portal: 1, to: "Sadatoni Site 2", name: "Arriba-Izq" },
          { portal: 2, to: "Atlas A Site 1", name: "Arriba-Der" },
          { portal: 3, to: "Persi Site 4", name: "Abajo-Izq" },
          { portal: 4, to: "Orion Site 2", name: "Abajo-Der" },
        ],
      },
      {
        galaxy: "Atlas C",
        site: 3,
        portals: [
          { portal: 1, to: "Orion Site 3", name: "Arriba-Izq" },
          { portal: 2, to: "Atlas B Site 1", name: "Arriba-Der" },
          { portal: 3, to: "Helvetios Site 1", name: "Abajo-Izq" },
          { portal: 4, to: "Aquila Site 3", name: "Abajo-Der" },
        ],
      },
      {
        galaxy: "Atlas C",
        site: 4,
        portals: [
          { portal: 1, to: "Alcyone Site 3", name: "Arriba-Izq" },
          { portal: 2, to: "Volantis Site 1", name: "Arriba-Der" },
          { portal: 3, to: "Atlas C Site 1", name: "Abajo-Izq" },
          { portal: 4, to: "Alcyone Site 4", name: "Abajo-Der" },
        ],
      },

      // === CYGNI ===
      {
        galaxy: "Cygni",
        site: 1,
        portals: [
          { portal: 1, to: "Atlas B Site 4", name: "Arriba-Izq" },
          { portal: 2, to: "Eridani Site 3", name: "Arriba-Der" },
          { portal: 3, to: "Aquila Site 3", name: "Abajo-Izq" },
          { portal: 4, to: "Helvetios Site 4", name: "Abajo-Der" },
        ],
      },
      {
        galaxy: "Cygni",
        site: 2,
        portals: [
          { portal: 1, to: "Helvetios Site 2", name: "Arriba-Izq" },
          { portal: 2, to: "Atlas A Site 1", name: "Arriba-Der" },
          { portal: 3, to: "Eridani Site 3", name: "Abajo-Izq" },
          { portal: 4, to: "Volantis Site 2", name: "Abajo-Der" },
        ],
      },
      {
        galaxy: "Cygni",
        site: 3,
        portals: [
          { portal: 1, to: "Atlas B Site 2", name: "Arriba-Izq" },
          { portal: 2, to: "Auriga Site 2", name: "Arriba-Der" },
          { portal: 3, to: "Atlas C Site 1", name: "Abajo-Izq" },
          { portal: 4, to: "Aquila Site 4", name: "Abajo-Der" },
        ],
      },
      {
        galaxy: "Cygni",
        site: 4,
        portals: [
          { portal: 1, to: "Bootes Site 2", name: "Arriba-Izq" },
          { portal: 2, to: "Sadatoni Site 1", name: "Arriba-Der" },
          { portal: 3, to: "Bootes Site 2", name: "Abajo-Izq" },
          { portal: 4, to: "Atlas A Site 2", name: "Abajo-Der" },
        ],
      },

      // === VOLANTIS ===
      {
        galaxy: "Volantis",
        site: 1,
        portals: [
          { portal: 1, to: "Sirius Site 2", name: "Arriba-Izq" },
          { portal: 2, to: "Bootes Site 1", name: "Arriba-Der" },
          { portal: 3, to: "Atlas C Site 4", name: "Abajo-Izq" },
          { portal: 4, to: "Alcyone Site 4", name: "Abajo-Der" },
        ],
      },
      {
        galaxy: "Volantis",
        site: 2,
        portals: [
          { portal: 1, to: "Atlas B Site 1", name: "Arriba-Izq" },
          { portal: 2, to: "Atlas A Site 4", name: "Arriba-Der" },
          { portal: 3, to: "Atlas A Site 3", name: "Abajo-Izq" },
          { portal: 4, to: "Cygni Site 2", name: "Abajo-Der" },
        ],
      },
      {
        galaxy: "Volantis",
        site: 3,
        portals: [
          { portal: 1, to: "Bootes Site 2", name: "Arriba-Izq" },
          { portal: 2, to: "Sadatoni Site 1", name: "Arriba-Der" },
          { portal: 3, to: "Eridani Site 3", name: "Abajo-Izq" },
          { portal: 4, to: "Bootes Site 3", name: "Abajo-Der" },
        ],
      },
      {
        galaxy: "Volantis",
        site: 4,
        portals: [
          { portal: 1, to: "Sadatoni Site 4", name: "Arriba-Izq" },
          { portal: 2, to: "Bootes Site 1", name: "Arriba-Der" },
          { portal: 3, to: "Alcyone Site 2", name: "Abajo-Izq" },
          { portal: 4, to: "Sadatoni Site 4", name: "Abajo-Der" },
        ],
      },

      // === ALCYONE ===
      {
        galaxy: "Alcyone",
        site: 1,
        portals: [
          { portal: 1, to: "Alcyone Site 4", name: "Arriba-Izq" },
          { portal: 2, to: "Sadatoni Site 4", name: "Arriba-Der" },
          { portal: 3, to: "Sirius Site 4", name: "Abajo-Izq" },
          { portal: 4, to: "Atlas B Site 4", name: "Abajo-Der" },
        ],
      },
      {
        galaxy: "Alcyone",
        site: 2,
        portals: [
          { portal: 1, to: "Aquila Site 4", name: "Arriba-Izq" },
          { portal: 2, to: "Sadatoni Site 1", name: "Arriba-Der" },
          { portal: 3, to: "Volantis Site 4", name: "Abajo-Izq" },
          { portal: 4, to: "Sadatoni Site 3", name: "Abajo-Der" },
        ],
      },
      {
        galaxy: "Alcyone",
        site: 3,
        portals: [
          { portal: 1, to: "Atlas C Site 4", name: "Arriba-Izq" },
          { portal: 2, to: "Atlas A Site 3", name: "Arriba-Der" },
          { portal: 3, to: "Helvetios Site 3", name: "Abajo-Izq" },
          { portal: 4, to: "Bootes Site 2", name: "Abajo-Der" },
        ],
      },
      {
        galaxy: "Alcyone",
        site: 4,
        portals: [
          { portal: 1, to: "Volantis Site 1", name: "Arriba-Izq" },
          { portal: 2, to: "Alcyone Site 1", name: "Arriba-Der" },
          { portal: 3, to: "Atlas C Site 4", name: "Abajo-Izq" },
          { portal: 4, to: "Persei Site 4", name: "Abajo-Der" },
        ],
      },

      // === BOOTES ===
      {
        galaxy: "Bootes",
        site: 1,
        portals: [
          { portal: 1, to: "Volantis Site 4", name: "Arriba-Izq" },
          { portal: 2, to: "Atlas A Site 2", name: "Arriba-Der" },
          { portal: 3, to: "Volantis Site 1", name: "Abajo-Izq" },
          { portal: 4, to: "Sirius Site 3", name: "Abajo-Der" },
        ],
      },
      {
        galaxy: "Bootes",
        site: 2,
        portals: [
          { portal: 1, to: "Cygni Site 4", name: "Arriba-Izq" },
          { portal: 2, to: "Alcyone Site 3", name: "Arriba-Der" },
          { portal: 3, to: "Persi Site 2", name: "Abajo-Izq" },
          { portal: 4, to: "Volantis Site 3", name: "Abajo-Der" },
        ],
      },
      {
        galaxy: "Bootes",
        site: 3,
        portals: [
          { portal: 1, to: "Sirius Site 2", name: "Arriba-Izq" },
          { portal: 2, to: "Sirius Site 1", name: "Arriba-Der" },
          { portal: 3, to: "Sadatoni Site 2", name: "Abajo-Izq" },
          { portal: 4, to: "Volantis Site 3", name: "Abajo-Der" },
        ],
      },
      {
        galaxy: "Bootes",
        site: 4,
        portals: [
          { portal: 1, to: "Sadatoni Site 3", name: "Arriba-Izq" },
          { portal: 2, to: "Sirius Site 3", name: "Arriba-Der" },
          { portal: 3, to: "Eridani Site 1", name: "Abajo-Izq" },
          { portal: 4, to: "Maia Site 1", name: "Abajo-Der" },
        ],
      },

      // === ERIDANI ===
      {
        galaxy: "Eridani",
        site: 1,
        portals: [
          { portal: 1, to: "Persi Site 2", name: "Arriba-Izq" },
          { portal: 2, to: "Auriga Site 4", name: "Arriba-Der" },
          { portal: 3, to: "Bootes Site 4", name: "Abajo-Izq" },
          { portal: 4, to: "Maia Site 1", name: "Abajo-Der" },
        ],
      },
      {
        galaxy: "Eridani",
        site: 2,
        portals: [
          { portal: 1, to: "Maia Site 3", name: "Arriba-Izq" },
          { portal: 2, to: "Orion Site 1", name: "Arriba-Der" },
          { portal: 3, to: "Persi Site 1", name: "Abajo-Izq" },
          { portal: 4, to: "Atlas B Site 2", name: "Abajo-Der" },
        ],
      },
      {
        galaxy: "Eridani",
        site: 3,
        portals: [
          { portal: 1, to: "Helvetios Site 3", name: "Arriba-Izq" },
          { portal: 2, to: "Cygni Site 1", name: "Arriba-Der" },
          { portal: 3, to: "Cygni Site 2", name: "Abajo-Izq" },
          { portal: 4, to: "Volantis Site 3", name: "Abajo-Der" },
        ],
      },
      {
        galaxy: "Eridani",
        site: 4,
        portals: [
          { portal: 1, to: "Atlas A Site 1", name: "Arriba-Izq" },
          { portal: 2, to: "Auriga Site 2", name: "Arriba-Der" },
          { portal: 3, to: "Auriga Site 4", name: "Abajo-Izq" },
          { portal: 4, to: "Aquila Site 1", name: "Abajo-Der" },
        ],
      },

      // === HELVETIOS ===
      {
        galaxy: "Helvetios",
        site: 1,
        portals: [
          { portal: 1, to: "Atlas C Site 3", name: "Arriba-Izq" },
          { portal: 2, to: "Sirius Site 3", name: "Arriba-Der" },
          { portal: 3, to: "Auriga Site 1", name: "Abajo-Izq" },
          { portal: 4, to: "Orion Site 4", name: "Abajo-Der" },
        ],
      },
      {
        galaxy: "Helvetios",
        site: 2,
        portals: [
          { portal: 1, to: "Cygni Site 2", name: "Arriba-Izq" },
          { portal: 2, to: "Sirius Site 4", name: "Arriba-Der" },
          { portal: 3, to: "Atlas B Site 2", name: "Abajo-Izq" },
          { portal: 4, to: "Helvetios Site 4", name: "Abajo-Der" },
        ],
      },
      {
        galaxy: "Helvetios",
        site: 3,
        portals: [
          { portal: 1, to: "Orion Site 4", name: "Arriba-Izq" },
          { portal: 2, to: "Eridani Site 3", name: "Arriba-Der" },
          { portal: 3, to: "Alcyone Site 3", name: "Abajo-Izq" },
          { portal: 4, to: "Auriga Site 3", name: "Abajo-Der" },
        ],
      },
      {
        galaxy: "Helvetios",
        site: 4,
        portals: [
          { portal: 1, to: "Atlas C Site 1", name: "Arriba-Izq" },
          { portal: 2, to: "Atlas B Site 1", name: "Arriba-Der" },
          { portal: 3, to: "Helvetios Site 2", name: "Abajo-Izq" },
          { portal: 4, to: "Cygni Site 1", name: "Abajo-Der" },
        ],
      },

      // === SIRIUS ===
      {
        galaxy: "Sirius",
        site: 1,
        portals: [
          { portal: 1, to: "Bootes Site 3", name: "Arriba-Izq" },
          { portal: 2, to: "Atlas B Site 3", name: "Arriba-Der" },
          { portal: 3, to: "Atlas B Site 3", name: "Abajo-Izq" },
          { portal: 4, to: "Aquila Site 1", name: "Abajo-Der" },
        ],
      },
      {
        galaxy: "Sirius",
        site: 2,
        portals: [
          { portal: 1, to: "Atlas B Site 3", name: "Arriba-Izq" },
          { portal: 2, to: "Bootes Site 3", name: "Arriba-Der" },
          { portal: 3, to: "Volantis Site 1", name: "Abajo-Izq" },
          { portal: 4, to: "Persi Site 2", name: "Abajo-Der" },
        ],
      },
      {
        galaxy: "Sirius",
        site: 3,
        portals: [
          { portal: 1, to: "Helvetios Site 1", name: "Arriba-Izq" },
          { portal: 2, to: "Atlas A Site 4", name: "Arriba-Der" },
          { portal: 3, to: "Bootes Site 1", name: "Abajo-Izq" },
          { portal: 4, to: "Bootes Site 4", name: "Abajo-Der" },
        ],
      },
      {
        galaxy: "Sirius",
        site: 4,
        portals: [
          { portal: 1, to: "Helvetios Site 2", name: "Arriba-Izq" },
          { portal: 2, to: "Atlas A Site 2", name: "Arriba-Der" },
          { portal: 3, to: "Alcyone Site 1", name: "Abajo-Izq" },
          { portal: 4, to: "Sadatoni Site 3", name: "Abajo-Der" },
        ],
      },

      // === MAIA ===
      {
        galaxy: "Maia",
        site: 1,
        portals: [
          { portal: 1, to: "Eridani Site 1", name: "Arriba-Izq" },
          { portal: 2, to: "Atlas A Site 3", name: "Arriba-Der" },
          { portal: 3, to: "Bootes Site 4", name: "Abajo-Izq" },
          { portal: 4, to: "Auriga Site 4", name: "Abajo-Der" },
        ],
      },
      {
        galaxy: "Maia",
        site: 2,
        portals: [
          { portal: 1, to: "Orion Site 1", name: "Arriba-Izq" },
          { portal: 2, to: "Aquila Site 2", name: "Arriba-Der" },
          { portal: 3, to: "Atlas B Site 1", name: "Abajo-Izq" },
          { portal: 4, to: "Maia Site 4", name: "Abajo-Der" },
        ],
      },
      {
        galaxy: "Maia",
        site: 3,
        portals: [
          { portal: 1, to: "Atlas A Site 4", name: "Arriba-Izq" },
          { portal: 2, to: "Sadatoni Site 2", name: "Arriba-Der" },
          { portal: 3, to: "Atlas A Site 4", name: "Abajo-Izq" },
          { portal: 4, to: "Eridani Site 2", name: "Abajo-Der" },
        ],
      },
      {
        galaxy: "Maia",
        site: 4,
        portals: [
          { portal: 1, to: "Auriga Site 1", name: "Arriba-Izq" },
          { portal: 2, to: "Maia Site 2", name: "Arriba-Der" },
          { portal: 3, to: "Persi Site 3", name: "Abajo-Izq" },
          { portal: 4, to: "Auriga Site 2", name: "Abajo-Der" },
        ],
      },

      // === AURIGA ===
      {
        galaxy: "Auriga",
        site: 1,
        portals: [
          { portal: 1, to: "Atlas B Site 3", name: "Arriba-Izq" },
          { portal: 2, to: "Helvetios Site 1", name: "Arriba-Der" },
          { portal: 3, to: "Atlas C Site 1", name: "Abajo-Izq" },
          { portal: 4, to: "Maia Site 4", name: "Abajo-Der" },
        ],
      },
      {
        galaxy: "Auriga",
        site: 2,
        portals: [
          { portal: 1, to: "Auriga Site 4", name: "Arriba-Izq" },
          { portal: 2, to: "Eridani Site 4", name: "Arriba-Der" },
          { portal: 3, to: "Maia Site 4", name: "Abajo-Izq" },
          { portal: 4, to: "Cygni Site 3", name: "Abajo-Der" },
        ],
      },
      {
        galaxy: "Auriga",
        site: 3,
        portals: [
          { portal: 1, to: "Helvetios Site 3", name: "Arriba-Izq" },
          { portal: 2, to: "Aquila Site 1", name: "Arriba-Der" },
          { portal: 3, to: "Aquila Site 3", name: "Abajo-Izq" },
          { portal: 4, to: "Orion Site 3", name: "Abajo-Der" },
        ],
      },
      {
        galaxy: "Auriga",
        site: 4,
        portals: [
          { portal: 1, to: "Eridani Site 1", name: "Arriba-Izq" },
          { portal: 2, to: "Maia Site 1", name: "Arriba-Der" },
          { portal: 3, to: "Auriga Site 1", name: "Abajo-Izq" },
          { portal: 4, to: "Eridani Site 4", name: "Abajo-Der" },
        ],
      },

      // === ORION ===
      {
        galaxy: "Orion",
        site: 1,
        portals: [
          { portal: 1, to: "Orion Site 4", name: "Arriba-Izq" },
          { portal: 2, to: "Aquila Site 4", name: "Arriba-Der" },
          { portal: 3, to: "Maia Site 2", name: "Abajo-Izq" },
          { portal: 4, to: "Eridani Site 2", name: "Abajo-Der" },
        ],
      },
      {
        galaxy: "Orion",
        site: 2,
        portals: [
          { portal: 1, to: "Atlas C Site 2", name: "Arriba-Izq" },
          { portal: 2, to: "Sadatoni Site 3", name: "Arriba-Der" },
          { portal: 3, to: "Atlas A Site 1", name: "Abajo-Izq" },
          { portal: 4, to: "Atlas B Site 4", name: "Abajo-Der" },
        ],
      },
      {
        galaxy: "Orion",
        site: 3,
        portals: [
          { portal: 1, to: "Auriga Site 3", name: "Arriba-Izq" },
          { portal: 2, to: "Atlas C Site 3", name: "Arriba-Der" },
          { portal: 3, to: "Atlas A Site 3", name: "Abajo-Izq" },
          { portal: 4, to: "Cygni Site 4", name: "Abajo-Der" },
        ],
      },
      {
        galaxy: "Orion",
        site: 4,
        portals: [
          { portal: 1, to: "Aquila Site 1", name: "Arriba-Izq" },
          { portal: 2, to: "Helvetios Site 1", name: "Arriba-Der" },
          { portal: 3, to: "Helvetios Site 3", name: "Abajo-Izq" },
          { portal: 4, to: "Orion Site 1", name: "Abajo-Der" },
        ],
      },

      // === AQUILA ===
      {
        galaxy: "Aquila",
        site: 1,
        portals: [
          { portal: 1, to: "Orion Site 4", name: "Arriba-Izq" },
          { portal: 2, to: "Auriga Site 3", name: "Arriba-Der" },
          { portal: 3, to: "Eridani Site 4", name: "Abajo-Izq" },
          { portal: 4, to: "Sirius Site 1", name: "Abajo-Der" },
        ],
      },
      {
        galaxy: "Aquila",
        site: 2,
        portals: [
          { portal: 1, to: "Maia Site 2", name: "Arriba-Izq" },
          { portal: 2, to: "Sadatoni Site 1", name: "Arriba-Der" },
          { portal: 3, to: "Atlas B Site 2", name: "Abajo-Izq" },
          { portal: 4, to: "Persi Site 1", name: "Abajo-Der" },
        ],
      },
      {
        galaxy: "Aquila",
        site: 3,
        portals: [
          { portal: 1, to: "Auriga Site 3", name: "Arriba-Izq" },
          { portal: 2, to: "Atlas C Site 3", name: "Arriba-Der" },
          { portal: 3, to: "Persei Site 4", name: "Abajo-Izq" },
          { portal: 4, to: "Cygni Site 1", name: "Abajo-Der" },
        ],
      },
      {
        galaxy: "Aquila",
        site: 4,
        portals: [
          { portal: 1, to: "Cygni Site 3", name: "Arriba-Izq" },
          { portal: 2, to: "Orion Site 1", name: "Arriba-Der" },
          { portal: 3, to: "Alcyone Site 2", name: "Abajo-Izq" },
          { portal: 4, to: "Persi Site 3", name: "Abajo-Der" },
        ],
      },

      // === SADATONI ===
      {
        galaxy: "Sadatoni",
        site: 1,
        portals: [
          { portal: 1, to: "Volantis Site 3", name: "Arriba-Izq" },
          { portal: 2, to: "Aquila Site 2", name: "Arriba-Der" },
          { portal: 3, to: "Alcyone Site 2", name: "Abajo-Izq" },
          { portal: 4, to: "Cygni Site 4", name: "Abajo-Der" },
        ],
      },
      {
        galaxy: "Sadatoni",
        site: 2,
        portals: [
          { portal: 1, to: "Maia Site 3", name: "Arriba-Izq" },
          { portal: 2, to: "Atlas C Site 2", name: "Arriba-Der" },
          { portal: 3, to: "Persi Site 3", name: "Abajo-Izq" },
          { portal: 4, to: "Bootes Site 3", name: "Abajo-Der" },
        ],
      },
      {
        galaxy: "Sadatoni",
        site: 3,
        portals: [
          { portal: 1, to: "Bootes Site 4", name: "Arriba-Izq" },
          { portal: 2, to: "Alcyone Site 2", name: "Arriba-Der" },
          { portal: 3, to: "Orion Site 2", name: "Abajo-Izq" },
          { portal: 4, to: "Sirius Site 4", name: "Abajo-Der" },
        ],
      },
      {
        galaxy: "Sadatoni",
        site: 4,
        portals: [
          { portal: 1, to: "Volantis Site 4", name: "Arriba-Izq" },
          { portal: 2, to: "Persi Site 4", name: "Arriba-Der" },
          { portal: 3, to: "Alcyone Site 1", name: "Abajo-Izq" },
          { portal: 4, to: "Volantis Site 4", name: "Abajo-Der" },
        ],
      },

      // === PERSEI (corrección de "Persi" a "Persei") ===
      {
        galaxy: "Persi",
        site: 1,
        portals: [
          { portal: 1, to: "Atlas B Site 4", name: "Arriba-Izq" },
          { portal: 2, to: "Eridani Site 2", name: "Arriba-Der" },
          { portal: 3, to: "Aquila Site 2", name: "Abajo-Izq" },
          { portal: 4, to: "Persei Site 2", name: "Abajo-Der" },
        ],
      },
      {
        galaxy: "Persi",
        site: 2,
        portals: [
          { portal: 1, to: "Sirius Site 2", name: "Arriba-Izq" },
          { portal: 2, to: "Persei Site 1", name: "Arriba-Der" },
          { portal: 3, to: "Eridani Site 1", name: "Abajo-Izq" },
          { portal: 4, to: "Bootes Site 2", name: "Abajo-Der" },
        ],
      },
      {
        galaxy: "Persi",
        site: 3,
        portals: [
          { portal: 1, to: "Aquila Site 4", name: "Arriba-Izq" },
          { portal: 2, to: "Sadatoni Site 2", name: "Arriba-Der" },
          { portal: 3, to: "Atlas A Site 2", name: "Abajo-Izq" },
          { portal: 4, to: "Maia Site 4", name: "Abajo-Der" },
        ],
      },
      {
        galaxy: "Persi",
        site: 4,
        portals: [
          { portal: 1, to: "Alcyone Site 4", name: "Arriba-Izq" },
          { portal: 2, to: "Sadatoni Site 4", name: "Arriba-Der" },
          { portal: 3, to: "Aquila Site 3", name: "Abajo-Izq" },
          { portal: 4, to: "Bootes Site 4", name: "Abajo-Der" },
        ],
      },
      // Agregar más datos según sea necesario...
    ];

    // Procesar datos y construir grafo
    data.forEach((entry) => {
      const fromNode = new Node(entry.galaxy, entry.site);
      this.addNode(fromNode);
      this.galaxies.add(entry.galaxy);

      entry.portals.forEach((p) => {
        // Parsear destino (ej: "Atlas C Site 2")
        const match = p.to.match(/^(\w+(?: \w+)?) Site (\d+)$/);
        if (match) {
          const toGalaxy = match[1];
          const toSite = parseInt(match[2]);
          const toNode = new Node(toGalaxy, toSite);
          this.addNode(toNode);
          this.galaxies.add(toGalaxy);

          const conn = new Connection(fromNode, toNode, p.portal, p.name);
          this.addConnection(conn);
        }
      });
    });
  }

  addNode(node) {
    if (!this.nodes.has(node.key)) {
      this.nodes.set(node.key, node);
      this.connections.set(node.key, []);
    }
  }

  addConnection(connection) {
    const fromKey = connection.from.key;
    if (!this.connections.has(fromKey)) {
      this.connections.set(fromKey, []);
    }
    this.connections.get(fromKey).push(connection);
  }

  getConnections(node) {
    return this.connections.get(node.key) || [];
  }

  // Algoritmo BFS para encontrar la ruta más corta
  findShortestPath(startNode, endNode) {
    if (startNode.equals(endNode)) {
      return {
        path: [],
        jumps: 0,
        connections: [],
      };
    }

    const queue = [startNode];
    const visited = new Set([startNode.key]);
    const parent = new Map();
    const connectionUsed = new Map();

    while (queue.length > 0) {
      const current = queue.shift();

      if (current.equals(endNode)) {
        // Reconstruir camino
        const path = [];
        const connections = [];
        let node = endNode;

        while (!node.equals(startNode)) {
          const conn = connectionUsed.get(node.key);
          connections.unshift(conn);
          path.unshift(node);
          node = parent.get(node.key);
        }
        path.unshift(startNode);

        return {
          path,
          jumps: connections.length,
          connections,
        };
      }

      const connections = this.getConnections(current);
      for (const conn of connections) {
        if (!visited.has(conn.to.key)) {
          visited.add(conn.to.key);
          parent.set(conn.to.key, current);
          connectionUsed.set(conn.to.key, conn);
          queue.push(conn.to);
        }
      }
    }

    return null; // No hay camino
  }

  getSitesForGalaxy(galaxy) {
    const sites = new Set();
    for (const [key, node] of this.nodes) {
      if (node.galaxy === galaxy) {
        sites.add(node.site);
      }
    }
    return Array.from(sites).sort((a, b) => a - b);
  }
}

// Aplicación principal
class PortalNavigatorApp {
  constructor() {
    this.graph = new PortalGraph();
    this.initSelects(); // Asegúrate que esto se llama
    this.bindEvents();
    this.populateGalaxies(); // ¡NUEVA LÍNEA - Esto falta!
  }

  // ¡MÉTODO NUEVO que debe agregarse!
  populateGalaxies() {
    const galaxies = Array.from(this.graph.galaxies).sort();

    // Llenar selects de galaxias
    const galaxySelects = ["start-galaxy", "end-galaxy"];
    galaxySelects.forEach((selectId) => {
      const select = document.getElementById(selectId);
      // Limpiar opciones existentes excepto la primera
      select.innerHTML = '<option value="">Selecciona una galaxia...</option>';

      galaxies.forEach((galaxy) => {
        const option = document.createElement("option");
        option.value = galaxy;
        option.textContent = galaxy;
        select.appendChild(option);
      });
    });
  }

  initSelects() {
    const galaxySelects = ["start-galaxy", "end-galaxy"];

    // Llenar galaxias
    const galaxies = Array.from(this.graph.galaxies).sort();
    galaxySelects.forEach((selectId) => {
      const select = document.getElementById(selectId);
      galaxies.forEach((galaxy) => {
        const option = document.createElement("option");
        option.value = galaxy;
        option.textContent = galaxy;
        select.appendChild(option);
      });
    });

    // Configurar eventos para actualizar sites
    galaxySelects.forEach((selectId) => {
      document.getElementById(selectId).addEventListener("change", (e) => {
        this.updateSites(e.target.id);
      });
    });
  }

  updateSites(galaxySelectId) {
    const galaxy = document.getElementById(galaxySelectId).value;
    const siteSelectId = galaxySelectId.replace("galaxy", "site");
    const siteSelect = document.getElementById(siteSelectId);

    siteSelect.innerHTML = '<option value="">Cargando sites...</option>';

    if (galaxy) {
      const sites = this.graph.getSitesForGalaxy(galaxy);
      siteSelect.innerHTML = '<option value="">Selecciona un site</option>';
      sites.forEach((site) => {
        const option = document.createElement("option");
        option.value = site;
        option.textContent = `Site ${site}`;
        siteSelect.appendChild(option);
      });
    } else {
      siteSelect.innerHTML =
        '<option value="">Primero selecciona una galaxia</option>';
    }
  }

  bindEvents() {
    document.getElementById("find-path").addEventListener("click", () => {
      this.findPath();
    });
  }

  async findPath() {
    const startGalaxy = document.getElementById("start-galaxy").value;
    const startSite = document.getElementById("start-site").value;
    const endGalaxy = document.getElementById("end-galaxy").value;
    const endSite = document.getElementById("end-site").value;

    // Validación
    if (!startGalaxy || !startSite || !endGalaxy || !endSite) {
      alert(
        "Por favor, selecciona tanto la galaxia como el site de origen y destino"
      );
      return;
    }

    // Mostrar loading
    document.getElementById("loading").style.display = "block";
    document.getElementById("results").classList.remove("show");

    // Pequeño delay para que se vea el loading
    await new Promise((resolve) => setTimeout(resolve, 500));

    const startNode = new Node(startGalaxy, parseInt(startSite));
    const endNode = new Node(endGalaxy, parseInt(endSite));

    // Verificar que los nodos existan
    if (
      !this.graph.nodes.has(startNode.key) ||
      !this.graph.nodes.has(endNode.key)
    ) {
      alert(
        "Uno o ambos nodos no existen en el grafo. Los datos pueden estar incompletos."
      );
      document.getElementById("loading").style.display = "none";
      return;
    }

    // Encontrar ruta
    const result = this.graph.findShortestPath(startNode, endNode);

    // Ocultar loading
    document.getElementById("loading").style.display = "none";

    if (!result) {
      alert("No se encontró una ruta entre los puntos seleccionados.");
      return;
    }

    // Mostrar resultados
    this.displayResults(startNode, endNode, result);
  }

  displayResults(startNode, endNode, result) {
    // Actualizar información básica
    document.getElementById("origin-display").textContent =
      startNode.toString();
    document.getElementById("destination-display").textContent =
      endNode.toString();
    document.getElementById("total-jumps").textContent = result.jumps;
    document.getElementById("path-time").textContent = `${(
      result.jumps * 2.5
    ).toFixed(1)} min`;
    document.getElementById("portal-count").textContent = result.jumps;

    // Generar pasos
    const portalPath = document.getElementById("portal-path");
    portalPath.innerHTML = "";

    if (result.jumps === 0) {
      const step = document.createElement("div");
      step.className = "step final-destination";
      step.innerHTML = `
                        <div class="step-number">🎯</div>
                        <div class="step-content">
                            <div class="step-location">${startNode.toString()}</div>
                            <div class="step-portal">¡Ya estás en tu destino!</div>
                        </div>
                    `;
      portalPath.appendChild(step);
    } else {
      // Paso inicial
      const initialStep = document.createElement("div");
      initialStep.className = "step";
      initialStep.innerHTML = `
                        <div class="step-number">1</div>
                        <div class="step-content">
                            <div class="step-location">${startNode.toString()}</div>
                            <div class="step-portal">Punto de partida</div>
                        </div>
                        <div class="step-arrow">➡</div>
                    `;
      portalPath.appendChild(initialStep);

      // Pasos intermedios
      result.connections.forEach((conn, index) => {
        const step = document.createElement("div");
        step.className = "step";
        step.innerHTML = `
                            <div class="step-number">${index + 2}</div>
                            <div class="step-content">
                                <div class="step-location">${conn.to.toString()}</div>
                                <div class="step-portal">Usa el Portal ${
                                  conn.portal
                                } (${
          conn.portalName
        }) desde ${conn.from.toString()}</div>
                            </div>
                            ${
                              index < result.connections.length - 1
                                ? '<div class="step-arrow">➡</div>'
                                : ""
                            }
                        `;
        portalPath.appendChild(step);
      });
    }

    // Mostrar resultados
    document.getElementById("results").classList.add("show");
  }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  const app = new PortalNavigatorApp();
  // Agregar datos de ejemplo al DOM cargado
  console.log("🌌 Navegador de Portales listo!");
});
