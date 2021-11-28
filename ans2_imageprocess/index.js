//class: 柱列結構====================================
class QueueStructure {
  constructor() {
    this.array = new ArrayPhoto(["path0"]);
  }
  isEmpty() {
    return this.array.length === 0;
  }

  addToQueue(imagePath) {
    console.log(`選取將照片${imagePath}加進柱列中`);
    this.array.insertAt(imagePath, -1);
  }

  removeFromQueue(imagePath) {
    console.log(`反選取將照片${imagePath}移除`);
    let deleteIndex = 0;
    for (let i = 0; i < this.array.length; i++) {
      if (this.array.array[i] === imagePath) {
        deleteIndex = i;
      }
    }
    this.array.removeFrom(deleteIndex);
    console.log(this.array);
  }
}

//class: ArrayPhoto==================================
class ArrayPhoto {
  constructor(array) {
    this.array = array;
    this.length = this.array.length;
  }

  insertAt(element, index) {
    this.array.splice(index, 0, element);
    this.length += 1;
  }

  removeFrom(index) {
    this.array = this.array.filter((val, num) => num !== index);
    this.length -= 1;
  }
}

//流程控制=========================================

//以下為模擬新增照片實體物件和柱列中增減照片的過程===============

let queue = new QueueStructure();
queue.addToQueue("Path1");
queue.addToQueue("Path2");
queue.addToQueue("Path3");
queue.addToQueue("Path4");
queue.removeFromQueue("Path3");
function execute() {
  if (!queue.isEmpty()) {
    imageProcess(queue.removeFromQueue(queue.array.array[0]), execute);
  }
}
execute();
