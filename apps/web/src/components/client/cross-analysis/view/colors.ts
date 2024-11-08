
export const colorMap: { [name: string]: string } = {
    // Blues
    'Midnight Blue': '#151B54',
    'Navy Blue': '#000080',
    'Lapis Blue': '#15317E',
    'Cobalt Blue': '#0020C2',
    'Sapphire Blue': '#2554C7',
    'Blue Eyes': '#1569C7',
    'Windows Blue': '#357EC7',
    'Silk Blue': '#488AC7',
    'Baby Blue': '#95B9C7',
    'Sky Blue': '#6698FF',
    'Crystal Blue': '#5CB3FF',
    'Denim Blue': '#79BAEC',
    'Pastel Blue': '#B4CFEC',
    'Cornflower Blue': '#6495ED',
    'Butterfly Blue': '#38ACEC',
    'Light Sky Blue': '#82CAFA',
    'Light Blue': '#ADDFFF',
    'Robin Egg Blue': '#BDEDFF',
    // Browns
    'Coffee': '#6F4E37',
    'Sepia': '#7F462C',
    'Red Dust': '#7F5217', // previously Red Dirt
    'Red Fox': '#C35817',
    'Wood': '#966F33',
    'Copper': '#B87333',
    'Camel Brown': '#C19A6B',
    'Brown Sugar': '#E2A76F',
    'Burly Wood': '#DEB887',
    // Oranges
    'Pumpkin Orange': '#F87217',
    'Sunrise Orange': '#E67451',
    'Basketball Orange': '#F88158',
    'Dark Orange': '#F88017',
    'Light Salmon': '#F9966B',
    'Cantaloupe': '#FFA62F',
    // Yellows
    'Caramel': '#C68E17',
    'Cookie Brown': '#C7A317',
    'Bee Yellow': '#E9AB17',
    'Golden Brown': '#EAC117',
    'Goldenrod': '#EDDA74',
    'Corn Yellow': '#FFF380',
    'Parchment': '#FFFFC2',
    'Blonde': '#FBF6D9',
    // Reds
    'Burgundy': '#8C001A',
    'Chilli Pepper': '#C11B17',
    'Fire Engine Red': '#F62817',
    'Valentine Red': '#E55451',
    'Light Coral': '#E77471',
    'Medium Violet Red': '#CA226B',
    'Pale Violet Red': '#D16587',
    'Blush Red': '#E56E94',
    // Greens
    'Light Jade': '#C3FDB8',
    'Green Thumb': '#B5EAAA',
    'Mint Green': '#98FF98',
    'Algae Green': '#64E986',
    'Blue Green': '#7BCCB5',
    'Salad Green': '#A1C935',
    'Iguana Green': '#9CB071',
    'Dollar Bill Green': '#85BB65',
    'Frog Green': '#99C68E',
    'Clover Green': '#3EA055',
    'Fern Green': '#667C26',
    'Hazel Green': '#617C58',
    'Camouflage Green': '#78866B',
    'Dark Green': '#254117',
    // Grays
    'Granite': '#837E7C',
    'Gray Cloud': '#B6B6B4',
    'Gray Goose': '#D1D0CE',
    'Platinum': '#E5E4E2',
    // Others
    'Brass': '#B5A642',
    'Pink': '#E0B0FF',
    'Lilac': '#C8A2C8',
    'Dull Purple': '#7F525D',

};
export const colorGroups: { [name: string]: string[] } = {
    Blues: [
        'Midnight Blue',
        'Navy Blue',
        'Lapis Blue',
        'Cobalt Blue',
        'Sapphire Blue',
        'Blue Eyes',
        'Windows Blue',
        'Silk Blue',
        'Baby Blue',
        'Sky Blue',
        'Crystal Blue',
        'Denim Blue',
        'Pastel Blue',
        'Cornflower Blue',
        'Butterfly Blue',
        'Light Sky Blue',
        'Light Blue',
        'Robin Egg Blue',
    ],
    Browns: [
        'Sepia',
        'Coffee',
        'Red Dust',
        'Red Fox',
        'Wood',
        'Copper',
        'Camel Brown',
        'Brown Sugar',
        'Burly Wood',
    ],
    Oranges: [
        'Pumpkin Orange',
        'Sunrise Orange',
        'Basketball Orange',
        'Dark Orange',
        'Cantaloupe',
        'Light Salmon'
    ],
    Yellows: [
        'Caramel',
        'Cookie Brown',
        'Bee Yellow',
        'Golden Brown',
        'Goldenrod',
        'Corn Yellow',
        'Parchment',
        'Blonde',
    ],
    Reds: [
        'Burgundy',
        'Chilli Pepper',
        'Fire Engine Red',
        'Valentine Red',
        'Light Coral',
        'Medium Violet Red',
        'Pale Violet Red',
        'Blush Red'
    ],
    Greens: [
        'Light Jade',
        'Green Thumb',
        'Mint Green',
        'Algae Green',
        'Blue Green',
        'Salad Green',
        'Iguana Green',
        'Dollar Bill Green',
        'Frog Green',
        'Clover Green',
        'Fern Green',
        'Hazel Green',
        'Camouflage Green',
        'Dark Green',
    ],
    Grays: ['Granite', 'Gray Cloud', 'Platinum', 'Gray Goose'],
    Others: ['Brass', 'Pink', 'Lilac', 'Dull Purple']
};


