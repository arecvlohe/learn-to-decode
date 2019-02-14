let info =
  Js.Dict.fromList([
    ("name", Js.Json.string("Adam")),
    ("hobbies", Js.Json.stringArray([|"writing", "sleeping"|])),
    ("isYoloing", Js.Json.null),
  ]);

let person = Js.Dict.fromList([("info", Js.Json.object_(info))]);

let json = Js.Json.object_(person);

type info = {
  name: string,
  hobbies: list(string),
  isYoloing: option(bool),
};

type person = {info};

let decodeInfo = json =>
  Json.Decode.{
    name: json |> field("name", string),
    hobbies: json |> field("hobbies", list(string)),
    isYoloing: json |> field("isYoloing", optional(bool)),
  };
let decodePerson = json =>
  Json.Decode.{info: json |> field("info", decodeInfo)};

let decoded = decodePerson(json);

let encodeInfo = info =>
  Json.Encode.object_([
    ("name", Json.Encode.string(info.name)),
    ("hobbies", Json.Encode.list(Json.Encode.string, info.hobbies)),
    ("isYoloing", Json.Encode.nullable(Json.Encode.bool, info.isYoloing)),
  ]);

let encodePerson = person =>
  Json.Encode.object_([("info", encodeInfo(person.info))]);

let encoded = Json.stringify(encodePerson(decoded));

Js.log(encoded);
