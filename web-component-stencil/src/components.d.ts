/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface AmSideDrawer {
        "drawerTitle": string;
        "open": () => Promise<void>;
        "opened": boolean;
    }
    interface AmSpinner {
    }
    interface AmStockFinder {
    }
    interface AmStockPrice {
        "stockSymbol": string;
    }
    interface AmTooltip {
        "text": string;
    }
}
declare global {
    interface HTMLAmSideDrawerElement extends Components.AmSideDrawer, HTMLStencilElement {
    }
    var HTMLAmSideDrawerElement: {
        prototype: HTMLAmSideDrawerElement;
        new (): HTMLAmSideDrawerElement;
    };
    interface HTMLAmSpinnerElement extends Components.AmSpinner, HTMLStencilElement {
    }
    var HTMLAmSpinnerElement: {
        prototype: HTMLAmSpinnerElement;
        new (): HTMLAmSpinnerElement;
    };
    interface HTMLAmStockFinderElement extends Components.AmStockFinder, HTMLStencilElement {
    }
    var HTMLAmStockFinderElement: {
        prototype: HTMLAmStockFinderElement;
        new (): HTMLAmStockFinderElement;
    };
    interface HTMLAmStockPriceElement extends Components.AmStockPrice, HTMLStencilElement {
    }
    var HTMLAmStockPriceElement: {
        prototype: HTMLAmStockPriceElement;
        new (): HTMLAmStockPriceElement;
    };
    interface HTMLAmTooltipElement extends Components.AmTooltip, HTMLStencilElement {
    }
    var HTMLAmTooltipElement: {
        prototype: HTMLAmTooltipElement;
        new (): HTMLAmTooltipElement;
    };
    interface HTMLElementTagNameMap {
        "am-side-drawer": HTMLAmSideDrawerElement;
        "am-spinner": HTMLAmSpinnerElement;
        "am-stock-finder": HTMLAmStockFinderElement;
        "am-stock-price": HTMLAmStockPriceElement;
        "am-tooltip": HTMLAmTooltipElement;
    }
}
declare namespace LocalJSX {
    interface AmSideDrawer {
        "drawerTitle"?: string;
        "opened"?: boolean;
    }
    interface AmSpinner {
    }
    interface AmStockFinder {
        "onAmSymbolSelected"?: (event: CustomEvent<string>) => void;
    }
    interface AmStockPrice {
        "stockSymbol"?: string;
    }
    interface AmTooltip {
        "text"?: string;
    }
    interface IntrinsicElements {
        "am-side-drawer": AmSideDrawer;
        "am-spinner": AmSpinner;
        "am-stock-finder": AmStockFinder;
        "am-stock-price": AmStockPrice;
        "am-tooltip": AmTooltip;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "am-side-drawer": LocalJSX.AmSideDrawer & JSXBase.HTMLAttributes<HTMLAmSideDrawerElement>;
            "am-spinner": LocalJSX.AmSpinner & JSXBase.HTMLAttributes<HTMLAmSpinnerElement>;
            "am-stock-finder": LocalJSX.AmStockFinder & JSXBase.HTMLAttributes<HTMLAmStockFinderElement>;
            "am-stock-price": LocalJSX.AmStockPrice & JSXBase.HTMLAttributes<HTMLAmStockPriceElement>;
            "am-tooltip": LocalJSX.AmTooltip & JSXBase.HTMLAttributes<HTMLAmTooltipElement>;
        }
    }
}
