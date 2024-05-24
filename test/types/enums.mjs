import { assert, runTests, getEnumKeys, getEnumValues, parseEnum } from "../../build/index.js";

let DayNight;
(function (DayNight) {
    DayNight[DayNight["Day"] = 0] = "Day";
    DayNight[DayNight["Night"] = 1] = "Night";
})(DayNight || (DayNight = {}));

runTests(async function test_enums() {
	assert([0,1], getEnumValues, DayNight);
	assert(["Day","Night"], getEnumKeys, DayNight);
	assert(0, parseEnum, DayNight, 0);
	assert(0, parseEnum, DayNight, "day");
	assert(0, parseEnum, DayNight, "Day");
	assert(1, parseEnum, DayNight, 1);
	assert(1, parseEnum, DayNight, "night");
	assert(1, parseEnum, DayNight, "Night");
	assert(undefined, parseEnum, DayNight, "1");
	assert(undefined, parseEnum, DayNight, 2);
	assert(undefined, parseEnum, DayNight, "daynight");
	assert(undefined, parseEnum, DayNight, undefined);
	assert(undefined, parseEnum, DayNight, null);
}, true);
