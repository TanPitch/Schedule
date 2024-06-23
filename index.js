/*

All date start from 1 (index 0 is prev date from prev month)

[ ] count ER3_1 max ER3 = 2 and priority from (lowest ER, ER, PCU, Ortho)
[ ] doschedule error
[ ] add OPD, Forensic input

*/

// #region : variable

var EPblock = []; // EP block for intern
var MEDblock = "";
var PEDblock = "";
var OBblock = "";
var SXblock = "";
var ORTHOblock = "";
var ERblock = "";
var PCUblock = "";
var userName;
var getData_table = [
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
]; // data table that get from server

var specialName_1 = "";
var specialName_2 = "";

// #endregion

// #region : static data

const API_url =
  "https://script.google.com/macros/s/AKfycbw4Gj4VIA31gWSoy_y_2YaZ3WSvNHorx3H43-9CSyKqKWwC6BFG-k8mkbM1-XIgTHKV/exec";

const data_rotate = [
  {
    name: "อมรเศรษฐ์",
    rotate: ["med", "med", "sx", "sx", "ped", "ped", "ob", "ob", "er", "ortho", "out", "out"],
  },
  {
    name: "ธัญณัฐ",
    rotate: ["med", "ob", "out", "out", "sx", "sx", "ped", "ped", "med", "er", "ortho", "ob"],
  },
  {
    name: "โศภิชตรา",
    rotate: ["ob", "med", "out", "out", "ob", "med", "ped", "ped", "er", "ortho", "sx", "sx"],
  },
  {
    name: "นัทชา",
    rotate: ["ped", "ob", "med", "med", "out", "out", "sx", "sx", "ped", "ob", "ortho", "er"],
  },
  {
    name: "แทนไท",
    rotate: ["er", "ped", "med", "med", "out", "out", "sx", "sx", "ob", "ped", "ob", "ortho"],
  },
  {
    name: "กสินพัฒน์",
    rotate: ["ortho", "er", "ob", "ped", "med", "med", "out", "out", "sx", "sx", "ob", "ped"],
  },
  {
    name: "รวิษฏ์",
    rotate: ["er", "ortho", "ped", "ob", "med", "med", "out", "out", "sx", "sx", "ped", "ob"],
  },
  {
    name: "พงศ์ภัค",
    rotate: ["sx", "sx", "ortho", "ped", "ob", "ob", "med", "med", "out", "out", "er", "ped"],
  },
  {
    name: "ปริณดา",
    rotate: ["sx", "sx", "ped", "ortho", "ob", "ob", "med", "med", "out", "out", "ped", "er"],
  },
  {
    name: "บุณยานุช",
    rotate: ["sx", "med", "sx", "ortho", "ped", "ped", "er", "ob", "ob", "pcu", "med", "med"],
  },
  {
    name: "กณิศา",
    rotate: ["ob", "sx", "med", "ped", "ped", "er", "ortho", "med", "med", "sx", "pcu", "ob"],
  },
  {
    name: "กัลยา",
    rotate: ["ped", "er", "pcu", "med", "med", "ped", "med", "ob", "ortho", "ob", "sx", "sx"],
  },
  {
    name: "คัทสุฮีโร่",
    rotate: ["ped", "ped", "ortho", "er", "ob", "med", "med", "pcu", "ob", "med", "sx", "sx"],
  },
  {
    name: "เคนจิ",
    rotate: ["pcu", "ortho", "er", "ob", "med", "sx", "sx", "med", "ped", "ob", "med", "ped"],
  },
  {
    name: "ณพข์ฉัตรฬ์",
    rotate: ["ortho", "er", "ob", "med", "sx", "sx", "ped", "ped", "med", "med", "ob", "pcu"],
  },
  {
    name: "ภัทรปวัน",
    rotate: ["er", "ob", "med", "sx", "sx", "ob", "pcu", "ortho", "med", "med", "ped", "ped"],
  },
  {
    name: "วรปรัชญ์",
    rotate: ["ob", "med", "sx", "sx", "ortho", "pcu", "ob", "er", "ped", "ped", "med", "med"],
  },
  {
    name: "กัปตัน",
    rotate: ["med", "pcu", "ped", "ob", "er", "ortho", "ob", "sx", "sx", "ped", "med", "med"],
  },
  {
    name: "พรหมพลิน",
    rotate: ["sx", "med", "sx", "er", "pcu", "ob", "ortho", "ped", "ped", "med", "ob", "med"],
  },
  {
    name: "ชาญวิทย์",
    rotate: ["med", "ped", "er", "", "", "", "", "", "", "", "", ""],
  },
  {
    name: "ศีรญา",
    rotate: ["ped", "ob", "ob", "", "", "", "", "", "", "", "", ""],
  },
  {
    name: "นัธทสิทธิ",
    rotate: ["ob", "ob", "ped", "", "", "", "", "", "", "", "", ""],
  },
  {
    name: "นนทนันท์",
    rotate: ["ped", "ped", "ob", "", "", "", "", "", "", "", "", ""],
  },
  {
    name: "ภูมิศิริ",
    rotate: ["ob", "sx", "ob", "", "", "", "", "", "", "", "", ""],
  },
  {
    name: "ค่าย 1",
    rotate: ["", "ped", "ped", "ob", "ped", "ped", "ped", "ob", "ob", "ob", "ped", "ob"],
  },
  {
    name: "ค่าย 2",
    rotate: ["", "", "", "ped", "", "", "", "ped", "ped", "ped", "", ""],
  },
];

var peepStat = [
  {
    name: "อมรเศรษฐ์",
    block: 0,
    hr: 0,
    er3: 0,
  },
  {
    name: "ธัญณัฐ",
    block: 0,
    hr: 0,
    er3: 0,
  },
  {
    name: "โศภิชตรา",
    block: 0,
    hr: 0,
    er3: 0,
  },
  {
    name: "นัทชา",
    block: 0,
    hr: 0,
    er3: 0,
  },
  {
    name: "แทนไท",
    block: 0,
    hr: 0,
    er3: 0,
  },
  {
    name: "กสินพัฒน์",
    block: 0,
    hr: 0,
    er3: 0,
  },
  {
    name: "รวิษฏ์",
    block: 0,
    hr: 0,
    er3: 0,
  },
  {
    name: "พงศ์ภัค",
    block: 0,
    hr: 0,
    er3: 0,
  },
  {
    name: "ปริณดา",
    block: 0,
    hr: 0,
    er3: 0,
  },
  {
    name: "บุณยานุช",
    block: 0,
    hr: 0,
    er3: 0,
  },
  {
    name: "กณิศา",
    block: 0,
    hr: 0,
    er3: 0,
  },
  {
    name: "กัลยา",
    block: 0,
    hr: 0,
    er3: 0,
  },
  {
    name: "คัทสุฮีโร่",
    block: 0,
    hr: 0,
    er3: 0,
  },
  {
    name: "เคนจิ",
    block: 0,
    hr: 0,
    er3: 0,
  },
  {
    name: "ณพข์ฉัตรฬ์",
    block: 0,
    hr: 0,
    er3: 0,
  },
  {
    name: "ภัทรปวัน",
    block: 0,
    hr: 0,
    er3: 0,
  },
  {
    name: "วรปรัชญ์",
    block: 0,
    hr: 0,
    er3: 0,
  },
  {
    name: "กัปตัน",
    block: 0,
    hr: 0,
    er3: 0,
  },
  {
    name: "พรหมพลิน",
    block: 0,
    hr: 0,
    er3: 0,
  },
  {
    name: "ชาญวิทย์",
    block: 0,
    hr: 0,
    er3: 0,
  },
  {
    name: "ศีรญา",
    block: 0,
    hr: 0,
    er3: 0,
  },
  {
    name: "นัธทสิทธิ",
    block: 0,
    hr: 0,
    er3: 0,
  },
  {
    name: "นนทนันท์",
    block: 0,
    hr: 0,
    er3: 0,
  },
  {
    name: "ภูมิศิริ",
    block: 0,
    hr: 0,
    er3: 0,
  },
  {
    name: "ค่าย 1",
    block: 0,
    hr: 0,
    er3: 0,
  },
  {
    name: "ค่าย 2",
    block: 0,
    hr: 0,
    er3: 0,
  },
];

