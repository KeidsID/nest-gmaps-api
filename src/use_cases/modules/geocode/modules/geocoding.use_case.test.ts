import { Test, type TestingModule } from "@nestjs/testing";

import { GeocodeRepository } from "~/domain/repositories.js";
import { InfrastructuresModule } from "~/infrastructures/modules.js";

import { GeocodingUseCase } from "./geocoding.use_case.js";

describe("GeocodingUseCase", () => {
  let testModule: TestingModule;

  beforeEach(async () => {
    testModule = await Test.createTestingModule({
      imports: [InfrastructuresModule],
      providers: [GeocodingUseCase],
    }).compile();
  });

  it('should execute the "Geocoding" action properly', async () => {
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
            location: { lat: 0, lng: 0 },
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
    const repositoryGeocodingSpy = jest
      .spyOn(geocodeRepository, "geocoding")
      .mockImplementation((address) => {
        return address.toLowerCase() === "dummy"
          ? Promise.resolve(expectedResult.results)
          : Promise.resolve([]);
      });

    const geocodingUseCase = testModule.get(GeocodingUseCase);
    const actualResult = await geocodingUseCase.execute("Dummy");

    expect(actualResult).toEqual(expectedResult);
    expect(repositoryGeocodingSpy).toHaveBeenCalledWith("Dummy", undefined);

    const actualResult2 = await geocodingUseCase.execute("invalid-address");

    expect(actualResult2).toEqual({ status: "ZERO_RESULTS", results: [] });
    expect(repositoryGeocodingSpy).toHaveBeenCalledWith(
      "invalid-address",
      undefined,
    );
  });
});
