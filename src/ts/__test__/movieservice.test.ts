import { getData } from "../services/movieservice";

jest.mock("axios", () => ({
  get: async(url: string) => {
    return new Promise((resolve, reject) => {
      if(url.endsWith("error")) {
        reject([]);
      }
      else{
        resolve(  [{
          Title: "Treasure Island", imdbID: "", Type: "adventure", Poster: "image of Island", Year: "2022"
        },
        {
          Title: "Harry potter and the goblet of fire", imdbID: "", Type: "magical", Poster: "image of wizard", Year: "2013"
        }]);
      }
    });
  }
}));

test("Should get data correctly", async () => {
  let data = await getData("test");
})

test("should get eroor getting data", async () => {
  try{
    let data = await getData("error");
  }
  catch(error: any){
    expect(error.length).toBe(0);
  }
})