const specialWeekend = [
  [1],
  [2],
  [],
  [6, 13, 14, 15, 16],
  [1, 4, 11, 12],
  [3],
  [20, 21, 22, 28, 29],
  [12],
  [],
  [13, 14, 23],
  [],
  [5, 10, 31],
];

// #endregion

// #region : getting data TODO:

var data_table = [
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
];

var data_off = [
  {
    name: "อมรเศรษฐ์",
    dayoff: [],
    ward: [],
  },
  {
    name: "ธัญณัฐ",
    dayoff: [],
    ward: [],
  },
  {
    name: "โศภิชตรา",
    dayoff: [],
    ward: [],
  },
  {
    name: "นัทชา",
    dayoff: [],
    ward: [],
  },
  {
    name: "แทนไท",
    dayoff: [],
    ward: [],
  },
  {
    name: "กสินพัฒน์",
    dayoff: [],
    ward: [],
  },
  {
    name: "รวิษฏ์",
    dayoff: [],
    ward: [],
  },
  {
    name: "พงศ์ภัค",
    dayoff: [],
    ward: [],
  },
  {
    name: "ปริณดา",
    dayoff: [],
    ward: [],
  },
  {
    name: "บุณยานุช",
    dayoff: [],
    ward: [],
  },
  {
    name: "กณิศา",
    dayoff: [],
    ward: [],
  },
  {
    name: "กัลยา",
    dayoff: [],
    ward: [],
  },
  {
    name: "คัทสุฮีโร่",
    dayoff: [],
    ward: [],
  },
  {
    name: "เคนจิ",
    dayoff: [],
    ward: [],
  },
  {
    name: "ณพข์ฉัตรฬ์",
    dayoff: [],
    ward: [],
  },
  {
    name: "ภัทรปวัน",
    dayoff: [],
    ward: [],
  },
  {
    name: "วรปรัชญ์",
    dayoff: [],
    ward: [],
  },
  {
    name: "กัปตัน",
    dayoff: [],
    ward: [],
  },
  {
    name: "พรหมพลิน",
    dayoff: [],
    ward: [],
  },
  {
    name: "ชาญวิทย์",
    dayoff: [],
    ward: [],
  },
  {
    name: "ศีรญา",
    dayoff: [],
    ward: [],
  },
  {
    name: "นัธทสิทธิ",
    dayoff: [],
    ward: [],
  },
  {
    name: "นนทนันท์",
    dayoff: [],
    ward: [],
  },
  {
    name: "ภูมิศิริ",
    dayoff: [],
    ward: [],
  },
  {
    name: "ค่าย 1",
    dayoff: [],
    ward: [],
  },
  {
    name: "ค่าย 2",
    dayoff: [],
    ward: [],
  },
];

// getting table
// getting ER block
// getting day off and morning ward round

// TODO:
function getData() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const { month: next2Month, year: nextYear } = getNextMonth(currentMonth, currentYear, 2);

  // generate obj
  data_table = JSON.parse(JSON.stringify(getData_table));
  for (let date = 1; date <= new Date(nextYear, next2Month, 0).getDate(); date++) {
    ["med", "ped", "ob", "sx", "ortho"].forEach((ward) => {
      if (data_table[date][ward] == undefined) data_table[date][ward] = "";
    });
    for (let rep = 0; rep < EPblock[date].er1; rep++)
      if (data_table[date][`er1_${rep + 1}`] == undefined) data_table[date][`er1_${rep + 1}`] = "";
    for (let rep = 0; rep < EPblock[date].er2; rep++)
      if (data_table[date][`er2_${rep + 1}`] == undefined) data_table[date][`er2_${rep + 1}`] = "";
    for (let rep = 0; rep < EPblock[date].er3; rep++)
      if (data_table[date][`er3_${rep + 1}`] == undefined) data_table[date][`er3_${rep + 1}`] = "";
  }
}

// #endregion

// #region : main engine

const loadPage = document.querySelector("#page_loader");

