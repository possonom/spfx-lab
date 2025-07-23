export interface IJSONWebPartManifest {
    id: string;
    alias: string;
    version: string;
    preconfiguredEntries: Array<{
        groupId: string;
        group: { default: string };
        title: { default: string };
        description: { default: string };
        officeFabricIconFontName: string;
        properties: {
            description: string;
            logLevel: string;
        };
    }>;
}

// wrapper for /config/package-solution.json
export interface IJSONSolutionConfig {
    solution: {
        name: string;
        id: string;
        version: string;
    };
}