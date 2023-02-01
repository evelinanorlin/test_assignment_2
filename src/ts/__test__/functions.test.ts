/**
 * @jest-environment jsdom
 */

import * as functions from "../functions"

import { IMovie } from "../models/Movie";

describe("movieSort", () => {

  test("should sort list in descending order", () => {
    // Arrage
    let movieInfo: IMovie[] = [
      {
        Title: "aaa", imdbID: "", Type: "", Poster: "", Year: ""
      },
      {
        Title: "ddd", imdbID: "", Type: "", Poster: "", Year: ""
      },
      {
        Title: "ccc", imdbID: "", Type: "", Poster: "", Year: ""
      }
    ]

    let desc = true;

    // Act
    functions.movieSort(movieInfo, desc);

    // Assert
    expect(movieInfo[0].Title).toBe("aaa")
    expect(movieInfo[1].Title).toBe("ccc")
    expect(movieInfo[2].Title).toBe("ddd")
  })

  test("should sort list in ascending order", () => {
    // Arrage
    let movieInfo: IMovie[] = [
      {
        Title: "aaa", imdbID: "", Type: "", Poster: "", Year: ""
      },
      {
        Title: "ddd", imdbID: "", Type: "", Poster: "", Year: ""
      },
      {
        Title: "ccc", imdbID: "", Type: "", Poster: "", Year: ""
      }
    ]

    let desc = false;

    // Act
    functions.movieSort(movieInfo, desc);

    // Assert
    expect(movieInfo[0].Title).toBe("ddd")
    expect(movieInfo[1].Title).toBe("ccc")
    expect(movieInfo[2].Title).toBe("aaa")
  })

  test("should not change list", () => {
    // Arrage
    let movieInfo: IMovie[] = [
      {
        Title: "aaa", imdbID: "", Type: "", Poster: "", Year: "1897"
      },
      {
        Title: "aaa", imdbID: "", Type: "", Poster: "", Year: "2022"
      }
    ]

    let desc = true;

    // Act
    functions.movieSort(movieInfo, desc);

    // Assert
    expect(movieInfo[0].Year).toBe("1897")
    expect(movieInfo[1].Year).toBe("2022")
  })

  test("should not change list", () => {
    // Arrage
    let movieInfo: IMovie[] = [
      {
        Title: "aaa", imdbID: "", Type: "", Poster: "", Year: "1897"
      },
      {
        Title: "aaa", imdbID: "", Type: "", Poster: "", Year: "2022"
      }
    ]

    let desc = false;

    // Act
    functions.movieSort(movieInfo, desc);

    // Assert
    expect(movieInfo[0].Year).toBe("1897")
    expect(movieInfo[1].Year).toBe("2022")
  })

})