// input peep name, return random peep name CRASH:
function randomPeep(peep, hr = 1, isER = false, block) {
  // getting data
  var peeparray = [];
  peep.forEach((el) => {
    for (let i = 0; i < peepStat.length; i++) {
      if (el == peepStat[i].name) {
        peeparray.push(peepStat[i]);
        break;
      }
    }
  });
  if (block.includes("er")) peeparray = peeparray.filter((el) => el.er3 <= 1);

  // shuffle array
  // function shuffle(array) {
  //   for (let i = array.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [array[i], array[j]] = [array[j], array[i]];
  //   }
  // }

  // // group items by block
  // const groupedData = peeparray.reduce((acc, item) => {
  //   const key = item.block;
  //   if (!acc[key]) acc[key] = [];
  //   acc[key].push(item);
  //   return acc;
  // }, {});

  // // special
  // if (isER) {
  //   for (const key in groupedData) {
  //     const group = groupedData[key];
  //     const specialItem = group.filter((item) => item.name === "ธัญณัฐ");
  //     const otherItems = group.filter((item) => item.name !== "ธัญณัฐ");
  //     shuffle(otherItems);
  //     groupedData[key] = [...otherItems, ...specialItem];
  //   }
  // } else
  //   for (const key in groupedData) {
  //     shuffle(groupedData[key]);
  //   }

  // // sort items
  // const sortedData = Object.keys(groupedData)
  //   .map(Number)
  //   .sort((a, b) => a - b)
  //   .reduce((acc, key) => acc.concat(groupedData[key]), []);

  // // update block and hr
  // const choosen = sortedData[0];
  // for (let i = 0; i < peepStat.length; i++) {
  //   if (choosen.name == peepStat[i].name) {
  //     peepStat[i].block += 1;
  //     peepStat[i].hr += hr;
  //     if (block.includes("er3")) peepStat[i].er3 += 1;
  //     break;
  //   }
  // }

  // console.log(sortedData);

  // return choosen.name;

  // shuffle array

  // function shuffle(array) {
  //   for (let i = array.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [array[i], array[j]] = [array[j], array[i]];
  //   }
  // }

  // // Group items by block
  const groupedData = peeparray.reduce((acc, item) => {
    const key = item.block;
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  // // Sort and shuffle groups
  // for (const key in groupedData) {
  //   if (isER) {
  //     if (key.includes("er")) {
  //       // Sort by hr, then by er3
  //       groupedData[key].sort((a, b) => {
  //         if (a.hr !== b.hr) return a.hr - b.hr;
  //         if (a.er3 !== b.er3) return a.er3 - b.er3;
  //         return 0;
  //       });

  //       // Shuffle items with same hr and er3, excluding "ธัญณัฐ"
  //       let i = 0;
  //       while (i < groupedData[key].length) {
  //         let j = i;
  //         while (
  //           j < groupedData[key].length &&
  //           groupedData[key][j].hr === groupedData[key][i].hr &&
  //           groupedData[key][j].er3 === groupedData[key][i].er3
  //         ) {
  //           j++;
  //         }
  //         const subGroup = groupedData[key].slice(i, j).filter((item) => item.name !== "ธัญณัฐ");
  //         shuffle(subGroup);
  //         for (let k = i; k < j; k++) {
  //           if (groupedData[key][k].name !== "ธัญณัฐ") {
  //             groupedData[key][k] = subGroup.shift();
  //           }
  //         }
  //         i = j;
  //       }

  //       // Place "ธัญณัฐ" items last in their respective groups
  //       groupedData[key].sort((a, b) => {
  //         if (a.name === "ธัญณัฐ" && b.name !== "ธัญณัฐ") return 1;
  //         if (a.name !== "ธัญณัฐ" && b.name === "ธัญณัฐ") return -1;
  //         return 0;
  //       });
  //     } else {
  //       // Sort by hr
  //       groupedData[key].sort((a, b) => a.hr - b.hr);

  //       // Shuffle items with same hr, excluding "ธัญณัฐ"
  //       let i = 0;
  //       while (i < groupedData[key].length) {
  //         let j = i;
  //         while (j < groupedData[key].length && groupedData[key][j].hr === groupedData[key][i].hr) {
  //           j++;
  //         }
  //         const subGroup = groupedData[key].slice(i, j).filter((item) => item.name !== "ธัญณัฐ");
  //         shuffle(subGroup);
  //         for (let k = i; k < j; k++) {
  //           if (groupedData[key][k].name !== "ธัญณัฐ") {
  //             groupedData[key][k] = subGroup.shift();
  //           }
  //         }
  //         i = j;
  //       }

  //       // Place "ธัญณัฐ" items last in their respective groups
  //       groupedData[key].sort((a, b) => {
  //         if (a.name === "ธัญณัฐ" && b.name !== "ธัญณัฐ") return 1;
  //         if (a.name !== "ธัญณัฐ" && b.name === "ธัญณัฐ") return -1;
  //         return 0;
  //       });
  //     }
  //   } else {
  //     if (key.includes("er")) {
  //       // Sort by hr, then by er3
  //       groupedData[key].sort((a, b) => {
  //         if (a.hr !== b.hr) return a.hr - b.hr;
  //         if (a.er3 !== b.er3) return a.er3 - b.er3;
  //         return 0;
  //       });

  //       // Shuffle items with same hr and er3
  //       let i = 0;
  //       while (i < groupedData[key].length) {
  //         let j = i;
  //         while (
  //           j < groupedData[key].length &&
  //           groupedData[key][j].hr === groupedData[key][i].hr &&
  //           groupedData[key][j].er3 === groupedData[key][i].er3
  //         ) {
  //           j++;
  //         }
  //         const subGroup = groupedData[key].slice(i, j);
  //         shuffle(subGroup);
  //         for (let k = i; k < j; k++) {
  //           groupedData[key][k] = subGroup[k - i];
  //         }
  //         i = j;
  //       }
  //     } else {
  //       // Sort by hr
  //       groupedData[key].sort((a, b) => a.hr - b.hr);

  //       // Shuffle items with same hr
  //       let i = 0;
  //       while (i < groupedData[key].length) {
  //         let j = i;
  //         while (j < groupedData[key].length && groupedData[key][j].hr === groupedData[key][i].hr) {
  //           j++;
  //         }
  //         const subGroup = groupedData[key].slice(i, j);
  //         shuffle(subGroup);
  //         for (let k = i; k < j; k++) {
  //           groupedData[key][k] = subGroup[k - i];
  //         }
  //         i = j;
  //       }
  //     }
  //   }
  // }

  // // Sort blocks numerically and flatten the array
  // const sortedData = Object.keys(groupedData)
  //   .map(Number)
  //   .sort((a, b) => a - b)
  //   .reduce((acc, key) => acc.concat(groupedData[key]), []);

  console.log(peeparray);
  console.log(groupedData);

  // if (block.includes("er3")) {

  // } else {

  // }

  // // Update block and hr for the chosen item
  // const choosen = sortedData[0];
  // for (let i = 0; i < peepStat.length; i++) {
  //   if (choosen.name === peepStat[i].name) {
  //     peepStat[i].block += 1;
  //     peepStat[i].hr += hr;
  //     if (block.includes("er3")) peepStat[i].er3 += 1;
  //     break;
  //   }
  // }

  // // Return the name of the chosen item
  // return choosen.name;
}

// input date block, return available peep name | block : med, sx, ped, ob, ortho, er1, er2, er3
function availablePeep(date, block) {
  // check if date is weekend
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const { month: nextMonth, year: nextYear } = getNextMonth(currentMonth, currentYear);
  const { month: next2Month } = getNextMonth(currentMonth, currentYear, 2);

  function isweekend(date) {
    const dateToCheck = new Date(nextYear, nextMonth, date);
    const dayOfWeek = dateToCheck.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6 || specialWeekend[nextMonth].includes(date);
  }

  // check available peep in block
  function removeBy(condition) {
    let indicesToRemove = [];
    rotatePeep.forEach((el, index) => {
      if (condition(el)) {
        indicesToRemove.push(index);
      }
    });
    indicesToRemove.reverse().forEach((index) => {
      rotatePeep.splice(index, 1);
    });
  }

  const rotatePeep = [];
  data_rotate.forEach((el) => {
    if (block.includes("er")) {
      if (el.rotate[(nextMonth + 19) % 12].trim() != "") rotatePeep.push(el.name);
    } else {
      if (el.rotate[(nextMonth + 19) % 12] == block.replace(/[0-9]/g, "")) {
        rotatePeep.push(el.name);
      }
      if (el.rotate[(nextMonth + 19) % 12] == "pcu") {
        if (PCUblock == block.replace(/[0-9]/g, "")) rotatePeep.push(el.name);
      }
      if (block == "ortho" && el.rotate[(nextMonth + 19) % 12].includes("er")) rotatePeep.push(el.name);

      // if (block.replace(/[0-9]/g, "") == "med") {
      //   if (PEDblock == "med" && el.rotate[(nextMonth + 19) % 12].includes("med")) rotatePeep.push(el.name);
      //   if (OBblock == "med" && el.rotate[(nextMonth + 19) % 12].includes("med")) rotatePeep.push(el.name);
      //   if (SXblock == "med" && el.rotate[(nextMonth + 19) % 12].includes("med")) rotatePeep.push(el.name);
      //   if (ORTHOblock == "med" && el.rotate[(nextMonth + 19) % 12].includes("med")) rotatePeep.push(el.name);
      //   if (ERblock == "med" && el.rotate[(nextMonth + 19) % 12].includes("med")) rotatePeep.push(el.name);
      //   if (PCUblock == "med" && el.rotate[(nextMonth + 19) % 12].includes("med")) rotatePeep.push(el.name);
      // }
      // if (block.replace(/[0-9]/g, "") == "ped") {
      //   if (MEDblock == "ped" && el.rotate[(nextMonth + 19) % 12].includes("ped")) rotatePeep.push(el.name);
      //   if (OBblock == "ped" && el.rotate[(nextMonth + 19) % 12].includes("ped")) rotatePeep.push(el.name);
      //   if (SXblock == "ped" && el.rotate[(nextMonth + 19) % 12].includes("ped")) rotatePeep.push(el.name);
      //   if (ORTHOblock == "ped" && el.rotate[(nextMonth + 19) % 12].includes("ped")) rotatePeep.push(el.name);
      //   if (ERblock == "ped" && el.rotate[(nextMonth + 19) % 12].includes("ped")) rotatePeep.push(el.name);
      //   if (PCUblock == "ped" && el.rotate[(nextMonth + 19) % 12].includes("ped")) rotatePeep.push(el.name);
      // }
    }
  });

  // remove peep that dayoff
  removeBy((el) => {
    for (let i = 0; i < data_off.length; i++) {
      if (data_off[i].name == el && data_off[i].dayoff.includes(date)) return true;
    }
    return false;
  });

  // remove peep that need ward round
  if (isweekend && block.includes("er1")) {
    removeBy((el) => {
      for (let i = 0; i < data_off.length; i++) {
        if (data_off[i].name == el && data_off[i].ward.includes(date)) return true;
      }
      return false;
    });
  }

  // remove peep in prev block and next block (if is not blank)
  if (date > new Date(nextYear, next2Month, 0).getDate()) return;

  // main algorithm PASS:
  const removeData = (checkDate, types) => {
    if (!Array.isArray(types)) types = [types];
    types.forEach((type) => {
      const data = data_table[checkDate][type];
      if (data !== undefined) removeBy((el) => el == data);
    });
  };

  if (date == new Date(nextYear, next2Month, 0).getDate()) {
    if (block.includes("er")) {
      removeData(date, ["med", "ped", "ob", "sx", "ortho"]);
      switch (parseInt(block.match(/(\d+)/))) {
        case 1:
          removeData(date - 1, ["med", "ped", "ob", "sx", "ortho", "er3_1"]);
          break;
        case 2:
          // if (isweekend) {
          //   removeBy((el) => {
          //     for (let i = 0; i < data_off.length; i++) {
          //       if (
          //         data_off[i].name == el &&
          //         data_off[i].ward.includes(date) &&
          //         ["med", "ped"].includes(data_rotate[i].rotate[(nextMonth + 19) % 12])
          //       )
          //         return true;
          //     }
          //     return false;
          //   });
          // }
          removeData(date, ["er1_1", "er1_2"]);
          break;
        case 3:
          removeData(date, ["er2_1", "er2_2", "er2_3"]);
          break;
      }
    } else {
      removeData(date - 2, block);
      removeData(date - 1, block);
      removeData(date - 1, ["er3_1"]);
    }
  } else {
    if (block.includes("er")) {
      removeData(date, ["med", "ped", "ob", "sx", "ortho"]);
      switch (parseInt(block.match(/(\d+)/))) {
        case 1:
          removeData(date - 1, ["med", "ped", "ob", "sx", "ortho", "er3_1"]);
          removeData(date, ["er2_1", "er2_2", "er2_3"]);
          break;
        case 2:
          removeData(date, ["er1_1", "er1_2"]);
          removeData(date, ["er3_1"]);
          // if (isweekend) {
          //   removeBy((el) => {
          //     for (let i = 0; i < data_off.length; i++) {
          //       if (
          //         data_off[i].name == el &&
          //         data_off[i].ward.includes(date) &&
          //         ["med", "ped"].includes(data_rotate[i].rotate[(nextMonth + 19) % 12])
          //       )
          //         return true;
          //     }
          //     return false;
          //   });
          // }
          break;
        case 3:
          removeData(date, ["er2_1", "er2_2", "er2_3"]);
          // removeData(date - 1, ["er3_1"]);
          removeData(date + 1, ["med", "ped", "ob", "sx", "ortho", "er1_1", "er1_2"]);
          break;
      }
    } else {
      if (date > 1) removeData(date - 2, block);
      removeData(date - 1, block);
      removeData(date + 1, block);
      if (date < new Date(nextYear, next2Month, 0).getDate() - 1) removeData(date + 2, block);
      removeData(date - 1, ["er3_1"]);
      // removeData(date + 1, ["er3_1"]);
    }
  }

  // console.log(rotatePeep);
  return rotatePeep;
}

function doSchedule() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const { month: nextMonth, year: nextYear } = getNextMonth(currentMonth, currentYear);
  const { month: next2Month } = getNextMonth(currentMonth, currentYear, 2);

  function isweekend(date) {
    const dateToCheck = new Date(nextYear, nextMonth, date);
    const dayOfWeek = dateToCheck.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6 || specialWeekend[nextMonth].includes(date);
  }

  // do ward
  for (let date = 1; date <= new Date(nextYear, next2Month, 0).getDate(); date++) {
    ["med", "ped", "ob", "sx", "ortho"].forEach((ward) => {
      if (data_table[date][ward] != undefined && data_table[date][ward] == "") {
        const getHr = ward.includes("er") ? 1 : isweekend(date) ? 3 : 2;
        const thatPeep = randomPeep(availablePeep(date, ward), getHr, false, ward);
        data_table[date][ward] = thatPeep;
        // console.log(date, thatPeep, ward);
      }
    });
  }

  // do er
  for (let date = 1; date <= new Date(nextYear, next2Month, 0).getDate(); date++) {
    ["er3_1", "er1_1", "er1_2", "er2_1", "er2_2", "er2_3"].forEach((ward) => {
      if (data_table[date][ward] != undefined && data_table[date][ward] == "") {
        const getHr = ward.includes("er") ? 1 : isweekend(date) ? 3 : 2;
        const thatPeep = randomPeep(availablePeep(date, ward), getHr, true, ward);
        data_table[date][ward] = thatPeep;
        // console.log(date, thatPeep, ward);
      }
    });
  }

  // console.log(data_table);
  // console.log(peepStat);
}

function generateTable() {
  // check if date is weekend
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const { month: nextMonth, year: nextYear } = getNextMonth(currentMonth, currentYear);

  function isweekend(date) {
    const dateToCheck = new Date(nextYear, nextMonth, date);
    const dayOfWeek = dateToCheck.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6 || specialWeekend[nextMonth].includes(date);
  }

  const columns = [
    "med",
    "ped",
    "ob",
    "sx",
    "ortho",
    "er1_1",
    "er1_2",
    "er2_1",
    "er2_2",
    "er2_3",
    "er3_1",
    "er3_2",
  ];

  // Create table element
  const table = document.createElement("table");

  // Create header row
  const headerRow = table.insertRow();
  const dateHeaderCell = document.createElement("th");
  dateHeaderCell.innerText = "Date";
  headerRow.appendChild(dateHeaderCell);

  [
    "Med",
    "Ped",
    "Ob",
    "Sx",
    "Ortho",
    "ER เช้า",
    "ER เช้า",
    "ER บ่าย",
    "ER บ่าย",
    "ER บ่าย",
    "ER ดึก",
    "ER ดึก",
  ].forEach((col) => {
    const headerCell = document.createElement("th");
    headerCell.innerText = col;
    headerRow.appendChild(headerCell);
  });

  // Create data rows
  for (let date = 1; date < data_table.length; date++) {
    const row = table.insertRow();
    const dateCell = row.insertCell();
    dateCell.innerText = date;
    if (isweekend(date)) dateCell.className = "weekend";

    columns.forEach((col) => {
      const cell = row.insertCell();
      var text = data_table[date][col] || "";
      cell.innerText = text.replace("ค่าย 1", specialName_1).replace("ค่าย 2", specialName_2);
      if (data_table[date][col] == userName) cell.className = "highlight";
      else {
        if (isweekend(date)) cell.className = "weekend";
      }
    });
  }
  document.querySelector("#page_schedule").appendChild(table);

  // Remove columns that have only headers but no data
  const headerCells = headerRow.cells;
  for (let colIndex = headerCells.length - 1; colIndex >= 0; colIndex--) {
    let hasData = false;
    for (let rowIndex = 1; rowIndex < table.rows.length; rowIndex++) {
      const cell = table.rows[rowIndex].cells[colIndex];
      if (cell && cell.innerText.trim() !== "") {
        hasData = true;
        break;
      }
    }
    if (!hasData) {
      headerCells[colIndex].style.display = "none";
      for (let rowIndex = 0; rowIndex < table.rows.length; rowIndex++) {
        const cell = table.rows[rowIndex].cells[colIndex];
        if (cell) cell.style.display = "none";
      }
    }
  }

  // DEBUG:
  recheck();
}

function initSchedule() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const { month: nextMonth } = getNextMonth(currentMonth, currentYear);
  var rotateTxt;
  var monthTxt = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][
    nextMonth
  ];
  for (let i = 0; i < data_rotate.length; i++) {
    if (data_rotate[i].name == userName) {
      rotateTxt = findRotate(userName, nextMonth).toUpperCase();
      break;
    }
  }

  function replaceUserName(userName) {
    switch (userName) {
      case "ค่าย 1":
        if (specialName_1.trim() == "") return "ค่าย 1";
        else return specialName_1;
      case "ค่าย 2":
        if (specialName_2.trim() == "") return "ค่าย 2";
        else return specialName_2;
      default:
        return userName;
    }
  }

  document.querySelector("#nav_username").textContent = `${replaceUserName(
    userName
  )} - ${rotateTxt} | ${monthTxt}`;

  if (userName != "ธัญณัฐ") {
    document.querySelector("#nav_btn_next").style.display = "none";
    document.querySelector("#nav_btn_stat").style.display = "none";
    document.querySelector("#nav_btn_re").style.display = "none";
    document.querySelector("#nav_btn_upload").style.display = "none";
    document.querySelector("#nav_btn_clear").style.display = "none";
  }
}

