export interface Author {
  name: string;
  id: string;
}

export interface AuthorResponse {
  successful: boolean;
  result: Author;
}

export interface AuthorsResponse {
  successful: boolean;
  result: Author[];
}
