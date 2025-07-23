declare interface IHelloWorldWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  PropertyPane: {
    LogLevel: string;
    PropertyPaneDevDescription: string;
    DevGroupName: string;
  };
}

declare module "HelloWorldWebPartStrings" {
  const strings: IHelloWorldWebPartStrings;
  export = strings;
}