// Main function
const nav_btn_round = document.querySelector("#nav_btn_round");
const nav_btn_off = document.querySelector("#nav_btn_off");
const nav_btn_next = document.querySelector("#nav_btn_next");
const nav_btn_stat = document.querySelector("#nav_btn_stat");
const nav_btn_re = document.querySelector("#nav_btn_re");
const nav_btn_upload = document.querySelector("#nav_btn_upload");
const nav_btn_clear = document.querySelector("#nav_btn_clear");
const nav_btn_save = document.querySelector("#nav_btn_save");
const nav_btn_back = document.querySelector("#nav_btn_back");
const page_input = document.querySelector("#page_input");
const page_input_round = document.querySelector("#page_input_round");
const page_input_off = document.querySelector("#page_input_off");
const page_schedule = document.querySelector("#page_schedule");
const page_calendar = document.querySelector("#page_calendar");

const btn_next_weekoff = document.querySelector("#btn_next_weekoff");
const btn_next_ward = document.querySelector("#btn_next_ward");

var mode;
initial();

function initial() {
  // get data from API TODO: get=> mode, ค่าย 1, 2 name, ep block, PCU group
  // if mode 2 -> get table

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const { month: nextMonth, year: nextYear } = getNextMonth(currentMonth, currentYear);

  const specialRotate_1 = data_rotate[data_rotate.length - 2].rotate[(nextMonth + 19) % 12];
  const specialRotate_2 = data_rotate[data_rotate.length - 1].rotate[(nextMonth + 19) % 12];

  const dropName = [];
  data_rotate.forEach((el) => {
    if (el.rotate[(nextMonth + 19) % 12] != "" && el.rotate[(nextMonth + 19) % 12] != "out") {
      if (el.name != "ค่าย 1" && el.name != "ค่าย 2") dropName.push({ name: el.name, value: el.name });
    }
  });

  loadPage.style.display = "flex";
  fetch(API_url, {
    redirect: "follow",
    method: "POST",
    body: JSON.stringify({
      command: "initial",
    }),
    headers: {
      "Content-type": "text/plain;charset=utf-8",
    },
  })
    .then((response) => response.text())
    .then((json) => {
      const output = JSON.parse(json);
      loadPage.style.display = "none";

      if (output.status == "ok") {
        mode = output.response.mode;
        if (mode == 1) {
          const now = new Date();
          const start = new Date(output.response.time[0]);
          const end = new Date(output.response.time[1]);
          if (now < start || now > end) {
            alert("Not Available", "The input time has expired.", "alert");
            return;
          }
        }

        page_input.style.display = "flex";
        if (mode != 0) {
          specialName_1 = output.response.specialnames[0];
          specialName_2 = output.response.specialnames[1];
        }
        if (specialRotate_1 != "" && specialRotate_1 != "out")
          dropName.push({ name: specialName_1, value: "ค่าย 1" });
        if (specialRotate_2 != "" && specialRotate_2 != "out")
          dropName.push({ name: specialName_2, value: "ค่าย 2" });

        if (mode == 1) {
          data_off.forEach((el) => {
            el.dayoff =
              output.response.value[NameToNum(el.name)][0] == ""
                ? []
                : JSON.parse(output.response.value[NameToNum(el.name)][0]);
            el.ward =
              output.response.value[NameToNum(el.name)][2] == ""
                ? []
                : JSON.parse(output.response.value[NameToNum(el.name)][2]);
          });
        } else if (mode == 2) {
          data_off.forEach((el) => {
            el.dayoff =
              output.response.off[NameToNum(el.name)][0] == ""
                ? []
                : JSON.parse(output.response.off[NameToNum(el.name)][0]);
            el.ward =
              output.response.off[NameToNum(el.name)][2] == ""
                ? []
                : JSON.parse(output.response.off[NameToNum(el.name)][2]);
          });
        }

        dropName.forEach((el) => {
          const newOption = document.createElement("option");
          newOption.text = el.name;
          newOption.value = el.value;
          input_name.add(newOption);
        });

        if (mode != 0) {
          EPblock = JSON.parse(output.response.ep);
          // MEDblock = output.response.med;
          // PEDblock = output.response.ped;
          // OBblock = output.response.ob;
          // SXblock = output.response.sx;
          // ORTHOblock = output.response.ortho;
          // ERblock = output.response.er;
          PCUblock = output.response.pcu;
        }

        // get table data
        if (mode == 2) {
          output.response.value.forEach((el, i) => {
            el.forEach((name, block) => {
              const blockLists = [
                "med",
                "ped",
                "ob",
                "sx",
                "ortho",
                "er1_1",
                "er1_2",
                "er2_1",
                "er2_2",
                "er2_3",
                "er3_1",
              ];
              if (name.trim() != "") getData_table[i][blockLists[block]] = name;
            });
          });
        }
      } else {
        alert("Error", "Fetching data error", "alert");
      }
    })
    .catch((error) => {
      loadPage.style.display = "none";
      console.log(error);
      alert("Error", "Unable to establish a connection to the server", "alert");
    });

  function createCalendar(month, year, dom, color = "blue") {
    const daysInWeek = 7;
    const weeks = [];

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDay = firstDay.getDay();
    let week = new Array(daysInWeek).fill(null);
    let dayCount = 1;
    for (let i = startDay; i < daysInWeek; i++) week[i] = dayCount++;
    weeks.push(week);

    // Fill the remaining weeks
    while (dayCount <= daysInMonth) {
      week = new Array(daysInWeek).fill(null);
      for (let i = 0; i < daysInWeek && dayCount <= daysInMonth; i++) {
        week[i] = dayCount++;
      }
      weeks.push(week);
    }

    const table = document.createElement("table");
    table.className = "calendar";
    const calendarTable = document.createElement("tbody");
    const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

    // Clear the existing calendar
    dom.innerHTML = "";

    // Create header row for the days of the week
    let headerRow = document.createElement("tr");
    for (let day of daysOfWeek) {
      let th = document.createElement("th");
      th.innerText = day;
      headerRow.appendChild(th);
    }
    calendarTable.appendChild(headerRow);

    // Create rows for the weeks
    for (let week of weeks) {
      let row = document.createElement("tr");
      for (let day of week) {
        let cell = document.createElement("td");
        if (day === null) {
          cell.classList.add("empty");
        } else {
          cell.innerText = day;
          if (day % 7 == 0 || day % 7 == 6) {
            cell.classList.add("weekend");
          }
          if (specialWeekend[month].includes(day)) {
            cell.classList.add("weekend");
          }
        }
        row.appendChild(cell);
      }
      calendarTable.appendChild(row);
    }
    table.appendChild(calendarTable);
    dom.appendChild(table);

    [...dom.querySelectorAll("td")]
      .filter((el) => el.textContent.trim() != "")
      .forEach((el) => {
        el.addEventListener("click", () => {
          switch (color) {
            case "blue":
              el.classList.toggle("bg_blue");
              break;
            case "orange":
              el.classList.toggle("bg_orange");
              break;
          }
        });
      });
  }

  var userRotate;
  function updatePeepOffTxt(newData) {
    var peepOffTxt = "";
    data_off.forEach((el) => {
      if (
        findRotate(el.name, nextMonth) == userRotate ||
        (userRotate == "pcu" && findRotate(el.name, nextMonth) == PCUblock)
      ) {
        if (newData != undefined)
          el.dayoff = newData[NameToNum(el.name)][0] == "" ? [] : JSON.parse(newData[NameToNum(el.name)][0]);
        peepOffTxt += `${el.name} : ${el.dayoff.join(", ")}<br>`;
      }
    });
    document.querySelector("#page_lists_off").innerHTML = peepOffTxt;
  }

  const input_name = document.querySelector("#input_name");

  const btn_name_done = document.querySelector("#btn_name_done");
  input_name.addEventListener("change", () => {
    const password_row = document.querySelector("#password_row");
    if (input_name.value == "ธัญณัฐ") {
      password_row.style.opacity = 1;
      btn_name_done.style.transform = "translateY(0%)";
    } else {
      password_row.style.opacity = 0;
      btn_name_done.style.transform = "translateY(-100%)";
    }
  });

  btn_name_done.addEventListener("click", () => {
    const page_input_name = document.querySelector("#page_input_name");
    const nav_bar = document.querySelector("#nav_bar");
    if (input_name.value == "ธัญณัฐ" && document.querySelector("#input_password").value != "0225") return;
    nav_btn_back.style.display = "none";

    userName = input_name.value;
    page_input_name.style.display = "none";

    for (let i = 0; i < data_rotate.length; i++) {
      if (data_rotate[i].name == userName) {
        userRotate = findRotate(userName, nextMonth);
        break;
      }
    }

    // roatation out -> not use
    if (userRotate == "out") {
      alert("วนนอกไม่เกี่ยว");
      return;
    }

    nav_bar.style.display = "flex";
    initSchedule();
    if (mode == 1) {
      // do off, round
      createCalendar(nextMonth, nextYear, document.querySelector("#page_calendar_round"), "orange");
      // if (userRotate != "ped" && userRotate != "er" && PCUblock != "ped")
      createCalendar(nextMonth, nextYear, document.querySelector("#page_calendar_off"));

      // get off, round data
      Array.from(document.querySelectorAll("#page_calendar_off td")).forEach((el) => {
        if ([...data_off[NameToNum(userName)].dayoff].includes(Number(el.textContent.trim())))
          el.classList.add("bg_blue");
      });
      Array.from(document.querySelectorAll("#page_calendar_round td")).forEach((el) => {
        if ([...data_off[NameToNum(userName)].ward].includes(Number(el.textContent.trim())))
          el.classList.add("bg_orange");
      });

      updatePeepOffTxt();
      page_input_round.style.display = "flex";

      if (input_name.value == "ธัญณัฐ") {
        nav_btn_re.style.display = "none";
        nav_btn_upload.style.display = "none";
        nav_btn_clear.style.display = "none";
      }

      nav_btn_round.addEventListener("click", () => {
        nav_btn_round.className = "btn bg_midgrey";
        nav_btn_off.className = "btn bg_midgrey select";
        page_input_round.style.display = "flex";
        page_input_off.style.display = "none";
      });
      nav_btn_off.addEventListener("click", () => {
        nav_btn_round.className = "btn bg_midgrey select";
        nav_btn_off.className = "btn bg_midgrey";
        page_input_round.style.display = "none";
        page_input_off.style.display = "flex";
      });

      btn_next_weekoff.addEventListener("click", () => {
        nav_btn_round.className = "btn bg_midgrey select";
        nav_btn_off.className = "btn bg_midgrey";
        page_input_round.style.display = "none";
        page_input_off.style.display = "flex";
      });
    } else if (mode == 2) {
      page_input.style.display = "none";
      nav_btn_round.style.display = "none";
      nav_btn_off.style.display = "none";
      page_schedule.style.display = "block";

      if (userName != "ธัญณัฐ") {
        getData();
        generateTable();
        return;
      }
      getData();
      doSchedule();
      generateTable();
    }
  });

  btn_next_ward.addEventListener("click", () => {
    nav_btn_save.click();
  });
  nav_btn_save.addEventListener("click", () => {
    if (mode == 1) {
      const roundObj = Array.from(document.querySelectorAll("#page_calendar_round .bg_orange"))
        .map((element) => Number(element.textContent.trim()))
        .map(Number)
        .sort((a, b) => a - b);
      const offObj = Array.from(document.querySelectorAll("#page_calendar_off .bg_blue"))
        .map((element) => Number(element.textContent.trim()))
        .map(Number)
        .sort((a, b) => a - b);

      // count week
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();
      const { month: nextMonth, year: nextYear } = getNextMonth(currentMonth, currentYear);

      function daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
      }
      let weeks = new Set();
      for (let day = 1; day <= daysInMonth(nextMonth, nextYear); day++) {
        let date = new Date(nextYear, nextMonth, day);
        let dayOfWeek = date.getDay();

        if (dayOfWeek === 0 || dayOfWeek === 6) {
          let weekNumber = Math.ceil(day / 7);
          weeks.add(weekNumber);
        }
      }

      // count peep
      const sameRotate = [];
      const sameRotateIndex = [];
      data_rotate.forEach((el, i) => {
        if (el.rotate[(nextMonth + 19) % 12] == userRotate) sameRotateIndex.push(i);
      });
      // console.log(data_rotate[NameToNum(userName)].rotate[(nextMonth + 19) % 12]);
      const sameOff = Math.max(0, sameRotateIndex.length - weeks.size);

      // fetch data off from server again
      loadPage.style.display = "flex";
      fetch(API_url, {
        redirect: "follow",
        method: "POST",
        body: JSON.stringify({
          command: "initial",
          user: NameToNum(userName),
        }),
        headers: {
          "Content-type": "text/plain;charset=utf-8",
        },
      })
        .then((response) => response.text())
        .then((json) => {
          const output = JSON.parse(json);
          loadPage.style.display = "none";
          if (output.status == "ok") {
            // update off data
            data_off.forEach((el, i) => {
              if (NameToNum(userName) != i && sameRotateIndex.includes(i)) {
                el.dayoff = JSON.parse(output.response.value[i][0]);
              }
              if (sameRotateIndex.includes(i)) sameRotate.push(data_off[i]);
            });

            // check if off data same
            function isweekend(date) {
              const dateToCheck = new Date(nextYear, nextMonth, date);
              const dayOfWeek = dateToCheck.getDay();
              return dayOfWeek === 0 || dayOfWeek === 6 || specialWeekend[nextMonth].includes(date);
            }
            var countSameOff = 0;
            function removeConsecutiveNumbers(arr) {
              if (arr.length === 0) return [];

              let result = [];
              result.push(arr[0]); // Add the first number to the result

              for (let i = 1; i < arr.length; i++) {
                // Check if the current number is not consecutive to the last added number in the result
                if (arr[i] !== arr[i - 1] + 1) {
                  result.push(arr[i]);
                }
              }

              return result;
            }
            const cleanoffObj = removeConsecutiveNumbers(offObj.filter((el) => isweekend(el)));
            const choosenDate = [];
            cleanoffObj.forEach((day) => {
              if (!isweekend(day)) return;
              sameRotate.forEach((el, i) => {
                if (NameToNum(userName) == i) return;
                if (el.dayoff.includes(day)) {
                  countSameOff++;
                  choosenDate.push(day);
                }
              });
            });
            if (countSameOff > sameOff) {
              // console.log(choosenDate);
              loadPage.style.display = "flex";

              fetch(API_url, {
                redirect: "follow",
                method: "POST",
                body: JSON.stringify({
                  command: "setDayData",
                  user: NameToNum(userName),
                  off: JSON.stringify([]),
                  round: JSON.stringify(roundObj),
                }),
                headers: {
                  "Content-type": "text/plain;charset=utf-8",
                },
              })
                .then((response) => response.text())
                .then((json) => {
                  const output = JSON.parse(json);
                  if (output.status == "ok") {
                    loadPage.style.display = "none";
                    alert(
                      "Already choosen",
                      `Week <span class="bg_orange">&nbsp;${choosenDate.join(
                        ", "
                      )}&nbsp;</span> have already been chosen.`,
                      "alert"
                    );
                    updatePeepOffTxt(output.response.value);

                    // update off data TODO:
                  } else {
                    loadPage.style.display = "none";
                    alert("Error", "", "alert");
                  }
                })
                .catch((error) => {
                  alert("Error", error, "alert");
                  loadPage.style.display = "none";
                  console.error("Fetch error: ", error);
                });
            } else {
              // pass -> save
              loadPage.style.display = "flex";

              fetch(API_url, {
                redirect: "follow",
                method: "POST",
                body: JSON.stringify({
                  command: "setDayData",
                  user: NameToNum(userName),
                  off: JSON.stringify(offObj),
                  round: JSON.stringify(roundObj),
                }),
                headers: {
                  "Content-type": "text/plain;charset=utf-8",
                },
              })
                .then((response) => response.text())
                .then((json) => {
                  const output = JSON.parse(json);
                  if (output.status == "ok") {
                    alert("Saved", "Please wait until everyone has inserted their data.", "done");
                    loadPage.style.display = "none";
                    updatePeepOffTxt(output.response.value);

                    // update off data TODO:
                  } else {
                    loadPage.style.display = "none";
                    alert("Error", "", "alert");
                  }
                })
                .catch((error) => {
                  alert("Error", error, "alert");
                  loadPage.style.display = "none";
                  console.error("Fetch error: ", error);
                });
            }
          } else {
            alert("Error", "", "alert");
          }
        })
        .catch((error) => {
          alert("Error", error, "alert");
          loadPage.style.display = "none";
          console.error("Fetch error: ", error);
        });
    } else if (mode == 2) {
      nav_btn_back.style.display = "flex";
      nav_btn_save.style.display = "none";

      exportCalendar(nextMonth, nextYear, document.querySelector("#page_calendar"));
      page_schedule.style.display = "none";
      page_calendar.style.display = "flex";
    }
  });

  nav_btn_back.addEventListener("click", () => {
    nav_btn_back.style.display = "none";
    nav_btn_save.style.display = "flex";
    page_schedule.style.display = "flex";
    page_calendar.style.display = "none";
  });

  nav_btn_upload.addEventListener("click", () => {
    if (mode != 2 || userName != "ธัญณัฐ") return;
    loadPage.style.display = "flex";

    fetch(API_url, {
      redirect: "follow",
      method: "POST",
      body: JSON.stringify({
        command: "setSchedule",
        value: data_table,
      }),
      headers: {
        "Content-type": "text/plain;charset=utf-8",
      },
    })
      .then((response) => response.text())
      .then((json) => {
        const output = JSON.parse(json);
        loadPage.style.display = "none";

        if (output.status == "ok") alert("Set schedule done", "", "done");
        else alert("Error", "Fetching data error", "alert");
      })
      .catch((error) => {
        loadPage.style.display = "none";
        console.log(error);
        alert("Error", error, "alert");
      });
  });
}

