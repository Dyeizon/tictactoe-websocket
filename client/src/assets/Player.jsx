import CircleSVG from "./CircleSVG";
import XSVG from "./XSVG";

function Player({datasender, x, y, iconSize, type}) {

    return (
    <div data-sender={datasender} style={{width:iconSize, height:iconSize, transform: `translate(${x - iconSize/2}px, ${y - iconSize/2}px)`}}>
      
      {type == 'circle' ? <CircleSVG/> : ''}
      {type == 'x' ? <XSVG/> : ''}
    </div>
  );
}

export default Player;
