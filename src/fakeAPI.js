function initData() {
  if (!localStorage.getItem("list") || JSON.parse(localStorage.getItem("list")).length === 0) {
    const items = [
      {
        id: 1,
        imageUrl: "https://picsum.photos/360/360?random=1",
        name: "Product name",
        count: 4,
        size: {
          width: 200,
          height: 200,
        },
        weight: "200g",
        comments: [
          {
            id: 1,
            productId: 1,
            description: "some text here",
            date: "14:00 22.08.2021",
          },
          {
            id: 2,
            productId: 1,
            description: "some other text here",
            date: "14:01 22.08.2021",
          },
        ],
      },
      {
        id: 2,
        imageUrl: "https://picsum.photos/360/360?random=2",
        name: "Product name",
        count: 2,
        size: {
          width: 300,
          height: 240,
        },
        weight: "320g",
        comments: [
          {
            id: 1,
            productId: 1,
            description: "some text here",
            date: "14:00 22.08.2021",
          },
          {
            id: 2,
            productId: 1,
            description: "some other text here",
            date: "14:01 22.08.2021",
          },
        ],
      },
    ];
    localStorage.setItem("list", JSON.stringify(sortByName(items)));
    // localStorage.setItem("sortBy", JSON.stringify({sortBy: ""}))
  }

  return JSON.parse(localStorage.getItem("list"))
}


function sortByName(arr = []) {
  return arr.sort((a, b) => {
    return a.name.localeCompare(b.name) || b.count - a.count;
  });
} 

function sortByNumber(arr = []) {
  return arr.sort((a, b) => {
    return b.count - a.count || a.name.localeCompare(b.name);
  });
} 

function sortByWidth(arr = []) {
  return arr.sort((a, b) => {
    return b.size.width - a.size.width || a.name.localeCompare(b.name);
  });
} 

function sortByHeight(arr = []) {
  return arr.sort((a, b) => {
    return b.size.height - a.size.height || a.name.localeCompare(b.name);
  });
} 

function sortByWeight(arr = []) {
  return arr.sort((a, b) => {
    return Number(b.weight.replace(/\D/g,'')) - Number(a.weight.replace(/\D/g,'')) || a.name.localeCompare(b.name);
  });
} 

function sortByComments(arr = []) {
  return arr.sort((a, b) => {
    return b.comments.length - a.comments.length || a.name.localeCompare(b.name);
  });
} 

function sortList(data = [], pattern = "") {
    switch (pattern) {
    case 'name':
      sortByName(data)
      break;        
    case 'number':
      sortByNumber(data)
      break;
    case 'width':
        sortByWidth(data)
        break;
    case 'height':
      sortByHeight(data)
      break;
    case 'weight':
        sortByWeight(data)
        break;
    case 'comments':
      sortByComments(data)
      break;
    default:
      sortByName(data)
      break;
  }
  return data
}


module.exports = {
  initData: initData(),
  sortByName,
  sortByNumber,
  sortByWidth,
  sortByHeight,
  sortByWeight,
  sortByComments,
  sortList
};
