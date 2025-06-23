const StyleMap = new Map();

StyleMap.set(
  {
    background: "#45312d",
    borderTop: "1px solid #333",
    boxShadow: "0 0 2px #333",
  },
  getBlockByStartAndEnd(112, 143).concat(
    getBlockByStartAndEnd(101, 106).concat(getBlockByStartAndEnd(149, 154))
  )
);
StyleMap.set(
  {
    background: "#eae9e7",
    border: "none",
    boxShadow: "",
  },
  getBlockByStartAndEnd(118, 121).concat(getBlockByStartAndEnd(134, 137))
);
StyleMap.set(
  {
    borderRadius: "50% 0 0 0",
    boxShadow: "0 0 0 10px #45312d",
  },
  getBlockByStartAndEnd(118, 118)
);
StyleMap.set(
  {
    borderRadius: "0 50% 0 0",
    boxShadow: "10px 0 0 10px #45312d",
  },
  getBlockByStartAndEnd(121, 121)
);
StyleMap.set(
  {
    borderRadius: "0 0 0 50%",
    boxShadow: "0 10px 0 10px #45312d",
  },
  getBlockByStartAndEnd(134, 134)
);
StyleMap.set(
  {
    borderRadius: "0  0 50% 0",
    boxShadow: "10px 10px 0 10px #45312d",
  },
  getBlockByStartAndEnd(137, 137)
);
StyleMap.set(
  {
    borderRadius: "50% 0 0 0",
  },
  getBlockByStartAndEnd(101)
);
StyleMap.set(
  {
    borderRadius: "0 50% 0 0",
  },
  getBlockByStartAndEnd(106)
);
StyleMap.set(
  {
    borderRadius: "0 0 0 50%",
  },
  getBlockByStartAndEnd(149)
);
StyleMap.set(
  {
    borderRadius: "0 0 50% 0",
  },
  getBlockByStartAndEnd(154)
);

const flatColorMap = {};

Array.from(StyleMap.keys()).forEach((i) => {
  StyleMap.get(i).forEach((index) => {
    flatColorMap[index] = flatColorMap[index] ?? {};
    flatColorMap[index] = Object.assign(flatColorMap[index], i);
  });
});

function blockIndexProducer(start, end, originalEnd, length) {
  if (!length) {
    length = end - start - 1;
  }
  if (!originalEnd) {
    originalEnd = end;
  }
  return [start, end]
    .concat(
      end >= originalEnd - length &&
        blockIndexProducer(start + 1, end - 1, originalEnd, length)
    )
    .filter((i) => !!i);
}

function getBlockByStartAndEnd(start, end) {
  return Array.from(new Set(blockIndexProducer(start, end)));
}

let avatatContainer;

const domProducer = (length = 64) => {
  const frameElement = document.createDocumentFragment();
  for (let i = 0; i < length; i++) {
    const div = document.createElement("div");
    if (i < Math.ceil(length / 2)) {
      div.style.background = "#EE1515";
    } else {
      div.style.background = "#eae9e7";
    }
    if (i in flatColorMap) {
      for (const styleItem in flatColorMap[i]) {
        div.style[styleItem] = flatColorMap[i][styleItem];
      }
    }
    frameElement.appendChild(div);
  }
  return frameElement;
};

function draw(domId) {
  avatatContainer = document.getElementById(domId);
  (avatatContainer.style.background =
    "linear-gradient(to bottom, #EE1515 50%, #eae9e7 50%)"),
    avatatContainer.appendChild(domProducer(256));
}
