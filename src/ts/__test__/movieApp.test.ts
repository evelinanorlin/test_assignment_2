/**
 * @jest-environment jsdom
 */

import * as movieApp from "../movieApp";

import * as movieservice from "../services/movieservice";

import { IMovie } from "../models/Movie";

jest.mock("./../services/movieservice.ts")

beforeEach(() => {
  document.body.innerHTML = "";
})

// describe("init", () => {

  test("should run function handleSubmit on submit", () => {
    // Arrange
    document.body.innerHTML = `
    <form id="searchForm">
    <input type="text" id="searchText" placeholder="Skriv titel här" />
    <button type="submit" id="search">Sök</button>
    </form>`;
    
    let spyOnHandleSubmit = jest.spyOn(movieApp, "handleSubmit").mockReturnValue(new Promise<void>((resolve) => {
      resolve();
    })
    );
    
    // Act
    movieApp.init();

    let submitForm = document.getElementById("searchForm") as HTMLFormElement;
    submitForm.submit();
    
    //Assert
    expect(spyOnHandleSubmit).toHaveBeenCalledTimes(1);
    
    spyOnHandleSubmit.mockRestore();
  })


// export const init = () => {
//   let form = document.getElementById("searchForm") as HTMLFormElement;
//   form.addEventListener("submit", (e: SubmitEvent) => {
//     e.preventDefault();
//     handleSubmit();
//   });
// };

describe("handleSubmit", () => {

  test("Should call movieServiceMock", async () => {
    // Arrange
    document.body.innerHTML = `
    <input type="text" id="searchText" placeholder="Skriv titel här" value="Harry Potter" />
    <div id="movie-container"></div>`; 

    let movies: IMovie[] = []

    // Act
    await movieApp.handleSubmit()

    let mockArray = document.querySelectorAll("h3");

    // Assert
    expect(mockArray.length).toBe(2);
  })

  test("Should run createHtml()", async () => {
    // Arrange
    document.body.innerHTML = `
    <input type="text" id="searchText" placeholder="Skriv titel här" value="Harry Potter" />
    <div id="movie-container"></div>`; 
  
    let spyOncreateHtml = jest.spyOn(movieApp, "createHtml").mockReturnValue();
  
    //Act
    await movieApp.handleSubmit()
  
    //Assert
    expect(spyOncreateHtml).toBeCalledTimes(1);
  
    spyOncreateHtml.mockRestore();
  })

  test("should run displayNoResults() because length <= 0", async () => {
    // Arrange
    document.body.innerHTML = `
    <input type="text" id="searchText" placeholder="Skriv titel här" value="" />
    <div id="movie-container"></div>`; 
    
    let getMockData = jest.spyOn(movieservice, "getData").mockReturnValue(Promise.resolve([]));
    let spyOnDisplayNoResults = jest.spyOn(movieApp, "displayNoResult").mockReturnValue();
    
    //Act
    await movieApp.handleSubmit()

      //Assert
    expect(spyOnDisplayNoResults).toBeCalledTimes(1);

    spyOnDisplayNoResults.mockRestore();
    getMockData.mockRestore();
})
  
  test("should run displayNoResults() because catch", async () => {
      // Arrange
      document.body.innerHTML = `
      <input type="text" id="searchText" placeholder="Skriv titel här" value="" />
      <div id="movie-container"></div>`; 
      
      let getMockData = jest.spyOn(movieservice, "getData").mockReturnValue(Promise.reject());
      let spyOnDisplayNoResults = jest.spyOn(movieApp, "displayNoResult").mockReturnValue();
      
      //Act
      await movieApp.handleSubmit()

        //Assert
      expect(spyOnDisplayNoResults).toBeCalledTimes(1);
  
      spyOnDisplayNoResults.mockRestore();
      getMockData.mockRestore();
  })
})

describe("createHtml", () => {
  test("Should create HTML", () => {
    // Arrange
    document.body.innerHTML = `
    <div id="movie-container"></div>`;

    let container: HTMLDivElement= document.getElementById("movie-container") as HTMLDivElement;

    let movies: IMovie[] = [
      {
        Title: "Treasure Island", Year: "2022", imdbID: "", Type: "adventure", Poster: "image of Island"
      },     
    ]
    
    // Act
    movieApp.createHtml(movies, container)
    
    let movie = container?.firstElementChild;
    let title = movie?.firstElementChild;
    let img: HTMLImageElement = movie?.lastElementChild as HTMLImageElement;
    // let img = document.createElement("img");

    // Assert
    expect(movie?.classList.contains("movie")).toBeTruthy();
    expect(title?.innerHTML).toBe(movies[0].Title);
    expect(img?.src).toBe("http://localhost/image%20of%20Island");
  })
})

describe("displayNoResult", () => {
  
  test("Should display error message", () => {
    //Arrange
    document.body.innerHTML = `
    <div id="container"></div>
    `;

    let container: HTMLDivElement = document.getElementById("container") as HTMLDivElement;

    let message = "Inga sökresultat att visa";

    //Act
    movieApp.displayNoResult(container);

    //Assert
    expect(container.innerHTML).toContain(message)
  })
})