nav_btn_re.addEventListener("click", () => {
  // clear old data
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const { month: nextMonth } = getNextMonth(currentMonth, currentYear);
  const { month: next2Month, year: nextYear } = getNextMonth(currentMonth, currentYear, 2);
  const preserveData = data_table[0];
  data_table = JSON.parse(JSON.stringify(getData_table));
  for (let date = 0; date <= new Date(nextYear, next2Month, 0).getDate(); date++) {
    if (date == 0) data_table[0] = preserveData;
    else data_table[date] = {};
  }
  document.querySelector("#page_schedule").innerHTML = "";
  peepStat = [
    {
      name: "อมรเศรษฐ์",
      block: 0,
      hr: 0,
      er3: 0,
    },
    {
      name: "ธัญณัฐ",
      block: 0,
      hr: 0,
      er3: 0,
    },
    {
      name: "โศภิชตรา",
      block: 0,
      hr: 0,
      er3: 0,
    },
    {
      name: "นัทชา",
      block: 0,
      hr: 0,
      er3: 0,
    },
    {
      name: "แทนไท",
      block: 0,
      hr: 0,
      er3: 0,
    },
    {
      name: "กสินพัฒน์",
      block: 0,
      hr: 0,
      er3: 0,
    },
    {
      name: "รวิษฏ์",
      block: 0,
      hr: 0,
      er3: 0,
    },
    {
      name: "พงศ์ภัค",
      block: 0,
      hr: 0,
      er3: 0,
    },
    {
      name: "ปริณดา",
      block: 0,
      hr: 0,
      er3: 0,
    },
    {
      name: "บุณยานุช",
      block: 0,
      hr: 0,
      er3: 0,
    },
    {
      name: "กณิศา",
      block: 0,
      hr: 0,
      er3: 0,
    },
    {
      name: "กัลยา",
      block: 0,
      hr: 0,
      er3: 0,
    },
    {
      name: "คัทสุฮีโร่",
      block: 0,
      hr: 0,
      er3: 0,
    },
    {
      name: "เคนจิ",
      block: 0,
      hr: 0,
      er3: 0,
    },
    {
      name: "ณพข์ฉัตรฬ์",
      block: 0,
      hr: 0,
      er3: 0,
    },
    {
      name: "ภัทรปวัน",
      block: 0,
      hr: 0,
      er3: 0,
    },
    {
      name: "วรปรัชญ์",
      block: 0,
      hr: 0,
      er3: 0,
    },
    {
      name: "กัปตัน",
      block: 0,
      hr: 0,
      er3: 0,
    },
    {
      name: "พรหมพลิน",
      block: 0,
      hr: 0,
      er3: 0,
    },
    {
      name: "ชาญวิทย์",
      block: 0,
      hr: 0,
      er3: 0,
    },
    {
      name: "ศีรญา",
      block: 0,
      hr: 0,
      er3: 0,
    },
    {
      name: "นัธทสิทธิ",
      block: 0,
      hr: 0,
      er3: 0,
    },
    {
      name: "นนทนันท์",
      block: 0,
      hr: 0,
      er3: 0,
    },
    {
      name: "ภูมิศิริ",
      block: 0,
      hr: 0,
      er3: 0,
    },
    {
      name: "ค่าย 1",
      block: 0,
      hr: 0,
      er3: 0,
    },
    {
      name: "ค่าย 2",
      block: 0,
      hr: 0,
      er3: 0,
    },
  ];

  // random new data
  getData();
  doSchedule();
  generateTable();

  // update stat modal
  recheck();
  exportCalendar(nextMonth, nextYear, document.querySelector("#page_calendar"));
});

