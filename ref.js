const pointGroups=["1","-1","2","m","2/m","222","mm2","mmm","4","-4","4/m","422","4mm","-42m","4/mmm","3","-3","32","3m","-3m","6","-6","6/m","622","6mm","-6m2","-6/mmm","23","m-3","432","-43m","m-3m"];
const ORforbidden=["-1","2/m","mmm","4/m","4/mmm","-3",,"-3m","6/m","6/mmm","m-3","432","m-3m"];
const ORallowed=["1","2","m","222","mm2","4","-4","422","4mm","-42m","3","32","3m","6","-6","622","6mm","-6m2","23","-43m"];
const ORtensors=[
    [
        [1,2,3,4,5,6],
        [7,8,9,10,11,12],
        [13,14,15,16,17,18]
    ],
    [
        [0,0,0,1,0,2],
        [3,4,5,0,6,0],
        [0,0,0,7,0,8]
    ],
    [
        [1,2,3,0,4,0],
        [0,0,0,5,0,6],
        [7,8,9,0,10,0]
    ],
    [
        [0,0,0,1,0,0],
        [0,0,0,0,2,0],
        [0,0,0,0,0,3]
    ],
    [
        [0,0,0,0,1,0],
        [0,0,0,2,0,0],
        [3,4,5,0,0,0]
    ],
    [
        [0,0,0,1,2,0],
        [0,0,0,2,-1,0],
        [3,3,4,0,0,0]
    ],
    [
        [0,0,0,1,2,0],
        [0,0,0,-2,1,0],
        [3,-3,0,0,0,4]
    ],
    [
        [0,0,0,1,0,0],
        [0,0,0,0,-1,0],
        [0,0,0,0,0,0]
    ],
    [
        [0,0,0,0,1,0],
        [0,0,0,1,0,0],
        [2,2,3,0,0,0]
    ],
    [
        [0,0,0,1,0,0],
        [0,0,0,0,1,0],
        [0,0,0,0,0,2]
    ],
    [
        [1,-1,0,2,3,4],
        [4,-4,0,3,-2,-1],
        [5,5,6,0,0,0]
    ],
    [
        [1,-1,0,2,0,0],
        [0,0,0,0,-2,-1],
        [0,0,0,0,0,0]
    ],
    [
        [0,0,0,0,1,2],
        [2,-2,0,1,0,0],
        [3,3,4,0,0,0]
    ],
    [
        [0,0,0,1,2,0],
        [0,0,0,2,-1,0],
        [3,3,4,0,0,0]
    ],
    [
        [1,-1,0,0,0,2],
        [2,-2,0,0,0,-1],
        [0,0,0,0,0,0]
    ],
    [
        [0,0,0,1,0,0],
        [0,0,0,0,-1,0],
        [0,0,0,0,0,0]
    ],
    [
        [0,0,0,0,1,0],
        [0,0,0,1,0,0],
        [2,2,3,0,0,0]
    ],
    [
        [0,0,0,0,0,1],
        [1,-1,0,0,0,0],
        [0,0,0,0,0,0]
    ],
    [
        [0,0,0,1,0,0],
        [0,0,0,0,1,0],
        [0,0,0,0,0,1]
    ],
    [
        [0,0,0,1,0,0],
        [0,0,0,0,1,0],
        [0,0,0,0,0,1]
    ]                  
    ];

