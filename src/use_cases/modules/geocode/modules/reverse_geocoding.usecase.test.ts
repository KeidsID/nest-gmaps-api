import { Test, type TestingModule } from "@nestjs/testing";

import { GeocodeRepository } from "~/domain/repositories.js";
import { InfrastructuresModule } from "~/infrastructures/modules.js";

import { ReverseGeocodingUseCase } from "./reverse_geocoding.use_case.js";

describe("ReverseGeocodingUseCase", () => {
  let testModule: TestingModule;

  beforeEach(async () => {
    testModule = await Test.createTestingModule({
      imports: [InfrastructuresModule],
      providers: [ReverseGeocodingUseCase],
    }).compile();
  });

  it('should execute the "Reverse Geocoding" action properly', async () => {
    const expectedResult = {
      status: "OK",
      results: [
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
          place_id: "",
          types: ["dummy"],
        },
      ],
    };

    const geocodeRepository = testModule.get(GeocodeRepository);
    const repositoryReverseGeocodingSpy = jest
      .spyOn(geocodeRepository, "reverseGeocoding")
      .mockImplementation((lat, lng) => {
        return lat === 2502 && lng === -2502
          ? Promise.resolve(expectedResult.results)
          : Promise.resolve([]);
      });

    const reverseGeocodingUseCase = testModule.get(ReverseGeocodingUseCase);
    const actualResult = await reverseGeocodingUseCase.execute(2502, -2502);

    expect(actualResult).toEqual(expectedResult);
    expect(repositoryReverseGeocodingSpy).toHaveBeenCalledWith(
      2502,
      -2502,
      undefined,
    );

    const actualResult2 = await reverseGeocodingUseCase.execute(0, 0);

    expect(actualResult2).toEqual({ status: "ZERO_RESULTS", results: [] });
    expect(repositoryReverseGeocodingSpy).toHaveBeenCalledWith(0, 0, undefined);
  });
});
