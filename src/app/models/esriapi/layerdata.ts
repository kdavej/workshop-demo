export interface ILayerData {
    id: string;
    name: string;
    parentLayerId?: number;
    defaultVisibility: boolean;
    subLayerIds?: number[];
    minScale?: number;
    maxScale?: number;
    geometryType?: "point" | "multipoint" | "polyline" | "polygon" | "multipatch" | "mesh";
    url?: string;
}