export function determineTextColor(bgColor: string): string {
    // Convert hex color to RGB
    const hex = bgColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Calculate the luminance of the color
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Return black for light colors and white for dark colors
    return luminance > 0.5 ? 'black' : 'white';
}


export const crossAnalysisColors = [
    { "name": "Pastel Blue", "hex": "#B4CFEC" },
    { "name": "Light Salmon", "hex": "#F9966B" },
    { "name": "Clover Green", "hex": "#3EA055" },
    { "name": "Peach", "hex": "#FFE5B4" },
    { "name": "Light Coral", "hex": "#E77471" },
    { "name": "Platinum", "hex": "#E5E4E2" },
    { "name": "Light Sky Blue", "hex": "#82CAFA" },
    { "name": "Burly Wood", "hex": "#DEB887" },
    { "name": "Light Jade", "hex": "#C3FDB8" },
    { "name": "Lavender", "hex": "#E6E6FA" },
    { "name": "Blush Red", "hex": "#E56E94" },
    { "name": "Burgundy", "hex": "#8C001A" },
    { "name": "Silk Blue", "hex": "#488AC7" },
    { "name": "Dull Purple", "hex": "#7F525D" },
    { "name": "Blue Green", "hex": "#7BCCB5" },
    { "name": "Powder Blue", "hex": "#B0E0E6" },
    { "name": 'Caramel', "hex": "#C68E17" },
    { "name": "Thistle", "hex": "#D8BFD8" },
    { "name": "Crystal Blue", "hex": "#5CB3FF" },
    { "name": "Cantaloupe", "hex": "#FFA62F" },
    { "name": "Algae Green", "hex": "#64E986" },
    { "name": "Light Cyan", "hex": "#E0FFFF" },
    { "name": "Valentine Red", "hex": "#E55451" },
    { "name": 'Cobalt Blue', "hex": "#0020C2" },
    { "name": 'Dark Green', "hex": "#254117" },
    { "name": "Basketball Orange", "hex": "#F88158" },
    { "name": "Salad Green", "hex": "#A1C935" },
    { "name": "Goldenrod", "hex": "#EDDA74" },
    { "name": "Windows Blue", "hex": "#357EC7" },
    { "name": "Granite", "hex": "#837E7C" }
]

