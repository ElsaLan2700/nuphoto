//class: 柱列結構====================================
class QueueStructure {
  constructor(imagePath) {
    this.imagePath = imagePath;
  }
}
//class:柱列結構>實體方法(isEmpty)---------------------
QueueStructure.prototype.isEmpty = function () {
  if (sampleArray.array.length === 0) {
    console.log("無任何待處理的照片");
    return true;
  } else {
    return false;
  }
};

//class:柱列結構>實體方法(addToQueue)-----------------
QueueStructure.prototype.addToQueue = function (image) {
  console.log(`選取將照片${image.imagePath}加進柱列中`);

  //控制陣列新增圖片insertAt(圖片實體,插入位置)
  sampleArray.insertAt(new Image(image.imagePath, image.imageName), -1);
};

//class:柱列結構>實體方法(removeFromQueue)--------------
QueueStructure.prototype.removeFromQueue = function (image) {
  console.log(`反選取將照片${image.imagePath}移除`);

  //控制陣列移除圖片removeFrom(移除位置)
  let deleteIndex;
  sampleArray.array.forEach((val, num) => {
    if (val.imageName === image.imageName) {
      deleteIndex = num;
    }
  });
  sampleArray.removeFrom(deleteIndex);
};

//class: 圖片=========================================
class Image {
  constructor(imagePath, imageName) {
    this.imagePath = imagePath;
    this.imageName = imageName;
  }
}

//class: ArrayPhoto==================================
class ArrayPhoto {
  constructor(array) {
    this.array = array;
  }
}

//class:ArrayPhoto>實體方法(insertAt)--------------
ArrayPhoto.prototype.insertAt = function (element, index) {
  this.array.splice(index, 0, element);
};

//class:ArrayPhoto>實體方法(removeFrom)--------------
ArrayPhoto.prototype.removeFrom = function (index) {
  this.array = this.array.filter((val, num) => num !== index);
};

//照片處理function================================
async function imageProcess(imagePath) {
  if (!sampleArray.array[0]) {
    console.log("柱列已全數處理完畢");
    return;
  }
  let result = await new Promise((resolve, reject) => {
    console.log(`${sampleArray.array[0].imagePath}進行影像處理`);
    setTimeout(() => {
      resolve(1);
      reject("柱列無資料");
    }, 3000);
  });

  if (result === 1) {
    console.log(`${sampleArray.array[0].imagePath}已完成處理`);
    sampleArray.array.splice(0, 1);
    console.log("待處理柱列:", sampleArray.array);
    imageProcess();
  }
}

//柱列內容調整和觸發影像處理時機================
function runImageProcess() {
  if (QueueStructureSimple.isEmpty()) {
    console.log("影像已處理完畢");
  } else {
    //進行影像處理
    console.log(
      `目前柱列共有${sampleArray.array.length}張照片，開始進行相片處理`
    );
    imageProcess();
  }
}

//流程控制=========================================
//自訂柱列內容--------------------------------
// 初始化: 建立空的柱列結構、空陣列

const sampleArray = new ArrayPhoto([
  {
    imagePath: "path 0",
    imageName: "Image 0",
  },
]);
const QueueStructureSimple = new QueueStructure([], "");

//以下為模擬新增照片實體物件和柱列中增減照片的過程===============

//建立照片屬性(路徑、名稱)
const img1 = new Image("path1", "Image A");
const img2 = new Image("path2", "Image B");
const img3 = new Image("path3", "Image C");
const img4 = new Image("path4", "Image D");

//柱列中新增img1-4圖片
QueueStructureSimple.addToQueue(img1);
QueueStructureSimple.addToQueue(img2);
QueueStructureSimple.addToQueue(img3);
QueueStructureSimple.addToQueue(img4);

//柱列中指定刪除img2
QueueStructureSimple.removeFromQueue(img2);

//影像處理-------------------------------

runImageProcess();