nav_btn_stat.addEventListener("click", () => {
  const statModal = document.querySelector("#modal_stat");
  // statModal.style.top = `${document.body.offsetHeight / 2 - 200}px`;
  // statModal.style.left = `${document.body.offsetWidth / 2 - 200}px`;
  statModal.style.display = "block";

  if (mode == 1) {
    const tableText = document.querySelector("#page_schedule").innerHTML;
    var statData = [["Name", "Ward", "Off", "Round"]];

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const { month: nextMonth } = getNextMonth(currentMonth, currentYear);

    data_rotate.forEach((el, i) => {
      const name = el.name.replace("ค่าย 1", specialName_1).replace("ค่าย 2", specialName_2);
      statData.push([
        name,
        data_rotate[i].rotate[(nextMonth + 19) % 12],
        data_off[i].dayoff.join(", "),
        data_off[i].ward.join(", "),
      ]);
    });
    statData = statData.filter((row) => row[1] !== "");
    statData = statData.sort((a, b) => {
      let textA = a[1];
      let textB = b[1];

      if (textA < textB) {
        return -1;
      }
      if (textA > textB) {
        return 1;
      }
      return 0;
    });
    // console.log(statData);

    function formatRanges(input) {
      if (input.trim() == "") return "";

      // Split the input string by commas and convert each part to a number
      let numbers = input.split(",").map((num) => parseInt(num.trim(), 10));

      // Sort the numbers in ascending order
      numbers.sort((a, b) => a - b);

      // Initialize variables to track the start and end of ranges
      let start = numbers[0];
      let end = numbers[0];

      // Initialize an array to store the formatted ranges
      let ranges = [];

      // Iterate through the sorted numbers
      for (let i = 1; i < numbers.length; i++) {
        if (numbers[i] === end + 1) {
          // Continue the current range
          end = numbers[i];
        } else {
          // Push the current range to the result array
          if (start === end) {
            ranges.push(start.toString());
          } else {
            ranges.push(`${start}-${end}`);
          }

          // Reset start and end for the new range
          start = numbers[i];
          end = numbers[i];
        }
      }

      // Push the last range to the result array
      if (start === end) {
        ranges.push(start.toString());
      } else {
        ranges.push(`${start}-${end}`);
      }

      // Join the ranges array with commas and return as a string
      return ranges.join(", ");
    }
    const table = document.createElement("table");
    for (let i = 0; i < statData.length; i++) {
      const row = table.insertRow();
      for (let j = 0; j < statData[i].length; j++) {
        const cell = row.insertCell();
        cell.textContent =
          i == 0 ? statData[i][j] : j == 2 || j == 3 ? formatRanges(statData[i][j]) : statData[i][j];
      }
    }
    document.querySelector("#modal_stat .body").innerHTML = "";
    document.querySelector("#modal_stat .body").appendChild(table);
  }
});