export const groupedColors = {
    "Paris": [
        { "name": "Pastel Blue", "hex": "#B4CFEC" },
        { "name": "Light Sky Blue", "hex": "#82CAFA" },
        { "name": "Lavender", "hex": "#E6E6FA" },
        { "name": "Steel Blue", "hex": "#4682B4" }, // Replaced Silk Blue
        { "name": "Powder Blue", "hex": "#B0E0E6" },
        { "name": "Cornflower Blue", "hex": "#6495ED" }, // Replaced Crystal Blue
        { "name": "Cobalt Blue", "hex": "#0020C2" },
        { "name": "Royal Blue", "hex": "#4169E1" }, // Replaced Windows Blue
        { "name": "Light Cyan", "hex": "#E0FFFF" },
    ],
    "London": [
        { "name": "Clover Green", "hex": "#3EA055" },
        { "name": "Light Jade", "hex": "#C3FDB8" },
        { "name": "Blue Green", "hex": "#7BCCB5" },
        { "name": "Algae Green", "hex": "#64E986" },
        { "name": "Dark Green", "hex": "#254117" },
        { "name": "Salad Green", "hex": "#A1C935" }
    ],
    "Mixed": [
        { "name": "Terracotta", "hex": "#E2725B" },
        { "name": "Peach", "hex": "#FFE5B4" },
        { "name": "Dusty Rose", "hex": "#DCAE96" },
        { "name": "Coffee", "hex": "#6F4E37" },
        { "name": "Platinum", "hex": "#E5E4E2" },
        { "name": "Blush Red", "hex": "#E56E94" },
        { "name": "Burgundy", "hex": "#8C001A" },
        { "name": "Dull Purple", "hex": "#7F525D" },
        { "name": "Burly Wood", "hex": "#DEB887" },
        { "name": "Caramel", "hex": "#C68E17" },
        { "name": "Thistle", "hex": "#D8BFD8" },
        { "name": "Cantaloupe", "hex": "#FFA62F" },
        { "name": "Valentine Red", "hex": "#E55451" },
        { "name": "Tangerine", "hex": "#FFA07A" },
        { "name": "Goldenrod", "hex": "#EDDA74" },
        { "name": "Granite", "hex": "#837E7C" },
        { "name": "Wood", "hex": "#966F33" },
        { "name": "Brass", "hex": "#B5A642" },
        { "name": "Mahogany", "hex": "#C04000" },
        { "name": "Maroon", "hex": "#800000" },
        { "name": "Plum", "hex": "#8E4585" },
        { "name": "Pumpkin", "hex": "#FF7518" },
        { "name": "Sienna", "hex": "#A0522D" },
        { "name": "Copper", "hex": "#B87333" }
    ]
}

export function* getNextColor(group: keyof typeof groupedColors) {
    let parisCounter = 0;
    let londonCounter = 0;
    let mixedCounter = 0;
    while (true) {
        if (group === "Paris") {
            yield groupedColors[group][parisCounter];
            parisCounter++;
        }
        if (group === "London") {
            yield groupedColors[group][londonCounter];
            londonCounter++;
        }
        if (group === "Mixed") {
            yield groupedColors[group][mixedCounter];
            mixedCounter++;
        }
        if (parisCounter >= groupedColors[group].length) {
            parisCounter = 0;
        }
        if (londonCounter >= groupedColors[group].length) {
            londonCounter = 0;
        }
        if (mixedCounter >= groupedColors[group].length) {
            mixedCounter = 0;
        }
    }
}


export function getCrossAnalysisColors() {
    return crossAnalysisColors.map((item) => ({
        ...item,
        color: item.hex,
        textColor: determineTextColor(item.hex)
    }));
}

// const parisColors = groupedColors["Paris"].map((item) => ({
//   ...item,
//   color: item.hex,
//   textColor: determineTextColor(item.hex),
// }));
// const londonColors = groupedColors["London"].map((item) => ({
//   ...item,
//   color: item.hex,
//   textColor: determineTextColor(item.hex),
// }));
// const mixedColors = groupedColors["Mixed"].map((item) => ({
//   ...item,
//   color: item.hex,
//   textColor: determineTextColor(item.hex),
// }));