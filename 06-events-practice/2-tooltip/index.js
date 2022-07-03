class Tooltip {
  static onliInstanse = null
  initialize () {
    document.body.addEventListener('pointerover',(event)=>{
  if(event.target.dataset.tooltip!=undefined){
    this.render(event.target.dataset.tooltip)}})
  }
  
getTooltip(event){

}

  render(pip){
    const op = document.createElement('div')
    op.classList.add('tooltip')
    op.innerText =  pip
    document.body.append(op)
    }
}

export default Tooltip;
