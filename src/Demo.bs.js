// Generated by BUCKLESCRIPT VERSION 4.0.18, PLEASE EDIT WITH CARE
'use strict';

var Json = require("@glennsl/bs-json/src/Json.bs.js");
var Js_dict = require("bs-platform/lib/js/js_dict.js");
var Json_decode = require("@glennsl/bs-json/src/Json_decode.bs.js");
var Json_encode = require("@glennsl/bs-json/src/Json_encode.bs.js");

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

var decoded = decodePerson(person);

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

var encoded = Json.stringify(encodePerson(decoded));

console.log(encoded);

var json = person;

exports.info = info;
exports.person = person;
exports.json = json;
exports.decodeInfo = decodeInfo;
exports.decodePerson = decodePerson;
exports.decoded = decoded;
exports.encodeInfo = encodeInfo;
exports.encodePerson = encodePerson;
exports.encoded = encoded;
/* info Not a pure module */