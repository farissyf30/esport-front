var TestData = [
    [
        [{ "name": "Erik Zettersten" }, { "name": "Andrew Miller" }],
        [{ "name": "James Coutry" }, { "name": "Sam Merrill" }],
        [{ "name": "Anothy Hopkins" }, { "name": "Everett Zettersten" }],
        [{ "name": "John Scott" }, { "name": "Teddy Koufus" }],
        [{ "name": "Arnold Palmer" }, { "name": "Ryan Anderson" }],
        [{ "name": "Jesse James" }, { "name": "Scott Anderson" }],
        [{ "name": "Josh Groben" }, { "name": "Sammy Zettersten" }],
        [{ "name": "Jake Coutry" }, { "name": "Spencer Zettersten" }],
    ],
    [
        [{ "name": "Erik Zettersten" }, { "name": "James Coutry" }],
        [{ "name": "Anothy Hopkins" }, { "name": "Teddy Koufus" }],
        [{ "name": "Ryan Anderson" }, { "name": "Scott Anderson" }],
        [{ "name": "Sammy Zettersten" }, { "name": "Jake Coutry" }]
    ],
    [
        [{ "name": "Erik Zettersten" }, { "name": "Anothy Hopkins" }],
        [{ "name": "Ryan Anderson" }, { "name": "Sammy Zettersten" }]
    ],
    [
        [{ "name": "Erik Zettersten" }, { "name": "Ryan Anderson" }]
    ],
    [
        [{ "name": "Erik Zettersten" }]
    ]
];

$(".my_gracket").gracket({
    roundLabels: [""],
    src: TestData,
    canvasLineWidth: 1,
    cornerRadius: 0,
    canvasLineCap: "square",
});