// Generated by BUCKLESCRIPT VERSION 4.0.18, PLEASE EDIT WITH CARE
'use strict';

var Json = require("@glennsl/bs-json/src/Json.bs.js");
var Block = require("bs-platform/lib/js/block.js");
var Js_dict = require("bs-platform/lib/js/js_dict.js");
var Belt_Option = require("bs-platform/lib/js/belt_Option.js");
var Belt_Result = require("bs-platform/lib/js/belt_Result.js");
var Json_decode = require("@glennsl/bs-json/src/Json_decode.bs.js");
var Json_encode = require("@glennsl/bs-json/src/Json_encode.bs.js");
var Caml_js_exceptions = require("bs-platform/lib/js/caml_js_exceptions.js");

var info = Js_dict.fromList(/* :: */[
      /* tuple */[
        "name",
        "Adam"
      ],
      /* :: */[
        /* tuple */[
          "hobbies",
          /* array */[
            "writing",
            "sleeping"
          ]
        ],
        /* :: */[
          /* tuple */[
            "isYoloing",
            null
          ],
          /* [] */0
        ]
      ]
    ]);

var person = Js_dict.fromList(/* :: */[
      /* tuple */[
        "info",
        info
      ],
      /* [] */0
    ]);

var json = JSON.stringify(person);

function decodeInfo(json) {
  return /* record */[
          /* name */Json_decode.field("name", Json_decode.string, json),
          /* hobbies */Json_decode.field("hobbies", (function (param) {
                  return Json_decode.list(Json_decode.string, param);
                }), json),
          /* isYoloing */Json_decode.field("isYoloing", (function (param) {
                  return Json_decode.optional(Json_decode.bool, param);
                }), json)
        ];
}

function decodePerson(json) {
  return /* record */[/* info */Json_decode.field("info", decodeInfo, json)];
}

function decodePersonExn(json) {
  return decodePerson(Json.parseOrRaise(json));
}

function decodePersonOption(json) {
  return Belt_Option.map(Json.parse(json), decodePerson);
}

function decodePersonResult(json) {
  try {
    return /* Ok */Block.__(0, [decodePerson(Json.parseOrRaise(json))]);
  }
  catch (raw_exn){
    var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
    if (exn[0] === Json_decode.DecodeError) {
      return /* Error */Block.__(1, [exn[1]]);
    } else {
      throw exn;
    }
  }
}

function encodeInfo(info) {
  return Json_encode.object_(/* :: */[
              /* tuple */[
                "name",
                info[/* name */0]
              ],
              /* :: */[
                /* tuple */[
                  "hobbies",
                  Json_encode.list((function (prim) {
                          return prim;
                        }), info[/* hobbies */1])
                ],
                /* :: */[
                  /* tuple */[
                    "isYoloing",
                    Json_encode.nullable((function (prim) {
                            return prim;
                          }), info[/* isYoloing */2])
                  ],
                  /* [] */0
                ]
              ]
            ]);
}

function encodePerson(person) {
  return Json_encode.object_(/* :: */[
              /* tuple */[
                "info",
                encodeInfo(person[/* info */0])
              ],
              /* [] */0
            ]);
}

var decodedWithExn = decodePerson(Json.parseOrRaise(json));

var decodedWithOption = Belt_Option.map(Json.parse(json), decodePerson);

var decodedWithResult = decodePersonResult(json);

var encodedFromExn = Json.stringify(encodePerson(decodedWithExn));

var encodedFromOption = Belt_Option.getWithDefault(Belt_Option.map(Belt_Option.map(decodedWithOption, encodePerson), Json.stringify), "");

var encodedFromResult = Belt_Result.getWithDefault(Belt_Result.map(Belt_Result.map(decodedWithResult, encodePerson), Json.stringify), "");

exports.info = info;
exports.person = person;
exports.json = json;
exports.decodeInfo = decodeInfo;
exports.decodePerson = decodePerson;
exports.decodePersonExn = decodePersonExn;
exports.decodePersonOption = decodePersonOption;
exports.decodePersonResult = decodePersonResult;
exports.encodeInfo = encodeInfo;
exports.encodePerson = encodePerson;
exports.decodedWithExn = decodedWithExn;
exports.decodedWithOption = decodedWithOption;
exports.decodedWithResult = decodedWithResult;
exports.encodedFromExn = encodedFromExn;
exports.encodedFromOption = encodedFromOption;
exports.encodedFromResult = encodedFromResult;
/* info Not a pure module */
