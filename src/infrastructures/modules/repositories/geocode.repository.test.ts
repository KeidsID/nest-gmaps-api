import { Test, type TestingModule } from "@nestjs/testing";
import { AxiosHeaders, type AxiosResponse } from "axios";

import { GeocodeRepository } from "~/domain/repositories.js";
import { GeocodeRemoteData } from "~/infrastructures/libs/data/remote/modules.js";
import { InfrastructuresModule } from "~/infrastructures/modules.js";

describe("GeocodeRepository", () => {
  let testModule: TestingModule;

  beforeEach(async () => {
    testModule = await Test.createTestingModule({
      imports: [InfrastructuresModule],
    }).compile();
  });

  describe(".geocoding", () => {
    let remoteDataGeocodingSpy: jest.SpyInstance<
      ReturnType<GeocodeRemoteData["geocoding"]>,
      Parameters<GeocodeRemoteData["geocoding"]>
    >;

    let geocodeRepository: GeocodeRepository;

    beforeEach(() => {
      const geocodeRemoteData = testModule.get(GeocodeRemoteData);
      remoteDataGeocodingSpy = jest
        .spyOn(geocodeRemoteData, "geocoding")
        .mockImplementation((address) => {
          const results =
            address.toLowerCase() === "dummy"
              ? [
                  {
                    address_components: [
                      {
                        long_name: "Dummy",
                        short_name: "Dummy",
                        types: ["dummy"],
                      },
                    ],
                    formatted_address: "Dummy",
                    geometry: {
                      location: { lat: 2502, lng: -2502 },
                      location_type: "ROOFTOP",
                      viewport: {
                        northeast: { lat: 0, lng: 0 },
                        southwest: { lat: 0, lng: 0 },
                      },
                    },
                    place_id: "dummy-123",
                    types: ["dummy"],
                  },
                ]
              : undefined;

          const response = {
            status: 200,
            statusText: "OK",
            data: {
              status: results ? "OK" : "ZERO_RESULTS",
              results,
            },
            headers: {},
            config: { headers: new AxiosHeaders() },
          } satisfies AxiosResponse<Record<string, unknown>>;

          return Promise.resolve(response);
        });

      geocodeRepository = testModule.get(GeocodeRepository);
    });

    it("should fetch GeocodeResult[] via HTTP request based on provided address", async () => {
      const actualResult = await geocodeRepository.geocoding("Dummy");

      expect(actualResult).toEqual([
        {
          address_components: [
            {
              long_name: "Dummy",
              short_name: "Dummy",
              types: ["dummy"],
            },
          ],
          formatted_address: "Dummy",
          geometry: {
            location: { lat: 2502, lng: -2502 },
            location_type: "ROOFTOP",
            viewport: {
              northeast: { lat: 0, lng: 0 },
              southwest: { lat: 0, lng: 0 },
            },
          },
          place_id: "dummy-123",
          types: ["dummy"],
        },
      ]);
      expect(remoteDataGeocodingSpy).toHaveBeenCalledWith("Dummy", undefined);
    });

    it("should return empty array if no results from the address", async () => {
      const actualResult = await geocodeRepository.geocoding("invalid address");

      expect(actualResult).toEqual([]);
      expect(remoteDataGeocodingSpy).toHaveBeenCalledWith(
        "invalid address",
        undefined,
      );
    });
  });

  describe(".reverseGeocoding", () => {
    let remoteDataReverseGeocodingSpy: jest.SpyInstance<
      ReturnType<GeocodeRemoteData["reverseGeocoding"]>,
      Parameters<GeocodeRemoteData["reverseGeocoding"]>
    >;

    let geocodeRepository: GeocodeRepository;

    beforeEach(() => {
      const geocodeRemoteData = testModule.get(GeocodeRemoteData);
      remoteDataReverseGeocodingSpy = jest
        .spyOn(geocodeRemoteData, "reverseGeocoding")
        .mockImplementation((lat, lng) => {
          const results =
            lat === 2502 && lng === -2502
              ? [
                  {
                    address_components: [
                      {
                        long_name: "Dummy",
                        short_name: "Dummy",
                        types: ["dummy"],
                      },
                    ],
                    formatted_address: "Dummy",
                    geometry: {
                      location: { lat: 2502, lng: -2502 },
                      location_type: "ROOFTOP",
                      viewport: {
                        northeast: { lat: 0, lng: 0 },
                        southwest: { lat: 0, lng: 0 },
                      },
                    },
                    place_id: "dummy-123",
                    types: ["dummy"],
                  },
                ]
              : undefined;

          const response = {
            status: 200,
            statusText: "OK",
            data: {
              status: results ? "OK" : "ZERO_RESULTS",
              results,
            },
            headers: {},
            config: { headers: new AxiosHeaders() },
          } satisfies AxiosResponse<Record<string, unknown>>;

          return Promise.resolve(response);
        });

      geocodeRepository = testModule.get(GeocodeRepository);
    });

    it("should fetch GeocodeResult[] via HTTP request based on provided coordinates", async () => {
      const actualResult = await geocodeRepository.reverseGeocoding(
        2502,
        -2502,
      );

      expect(actualResult).toEqual([
        {
          address_components: [
            {
              long_name: "Dummy",
              short_name: "Dummy",
              types: ["dummy"],
            },
          ],
          formatted_address: "Dummy",
          geometry: {
            location: { lat: 2502, lng: -2502 },
            location_type: "ROOFTOP",
            viewport: {
              northeast: { lat: 0, lng: 0 },
              southwest: { lat: 0, lng: 0 },
            },
          },
          place_id: "dummy-123",
          types: ["dummy"],
        },
      ]);
      expect(remoteDataReverseGeocodingSpy).toHaveBeenCalledWith(
        2502,
        -2502,
        undefined,
      );
    });

    it("should return empty array if no results from the coordinates", async () => {
      const actualResult = await geocodeRepository.reverseGeocoding(0, 0);

      expect(actualResult).toEqual([]);
      expect(remoteDataReverseGeocodingSpy).toHaveBeenCalledWith(
        0,
        0,
        undefined,
      );
    });
  });
});
