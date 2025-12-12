declare module 'three' {
  export class Object3D {
    position: { set: (x: number, y: number, z: number) => void };
    rotation: { x: number; y: number; z: number };
    scale: { set: (x: number, y: number, z: number) => void };
    lookAt: (...args: number[]) => void;
    updateMatrix(): void;
  }

  export class Color {
    constructor(color?: string | number | Color);
    set(color: string | number | Color): Color;
    clone(): Color;
    lerp(color: Color, alpha: number): Color;
    r: number;
    g: number;
    b: number;
  }

  export class BufferAttribute {
    constructor(array: ArrayLike<number>, itemSize: number);
    array: ArrayLike<number>;
  }

  export class BufferGeometry {
    setAttribute(name: string, attribute: BufferAttribute): void;
  }

  export class Material {}

  export class Points<TGeometry extends BufferGeometry = BufferGeometry, TMaterial extends Material = Material> extends Object3D {
    geometry: TGeometry;
    material: TMaterial;
  }
  export class Mesh<TGeometry extends BufferGeometry = BufferGeometry, TMaterial extends Material = Material> extends Object3D {
    geometry: TGeometry;
    material: TMaterial;
  }
  export class RingGeometry extends BufferGeometry {
    constructor(innerRadius?: number, outerRadius?: number, thetaSegments?: number);
  }
  export class SphereGeometry extends BufferGeometry {
    constructor(radius?: number, widthSegments?: number, heightSegments?: number);
  }
  export class MeshBasicMaterial extends Material {
    constructor(params?: Record<string, unknown>);
  }

  export class PointsMaterial extends Material {
    constructor(params?: Record<string, unknown>);
  }

  export class AmbientLight extends Object3D {
    constructor(color?: string | number, intensity?: number);
  }

  export class DirectionalLight extends Object3D {
    constructor(color?: string | number, intensity?: number);
    position: { set: (x: number, y: number, z: number) => void };
  }

  export const AdditiveBlending: unknown;
}