nav_btn_clear.addEventListener("click", () => {
  loadPage.style.display = "flex";
  fetch(API_url, {
    redirect: "follow",
    method: "POST",
    body: JSON.stringify({
      command: "clearAll",
      user: NameToNum(userName),
    }),
    headers: {
      "Content-type": "text/plain;charset=utf-8",
    },
  })
    .then((response) => response.text())
    .then((json) => {
      const output = JSON.parse(json);
      loadPage.style.display = "none";

      if (output.status == "ok") {
        page_input.style.display = "flex";
        alert("Clear all data", "", "done");
      } else {
        alert("Error", "Fetching data error", "alert");
      }
    })
    .catch((error) => {
      loadPage.style.display = "none";
      console.log(error);
      alert("Error", error, "alert");
    });
});

nav_btn_next.addEventListener("click", () => {
  loadPage.style.display = "flex";
  fetch(API_url, {
    redirect: "follow",
    method: "POST",
    body: JSON.stringify({
      command: "setMode",
      user: NameToNum(userName),
      value: 2,
    }),
    headers: {
      "Content-type": "text/plain;charset=utf-8",
    },
  })
    .then((response) => response.text())
    .then((json) => {
      const output = JSON.parse(json);
      loadPage.style.display = "none";

      if (output.status == "ok") {
        page_input.style.display = "flex";
        alert("Set mode done", "set to mode 2", "done");
      } else {
        alert("Error", "Fetching data error", "alert");
      }
    })
    .catch((error) => {
      loadPage.style.display = "none";
      console.log(error);
      alert("Error", error, "alert");
    });
});

