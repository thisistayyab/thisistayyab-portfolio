declare module 'react-simple-maps' {
  import { ReactNode } from 'react';

  export interface Geography {
    rsmKey: string;
    properties: {
      NAME?: string;
      NAME_LONG?: string;
      ISO_A3?: string;
      ISO_A2?: string;
      [key: string]: any;
    };
  }

  export interface ComposableMapProps {
    projectionConfig?: {
      scale?: number;
      center?: [number, number];
      [key: string]: any;
    };
    style?: React.CSSProperties;
    children?: ReactNode;
  }

  export interface GeographiesProps {
    geography: string | object;
    children: (props: { geographies: Geography[] }) => ReactNode;
  }

  export interface GeographyProps {
    geography: Geography;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    style?: {
      default?: React.CSSProperties;
      hover?: React.CSSProperties;
      pressed?: React.CSSProperties;
    };
    children?: ReactNode;
  }

  export const ComposableMap: React.FC<ComposableMapProps>;
  export const Geographies: React.FC<GeographiesProps>;
  export const Geography: React.FC<GeographyProps>;
}
