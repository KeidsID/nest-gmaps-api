import { type GeocodeResult } from "~/domain/entities.js";

export abstract class GeocodeRepository {
  abstract geocoding(address: string): Promise<GeocodeResult[]>;

  abstract reverseGeocoding(lat: number, lng: number): Promise<GeocodeResult[]>;
}