// handle modal behaviour
document.querySelectorAll(".modal").forEach((el) => {
  let isDragging = false;
  let initialX, initialY, dragStartX, dragStartY;
  const padding = 8;
  const head = el.querySelector(".head");
  const close = el.querySelectorAll(".head div")[1];

  const startDrag = (e) => {
    isDragging = true;
    initialX = el.offsetLeft;
    initialY = el.offsetTop;
    dragStartX = e.type === "mousedown" ? e.clientX : e.touches[0].clientX;
    dragStartY = e.type === "mousedown" ? e.clientY : e.touches[0].clientY;
    el.style.transition = "none";
  };
  const drag = (e) => {
    if (isDragging) {
      let offsetX, offsetY;

      if (e.type === "mousemove") {
        offsetX = e.clientX - dragStartX;
        offsetY = e.clientY - dragStartY;
      } else if (e.type === "touchmove") {
        offsetX = e.touches[0].clientX - dragStartX;
        offsetY = e.touches[0].clientY - dragStartY;
      }

      // Calculate new modal position with padding constraint
      let newLeft = initialX + offsetX;
      let newTop = initialY + offsetY;

      // Ensure modal stays within the padding bounds
      newLeft = Math.max(padding, Math.min(window.innerWidth - el.offsetWidth - padding, newLeft));
      newTop = Math.max(padding, Math.min(window.innerHeight - el.offsetHeight - padding, newTop));

      el.style.left = `${newLeft}px`;
      el.style.top = `${newTop}px`;
    }
  };
  const endDrag = () => {
    if (isDragging) {
      isDragging = false;
      el.style.transition = "";
    }
  };
  head.addEventListener("mousedown", startDrag);
  head.addEventListener("touchstart", startDrag);
  document.addEventListener("mousemove", drag);
  document.addEventListener("touchmove", drag);
  document.addEventListener("mouseup", endDrag);
  document.addEventListener("touchend", endDrag);

  // close modal
  close.addEventListener("click", () => {
    el.style.display = "none";
  });

  // opaque modal
  el.addEventListener("click", (e) => {
    if (!e.target.closest(".modal-content")) el.className = "modal";
  });
  document.addEventListener("click", (e) => {
    if (
      !el.contains(e.target) &&
      ![
        "nav_bar",
        "nav_username",
        "nav_btn_stat",
        "nav_btn_re",
        "nav_btn_upload",
        "nav_btn_clear",
        "nav_btn_save",
      ].includes(e.target.id)
    )
      el.classList.add("opaque");
  });
});

function exportCalendar(month, year, dom) {
  const userCalendar = [];
  data_table.forEach((el, date) => {
    Object.keys(el).forEach((key) => {
      if (el[key] == userName) userCalendar.push({ date: date, ward: key });
    });
  });

  // create calendar
  const daysInWeek = 7;
  const weeks = [];

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startDay = firstDay.getDay();
  let week = new Array(daysInWeek).fill(null);
  let dayCount = 1;
  for (let i = startDay; i < daysInWeek; i++) week[i] = dayCount++;
  weeks.push(week);

  // Fill the remaining weeks
  while (dayCount <= daysInMonth) {
    week = new Array(daysInWeek).fill(null);
    for (let i = 0; i < daysInWeek && dayCount <= daysInMonth; i++) {
      week[i] = dayCount++;
    }
    weeks.push(week);
  }

  const table = document.createElement("table");
  table.className = "calendar";
  const calendarTable = document.createElement("tbody");
  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  // Clear the existing calendar
  dom.innerHTML = "";

  // Create header row for the days of the week
  let headerRow = document.createElement("tr");
  for (let day of daysOfWeek) {
    let th = document.createElement("th");
    th.innerText = day;
    headerRow.appendChild(th);
  }
  calendarTable.appendChild(headerRow);

  // Create rows for the weeks
  for (let week of weeks) {
    let row = document.createElement("tr");
    for (let day of week) {
      let cell = document.createElement("td");
      if (day === null) {
        cell.classList.add("empty");
      } else {
        var ward = "";
        for (let i = 0; i < userCalendar.length; i++) {
          if (day == userCalendar[i].date) {
            ward = [
              "Ward",
              "Ward",
              "Ward",
              "Ward",
              "Ward",
              "ER เช้า",
              "ER เช้า",
              "ER บ่าย",
              "ER บ่าย",
              "ER บ่าย",
              "ER ดึก",
            ][
              [
                "med",
                "ped",
                "ob",
                "sx",
                "ortho",
                "er1_1",
                "er1_2",
                "er2_1",
                "er2_2",
                "er2_3",
                "er3_1",
              ].indexOf(userCalendar[i].ward)
            ];
            break;
          }
        }
        cell.innerText = `${day}\n ${ward}`;
        if (ward != "") {
          if (ward.includes("ER")) cell.classList.add("bg_schedule1");
          else cell.classList.add("bg_schedule2");
        }
        if (day % 7 == 0 || day % 7 == 6) {
          cell.classList.add("weekend");
        }
        if (specialWeekend[month].includes(day)) {
          cell.classList.add("weekend");
        }
      }
      row.appendChild(cell);
    }
    calendarTable.appendChild(row);
  }
  table.appendChild(calendarTable);
  dom.appendChild(table);
}

function recheck() {
  // console.clear(); // DEBUG:
  const tableText = document.querySelector("#page_schedule").innerHTML;
  if (mode == 1) {
    console.log(data_off);
  } else if (mode == 2) {
    const statData = [];
    data_rotate.forEach((el) => {
      const name = el.name.replace("ค่าย 1", specialName_1).replace("ค่าย 2", specialName_2);
      const regex = new RegExp(name, "g");
      const count = (tableText.match(regex) || []).length;
      statData.push([name, count]);
      console.log(name, count);
    });
    const table = document.createElement("table");
    for (let i = 0; i < statData.length; i += 2) {
      const row = table.insertRow();
      for (let j = 0; j < 4; j++) {
        const cell = row.insertCell();
        cell.textContent = statData[i + Math.floor(j / 2)][j % 2];
      }
    }
    document.querySelector("#modal_stat .body").innerHTML = "";
    document.querySelector("#modal_stat .body").appendChild(table);
  }
}

function getNextMonth(month, year, step = 1) {
  var nextMonth = month + step;
  year += Math.floor(nextMonth / 12);
  nextMonth = nextMonth % 12;
  return { month: nextMonth, year: year };
}
function findRotate(peepName, month) {
  for (let i = 0; i < data_rotate.length; i++) {
    if (data_rotate[i].name == peepName) return data_rotate[i].rotate[(month + 19) % 12];
  }
}
function NameToNum(name) {
  for (var i = 0; i < data_rotate.length; i++) {
    if (data_rotate[i].name === name) {
      return i;
    }
  }
  return -1; // Return -1 if name is not found in the array
}
// info, alert, done
function alert(text, subtext, type) {
  const style = getComputedStyle(document.documentElement);
  const bg_green = style.getPropertyValue("--green");
  const bg_orange = style.getPropertyValue("--orange");
  const bg_black = style.getPropertyValue("--black");

  const popup = document.querySelector("#popup");
  const icon = popup.querySelector(".icon span");
  const txt = popup.querySelector(".text");
  const subtxt = popup.querySelector(".subtext");
  popup.style.display = "flex";
  popup.style.opacity = "1";

  switch (type) {
    case "info":
      icon.textContent = "info";
      icon.style.color = bg_black;
      break;
    case "alert":
      icon.textContent = "warning";
      icon.style.color = bg_orange;
      break;
    case "done":
      icon.textContent = "check_circle";
      icon.style.color = bg_green;
      break;
  }
  txt.textContent = text;
  subtxt.innerHTML = subtext;

  setTimeout(function () {
    popup.style.opacity = "0";
  }, 3000);

  setTimeout(function () {
    popup.style.display = "none";
  }, 3500);
}

// #endregion
