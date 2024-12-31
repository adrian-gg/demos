const tileModel = (tileId, tileO, tileR, tileC, tileS) => { return(
  `<li id="tile-${tileId}" class="tile ${ tileO ? "t--on" : "t--off" }">
    <div class="tile__menu"><i class="fa fa-plus" aria-hidden="true"></i></div>
    <div class="tile__options">
      <div class="tile__option tile__open"><i class="fa fa-times" aria-hidden="true"></i></div>
      <div class="tile__option tile__rotate"><i class="fa fa-repeat" aria-hidden="true"></i></div>
      <div class="tile__option tile__color"><i class="fa fa-paint-brush" aria-hidden="true"></i></div>
      <div class="tile__option tile__form"><i class="fa fa-circle-o" aria-hidden="true"></i></div>
    </div>
    <div class="tile__base tr-${tileR} tc-${tileC} tf-${tileS}"></div>
  </li>`
)};
const BoardTilesSize = { w: 6, h: 6 };//3x3
const tiles = Array.from({ length: BoardTilesSize.w * BoardTilesSize.h }, () => ({open: false, rotate: 1, color: 1, form: 1}));

const createBoardTiles = () => {
  const tilesContainer = document.getElementById("tilesContainer");
  tilesContainer.style.setProperty("--size-grid", BoardTilesSize.w);
  
  tiles.forEach((tile, i) => {
    tilesContainer.innerHTML += tileModel(i, tile.open, tile.rotate, tile.color, tile.form);
  })
}
createBoardTiles();


const changeTileMenu = (tileId) => {
  const tile = document.getElementById("tile-"+tileId);
  tiles[tileId].open = tiles[tileId].open ? false : true;
  tile.className = `tile ${ tiles[tileId].open ? "t--on" : "t--off" }`;
}

const changeTileOptions = ([tileId, tileBase, tileOption]) => {
  
  if(tileOption == "open"){
    changeTileMenu(tileId);
    tiles[tileId].rotate = 1;
    tiles[tileId].color = 1;
    tiles[tileId].form = 1;
    
  }else if(tileOption == "rotate"){
    tiles[tileId].rotate + 1 > 4 ? tiles[tileId].rotate = 1 : tiles[tileId].rotate++;

  }else if(tileOption == "color"){
    tiles[tileId].color + 1 > 5 ? tiles[tileId].color = 1 : tiles[tileId].color++;

  }else if(tileOption == "form"){
    tiles[tileId].form + 1 > 4 ? tiles[tileId].form = 1 : tiles[tileId].form++;
  }

  tileBase.className = `tile__base tr-${tiles[tileId].rotate} tc-${tiles[tileId].color} tf-${tiles[tileId].form}`;
  
}


function getDataTile(dis){
  const tileId = dis.parentElement.parentElement.attributes.id.value.split("-")[1];
  const tileBase = dis.parentElement.parentElement.children[2];
  const tileOption = dis.classList[1].split("__")[1];

  return [tileId, tileBase, tileOption]
};

const tilesSelected = document.querySelectorAll(".tile__option");
tilesSelected.forEach( tile => {
  tile.addEventListener("click", function(){
    changeTileOptions(getDataTile(this));
  });
});

const tileMenus = document.querySelectorAll(".tile__menu");
tileMenus.forEach( tileMenu => {
  tileMenu.addEventListener("click", function(){
    const tileId = this.parentElement.attributes.id.value.split("-")[1];
    changeTileMenu(tileId);
  });
});