const pockforbidden=["-1","2/m","mmm","4/m","4/mmm","-3","-3m","6/m","6/mmm","m-3","432","m-3m"];
const pockallowed=["1","2","m","222","mm2","4","-4","422","4mm","-42m","3","32","3m","6","-6","622","6mm","-6m2","23","-43m"];
const pocktensors=[
    [
        [1,2,3],
        [4,5,6],
        [7,8,9],
        [10,11,12],
        [13,14,15],
        [16,17,18]
    ],
    [
        [0,1,0],
        [0,2,0],
        [0,3,0],
        [4,0,5],
        [0,6,0],
        [7,0,8]
    ],
    [
        [1,0,2],
        [3,0,4],
        [5,0,6],
        [0,7,0],
        [8,0,9],
        [0,10,0]
    ],
    [
        [0,0,0],
        [0,0,0],
        [0,0,0],
        [1,0,0],
        [0,2,0],
        [0,0,3]
    ],
    [
        [0,0,1],
        [0,0,2],
        [0,0,3],
        [0,4,0],
        [5,0,0],
        [0,0,0]
    ],
    [
        [0,0,1],
        [0,0,1],
        [0,0,2],
        [3,4,0],
        [4,-3,0],
        [0,0,0]
    ],
    [
        [0,0,1],
        [0,0,-1],
        [0,0,0],
        [2,3,0],
        [-3,2,0],
        [0,0,4]
    ],
    [
        [0,0,0],
        [0,0,0],
        [0,0,0],
        [1,0,0],
        [0,-1,0],
        [0,0,0]
    ],
    [
        [0,0,1],
        [0,0,1],
        [0,0,2],
        [0,3,0],
        [3,0,0],
        [0,0,0]
    ],
    [
        [0,0,0],
        [0,0,0],
        [0,0,0],
        [1,0,0],
        [0,1,0],
        [0,0,2]
    ],
    [
        [1,2,3],
        [-1,-2,3],
        [0,0,4],
        [5,6,0],
        [6,-5,0],
        [2,-1,0]
    ],
    [
        [1,0,0],
        [-1,0,0],
        [0,0,0],
        [2,0,0],
        [0,-2,0],
        [0,-1,0]
    ],
    [
        [0,1,2],
        [0,-1,2],
        [0,0,3],
        [0,4,0],
        [4,0,0],
        [1,0,0]
    ],
    [
        [0,0,1],
        [0,0,1],
        [0,0,2],
        [3,4,0],
        [4,-3,0],
        [0,0,0]
    ],
    [
        [1,2,0],
        [-1,-2,0],
        [0,0,0],
        [0,0,0],
        [0,0,0],
        [2,-1,0]
    ],
    [
        [0,0,0],
        [0,0,0],
        [0,0,0],
        [1,0,0],
        [0,-1,0],
        [0,0,0]
    ],
    [
        [0,0,1],
        [0,0,1],
        [0,0,2],
        [0,3,0],
        [3,0,0],
        [0,0,0]
    ],
    [
        [0,1,0],
        [0,-1,0],
        [0,0,0],
        [0,0,0],
        [0,0,0],
        [1,0,0]
    ],
    [
        [0,0,0],
        [0,0,0],
        [0,0,0],
        [1,0,0],
        [0,1,0],
        [0,0,1]
    ],
    [
        [0,0,0],
        [0,0,0],
        [0,0,0],
        [1,0,0],
        [0,1,0],
        [0,0,1]
    ],               
];
const kerrtensors=[
[
    [1,2,3,4,5,6],
    [7,8,9,10,11,12],
    [13,14,15,16,17,18],
    [19,20,21,22,23,24],
    [25,26,27,28,29,30],
    [31,32,33,34,35,36]
],
[
    [1,2,3,4,5,6],
    [7,8,9,10,11,12],
    [13,14,15,16,17,18],
    [19,20,21,22,23,24],
    [25,26,27,28,29,30],
    [31,32,33,34,35,36]
],
[
    [1,2,3,0,4,0],
    [5,6,7,0,8,0],
    [9,10,11,0,12,0],
    [0,0,0,13,0,14],
    [15,16,17,0,18,0],
    [0,0,0,19,0,20]
],
[
    [1,2,3,0,4,0],
    [5,6,7,0,8,0],
    [9,10,11,0,12,0],
    [0,0,0,13,0,14],
    [15,16,17,0,18,0],
    [0,0,0,19,0,20]
],
[
    [1,2,3,0,4,0],
    [5,6,7,0,8,0],
    [9,10,11,0,12,0],
    [0,0,0,13,0,14],
    [15,16,17,0,18,0],
    [0,0,0,19,0,20]
],
[
    [1,2,3,0,0,0],
    [4,5,6,0,0,0],
    [7,8,9,0,0,0],
    [0,0,0,10,0,0],
    [0,0,0,0,11,0],
    [0,0,0,0,0,12]
],
[
    [1,2,3,0,0,0],
    [4,5,6,0,0,0],
    [7,8,9,0,0,0],
    [0,0,0,10,0,0],
    [0,0,0,0,11,0],
    [0,0,0,0,0,12]
],
[
    [1,2,3,0,0,0],
    [4,5,6,0,0,0],
    [7,8,9,0,0,0],
    [0,0,0,10,0,0],
    [0,0,0,0,11,0],
    [0,0,0,0,0,12]
],
[
    [1,2,3,0,0,4],
    [2,1,3,0,0,-4],
    [5,5,6,0,0,0],
    [0,0,0,7,8,0],
    [0,0,0,-8,7,0],
    [9,-9,0,0,0,10]
],
[
    [1,2,3,0,0,4],
    [2,1,3,0,0,-4],
    [5,5,6,0,0,0],
    [0,0,0,7,8,0],
    [0,0,0,-8,7,0],
    [9,-9,0,0,0,10]
],
[
    [1,2,3,0,0,4],
    [2,1,3,0,0,-4],
    [5,5,6,0,0,0],
    [0,0,0,7,8,0],
    [0,0,0,-8,7,0],
    [9,-9,0,0,0,10]
],
[
    [1,2,3,0,0,0],
    [2,1,3,0,0,0],
    [4,4,5,0,0,0],
    [0,0,0,6,0,0],
    [0,0,0,0,7,0],
    [0,0,0,0,0,8]
],
[
    [1,2,3,0,0,0],
    [2,1,3,0,0,0],
    [4,4,5,0,0,0],
    [0,0,0,6,0,0],
    [0,0,0,0,7,0],
    [0,0,0,0,0,8]
],
[
    [1,2,3,0,0,0],
    [2,1,3,0,0,0],
    [4,4,5,0,0,0],
    [0,0,0,6,0,0],
    [0,0,0,0,7,0],
    [0,0,0,0,0,8]
],
[
    [1,2,3,0,0,0],
    [2,1,3,0,0,0],
    [4,4,5,0,0,0],
    [0,0,0,6,0,0],
    [0,0,0,0,7,0],
    [0,0,0,0,0,8]
],
[
    [1,2,3,4,5,6],
    [2,1,3,-4,-5,-6],
    [7,7,8,0,0,0],
    [9,-9,0,10,11,12],
    [-12,12,0,-11,10,9],
    [-6,6,0,-5,4,37]
],
[
    [1,2,3,4,5,6],
    [2,1,3,-4,-5,-6],
    [7,7,8,0,0,0],
    [9,-9,0,10,11,12],
    [-12,12,0,-11,10,9],
    [-6,6,0,-5,4,37]
],
[
    [1,2,3,4,0,0],
    [2,1,3,-4,0,0],
    [5,5,6,0,0,0],
    [7,-7,0,8,0,0],
    [0,0,0,0,8,7],
    [0,0,0,0,4,37]
],
[
    [1,2,3,4,0,0],
    [2,1,3,-4,0,0],
    [5,5,6,0,0,0],
    [7,-7,0,8,0,0],
    [0,0,0,0,8,7],
    [0,0,0,0,4,37]
],
[
    [1,2,3,4,0,0],
    [2,1,3,-4,0,0],
    [5,5,6,0,0,0],
    [7,-7,0,8,0,0],
    [0,0,0,0,8,7],
    [0,0,0,0,4,37]
],
[
    [1,2,3,0,0,4],
    [2,1,3,0,0,-4],
    [5,5,6,0,0,0],
    [0,0,0,7,8,0],
    [0,0,0,-8,7,0],
    [-4,4,0,0,0,37]
],
[
    [1,2,3,0,0,4],
    [2,1,3,0,0,-4],
    [5,5,6,0,0,0],
    [0,0,0,7,8,0],
    [0,0,0,-8,7,0],
    [-4,4,0,0,0,37]
],
[
    [1,2,3,0,0,4],
    [2,1,3,0,0,-4],
    [5,5,6,0,0,0],
    [0,0,0,7,8,0],
    [0,0,0,-8,7,0],
    [-4,4,0,0,0,37]
],
[
    [1,2,3,0,0,0],
    [2,1,3,0,0,0],
    [4,4,5,0,0,0],
    [0,0,0,6,0,0],
    [0,0,0,0,6,0],
    [0,0,0,0,0,37]
],
[
    [1,2,3,0,0,0],
    [2,1,3,0,0,0],
    [4,4,5,0,0,0],
    [0,0,0,6,0,0],
    [0,0,0,0,6,0],
    [0,0,0,0,0,37]
],
[
    [1,2,3,0,0,0],
    [2,1,3,0,0,0],
    [4,4,5,0,0,0],
    [0,0,0,6,0,0],
    [0,0,0,0,6,0],
    [0,0,0,0,0,37]
],
[
    [1,2,3,0,0,0],
    [2,1,3,0,0,0],
    [4,4,5,0,0,0],
    [0,0,0,6,0,0],
    [0,0,0,0,6,0],
    [0,0,0,0,0,37]
],
[
    [1,2,3,0,0,0],
    [3,1,2,0,0,0],
    [2,3,1,0,0,0],
    [0,0,0,4,0,0],
    [0,0,0,0,4,0],
    [0,0,0,0,0,4]
],
[
    [1,2,3,0,0,0],
    [3,1,2,0,0,0],
    [2,3,1,0,0,0],
    [0,0,0,4,0,0],
    [0,0,0,0,4,0],
    [0,0,0,0,0,4]
],
[
    [1,2,3,0,0,0],
    [3,1,2,0,0,0],
    [2,3,1,0,0,0],
    [0,0,0,4,0,0],
    [0,0,0,0,4,0],
    [0,0,0,0,0,4]
],
[
    [1,2,3,0,0,0],
    [3,1,2,0,0,0],
    [2,3,1,0,0,0],
    [0,0,0,4,0,0],
    [0,0,0,0,4,0],
    [0,0,0,0,0,4]
],
[
    [1,2,3,0,0,0],
    [3,1,2,0,0,0],
    [2,3,1,0,0,0],
    [0,0,0,4,0,0],
    [0,0,0,0,4,0],
    [0,0,0,0,0,4]
]
];
