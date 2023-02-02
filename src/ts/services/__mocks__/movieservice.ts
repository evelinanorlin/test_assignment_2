import { IMovie } from "../../models/Movie";

export let movieInfo: IMovie[] = [
  {
    Title: "Treasure Island", 
    imdbID: "", 
    Type: "adventure", 
    Poster: "image of Island", 
    Year: "2022"
  },
  {
    Title: "Harry potter and the goblet of fire", 
    imdbID: "", 
    Type: "magical", 
    Poster: "image of wizard", 
    Year: "2013"
  }
]

export async function getData(): Promise<IMovie[]> {
  return new Promise ((resolve, reject) => {
      if(movieInfo.length > 0){
        resolve(movieInfo);
      }
      else{
        reject([]);
      }
  });
} 