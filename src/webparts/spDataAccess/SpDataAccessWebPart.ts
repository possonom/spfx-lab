import * as React from "react";
import * as ReactDom from "react-dom";

import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneDropdown,
  PropertyPaneTextField,
} from "@microsoft/sp-webpart-base";

import * as strings from "SpDataAccessWebPartStrings";
import SpDataAccess from "./components/SpDataAccess";
import { ISpDataAccessProps } from "./components/ISpDataAccessProps";

import { sp } from "@pnp/sp";
import { Logger, ConsoleListener, LogLevel } from "@pnp/logging";

import { ITheme } from "@fluentui/react/lib/Styling";
import { initializeIcons } from "@fluentui/react/lib/Icons";
import pnpTelemetry from "@pnp/telemetry-js";
import * as rawJSONWebPartManifest from "./SpDataAccessWebPart.manifest.json";
import * as rawJSONSolutionConfig from "../../../config/package-solution.json";
import {
  IJSONSolutionConfig,
  IJSONWebPartManifest,
} from "../../interfaces/PackageSolution";
import { loadCustomTheme } from "../../theme";

const solutionProps: IJSONSolutionConfig = rawJSONSolutionConfig;
const webPartManifestProps: IJSONWebPartManifest = rawJSONWebPartManifest;

export interface ISpDataAccessWebPartProps {
  description: string;
  logLevel: string;
}

export default class SpDataAccessWebPart extends BaseClientSideWebPart<ISpDataAccessWebPartProps> {
  private theme: ITheme;
  // we need to make sure to init pnp and its logger here
  // for PROD we should set the LogLevel to Error
  public async onInit(): Promise<void> {
    initializeIcons(undefined, { disableWarnings: true });
    this.theme = loadCustomTheme();
    const telemetry = pnpTelemetry.getInstance();
    telemetry.optOut();
    await super.onInit();

    sp.setup({
      spfxContext: this.context,
    });

    Logger.subscribe(new ConsoleListener());
    Logger.activeLogLevel = LogLevel.Info;
  }

  public render(): void {
    const name =
      webPartManifestProps.preconfiguredEntries[0].title.default ??
      solutionProps.solution.name;
    const version =
      webPartManifestProps.version === "*"
        ? solutionProps.solution.version
        : webPartManifestProps.version;

    Logger.write(`#####> ${name} (${version}) <#####`, LogLevel.Info);
    //we set log level after logged version
    const logLevel: LogLevel = parseInt(this.properties.logLevel) as LogLevel;
    Logger.activeLogLevel = logLevel;

    const element: React.ReactElement<ISpDataAccessProps> = React.createElement(
      SpDataAccess,
      {
        theme: this.theme,
        description: this.properties.description,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("description", {
                  label: strings.DescriptionFieldLabel,
                }),
              ],
            },
          ],
        },{
          header: {
            description: strings.PropertyPane.PropertyPaneDevDescription,
          },
          groups: [
            {
              groupName: strings.PropertyPane.DevGroupName,
              groupFields: [
                PropertyPaneDropdown("logLevel", {
                  label: strings.PropertyPane.LogLevel,
                  options: [
                    { key: "0", text: "Verbose" },
                    { key: "1", text: "Info" },
                    { key: "2", text: "Warning" },
                    { key: "3", text: "Error" },
                    { key: "99", text: "Off" },
                  ],
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
