declare interface ISpDataAccessWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  PropertyPane: {
    LogLevel: string;
    PropertyPaneDevDescription: string;
    DevGroupName: string;
  };
}

declare module "SpDataAccessWebPartStrings" {
  const strings: ISpDataAccessWebPartStrings;
  export = strings;
}
