/** Let's first create a simple JSON string */

/** You can create a JSON string using a Js.Dict.t(Js.Json.t) */
let info: Js.Dict.t(Js.Json.t) =
  Js.Dict.fromList([
    ("name", Js.Json.string("Adam")),
    ("hobbies", Js.Json.stringArray([|"writing", "sleeping"|])),
    ("isYoloing", Js.Json.null),
  ]);

let person: Js.Dict.t(Js.Json.t) =
  Js.Dict.fromList([("info", Js.Json.object_(info))]);

/** Now we have JSON */
let json: string = person |> Js.Json.object_ |> Js.Json.stringify;
/** It will look something like this
{
  info: {
    name: "Adam",
    hobbies: [writing, sleeping],
    isYoloing: null
  }
}
*/

/** Let's now create the types we want to transform the JSON into so it can be used inside of ReasonML/Ocaml */
/** info type to correlate to the info in the JSON */
type info = {
  name: string, // string because string
  hobbies: list(string), // list instead of array
  isYoloing: option(bool) // option instead of null
};

/** person type will be an object holding the key/type info */
type person = {info};

/** Now let's create a decoder that takes JSON and return info */
let decodeInfo: Js.Json.t => info =
  json =>
    // Json.Decode.{} is for objects
    Json.Decode.{
      // Each field takes a field decoder of the key, the value to decode to and JSON
      name: json |> field("name", string),
      hobbies: json |> field("hobbies", list(string)),
      isYoloing: json |> field("isYoloing", optional(bool)),
    };

let decodePerson: Js.Json.t => person =
  // Here we are decoding not with a primitive decoder from Json.Deode but the one made above
  json => Json.Decode.{info: json |> field("info", decodeInfo)};

/** Now let's decode the JSON and return the value back */
/** Here we are handling the possbility of an error with Json.parseOrRaise */
let decodePersonExn: string => person =
  json => json |> Json.parseOrRaise |> decodePerson;

/** We can also handle it as an option */
let decodePersonOption: string => option(person) =
  json => json->Json.parse->Belt.Option.map(decodePerson);

/** Or we can handle it as a result, this one seems to be the most common practice */
let decodePersonResult: string => Belt.Result.t(person, string) =
  json =>
    try (Belt.Result.Ok(decodePersonExn(json))) {
    | Json.Decode.DecodeError(err) => Belt.Result.Error(err)
    };

/** Now that we know how to decode the string, let's try to encode it back into its orignal form */
let encodeInfo: info => Js.Json.t =
  info =>
    // Here we are using object_ again, similar to when using it with Js.Dict.t
    Json.Encode.object_([
      // This time the values are encoded using a list of tuples
      // The key the value will encode to, and a function that encodes the value passed to it
      ("name", Json.Encode.string(info.name)),
      // Some functions take more than one argument, in this case the internal value inside of list
      ("hobbies", Json.Encode.list(Json.Encode.string, info.hobbies)),
      // Or in this case, the representation of the value in case it's not null
      ("isYoloing", Json.Encode.nullable(Json.Encode.bool, info.isYoloing)),
    ]);

let encodePerson: person => Js.Json.t =
  person => Json.Encode.object_([("info", encodeInfo(person.info))]);

/** Now let's try this out in various ways */
/** Decode all this things */
let decodedWithExn: person = decodePersonExn(json);

let decodedWithOption: option(person) = decodePersonOption(json);

let decodedWithResult: Belt.Result.t(person, string) =
  decodePersonResult(json);

/** Encode all the things */
let encodedFromExn: string = encodePerson(decodedWithExn) |> Json.stringify;

let encodedFromOption: string =
  Belt.Option.(
    decodedWithOption
    ->map(encodePerson)
    ->map(Json.stringify)
    ->getWithDefault("")
  );

let encodedFromResult: string =
  Belt.Result.(
    decodedWithResult
    ->map(encodePerson)
    ->map(Json.stringify)
    ->getWithDefault("")
  );
