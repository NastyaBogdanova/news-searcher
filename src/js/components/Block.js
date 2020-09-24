export class Block {
  constructor(blockName, hideClassName) {
    this.blockName = blockName;
    this.hideClassName = hideClassName;
  }

  open() {
    this.blockName.classList.remove(this.hideClassName);
  }

  hide() {
    this.blockName.classList.add(this.hideClassName);
  }

}