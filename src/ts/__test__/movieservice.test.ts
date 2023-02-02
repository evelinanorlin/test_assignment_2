import { getData } from "../services/movieservice";
import { movieInfo } from "../services/__mocks__/movieservice";

jest.mock("axios", () => ({
  get: async(url: string) => {
    return new Promise((resolve, reject) => {
      if(url.endsWith("error")) {
        reject({ data: [], status: 500 });
      }
      else{
        resolve({ data: {Search: movieInfo}, status: 200 });
      }
    });
  }
}));

test("Should get data correctly", async () => {
  let data = await getData("Treasure Island");

  expect(data.length).toBe(2);
})

test("should get eroor getting data", async () => {
  try{
    let data = await getData("error");
  }
  catch(error: any){

    expect(error.length).toBe(0);
  }
})