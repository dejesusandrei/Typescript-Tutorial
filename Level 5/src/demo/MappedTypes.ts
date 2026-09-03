type User = {
  id: string;
  name: string;
  email: string;
};

// INstead of writing the same type again, we can use mapped types to create a new type based on an existing one.
type ReadonlyUser = {
  readonly id: string;
  readonly name: string;
  readonly email: string;
};

// We can use mapped types to create a new type based on an existing one.
// You can read but cant modify the readonly properties
type ReadOnlyUser ={
  readonly [K in keyof User]: User[K];
}

// Copying the properties of an existing type to create a new type
type Copy<T> = {
  [K in keyof T]: T[K];
}
type CopyUser = Copy<User>;

// We can use mapped types to create a new type based on an existing one.
// This creates a type with all properties of the original type, but makes them optional
type Optional<T> = {
  [K in keyof T]?: T[K];
}
type OptionalUser = Optional<User>;

type Partial<T> = {
  [K in keyof T]?: T[K];
}
type PartialUser = Partial<User>;

type ReadOnly<T> = {
  readonly[K in keyof T]: T[K];
}
type ReadPArtialUser =  ReadOnly<Partial<User>>;

// Remove readonly and optional/partial
type RemoveReadOnly<T> = {
  -readonly[K in keyof T]: T[K];
}
type RemoveOptional<T> = {
  [K in keyof T]-?: T[K];
}